import CpsTestCore from '@/components/features/cps/CpsTestCore'
import PageFaq from '@/components/shared/PageFaq'
import SimplePageLayout from '@/components/layout/SimplePageLayout'
import { cps1SecondFaqs } from '@/components/features/cps/faq'

export default function Cps1SecondPage() {
  return (
    <SimplePageLayout
      title="1 SECOND CPS TEST"
      subtitle=">> LIGHTNING FAST CHALLENGE <<"
      description="Test your peak click speed and instant reaction time with our lightning-fast 1-second CPS challenge. Perfect for measuring burst clicking performance and reflex speed."
    >
      <section className="mb-20">
        <CpsTestCore duration={1} />
      </section>

      <section className="mb-20">
        <PageFaq 
          faqs={cps1SecondFaqs}
          title="1-Second CPS Test FAQ - Expert Guide"
          description="Master the 1-second CPS test with our comprehensive guide. Learn advanced techniques, score benchmarks, and professional tips for peak performance."
        />
      </section>
    </SimplePageLayout>
  )
}