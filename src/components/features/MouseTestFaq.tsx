import React from 'react'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { HelpCircle } from 'lucide-react'

const MouseTestFAQ = () => {
  const faqs = [
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
      answer: "Mouse accuracy testing involves checking cursor precision, tracking consistency, and sensor performance. Our accuracy test evaluates how well your mouse tracks movement, detects lifting, and maintains precision across different speeds and surfaces.",
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

  const getCategoryColor = (category: string) => {
    const colors = {
      basic: 'from-neon-green-500 to-electric-500',
      cps: 'from-electric-500 to-cyber-pink-500',
      dpi: 'from-cyber-pink-500 to-warning-orange-500',
      button: 'from-warning-orange-500 to-hacker-purple-500',
      performance: 'from-hacker-purple-500 to-neon-green-500',
      accuracy: 'from-neon-green-500 to-electric-500',
      scroll: 'from-electric-500 to-cyber-pink-500',
      troubleshooting: 'from-cyber-pink-500 to-warning-orange-500'
    }
    return colors[category as keyof typeof colors] || colors.basic
  }

  return (
    <section className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-neon-green-500 to-electric-500 flex items-center justify-center border-2 border-neon-green-400 shadow-lg shadow-neon-green-500/50">
            <HelpCircle className="w-8 h-8 text-black" />
          </div>
        </div>
        <h2 className="text-4xl font-black mb-4">
          <span className="hero-gradient">GAMING FAQ</span>
        </h2>
        <p className="text-lg font-mono max-w-4xl mx-auto leading-relaxed text-electric-400">
          {'>> COMPLETE MOUSE TESTING KNOWLEDGE BASE <<'}
        </p>
        <p className="text-muted-foreground font-mono mt-2">
          CPS | DPI | BUTTON TESTING | PERFORMANCE | DIAGNOSTICS
        </p>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        {faqs.map((faq, index) => (
          <Card key={index} className="test-card group hover:scale-[1.02] transition-all duration-300 bg-black/90 border-2 hover:shadow-lg hover:shadow-primary/20">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getCategoryColor(faq.category)} flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300 border-2 border-current`}>
                  <HelpCircle className="w-5 h-5 text-black" />
                </div>
                <h2 className="text-lg leading-tight group-hover:text-primary transition-colors duration-300 font-mono font-bold text-electric-400 group-hover:text-neon-green-400">
                  {faq.question}
                </h2>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className="glass-effect rounded-xl p-8 max-w-3xl mx-auto border-2 border-neon-green-500/30">
          <h3 className="text-2xl font-black mb-4 font-mono text-electric-400">
            {'>> READY TO TEST YOUR GAMING MOUSE? <<'}
          </h3>
          <p className="text-muted-foreground mb-6 font-mono">
            GET INSTANT PROFESSIONAL RESULTS | NO DOWNLOADS | ZERO INSTALLATION
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="#" 
              className="px-8 py-4 bg-gradient-to-r from-neon-green-500 to-electric-500 text-black rounded-lg font-mono font-black hover:shadow-lg hover:shadow-neon-green-500/50 hover:scale-105 transition-all duration-300 border-2 border-neon-green-400"
            >
              START TESTING NOW
            </a>
            <a 
              href="/cps" 
              className="px-8 py-4 border-2 border-electric-500 rounded-lg font-mono font-bold text-electric-400 hover:bg-electric-500 hover:text-black transition-all duration-300"
            >
              CPS TEST {'>'}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MouseTestFAQ
