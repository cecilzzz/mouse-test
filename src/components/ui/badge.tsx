import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Badge Variants Configuration
 * 
 * Defines styling variants for the Badge component using class-variance-authority.
 * Provides consistent theming and hover states across different badge types.
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * BadgeProps Interface
 * 
 * Extends standard HTML div attributes with variant props for styling customization.
 * 
 * @interface BadgeProps
 * @extends React.HTMLAttributes<HTMLDivElement>
 * @extends VariantProps<typeof badgeVariants>
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Badge Component
 * 
 * A small, inline component used for displaying status, categories, or labels.
 * Supports multiple visual variants and maintains consistent styling.
 * 
 * @component
 * @example
 * ```tsx
 * // Basic badge
 * <Badge>New</Badge>
 * 
 * // Badge with variant
 * <Badge variant="secondary">Status</Badge>
 * 
 * // Destructive badge for warnings
 * <Badge variant="destructive">Error</Badge>
 * 
 * // Outline badge for minimal styling
 * <Badge variant="outline">Category</Badge>
 * ```
 * 
 * @param {BadgeProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {'default'|'secondary'|'destructive'|'outline'} [props.variant='default'] - Badge style variant
 * 
 * @returns {JSX.Element} Rendered badge element
 * 
 * @variants
 * - default: Primary badge with solid background and shadow
 * - secondary: Muted badge with secondary colors
 * - destructive: Error/warning badge with red styling
 * - outline: Minimal badge with border only
 * 
 * @styling
 * - Small, compact size with minimal padding
 * - Rounded corners for modern appearance
 * - Semibold font weight for emphasis
 * - Smooth color transitions on hover
 * - Focus ring for accessibility
 * 
 * @use-cases
 * - Status indicators (online, offline, pending)
 * - Category labels (gaming, performance, testing)
 * - Feature highlights (new, beta, premium)
 * - Count indicators (notifications, items)
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
