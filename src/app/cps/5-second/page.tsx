import CpsTestCore from '@/components/features/cps/CpsTestCore'
import PageFaq from '@/components/shared/PageFaq'
import SimplePageLayout from '@/components/layout/SimplePageLayout'
import { cps5SecondFaqs } from '@/components/features/cps/faq'

export default function Cps5SecondPage() {
  return (
    <SimplePageLayout 
      title="5 Second CPS Test"
      subtitle=">> GOLD STANDARD MEASUREMENT <<"
      description="The gold standard for click speed measurement. Our 5-second CPS test provides the perfect balance between accuracy and consistency for reliable performance benchmarking."
    >
      <section className="mb-20">
        <CpsTestCore duration={5} />
      </section>

      <section className="mb-20">
        <PageFaq 
          faqs={cps5SecondFaqs}
          title="5-Second CPS Test FAQ - Complete Guide"
          description="Master the industry-standard 5-second CPS test. Learn why it's the gold standard, score benchmarks, and professional techniques for optimal performance."
        />
      </section>
    </SimplePageLayout>
  )
}