import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { HelpCircle } from 'lucide-react'
import type { FaqItem } from '@/types'

interface FaqItemWithGradient extends FaqItem {
  gradient: string
}

interface FaqDisplayProps {
  faqs: FaqItemWithGradient[]
  title?: string
  description?: string
}

interface FaqItemDisplayProps {
  faq: FaqItemWithGradient
}

/**
 * FaqDisplay 組件 - 純粹的FAQ顯示器
 * 
 * 🎨 這個組件的工作：
 * 把FAQ資料變成美美的網頁內容，就像是「美工」
 * 
 * 🚫 這個組件不做什麼：
 * - 不處理分類邏輯（不知道什麼是cps、gaming分類）
 * - 不處理顏色計算（期望顏色已經算好）
 * - 不處理SEO（完全不管Google的事）
 * 
 * ✅ 只負責：
 * - 把FAQ內容排版得很漂亮
 * - 顯示問題和答案
 * - 顯示每個分類的彩色橫條（gradient）
 * 
 * 💡 比喻：就像印刷廠的工人，只負責把設計好的內容印出來，
 *     不負責設計內容是什麼顏色、什麼內容
 */
const FaqItemDisplay: React.FC<FaqItemDisplayProps> = ({ faq }) => (
  <Card className="glass-effect border-electric-500/30 hover:border-neon-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon-green-500/20">
    <CardHeader className="pb-4">
      {/* 🌈 這就是gradient！一條彩色的橫線，顯示這個FAQ的分類顏色 */}
      <div className={`w-full h-1 bg-gradient-to-r ${faq.gradient} rounded-full mb-4`} />
      {/* 
        💡 gradient是什麼？
        - gradient = 漸變色，就是從一個顏色慢慢變到另一個顏色
        - 比如：from-electric-500 to-cyber-pink-500 = 從藍色漸變到粉紅色
        - 這條橫線會根據FAQ的分類顯示不同顏色組合
        - CPS問題 = 藍到粉的橫線
        - 遊戲問題 = 橙到藍的橫線
      */}
      
      <h3 className="text-xl font-bold font-mono text-neon-green-400 leading-tight">
        {faq.question}
      </h3>
    </CardHeader>
    <CardContent>
      <div 
        className="text-gray-300 dark:text-gray-200 leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: faq.answer }}
      />
    </CardContent>
  </Card>
)

/**
 * FaqDisplay - Pure UI Component
 * 
 * Renders a list of FAQ items with consistent cyberpunk styling.
 * Expects pre-processed data with category gradients already calculated.
 * Contains zero business logic - only presentation.
 */
const FaqDisplay: React.FC<FaqDisplayProps> = ({ 
  faqs, 
  title = "Frequently Asked Questions",
  description = "Get expert answers to common questions."
}) => {
  if (!faqs || faqs.length === 0) {
    return null
  }

  return (
    <section className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-neon-green-500 to-electric-500 flex items-center justify-center border-2 border-neon-green-400 shadow-lg shadow-neon-green-500/50">
            <HelpCircle className="w-8 h-8 text-black" />
          </div>
        </div>
        
        <h2 className="text-4xl font-black hero-gradient mb-4 font-mono">
          {title.toUpperCase()}
        </h2>
        
        <p className="text-lg text-electric-400 max-w-2xl mx-auto font-mono">
          {'>> '}{description}{' <<'}
        </p>
      </div>

      <div className="grid gap-8 md:gap-10">
        {faqs.map((faq, index) => (
          <FaqItemDisplay 
            key={`${faq.question}-${index}`}
            faq={faq}
          />
        ))}
      </div>
    </section>
  )
}

export default FaqDisplay