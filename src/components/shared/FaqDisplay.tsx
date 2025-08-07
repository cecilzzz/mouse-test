import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { HelpCircle } from 'lucide-react'
import type { FaqItem } from '@/types'

interface FaqDisplayProps {
  faqs: FaqItem[]
  title?: string
  description?: string
}

interface FaqItemDisplayProps {
  faq: FaqItem
}

/**
 * FaqItemDisplay 組件 - FAQ單項顯示器
 * 
 * 🎯 這個組件的工作：
 * 把單個FAQ問答顯示成統一的cyberpunk風格卡片
 * 
 * 🚫 這個組件不做什麼：
 * - 不處理分類邏輯（分類只是資料，不影響顯示）
 * - 不處理SEO（專心做好UI就好）
 * - 不做複雜的顏色分類（統一cyberpunk風格）
 * 
 * ✅ 只負責：
 * - 顯示問題標題（霓虹綠色）
 * - 顯示答案內容（統一灰色文字）
 * - 提供cyberpunk hover效果
 * 
 * 💡 比喻：就像標準化的展示櫥窗，所有商品都用同樣的展示風格
 */
const FaqItemDisplay: React.FC<FaqItemDisplayProps> = ({ faq }) => (
  <Card className="glass-effect border-electric-500/30 hover:border-neon-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon-green-500/20">
    <CardHeader className="pb-4">
      {/* 🌈 統一的cyberpunk裝飾線：霓虹綠到電藍的漸變 */}
      <div className="w-full h-1 bg-gradient-to-r from-neon-green-500 to-electric-500 rounded-full mb-4" />
      {/* 
        💡 為什麼用統一的漸變？
        - 保持整站視覺一致性
        - 避免過多顏色干擾閱讀
        - 符合cyberpunk美學風格
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
 * FaqDisplay 組件 - FAQ列表顯示器
 * 
 * 🎯 這個組件的工作：
 * 把整個FAQ列表排版成美觀的頁面，統一使用cyberpunk風格
 * 
 * 🚫 這個組件不做什麼：
 * - 不處理分類顏色邏輯（統一風格更簡潔）
 * - 不處理SEO結構化數據（交給專門組件）
 * - 不做數據加工（純展示組件）
 * 
 * ✅ 只負責：
 * - 顯示標題和描述（cyberpunk風格）
 * - 渲染FAQ列表（調用FaqItemDisplay）
 * - 提供響應式布局
 * 
 * 💡 比喻：就像展覽館的策展人，負責整體展示效果，
 *     但不負責製作展品或處理參觀資料
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