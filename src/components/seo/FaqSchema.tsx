import React from 'react'
import Head from 'next/head'
import type { FaqItem } from '@/types'

interface FaqSchemaProps {
  faqs: FaqItem[]
}

/**
 * FaqSchema 組件 - SEO結構化數據生成器
 * 
 * 🎯 這個組件的工作很簡單：
 * 把我們的FAQ內容轉換成Google能理解的特殊格式（JSON-LD）
 * 
 * 🔍 為什麼需要這個？
 * - Google搜尋時可以直接顯示問答內容
 * - 讓網站在搜尋結果中更突出
 * - 提升SEO排名
 * 
 * 📝 工作原理：
 * 1. 接收FAQ陣列
 * 2. 轉換成Google規定的結構化數據格式
 * 3. 插入到網頁的<head>標籤裡
 * 
 * @param {FaqItem[]} faqs - FAQ問答陣列
 * @returns {JSX.Element} 包含結構化數據的Head組件
 */
const FaqSchema: React.FC<FaqSchemaProps> = ({ faqs }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2)
        }}
      />
    </Head>
  )
}

export default FaqSchema