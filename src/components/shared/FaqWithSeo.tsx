import React, { useMemo } from 'react'
import FaqDisplay from './FaqDisplay'
import FaqSchema from '@/components/seo/FaqSchema'
import type { FaqItem, FaqCategory, CategoryColors } from '@/types'

interface FaqWithSeoProps {
  faqs: FaqItem[]
  title?: string
  description?: string
}

/**
 * FaqWithSeo 組件 - FAQ的大總管
 * 
 * 🎯 這是最重要的組件！負責協調其他組件一起工作
 * 
 * 📋 這個組件的三大工作：
 * 
 * 1️⃣ 【分類顏色處理】
 *    - 把 "cps" 分類 → 轉換成 "藍色到粉紅色的漸變"
 *    - 把 "gaming" 分類 → 轉換成 "橙色到藍色的漸變"
 *    - 每種分類都有自己專屬的顏色組合
 * 
 * 2️⃣ 【組合兩個專業組件】
 *    - 叫 FaqSchema 去處理 SEO（讓Google看懂）
 *    - 叫 FaqDisplay 去負責顯示（讓用戶看到美美的介面）
 * 
 * 3️⃣ 【數據轉換】
 *    - 接收原始FAQ數據（沒有顏色信息）
 *    - 加工後傳給FaqDisplay（加上顏色信息）
 * 
 * 💡 比喻：就像是餐廳經理
 *    - 客人點餐（原始FAQ）
 *    - 決定用什麼盤子裝（分類顏色）
 *    - 指揮廚師做菜（FaqDisplay）
 *    - 指揮服務生上菜（FaqSchema處理SEO）
 */
const FaqWithSeo: React.FC<FaqWithSeoProps> = ({ 
  faqs, 
  title = "Frequently Asked Questions",
  description = "Get expert answers to common questions."
}) => {
  // 🎨 【工作1】分類顏色對應表：決定每種FAQ分類要用什麼顏色
  const getCategoryGradient = useMemo(() => {
    // 📝 這是我們的「顏色對照表」，每種分類都有專屬顏色組合
    const categoryGradients: CategoryColors = {
      basic: 'from-neon-green-500 to-electric-500',        // 基礎問題 = 綠到藍
      cps: 'from-electric-500 to-cyber-pink-500',          // CPS問題 = 藍到粉
      dpi: 'from-cyber-pink-500 to-warning-orange-500',    // DPI問題 = 粉到橙
      button: 'from-warning-orange-500 to-hacker-purple-500', // 按鈕問題 = 橙到紫
      performance: 'from-hacker-purple-500 to-neon-green-500', // 性能問題 = 紫到綠
      accuracy: 'from-neon-green-500 to-electric-500',     // 準確度問題 = 綠到藍
      scroll: 'from-electric-500 to-cyber-pink-500',       // 滾輪問題 = 藍到粉
      troubleshooting: 'from-cyber-pink-500 to-warning-orange-500', // 故障排除 = 粉到橙
      compatibility: 'from-hacker-purple-500 to-neon-green-500',   // 相容性 = 紫到綠
      gaming: 'from-warning-orange-500 to-electric-500'    // 遊戲問題 = 橙到藍
    }
    
    // 🔍 這個函數負責「查表」：給我一個分類，我告訴你要用什麼顏色
    return (category: FaqCategory): string => {
      // 如果找到對應顏色就用，找不到就用預設的綠到藍
      return categoryGradients[category] || categoryGradients.basic
    }
  }, [])

  // 🔄 【工作2】數據加工處理：為每個FAQ添加顏色信息
  const processedFaqs = useMemo(() => {
    // 📦 這裡我們對每個FAQ進行「包裝」
    return faqs.map(faq => ({
      ...faq,  // 保留原本的所有內容（問題、答案、分類等）
      gradient: getCategoryGradient(faq.category)  // 🎨 新增：根據分類查到的顏色
    }))
    
    // 💡 舉例轉換過程：
    // 輸入：{ question: "什麼是CPS?", category: "cps" }
    // 輸出：{ question: "什麼是CPS?", category: "cps", gradient: "from-electric-500 to-cyber-pink-500" }
    
  }, [faqs, getCategoryGradient])

  if (!faqs || faqs.length === 0) {
    return null
  }

  return (
    <>
      {/* 🔍 【工作3-1】SEO處理：交給專業的FaqSchema組件 */}
      <FaqSchema faqs={faqs} />
      {/* 
        📝 這裡傳入原始的faqs（沒有gradient），因為Google不需要知道顏色，
            只需要知道問題和答案的內容就好
      */}
      
      {/* 🎨 【工作3-2】UI顯示：交給專業的FaqDisplay組件 */}
      <FaqDisplay 
        faqs={processedFaqs}  // 📦 傳入加工過的faqs（有gradient顏色信息）
        title={title}
        description={description}
      />
      {/* 
        📝 這裡傳入processedFaqs（有gradient），因為UI需要知道每個分類要顯示什麼顏色
      */}
    </>
  )
}

export default FaqWithSeo