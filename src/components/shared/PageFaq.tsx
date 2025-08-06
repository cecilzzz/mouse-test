import React from 'react'
import FaqDisplay from './FaqDisplay'
import FaqSchema from '@/components/seo/FaqSchema'
import type { FaqItem } from '@/types'

interface PageFaqProps {
  faqs: FaqItem[]
  title?: string
  description?: string
}

/**
 * PageFaq 組件 - FAQ頁面的主要組件
 * 
 * 🎯 這個組件的工作：
 * 提供完整的FAQ功能，包含UI顯示和SEO支持
 * 
 * 🚫 這個組件不做什麼：
 * - 不處理複雜的分類顏色邏輯（簡化後的架構）
 * - 不做數據加工處理（保持數據原樣）
 * - 不包含冗餘的中間層（直接組合基礎組件）
 * 
 * ✅ 只負責：
 * - 組合FaqDisplay組件（負責UI顯示）
 * - 組合FaqSchema組件（負責SEO結構化數據）
 * - 提供統一的API給各個頁面使用
 * 
 * 💡 比喻：就像音響系統的主控台，
 *     把揚聲器（FaqDisplay）和音源處理器（FaqSchema）連接起來，
 *     提供完整的音響體驗
 * 
 * 🏗️ 新架構優勢：
 * - 更簡潔：去掉不必要的中間層
 * - 更清晰：每個組件職責單一明確
 * - 更易維護：減少複雜性，提高可讀性
 */
const PageFaq: React.FC<PageFaqProps> = ({ 
  faqs, 
  title = "Frequently Asked Questions",
  description = "Get expert answers to common questions."
}) => {
  // 🚦 數據驗證：確保有FAQ數據才顯示
  if (!faqs || faqs.length === 0) {
    return null
  }

  return (
    <>
      {/* 🔍 SEO處理：讓Google理解我們的FAQ內容 */}
      <FaqSchema faqs={faqs} />
      {/* 
        💡 FaqSchema做什麼？
        - 把FAQ轉換成Google能理解的結構化數據
        - 讓搜尋結果可能直接顯示問答內容
        - 提升SEO排名
      */}
      
      {/* 🎨 UI顯示：讓用戶看到美觀的FAQ介面 */}
      <FaqDisplay 
        faqs={faqs}
        title={title}
        description={description}
      />
      {/* 
        💡 FaqDisplay做什麼？
        - 把FAQ數據渲染成cyberpunk風格的卡片
        - 統一的視覺效果，不需要複雜的分類顏色
        - 響應式布局，各種設備都好看
      */}
    </>
  )
}

export default PageFaq