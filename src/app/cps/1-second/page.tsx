import CpsTest from '@/components/features/cps/CpsTest'
import PageFaq from '@/components/shared/PageFaq'
import { cps1SecondFaqs } from '@/components/features/cps/faq'

export default function Cps1SecondPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-neon-green-400 via-electric-400 to-cyber-pink-400 bg-clip-text text-transparent mb-6 font-mono">
            1 Second CPS Test
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-mono leading-relaxed">
            Test your peak click speed and instant reaction time with our lightning-fast 1-second CPS challenge. 
            Perfect for measuring burst clicking performance and reflex speed.
          </p>
        </div>
      </section>

      {/* CPS Test Tool */}
      <main className="container mx-auto px-4 py-12">
        <section className="mb-20">
          <CpsTest duration={1} />
        </section>

        {/* Page-specific FAQ */}
        <section className="mb-20">
          <PageFaq 
            faqs={cps1SecondFaqs}
            title="1-Second CPS Test FAQ - Expert Guide"
            description="Master the 1-second CPS test with our comprehensive guide. Learn advanced techniques, score benchmarks, and professional tips for peak performance."
          />
        </section>
      </main>
    </div>
  )
}