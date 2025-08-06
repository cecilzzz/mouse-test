'use client'

import React from 'react'
import Header from './Header'
import Footer from './Footer'

interface SimplePageLayoutProps {
  title: string
  subtitle: string
  description: string
  children: React.ReactNode
}

/**
 * SimplePageLayout Component
 * 
 * 簡化的頁面佈局組件，專為測試頁面設計。
 * 提供一致的 hero section 和內容區域結構。
 * 
 * @component
 * @example
 * ```tsx
 * <SimplePageLayout
 *   title="TEST PAGE"
 *   subtitle=">> Test Description <<"
 *   description="Page description"
 * >
 *   <TestComponent />
 * </SimplePageLayout>
 * ```
 */
const SimplePageLayout: React.FC<SimplePageLayoutProps> = ({
  title,
  subtitle,
  description,
  children
}) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-neon-green-400 via-electric-400 to-cyber-pink-400 bg-clip-text text-transparent mb-6 font-mono">
            {title}
          </h1>
          <div className="text-2xl font-bold text-electric-400 mb-4 font-mono">
            {subtitle}
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-mono leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {children}
      </main>
      
      <Footer />
    </div>
  )
}

export default SimplePageLayout