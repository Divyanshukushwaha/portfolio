import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
      // Custom styling values mapping shadcn colors to our terracotta accent color
      variant === 'default' && "bg-primary hover:bg-accent-terracotta-dark text-warm-white border border-white/5 shadow-lg shadow-accent-terracotta/10 hover:shadow-accent-terracotta/20",
      variant === 'outline' && "border border-white/10 bg-transparent text-warm-white hover:bg-white/5 hover:border-white/20",
      variant === 'ghost' && "bg-transparent text-warm-white hover:bg-white/5",
      variant === 'secondary' && "bg-stone-gray/25 text-warm-white hover:bg-stone-gray/40 border border-white/5",
      
      // Sizing maps
      size === 'default' && "h-10 px-4 py-2 text-sm rounded-xl",
      size === 'sm' && "h-8 px-3 text-xs rounded-lg",
      size === 'lg' && "h-12 px-6 text-base rounded-xl",
      
      className
    );

    if (asChild && React.isValidElement(props.children)) {
      const child = props.children as React.ReactElement<any>;
      return React.cloneElement(child, {
        className: cn(classes, child.props.className),
        ...props,
        children: child.props.children
      });
    }

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
