import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { HelpCircle } from 'lucide-react'
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
      question: "What is a Mouse Test?",
      answer: "A mouse test is a comprehensive evaluation tool that checks various aspects of your computer mouse functionality, including button responsiveness, click speed (CPS), DPI accuracy, and overall performance. It helps identify hardware issues and optimize your mouse settings for better productivity or gaming.",
      category: "basic"
    },
    {
      question: "How to Test Mouse Buttons?",
      answer: "To test mouse buttons, simply click on the visual mouse diagram above. Each button (left, right, middle, back, forward) will light up green when pressed and display a click counter. This helps verify that all buttons are working correctly and responding to your inputs.",
      category: "button"
    },
    {
      question: "What is CPS Test?",
      answer: "CPS (Clicks Per Second) test measures how fast you can click your mouse button in a given time period. It's commonly used by gamers to improve their clicking speed for competitive gaming, especially in games like Minecraft PvP, osu!, and other click-intensive games.",
      category: "cps"
    },
    {
      question: "How to Check Mouse DPI?",
      answer: "Mouse DPI (Dots Per Inch) determines cursor sensitivity and movement precision. You can check your mouse DPI using our DPI test tool, which measures how far your cursor moves on screen relative to physical mouse movement. Higher DPI means faster cursor movement.",
      category: "dpi"
    },
    {
      question: "What is Mouse Hz Test?",
      answer: "Mouse Hz (Hertz) test, also known as polling rate test, measures how often your mouse reports its position to your computer per second. Common polling rates are 125Hz, 500Hz, and 1000Hz. Higher Hz rates provide smoother cursor movement and better responsiveness.",
      category: "performance"
    },
    {
      question: "How to Test Mouse Accuracy?",
      answer: "Mouse accuracy testing evaluates precision and tracking performance across different surfaces and movement speeds. Our accuracy test measures cursor positioning consistency, tracking stability, and helps identify issues like jittering, skipping, or drift that can affect productivity and gaming performance.",
      category: "accuracy"
    },
    {
      question: "What is Double Click Test?",
      answer: "Double click test verifies that your mouse can register two quick consecutive clicks as a double-click action. This is important for file operations, text selection, and general computer usage. Issues with double-clicking can indicate hardware wear or incorrect timing settings.",
      category: "button"
    },
    {
      question: "How to Test Mouse Scroll Wheel?",
      answer: "Mouse scroll wheel testing checks if your scroll wheel responds correctly to both vertical scrolling and middle-click functionality. Our scroll test detects wheel movement direction, click responsiveness, and smooth scrolling performance.",
      category: "scroll"
    },
    {
      question: "Why Use Online Mouse Testing Tools?",
      answer: "Online mouse testing tools provide immediate, comprehensive diagnostics without requiring software installation. They offer standardized testing environments, detailed results, and help troubleshoot mouse issues quickly. Perfect for gamers, professionals, and anyone experiencing mouse problems.",
      category: "basic"
    },
    {
      question: "What Mouse Problems Can Be Detected?",
      answer: "Common mouse issues that can be detected include: unresponsive buttons, erratic cursor movement, scroll wheel malfunctions, double-click failures, DPI inconsistencies, polling rate problems, and tracking accuracy issues. Early detection helps prevent productivity loss.",
      category: "troubleshooting"
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
    <section className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-neon-green-500 to-electric-500 flex items-center justify-center border-2 border-neon-green-400 shadow-lg shadow-neon-green-500/50">
            <HelpCircle className="w-8 h-8 text-black" />
          </div>
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-neon-green-400 via-electric-400 to-cyber-pink-400 bg-clip-text text-transparent mb-4 font-mono">
          MOUSE TEST FAQ
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto font-mono">
          COMMON QUESTIONS & EXPERT ANSWERS ABOUT MOUSE TESTING
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
                  <h2 className="text-lg font-bold text-neon-green-400 group-hover:text-electric-400 transition-colors font-mono leading-tight">
                    {faq.question}
                  </h2>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-300 leading-relaxed text-sm">
                {faq.answer}
              </p>
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
  )
}

export default MouseTestFaq
