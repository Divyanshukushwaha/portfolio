import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiting map (IP -> { count, resetTime })
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 3; // Max requests per window

export async function POST(request: NextRequest) {
  try {
    // 1. Retrieve client IP address securely
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : (request.headers.get("x-real-ip") || "127.0.0.1");

    // 2. Perform Rate Limiting Checks
    const now = Date.now();
    const rateLimitData = rateLimitMap.get(ip);

    if (rateLimitData) {
      if (now > rateLimitData.resetTime) {
        // Window expired, reset limit bucket
        rateLimitMap.set(ip, { count: 1, resetTime: now + LIMIT_WINDOW_MS });
      } else {
        // Increment count
        rateLimitData.count += 1;
        if (rateLimitData.count > MAX_REQUESTS) {
          const retryAfterSec = Math.ceil((rateLimitData.resetTime - now) / 1000);
          return NextResponse.json(
            { error: "Too many contact requests from this IP. Please try again later." },
            {
              status: 429,
              headers: {
                "Retry-After": String(retryAfterSec),
                "Cache-Control": "no-store",
              },
            }
          );
        }
      }
    } else {
      // First request from this IP
      rateLimitMap.set(ip, { count: 1, resetTime: now + LIMIT_WINDOW_MS });
    }

    // 3. Parse JSON Body
    const body = await request.json();
    const { name, email, subject, message } = body;

    // 4. Strict Input Validation (Server-Side Schema checks)
    if (!name || typeof name !== "string" || name.trim().length < 2 || name.trim().length > 50) {
      return NextResponse.json({ error: "Invalid name. Must be 2-50 characters." }, { status: 400 });
    }

    // Alphabetic character check to prevent HTML/script injection in name
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name.trim())) {
      return NextResponse.json({ error: "Name must contain only alphabetic characters." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || email.trim().length > 100) {
      return NextResponse.json({ error: "Invalid email length." }, { status: 400 });
    }

    // Strict RFC 5322 Email Validation Regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email format schema." }, { status: 400 });
    }

    if (!subject || typeof subject !== "string" || subject.trim().length < 3 || subject.trim().length > 100) {
      return NextResponse.json({ error: "Invalid subject. Must be 3-100 characters." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || message.trim().length < 10 || message.trim().length > 1000) {
      return NextResponse.json({ error: "Invalid message. Must be 10-1000 characters." }, { status: 400 });
    }

    // XSS Sanitization: Simple HTML tag strip to prevent persistent scripts
    const sanitizedMessage = message.replace(/<[^>]*>?/gm, "").trim();

    // 5. Securely dispatching or storing contact form requests (Mocking mailing relay)
    // We would use an environment secret like process.env.RESEND_API_KEY here to avoid exposing secrets.
    console.log(`[API Contact Secured Payload] Name: ${name}, Email: ${email}, Subject: ${subject}`);
    console.log(`[Sanitized Message]: ${sanitizedMessage}`);

    // Return Success
    return NextResponse.json({ success: true, message: "Contact request processed successfully." }, { status: 200 });

  } catch (error) {
    console.error("API error inside contact route:", error);
    return NextResponse.json({ error: "Internal server processing error." }, { status: 500 });
  }
}
