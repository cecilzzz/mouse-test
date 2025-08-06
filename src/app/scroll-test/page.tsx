import { Metadata } from 'next'
import SimplePageLayout from '@/components/layout/SimplePageLayout'
import ScrollTestCore from '@/components/features/scroll/ScrollTestCore'
import PageFaq from '@/components/shared/PageFaq'
import type { FaqItem } from '@/types'
import { links, phrases } from '@/lib/seo-helpers'

export const metadata: Metadata = {
  title: 'Scroll Wheel Test - Mouse Scroll Functionality & Middle Click Test Online',
  description: 'Professional scroll wheel test tool for mouse diagnostics. Test vertical scrolling, horizontal scrolling, and middle button functionality. Free online scroll wheel diagnostic.',
  keywords: 'scroll wheel test, mouse scroll test, scroll test, middle click test, mouse wheel, mouse diagnostics, scroll functionality test',
  openGraph: {
    title: 'Scroll Wheel Test - Professional Mouse Scroll Diagnostic',
    description: 'Test your mouse scroll wheel performance with our comprehensive diagnostic tool. Check vertical, horizontal scrolling and middle click functionality.',
    type: 'website',
    url: 'https://mousetest.com/scroll-test',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scroll Wheel Test - Mouse Scroll & Middle Click Diagnostic',
    description: 'Professional scroll wheel test tool for complete mouse scroll functionality testing. Check your mouse wheel performance online.',
  },
  alternates: {
    canonical: 'https://mousetest.com/scroll-test'
  }
}

// Scroll Test FAQ - comprehensive guide with rich content
const scrollTestFaqs: FaqItem[] = [
  {
    question: "What is a Scroll Wheel Test and Why Is It Important?",
    answer: `A ${phrases.scrollWheel} test evaluates your mouse's scrolling functionality, including vertical scrolling, horizontal scrolling, and middle-click button responsiveness. Our ${links.scroll} detects scroll direction accuracy, wheel resistance, smooth scrolling performance, and middle-button functionality. Regular scroll testing helps identify hardware issues like wheel slippage, inconsistent scroll speed, sticky mechanisms, or middle-click failures. Essential for productivity software navigation, gaming weapon switching, and professional applications requiring precise scrolling control.`,
    category: "basic"
  },
  {
    question: "How to Fix Common Scroll Wheel Problems",
    answer: `Common ${phrases.scrollWheel} issues and solutions: 1) **Cleaning debris** - Use compressed air to remove dust and particles from wheel mechanism, 2) **Driver updates** - Install latest mouse drivers for proper scroll recognition, 3) **Scroll speed adjustment** - Modify system scroll settings in Control Panel/System Preferences, 4) **Hardware inspection** - Check for visible damage or wear on scroll wheel, 5) **Surface testing** - Ensure mouse pad isn't interfering with scroll detection. Our ${links.scroll} helps identify whether problems are hardware or software related. ${phrases.gamingMouse} often have replaceable scroll wheels for long-term maintenance.`,
    category: "troubleshooting"
  },
  {
    question: "Understanding Scroll Wheel Types and Technologies",
    answer: `Modern ${phrases.scrollWheel} technologies: **Notched scrolling** - Tactile feedback with distinct scroll steps, ideal for precise navigation, **Smooth scrolling** - Infinite scroll without steps, better for long documents, **Hybrid wheels** - Switch between notched and smooth modes, **Tilt wheels** - Support horizontal scrolling for wide documents. ${phrases.gamingMouse} feature specialized scroll wheels: weapon switching optimization, adjustable resistance, and programmable middle-click functions. Our ${links.scroll} tests all scroll types and provides comprehensive diagnostics for each technology.`,
    category: "basic"
  },
  {
    question: "Gaming Applications of Scroll Wheel Testing",
    answer: `${phrases.scrollWheel} optimization for gaming performance: **Weapon switching** - Critical for FPS games requiring fast weapon changes, **Inventory management** - RPG and survival games benefit from reliable scrolling, **Zoom control** - Strategy games and design applications, **Menu navigation** - In-game interface control. ${phrases.gamingMouse} excel in scroll performance with features like: adjustable scroll resistance, precision scroll encoders, and custom middle-click programming. Test your setup with our ${links.scroll} and combine with ${links.cpsMain} for complete gaming mouse optimization.`,
    category: "gaming"
  },
  {
    question: "Middle Click Test - Button Functionality and Applications",
    answer: `Middle-click testing verifies scroll wheel button functionality: **Web browsing** - Open links in new tabs, close tabs, auto-scroll, **Productivity** - Copy/paste shortcuts, application switching, **Gaming** - Weapon switching, grenade throwing, special abilities, **Design work** - Pan and zoom in creative applications. Common middle-click issues: button not registering, double-click instead of single, stuck button mechanism. Our ${links.scroll} provides precise middle-click testing with timing analysis. ${phrases.gamingMouse} often feature enhanced middle-click durability for competitive gaming.`,
    category: "button"
  },
  {
    question: "Horizontal Scrolling - Left and Right Wheel Movement",
    answer: `Horizontal scrolling capabilities testing: Modern mice support horizontal scrolling through **tilt wheels** (physical tilting), **touch surfaces** (trackpad-like areas), or **software emulation** (shift+scroll). Applications benefiting from horizontal scrolling: spreadsheet navigation, image editing, wide document viewing, code editing with long lines. Our ${links.scroll} detects and measures horizontal scroll performance, sensitivity, and accuracy. Not all ${phrases.gamingMouse} support horizontal scrolling - check manufacturer specifications for this feature.`,
    category: "accuracy"
  },
  {
    question: "Scroll Wheel Maintenance and Longevity Tips",
    answer: `Maintaining ${phrases.scrollWheel} performance: 1) **Regular cleaning** - Weekly removal of dust and debris using compressed air, 2) **Avoid liquid damage** - Keep drinks away from mouse area, 3) **Gentle usage** - Don't force stuck wheels, seek repair instead, 4) **Surface compatibility** - Use appropriate mouse pads that don't interfere with sensors, 5) **Storage** - Store in clean, dry environment when not in use. Signs requiring professional repair: persistent clicking sounds, wheel skipping, reverse scrolling, or complete failure. Quality ${phrases.gamingMouse} typically last 50+ million scroll cycles with proper maintenance.`,
    category: "troubleshooting"
  },
  {
    question: "Professional and Productivity Applications",
    answer: `${phrases.scrollWheel} importance in professional workflows: **Document editing** - Navigate long documents efficiently, **Spreadsheet work** - Horizontal and vertical navigation in large datasets, **Code development** - Scroll through code files and navigate interfaces, **Design work** - Zoom and pan in creative applications, **CAD software** - 3D model navigation and precision control. Our ${links.scroll} provides metrics suitable for professional environment assessments. Combine with ${links.button} and ${links.doubleClick} for comprehensive workplace mouse diagnostics.`,
    category: "basic"
  }
]

export default function ScrollTestPage() {
  return (
    <SimplePageLayout
      title="SCROLL WHEEL TEST"
      subtitle=">> MOUSE SCROLL DIAGNOSTIC <<"
      description="Professional scroll wheel testing for vertical, horizontal scrolling and middle click functionality"
    >
      {/* Main Test Component */}
      <section className="mb-20">
        <ScrollTestCore
          duration={30}
          title="SCROLL WHEEL TEST"
          description=">> 30 Second Scroll Wheel & Middle Click Diagnostic <<"
        />
      </section>

      {/* FAQ Section */}
      <section className="mb-20">
        <PageFaq 
          faqs={scrollTestFaqs}
          title="Scroll Wheel Test FAQ - Complete Guide"
          description="Master scroll wheel testing with our expert guide. Learn about scroll functionality, troubleshooting, maintenance, and optimization for productivity and gaming."
        />
      </section>
    </SimplePageLayout>
  )
}