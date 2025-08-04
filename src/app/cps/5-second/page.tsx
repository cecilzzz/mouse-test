import CpsTest from '@/components/features/cps/CpsTest'
import PageFaq from '@/components/shared/PageFaq'
import { cps5SecondFaqs } from '@/components/features/cps/faq'

export default function Cps5SecondPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-neon-green-400 via-electric-400 to-cyber-pink-400 bg-clip-text text-transparent mb-6 font-mono">
            5 Second CPS Test
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-mono leading-relaxed">
            The gold standard for click speed measurement. Our 5-second CPS test provides the perfect balance 
            between accuracy and consistency for reliable performance benchmarking.
          </p>
        </div>
      </section>

      {/* CPS Test Tool */}
      <main className="container mx-auto px-4 py-12">
        <section className="mb-20">
          <CpsTest duration={5} />
        </section>

        {/* Page-specific FAQ */}
        <section className="mb-20">
          <PageFaq 
            faqs={cps5SecondFaqs}
            title="5-Second CPS Test FAQ - Complete Guide"
            description="Master the industry-standard 5-second CPS test. Learn why it's the gold standard, score benchmarks, and professional techniques for optimal performance."
          />
        </section>
      </main>
    </div>
  )
}