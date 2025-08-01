import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Button Variants Configuration
 * 
 * Utilizes class-variance-authority (CVA) for consistent button styling
 * across different variants and sizes.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * ButtonProps Interface
 * 
 * Extends standard HTML button attributes with variant props for customization.
 * 
 * @interface ButtonProps
 * @extends React.ButtonHTMLAttributes<HTMLButtonElement>
 * @extends VariantProps<typeof buttonVariants>
 * 
 * @property {boolean} [asChild] - When true, renders as Slot for composition patterns
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

/**
 * Button Component
 * 
 * A flexible, accessible button component with multiple variants and sizes.
 * Built with Radix UI primitives and styled with Tailwind CSS.
 * 
 * @component
 * @example
 * ```tsx
 * // Basic button
 * <Button>Click me</Button>
 * 
 * // Button with variant and size
 * <Button variant="outline" size="lg">
 *   Large Outline Button
 * </Button>
 * 
 * // Icon button
 * <Button variant="ghost" size="icon">
 *   <Icon className="w-4 h-4" />
 * </Button>
 * 
 * // As child component (composition)
 * <Button asChild>
 *   <Link href="/somewhere">Navigate</Link>
 * </Button>
 * ```
 * 
 * @param {ButtonProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {'default'|'destructive'|'outline'|'secondary'|'ghost'|'link'} [props.variant='default'] - Button style variant
 * @param {'default'|'sm'|'lg'|'icon'} [props.size='default'] - Button size
 * @param {boolean} [props.asChild=false] - Render as Slot for composition
 * @param {React.Ref<HTMLButtonElement>} ref - Forwarded ref
 * 
 * @returns {JSX.Element} Rendered button element
 * 
 * @variants
 * - default: Primary button with solid background
 * - destructive: Danger/error button with red styling  
 * - outline: Button with border and transparent background
 * - secondary: Subtle button with muted styling
 * - ghost: Minimal button with hover effects only
 * - link: Text-only button that looks like a link
 * 
 * @sizes
 * - default: Standard height (36px) with horizontal padding
 * - sm: Small height (32px) with reduced padding
 * - lg: Large height (40px) with increased padding
 * - icon: Square button (36x36px) for icons only
 * 
 * @accessibility
 * - Supports keyboard navigation and focus states
 * - Proper ARIA attributes inherited from button element
 * - Focus ring visible for keyboard users
 * - Disabled state properly handled
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
