import { Metadata } from 'next'
import SimplePageLayout from '@/components/layout/SimplePageLayout'
import MouseButtonTestCore from '@/components/features/mouse-button/MouseButtonTestCore'
import PageFaq from '@/components/shared/PageFaq'
import type { FaqItem } from '@/types'
import { links, phrases } from '@/lib/seo-helpers'

export const metadata: Metadata = {
  title: 'Mouse Button Test - Test All Mouse Buttons Online | Left Right Middle Back Forward',
  description: 'Professional mouse button test tool for comprehensive button functionality testing. Test left, right, middle, back, and forward mouse buttons. Free online mouse diagnostic.',
  openGraph: {
    title: 'Mouse Button Test - Professional Mouse Button Diagnostic Tool',
    description: 'Test all your mouse buttons with our comprehensive diagnostic tool. Check left, right, middle, back, and forward button functionality online.',
    type: 'website',
    url: 'https://mousetest.com/button-test',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mouse Button Test - Complete Button Functionality Testing',
    description: 'Professional mouse button test tool for testing all mouse buttons. Check button responsiveness and functionality online.',
  },
  alternates: {
    canonical: 'https://mousetest.com/button-test'
  }
}

// Mouse Button Test FAQ - comprehensive guide with rich content
const buttonTestFaqs: FaqItem[] = [
  {
    question: "What is a Mouse Button Test and How Does It Work?",
    answer: `A ${phrases.mouseButton} test evaluates the functionality and responsiveness of all mouse buttons including left, right, middle, back, and forward buttons. Our ${links.button} provides real-time visual feedback, click counting, and button state detection. The test identifies stuck buttons, unresponsive clicks, double-click malfunctions, and timing issues. Essential for diagnosing hardware problems, optimizing gaming performance, and ensuring reliable productivity workflow. Modern mice should register button presses within 1-5 milliseconds for optimal responsiveness.`,
    category: "basic"
  },
  {
    question: "Understanding Mouse Button Types and Functions",
    answer: `Mouse button functionality breakdown: **Left button** - Primary selection, drag operations, menu activation, **Right button** - Context menus, secondary actions, gaming abilities, **Middle button** - Scroll wheel click, tab management, auto-scroll activation, **Back button** - Browser navigation, application history, gaming shortcuts, **Forward button** - Browser forward navigation, application shortcuts. Our ${links.button} tests all button types with visual feedback. ${phrases.gamingMouse} often feature additional programmable buttons for enhanced functionality and customization.`,
    category: "basic"
  },
  {
    question: "How to Fix Mouse Button Problems - Complete Guide",
    answer: `Common ${phrases.mouseButton} issues and solutions: 1) **Unresponsive buttons** - Update drivers, check USB connection, clean button mechanisms, 2) **Stuck buttons** - Remove debris with compressed air, check for physical damage, 3) **${phrases.doubleClick} issues** - Adjust system double-click speed, clean switches, replace worn components, 4) **Inconsistent clicking** - Test with different surfaces, check mouse pad compatibility, update firmware. Our ${links.button} helps identify whether problems are hardware or software related. Professional repair may be needed for worn switch mechanisms.`,
    category: "troubleshooting"
  },
  {
    question: "Gaming Mouse Button Optimization and Testing",
    answer: `${phrases.gamingMouse} button optimization for competitive performance: **Response time** - &lt;1ms click latency for competitive advantage, **Durability** - 50+ million clicks lifespan for intensive gaming, **Consistency** - Uniform response across all buttons, **Programmability** - Custom button assignments and macros. Key features in gaming mice: premium switches (Omron, Huano), adjustable click tension, RGB lighting feedback. Test your gaming setup with our ${links.button} and combine with ${links.cpsMain} for comprehensive performance analysis. Popular ${phrases.gamingMouse} excel in button reliability and customization.`,
    category: "gaming"
  },
  {
    question: "Mouse Button Switch Technology and Quality",
    answer: `${phrases.mouseButton} switch technologies: **Mechanical switches** - Physical contact switches (Omron D2FC, Huano Blue Shell) offering tactile feedback and durability, **Optical switches** - Light-based activation for faster response and longer lifespan, **Hybrid switches** - Combination of mechanical feel with optical speed. Switch quality indicators: rated click lifespan, activation force, response time, and consistency. Premium ${phrases.gamingMouse} use high-quality switches rated for 50-100 million clicks. Our ${links.button} can help identify switch degradation and timing inconsistencies.`,
    category: "accuracy"
  },
  {
    question: "Professional Applications of Button Testing",
    answer: `${phrases.mouseButton} testing in professional environments: **Design work** - Precise button control for creative applications, selection tools, layer management, **Programming** - Code selection, debugging controls, IDE navigation, **Office productivity** - Document editing, spreadsheet navigation, presentation control, **CAD/Engineering** - Precision selection, tool switching, 3D model manipulation. Our ${links.button} provides metrics suitable for professional assessment. Combine with ${links.doubleClick} and ${links.scroll} for comprehensive workplace mouse diagnostics.`,
    category: "basic"
  },
  {
    question: "Troubleshooting Side Button Issues (Back/Forward)",
    answer: `Side button (back/forward) troubleshooting: **Driver configuration** - Ensure proper driver installation for side button recognition, **Software conflicts** - Check for conflicting mouse software or system settings, **Physical inspection** - Verify buttons aren't stuck or damaged, **Functionality testing** - Test in multiple applications (browsers, file managers, games). Common side button problems: not recognized by system, wrong function assignment, inconsistent response. ${phrases.gamingMouse} typically offer superior side button implementation with customizable functions and better tactile feedback.`,
    category: "troubleshooting"
  },
  {
    question: "Mouse Button Customization and Programming",
    answer: `Advanced ${phrases.mouseButton} customization options: **Button remapping** - Assign different functions to any button, **Macro programming** - Create complex command sequences, **Profile switching** - Different button configurations for various applications, **Sensitivity adjustment** - Modify click force and response timing. Popular customization software: Logitech G HUB, Razer Synapse, SteelSeries Engine. Applications benefit from customization: gaming shortcuts, productivity workflows, accessibility modifications. Test customized configurations with our ${links.button} to ensure proper functionality across all programmed buttons.`,
    category: "gaming"
  }
]

export default function ButtonTestPage() {
  return (
    <SimplePageLayout
      title="MOUSE BUTTON TEST"
      subtitle=">> COMPREHENSIVE BUTTON DIAGNOSTIC <<"
      description="Professional mouse button testing for complete functionality verification of all mouse buttons"
    >
      {/* Main Test Component */}
      <section className="mb-20">
        <MouseButtonTestCore />
      </section>

      {/* FAQ Section */}
      <section className="mb-20">
        <PageFaq 
          faqs={buttonTestFaqs}
          title="Mouse Button Test FAQ - Complete Guide"
          description="Master mouse button testing with our comprehensive guide. Learn about button functionality, troubleshooting, gaming optimization, and professional applications."
        />
      </section>
    </SimplePageLayout>
  )
}