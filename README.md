# Premium Creative Developer Portfolio — Divyanshu Kushwaha

An Awwwards-grade, motion-driven portfolio website showcasing software engineering capabilities, interactive mobile development, AI integrations, and verified achievements.

Designed with inspiration from premium portfolios (Apple × Cuberto × Stripe) and built with modern frontend engineering paradigms.

---

## 🚀 Key Features

* **3D Reflective Backgrounds**: Torus, octahedron, and sphere primitive shapes rendered dynamically with `Three.js` (React Three Fiber) that rotate and respond to mouse movements.
* **SafeAura Interactive Case Study**: A focused showcase for the Flutter-Firebase personal safety app. Features a simulated smartphone device mockup allowing users to switch between the actual app screens (SOS dashboard, Incoming callPapa, and Active call Bhaiya).
* **Story-Driven Certificates Lightbox**: Houses 6 verified technical certificates. Clicking an item displays the background story (**How I Earned It** and **What I Learned**), verified tags, and a **copy-to-clipboard LinkedIn Share Caption** with relevant tags.
* **Robust Scroll Animations**: Incorporates smooth-scrolling physics powered by `Lenis` combined with scroll-reveal transitions driven by `GSAP` and `Framer Motion`.
* **Dynamic Cursor Interaction**: Lagging magnet-cursor dot with snap-to targets showing interactive labels (`"VIEW"`, `"DRAG"`, etc.).
* **Secured API Endpoint**: Contact form submissions are processed via a serverless rate-limited API route (`/api/contact`) with full RFC 5322 regex checks to prevent spam.

---

## 🛠️ Technology Stack

* **Framework**: [Next.js](https://nextjs.org/) (App Router structure)
* **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type-checking)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **3D Rendering**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
* **Animations**: [GSAP ScrollTrigger](https://gsap.com/scrolltrigger/) & [Framer Motion](https://www.framer.com/motion/)
* **Smooth Scrolling**: [Lenis Scroll](https://lenis.darkroom.engineering/)

---

## 📦 Directory Structure

```text
├── app/
│   ├── api/contact/route.ts   # Rate-limited serverless contact handler
│   ├── globals.css            # Custom CSS themes, animations, & variables
│   ├── layout.tsx             # Primary HTML structures & fonts setup
│   └── page.tsx               # Portfolio composite viewport order
├── components/
│   ├── ui/
│   │   ├── button.tsx         # Standalone custom clickable component
│   │   └── hero-section-2.tsx # Hero layout with typewriter text arrays
│   ├── About.tsx              # Biography & Quick Info tables
│   ├── Certificates.tsx       # 6 Certificates stories and LinkedIn Captions
│   ├── Contact.tsx            # Connection forms and social coordinates
│   ├── Cursor.tsx             # Magnet lagging cursor dot component
│   ├── Education.tsx          # Academic cards with viewport reveal
│   ├── Footer.tsx             # copyright details & GitHub icon mapping
│   ├── Preloader.tsx          # Progress screen counter loader
│   ├── Projects.tsx           # SafeAura screenshot-switcher console
│   ├── ScrollProvider.tsx     # Lenis smooth-scrolling wrapper
│   └── ThreeBackground.tsx    # R3F canvas primitive background rendering
└── public/assets/             # Static screenshots, resumes, and certificate assets
```

---

## 💻 Local Development

### 1. Installation
Clone the repository, navigate into the project directory, and install dependencies:
```bash
npm install
```

### 2. Run Dev Server
Start the Next.js local server on `http://localhost:3000`:
```bash
npm run dev
```

### 3. Production Build
Verify successful compilation and build optimization payloads:
```bash
npm run build
```

---

## 🌐 Deployment to Vercel

The backend contact form is rate-limited using client IP addresses. Hosting on **Vercel** is recommended because it handles Serverless API routes out-of-the-box:

1. Push your portfolio codebase to **GitHub**.
2. Connect your GitHub account on **Vercel**.
3. Import the repository and click **Deploy** (Vercel automatically detects Next.js build parameters).
