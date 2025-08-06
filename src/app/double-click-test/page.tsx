import { Metadata } from 'next'
import SimplePageLayout from '@/components/layout/SimplePageLayout'
import DoubleClickTestCore from '@/components/features/double-click/DoubleClickTestCore'
import PageFaq from '@/components/shared/PageFaq'
import type { FaqItem } from '@/types'
import { links, phrases } from '@/lib/seo-helpers'

export const metadata: Metadata = {
  title: 'Double Click Test - Mouse Double-Click Speed & Accuracy Test Online',
  description: 'Professional double-click test tool for measuring mouse double-click speed, accuracy, and consistency. Test your mouse buttons for gaming and productivity. Free online double-click diagnostic.',
  keywords: 'double click test, mouse double click, click speed test, mouse test, double click speed, gaming mouse test, mouse diagnostics, hardware test',
  openGraph: {
    title: 'Double Click Test - Professional Mouse Double-Click Diagnostic',
    description: 'Test your mouse double-click performance with our professional diagnostic tool. Measure speed, accuracy, and consistency for gaming and productivity.',
    type: 'website',
    url: 'https://mousetest.com/double-click-test',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Double Click Test - Mouse Double-Click Speed & Accuracy',
    description: 'Professional double-click test tool for measuring mouse performance. Test your gaming mouse double-click speed and consistency online.',
  },
  alternates: {
    canonical: 'https://mousetest.com/double-click-test'
  }
}

// Double Click Test FAQ - comprehensive guide with rich content
const doubleClickFaqs: FaqItem[] = [
  {
    question: "What is a Double Click Test and How Does It Work?",
    answer: `A ${phrases.doubleClick} test measures your mouse's ability to register rapid consecutive clicks accurately and consistently. Our ${links.doubleClick} evaluates double-click timing, consistency, and failure detection. The test measures intervals between clicks in milliseconds, identifies valid double-clicks (≤500ms), and calculates consistency scores. This diagnostic is essential for detecting ${phrases.doubleClick} malfunctions, optimizing settings for productivity software, and ensuring reliable performance in gaming and professional applications. Modern mice should achieve consistent 200-300ms double-click intervals.`,
    category: "basic"
  },
  {
    question: "How to Fix Double Click Issues - Complete Troubleshooting Guide",
    answer: `Common ${phrases.doubleClick} problems and solutions: 1) **Adjust system settings** - Increase double-click speed in Control Panel/System Preferences, 2) **Clean mouse switches** - Use compressed air to remove debris from button mechanisms, 3) **Update drivers** - Download latest mouse drivers from manufacturer, 4) **Test different surfaces** - Mouse pad quality affects click registration, 5) **Check USB connection** - Try different USB ports or cables, 6) **Hardware replacement** - Worn switches (Omron, Huano) may need professional repair. Our ${links.doubleClick} helps identify whether issues are software or hardware related.`,
    category: "troubleshooting"
  },
  {
    question: "What is a Good Double Click Speed?",
    answer: `Optimal ${phrases.doubleClick} speeds vary by usage: **Office work**: 300-400ms (comfortable for most users), **Gaming**: 200-300ms (fast response for competitive play), **Professional gaming**: &lt;200ms (ultra-fast for esports), **Design work**: 250-350ms (precision over speed). Our test measures your current performance and provides benchmarks. ${phrases.gamingMouse} typically achieve faster, more consistent intervals. Consistency is more important than raw speed - aim for minimal variation between double-clicks. Practice and proper finger positioning can improve both speed and accuracy.`,
    category: "performance"
  },
  {
    question: "Double Click Test for Gaming - Optimize Your Setup",
    answer: `${phrases.gamingMouse} double-click optimization for competitive gaming: Test your mouse with our ${links.doubleClick} to identify optimal settings. Key metrics: **Speed**: Sub-200ms for competitive advantage, **Consistency**: &lt;5% variation between clicks, **Accuracy**: 95%+ success rate, **Endurance**: Maintain performance over extended sessions. Popular ${phrases.gamingMouse} (Logitech G Pro, Razer DeathAdder, SteelSeries Rival) excel in double-click performance. Combine with ${links.cpsMain} training for overall clicking improvement. Consider mouse pad, grip style, and finger positioning for optimal results.`,
    category: "gaming"
  },
  {
    question: "Understanding Double Click Timing and Intervals",
    answer: `${phrases.doubleClick} timing science: **System threshold**: Most systems register double-clicks within 500ms window, **Optimal range**: 200-300ms for balance of speed and accuracy, **Minimum threshold**: ~50ms to prevent accidental double-clicks, **Maximum usability**: 400ms for comfortable everyday use. Our test measures precise intervals and calculates consistency scores. Factors affecting timing: mouse switch quality, system settings, finger technique, and surface friction. ${phrases.gamingMouse} with premium switches (Omron D2FC-F-K, Huano Blue Shell) provide more consistent timing.`,
    category: "accuracy"
  },
  {
    question: "How to Improve Double Click Consistency",
    answer: `Techniques to improve ${phrases.doubleClick} consistency: 1) **Proper finger positioning** - Use fingertip, not knuckle pressure, 2) **Consistent force** - Apply same pressure for each click, 3) **Practice rhythm** - Develop muscle memory with regular training, 4) **Optimize setup** - Adjust chair height, mouse position, and grip, 5) **Use quality hardware** - ${phrases.gamingMouse} with premium switches, 6) **Regular maintenance** - Keep mouse clean and updated. Our ${links.doubleClick} tracks improvement over time. Combine with ${links.cpsMain} for comprehensive clicking skills development.`,
    category: "accuracy"
  },
  {
    question: "Double Click Hardware vs Software Issues",
    answer: `Identifying ${phrases.doubleClick} problem sources: **Hardware issues**: Worn switches cause erratic timing, stuck buttons register multiple clicks, debris affects button travel, aging components lose consistency. **Software issues**: Incorrect double-click speed settings, driver conflicts, system lag, background processes. Use our ${links.doubleClick} to diagnose: consistent poor performance suggests settings/software issues, random failures indicate hardware problems. ${phrases.gamingMouse} with replaceable switches offer better long-term reliability. Test on different computers to isolate hardware vs system issues.`,
    category: "troubleshooting"
  },
  {
    question: "Professional Applications of Double Click Testing",
    answer: `${phrases.doubleClick} testing in professional environments: **Quality assurance** - Hardware manufacturers test mouse reliability, **Productivity optimization** - Office environments optimize user comfort, **Gaming tournaments** - Equipment verification for competitive integrity, **Accessibility** - Customize for users with motor difficulties, **Research** - Human-computer interaction studies. Our ${links.doubleClick} provides laboratory-grade measurements suitable for professional analysis. Combine with ${links.button} for comprehensive mouse diagnostics.`,
    category: "basic"
  }
]

export default function DoubleClickTestPage() {
  return (
    <SimplePageLayout
      title="DOUBLE CLICK TEST"
      subtitle=">> MOUSE PRECISION DIAGNOSTIC <<"
      description="Professional double-click testing for speed, accuracy, and consistency measurement"
    >
      {/* Main Test Component */}
      <section className="mb-20">
        <DoubleClickTestCore
          duration={30}
          title="DOUBLE CLICK TEST"
          description=">> 30 Second Double-Click Precision Diagnostic <<"
        />
      </section>

      {/* FAQ Section */}
      <section className="mb-20">
        <PageFaq 
          faqs={doubleClickFaqs}
          title="Double Click Test FAQ - Expert Guide"
          description="Master double-click testing with our comprehensive guide. Learn about timing, consistency, troubleshooting, and optimization for gaming and productivity."
        />
      </section>
    </SimplePageLayout>
  )
}