import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Card Component Props Types
 * 
 * Type-safe props for all Card-related components extending standard HTML attributes.
 */
export type CardProps = React.HTMLAttributes<HTMLDivElement>
export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>
export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>
export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>
export type CardContentProps = React.HTMLAttributes<HTMLDivElement>
export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>

/**
 * Card Component
 * 
 * A flexible container component that provides a consistent card layout with
 * shadow, border, and background styling. Used as the foundation for content sections.
 * 
 * @component
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description text</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Main card content goes here</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * ```
 * 
 * @param {CardProps} props - Component props extending HTMLDivElement attributes
 * @param {string} [props.className] - Additional CSS classes for customization
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the div element
 * 
 * @returns {JSX.Element} A styled card container
 * 
 * @styling
 * - Rounded corners (rounded-xl)
 * - Subtle border and shadow
 * - Background color from CSS custom properties
 * - Text color inherits from card-foreground
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

/**
 * CardHeader Component
 * 
 * Container for card title and description elements. Provides consistent
 * spacing and typography hierarchy within card layouts.
 * 
 * @component
 * @example
 * ```tsx
 * <CardHeader>
 *   <CardTitle>Important Title</CardTitle>
 *   <CardDescription>Supporting description</CardDescription>
 * </CardHeader>
 * ```
 * 
 * @param {CardHeaderProps} props - Component props extending HTMLDivElement attributes
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the div element
 * 
 * @returns {JSX.Element} A styled card header container
 * 
 * @styling
 * - Flexbox column layout with vertical spacing
 * - Consistent padding (p-6)
 * - Proper spacing between title and description (space-y-1.5)
 */
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

/**
 * CardTitle Component
 * 
 * Primary heading element for card content. Provides semantic structure
 * and consistent typography for card titles.
 * 
 * @component
 * @example
 * ```tsx
 * <CardTitle>My Card Title</CardTitle>
 * ```
 * 
 * @param {CardTitleProps} props - Component props extending HTMLDivElement attributes
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the div element
 * 
 * @returns {JSX.Element} A styled card title element
 * 
 * @styling
 * - Semibold font weight for emphasis
 * - Tight line height for compact appearance
 * - Letter spacing for improved readability
 * 
 * @accessibility
 * - Should be used as the primary heading within card context
 * - Provides semantic structure for screen readers
 */
const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

/**
 * CardDescription Component
 * 
 * Supporting text element for card content. Provides additional context
 * or details about the card's purpose with muted styling.
 * 
 * @component
 * @example
 * ```tsx
 * <CardDescription>
 *   This is a description that provides more context about the card content.
 * </CardDescription>
 * ```
 * 
 * @param {CardDescriptionProps} props - Component props extending HTMLDivElement attributes
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the div element
 * 
 * @returns {JSX.Element} A styled card description element
 * 
 * @styling
 * - Smaller text size (text-sm)
 * - Muted foreground color for hierarchy
 * - Designed to complement CardTitle
 */
const CardDescription = React.forwardRef<HTMLDivElement, CardDescriptionProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

/**
 * CardContent Component
 * 
 * Main content area of the card. Provides consistent padding and spacing
 * for the primary card content.
 * 
 * @component
 * @example
 * ```tsx
 * <CardContent>
 *   <p>Main content goes here</p>
 *   <div>Additional elements</div>
 * </CardContent>
 * ```
 * 
 * @param {CardContentProps} props - Component props extending HTMLDivElement attributes
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the div element
 * 
 * @returns {JSX.Element} A styled card content container
 * 
 * @styling
 * - Consistent padding (p-6) matching CardHeader
 * - No top padding when following CardHeader (pt-0)
 * - Flexible container for any content type
 */
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

/**
 * CardFooter Component
 * 
 * Footer section of the card, typically used for actions like buttons.
 * Provides consistent spacing and flexible layout for interactive elements.
 * 
 * @component
 * @example
 * ```tsx
 * <CardFooter>
 *   <Button variant="outline">Cancel</Button>
 *   <Button>Confirm</Button>
 * </CardFooter>
 * ```
 * 
 * @param {CardFooterProps} props - Component props extending HTMLDivElement attributes
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the div element
 * 
 * @returns {JSX.Element} A styled card footer container
 * 
 * @styling
 * - Flexbox layout for action alignment
 * - Consistent padding (p-6) with no bottom padding (pb-0)
 * - Gap between items for proper spacing
 * - Typically used for button groups
 */
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
