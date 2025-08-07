import { Metadata } from 'next'
import CpsPageContent from '@/components/features/cps/CpsPageContent'

export const metadata: Metadata = {
  title: "CPS Test - Click Speed Test Online | Mouse Test",
  description: "Test your click speed with our professional CPS (Clicks Per Second) testing tool. Measure how fast you can click with accurate timing and detailed statistics.",
  openGraph: {
    title: "CPS Test - Professional Click Speed Testing",
    description: "Measure your mouse clicking speed with our accurate CPS testing tool. Perfect for gamers and professionals.",
    url: "https://mousetest.com/cps",
  },
}

export default function CpsPage() {
  return <CpsPageContent />
}