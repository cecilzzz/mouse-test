/**
 * PageFaq - Backward Compatible FAQ Component
 * 
 * This component maintains API compatibility with existing pages
 * while using the new clean architecture internally.
 * 
 * Architecture:
 * - Delegates to FaqWithSeo for actual implementation
 * - Maintains same API as before (zero breaking changes)
 * - Uses composition over monolithic implementation
 */

export { default } from './FaqWithSeo'