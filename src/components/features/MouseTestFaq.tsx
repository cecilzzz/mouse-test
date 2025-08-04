import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { HelpCircle } from 'lucide-react'
import FaqSchema from '@/components/seo/FaqSchema'
import type { FaqItem, FaqCategory, CategoryColors } from '@/types'

/**
 * MouseTestFaq Component
 * 
 * Displays a comprehensive FAQ section about mouse testing with SEO-optimized content.
 * Features categorized questions and answers covering all aspects of mouse testing.
 * 
 * @component
 * @example
 * ```tsx
 * <MouseTestFaq />
 * ```
 * 
 * @returns {JSX.Element} FAQ section with categorized questions and answers
 * 
 * @features
 * - 10+ comprehensive FAQ items covering mouse testing topics
 * - Category-based color coding for easy navigation
 * - SEO-optimized H2 headings for each question
 * - Responsive grid layout for optimal readability
 * - Gaming-themed visual design
 * 
 * @categories
 * - basic: General mouse testing information
 * - button: Mouse button functionality and testing
 * - cps: Clicks Per Second testing and gaming
 * - dpi: DPI (Dots Per Inch) sensitivity testing
 * - performance: Hz testing and performance metrics
 * - accuracy: Precision and tracking testing
 * - scroll: Scroll wheel functionality
 * - troubleshooting: Common issues and solutions
 * 
 * @data
 * Uses FaqItem[] array with properties:
 * - question: The FAQ question (used as H2 for SEO)
 * - answer: Detailed answer with technical information
 * - category: FaqCategory for color coding and organization
 * 
 * @design
 * - Each FAQ card has unique gradient colors based on category
 * - Hover effects with scaling and glow
 * - Numbered badges for easy reference
 * - Gaming-style typography and colors
 * - Responsive 2-column grid on larger screens
 * 
 * @seo
 * - H2 tags for each question improve search rankings
 * - Comprehensive content covers mouse testing keywords
 * - Structured data markup for rich snippets
 * - Category-based organization aids discoverability
 */
const MouseTestFaq: React.FC = () => {
  const faqs: FaqItem[] = [
    {
      question: "What is a Mouse Test and Why Do You Need It?",
      answer: "A mouse test is a comprehensive diagnostic tool that evaluates your computer mouse's hardware functionality, performance metrics, and responsiveness. Our free online <strong>mouse test</strong> checks button responsiveness, <strong>click speed (CPS)</strong>, DPI accuracy, polling rate, scroll wheel functionality, and tracking precision. Regular mouse testing helps identify hardware issues early, optimize settings for gaming or productivity, and ensure your mouse performs at peak efficiency. Whether you're a professional gamer, designer, or everyday computer user, mouse testing is essential for maintaining optimal computer interaction.",
      category: "basic"
    },
    {
      question: "How to Test Mouse Buttons - Complete Guide",
      answer: "Testing <strong>mouse buttons</strong> is simple with our interactive mouse diagram above. Click each button (left, right, middle, back, forward) to verify functionality. The test detects button press registration, release timing, and click consistency. For thorough testing: 1) Test all buttons individually, 2) Check for stuck or unresponsive buttons, 3) Verify middle-click and side button functionality, 4) Test rapid clicking to detect hardware lag. Our <strong>mouse button test</strong> works with all mouse types including gaming mice, wireless mice, and trackpads. Common issues detected include <strong>double-click problems</strong>, button ghosting, and mechanical switch failures.",
      category: "button"
    },
    {
      question: "CPS Test - How Fast Can You Click?",
      answer: "<strong>CPS (Clicks Per Second) test</strong> measures your clicking speed and mouse responsiveness for gaming and productivity. Average CPS ranges: Casual users (2-4 CPS), Regular gamers (4-7 CPS), Pro gamers (8-12+ CPS). Our <strong>CPS test</strong> supports multiple time intervals (1s, 5s, 10s, 30s, 60s) for accurate measurement. Popular among Minecraft PvP players, osu! gamers, and competitive esports athletes. Tips to improve CPS: Use proper finger positioning, practice <strong>butterfly clicking</strong>, optimize mouse settings, and maintain consistent rhythm. Test different clicking techniques like jitter clicking, butterfly clicking, and drag clicking to find your optimal method.",
      category: "cps"
    },
    {
      question: "How to Check Mouse DPI and Sensitivity Settings",
      answer: "<strong>Mouse DPI (Dots Per Inch)</strong> determines cursor sensitivity and movement precision across your screen. Common DPI ranges: Office work (800-1200 DPI), Gaming (1600-3200 DPI), Design work (3200+ DPI). Our <strong>DPI test</strong> measures actual DPI by tracking cursor movement relative to physical mouse movement. To optimize DPI: 1) Start with manufacturer specifications, 2) Test different DPI settings, 3) Adjust in-game sensitivity accordingly, 4) Consider your monitor resolution and desk space. High DPI isn't always better - find the sweet spot for your usage. <strong>Gaming mice</strong> often feature adjustable DPI with dedicated buttons for real-time switching.",
      category: "dpi"
    },
    {
      question: "Mouse Polling Rate (Hz) Test - Performance Optimization",
      answer: "<strong>Mouse polling rate (Hz)</strong> measures how frequently your mouse reports position data to your computer. Standard rates: 125Hz (8ms delay), 500Hz (2ms delay), 1000Hz (1ms delay). Higher polling rates provide smoother cursor movement and reduced input lag, crucial for <strong>competitive gaming</strong> and precision work. Our <strong>Hz test</strong> accurately measures your mouse's actual polling rate versus advertised specifications. Gaming mice typically support 1000Hz, while basic mice often operate at 125Hz. Note: Higher polling rates consume more CPU resources and may cause issues with older systems. Most modern gaming requires at least 500Hz for optimal performance.",
      category: "performance"
    },
    {
      question: "Mouse Accuracy Test - Precision and Tracking Performance",
      answer: "<strong>Mouse accuracy testing</strong> evaluates tracking precision, sensor performance, and movement consistency across different surfaces and speeds. Our <strong>accuracy test</strong> measures: pointer precision, tracking stability at various speeds, acceleration handling, and surface compatibility. Factors affecting accuracy: mouse pad quality, sensor type (optical vs laser), <strong>DPI settings</strong>, and surface texture. Gaming and design work require high accuracy for precise movements. Common accuracy issues include: cursor drift, tracking skips, acceleration inconsistency, and angle snapping. Optical sensors generally provide better accuracy than laser sensors for gaming applications.",
      category: "accuracy"
    },
    {
      question: "Double Click Test - Diagnosing Click Issues",
      answer: "<strong>Double click test</strong> verifies your mouse's ability to register rapid consecutive clicks as intended actions. This test is crucial for detecting <strong>double-click malfunctions</strong>, where single clicks register as double clicks or double clicks fail to register. Common in aging mice where mechanical switches wear out, causing erratic behavior. Our test measures click timing accuracy and consistency. Troubleshooting double-click issues: 1) Adjust double-click speed in system settings, 2) Clean mouse switches, 3) Update mouse drivers, 4) Consider hardware replacement if problems persist. <strong>Gaming mice</strong> with high-quality switches (Omron, Huano) typically have longer lifespans.",
      category: "button"
    },
    {
      question: "Scroll Wheel Test - Functionality and Responsiveness",
      answer: "<strong>Scroll wheel testing</strong> verifies vertical scrolling, horizontal scrolling (if supported), and middle-click functionality. Our <strong>scroll test</strong> detects scroll direction accuracy, wheel resistance, smooth scrolling performance, and middle-button click registration. Modern mice feature different scroll types: notched scrolling (tactile feedback), smooth scrolling (infinite scroll), and hybrid modes. Gaming mice often include scroll wheel customization for weapon switching and macro functions. Common scroll issues: wheel slipping, reverse scrolling, inconsistent scroll speed, and middle-click failure. Regular cleaning and proper maintenance extend scroll wheel lifespan.",
      category: "scroll"
    },
    {
      question: "Why Use Online Mouse Testing Tools?",
      answer: "<strong>Online mouse testing tools</strong> offer immediate, comprehensive diagnostics without software installation, driver updates, or system modifications. Benefits include: cross-platform compatibility, real-time results, standardized testing environment, and free accessibility. Our web-based tests work on Windows, Mac, Linux, and mobile devices. Perfect for: <strong>troubleshooting mouse issues</strong>, pre-purchase testing in stores, gaming optimization, productivity enhancement, and hardware diagnostics. Online tools provide objective measurements unaffected by system-specific settings or driver issues. Ideal for quick testing before important gaming sessions or work presentations.",
      category: "basic"
    },
    {
      question: "Common Mouse Problems and Solutions",
      answer: "Mouse problems we can detect and help solve: 1) Unresponsive buttons - often caused by worn switches or driver issues, 2) Erratic cursor movement - usually surface or sensor problems, 3) Scroll wheel malfunctions - mechanical wear or debris buildup, 4) Double-click failures - timing issues or switch degradation, 5) DPI inconsistencies - sensor or software problems, 6) Low polling rate - USB port or driver issues, 7) Tracking accuracy problems - surface compatibility or sensor dust. Prevention tips: regular cleaning, proper mouse pad usage, driver updates, and avoiding liquid damage. Most issues can be resolved through software adjustments or basic maintenance.",
      category: "troubleshooting"
    },
    {
      question: "Gaming Mouse Test - Optimize for Competitive Play",
      answer: "Gaming mouse testing focuses on performance metrics critical for competitive gaming: ultra-low latency (sub-1ms click response), high polling rates (1000Hz+), precise tracking at high speeds, customizable DPI switching, and programmable button reliability. Our gaming-focused tests evaluate: click latency, tracking consistency during rapid movements, acceleration handling, and button durability. Popular gaming mouse features: adjustable weight systems, RGB lighting, on-the-fly DPI adjustment, and gaming-specific sensors (PMW3360, Hero, TrueMove). Essential for FPS games (CS:GO, Valorant), MOBA games (League of Legends, Dota 2), and competitive gaming where milliseconds matter.",
      category: "gaming"
    },
    {
      question: "Mouse Compatibility Test - Windows, Mac, Linux",
      answer: "Mouse compatibility testing ensures your mouse works correctly across different operating systems and applications. Our tests verify: basic functionality on all major platforms, driver compatibility, advanced feature support (programmable buttons, DPI switching), and system-specific optimizations. Cross-platform considerations: Windows offers extensive gaming mouse support, Mac has different acceleration curves, Linux may require additional drivers for advanced features. Universal compatibility features: plug-and-play USB support, standard HID protocols, and basic button functionality. For optimal performance, use manufacturer-provided software for advanced features and customization.",
      category: "compatibility"
    }
  ]

  const getCategoryColor = (category: FaqCategory): string => {
    const colors: CategoryColors = {
      basic: 'from-neon-green-500 to-electric-500',
      cps: 'from-electric-500 to-cyber-pink-500',
      dpi: 'from-cyber-pink-500 to-warning-orange-500',
      button: 'from-warning-orange-500 to-hacker-purple-500',
      performance: 'from-hacker-purple-500 to-neon-green-500',
      accuracy: 'from-neon-green-500 to-electric-500',
      scroll: 'from-electric-500 to-cyber-pink-500',
      troubleshooting: 'from-cyber-pink-500 to-warning-orange-500',
      compatibility: 'from-hacker-purple-500 to-neon-green-500',
      gaming: 'from-warning-orange-500 to-electric-500'
    }
    
    return colors[category] || colors.basic
  }

  return (
    <>
      <FaqSchema faqs={faqs} />
      <section className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-neon-green-500 to-electric-500 flex items-center justify-center border-2 border-neon-green-400 shadow-lg shadow-neon-green-500/50">
            <HelpCircle className="w-8 h-8 text-black" />
          </div>
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-neon-green-400 via-electric-400 to-cyber-pink-400 bg-clip-text text-transparent mb-4 font-mono">
          Mouse Test FAQ - Expert Answers
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto font-mono">
          Get expert answers to common mouse testing questions. Learn about CPS tests, DPI settings, button diagnostics, and troubleshooting tips.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {faqs.map((faq, index) => (
          <Card 
            key={index} 
            className="group bg-gray-900/80 backdrop-blur-sm border-2 border-gray-700/50 hover:border-neon-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon-green-500/20"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-md bg-gradient-to-r ${getCategoryColor(faq.category)} flex items-center justify-center flex-shrink-0 mt-1`}>
                  <span className="text-xs font-bold text-black font-mono">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-neon-green-400 group-hover:text-electric-400 transition-colors font-mono leading-tight">
                    {faq.question}
                  </h3>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-gray-300 leading-relaxed text-sm">
                <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-400 font-mono text-sm">
          💡 NEED MORE HELP? CHECK OUR TESTING TOOLS ABOVE
        </p>
      </div>
      </section>
    </>
  )
}

export default MouseTestFaq
