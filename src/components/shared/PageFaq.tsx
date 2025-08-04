import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { HelpCircle } from 'lucide-react'
import FaqSchema from '@/components/seo/FaqSchema'
import type { FaqItem, FaqCategory, CategoryColors } from '@/types'

interface PageFaqProps {
  faqs: FaqItem[]
  title?: string
  description?: string
}

/**
 * Simple FAQ component for individual pages
 * 
 * Each page defines its own FAQ array and passes it to this component.
 * Content stays with the page, component handles only the UI.
 */
const PageFaq: React.FC<PageFaqProps> = ({ 
  faqs, 
  title = "Frequently Asked Questions",
  description = "Get expert answers to common questions."
}) => {
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
            {title}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-mono">
            {description}
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
      </section>
    </>
  )
}

export default PageFaq