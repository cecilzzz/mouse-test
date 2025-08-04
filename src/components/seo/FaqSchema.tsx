import React from 'react'
import Head from 'next/head'
import type { FaqItem } from '@/types'

interface FaqSchemaProps {
  faqs: FaqItem[]
}

/**
 * FaqSchema Component
 * 
 * Generates JSON-LD structured data for FAQ sections to enhance SEO
 * and enable rich snippets in search results.
 * 
 * @param {FaqItem[]} faqs - Array of FAQ items to convert to structured data
 * @returns {JSX.Element} Head component with JSON-LD script
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