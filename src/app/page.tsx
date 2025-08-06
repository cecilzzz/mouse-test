'use client'

import { useState, useCallback } from 'react'
import PageLayout from '@/components/layout/PageLayout'
import ConfigurableHeroSection from '@/components/layout/ConfigurableHeroSection'
import NavigationSection from '@/components/layout/NavigationSection'
import MouseButtonTestCore from '@/components/features/mouse-button/MouseButtonTestCore'
import type { MouseButtonStats } from '@/components/features/mouse-button/types'
import TestStatsPanel from '@/components/shared/TestStatsPanel'
import QuickActionsPanel from '@/components/shared/QuickActionsPanel'
import PageFaq from '@/components/shared/PageFaq'
import type { FaqItem } from '@/types'
import { links, phrases } from '@/lib/seo-helpers'
import { Mouse, Terminal, Target, Settings, Zap, RotateCcw } from 'lucide-react'

// Homepage FAQ - comprehensive mouse testing guide with rich content
const homepageFaqs: FaqItem[] = [
  {
    question: "What is a Mouse Test and Why Do You Need It?",
    answer: `A ${phrases.mouseTest} is a comprehensive diagnostic tool that evaluates your computer mouse's hardware functionality, performance metrics, and responsiveness. Our free online ${phrases.mouseTest} checks button responsiveness, ${phrases.clickSpeed} (${phrases.cpsTest}), DPI accuracy, ${phrases.pollingRate}, scroll wheel functionality, and tracking precision. Regular mouse testing helps identify hardware issues early, optimize settings for gaming or productivity, and ensure your mouse performs at peak efficiency. Whether you're a professional gamer, designer, or everyday computer user, mouse testing is essential for maintaining optimal computer interaction.`,
    category: "basic"
  },
  {
    question: "How to Test Mouse Buttons - Complete Guide",
    answer: `Testing ${phrases.mouseButton} is simple with our interactive mouse diagram above. Click each button (left, right, middle, back, forward) to verify functionality. The test detects button press registration, release timing, and click consistency. For thorough testing: 1) Test all buttons individually, 2) Check for stuck or unresponsive buttons, 3) Verify middle-click and side button functionality, 4) Test rapid clicking to detect hardware lag. Our ${links.button} works with all mouse types including ${phrases.gamingMouse}, wireless mice, and trackpads. Common issues detected include ${phrases.doubleClick} problems, button ghosting, and mechanical switch failures.`,
    category: "button"
  },
  {
    question: "CPS Test - How Fast Can You Click?",
    answer: `${phrases.cpsTest} measures your clicking speed and mouse responsiveness for gaming and productivity. Average CPS ranges: Casual users (2-4 CPS), Regular gamers (4-7 CPS), Pro gamers (8-12+ CPS). Our ${links.cpsMain} supports multiple time intervals with ${links.cps1s}, ${links.cps5s}, ${links.cps10s}, and longer durations for accurate measurement. Popular among Minecraft PvP players, osu! gamers, and competitive esports athletes. Tips to improve CPS: Use proper finger positioning, practice ${links.butterfly}, optimize mouse settings, and maintain consistent rhythm. Test different clicking techniques like ${links.jitter}, ${phrases.butterflyClick}, and drag clicking to find your optimal method.`,
    category: "cps"
  },
  {
    question: "How to Check Mouse DPI and Sensitivity Settings",
    answer: `${phrases.dpiTest} (Dots Per Inch) determines cursor sensitivity and movement precision across your screen. Common DPI ranges: Office work (800-1200 DPI), Gaming (1600-3200 DPI), Design work (3200+ DPI). Our ${links.dpi} measures actual DPI by tracking cursor movement relative to physical mouse movement. To optimize DPI: 1) Start with manufacturer specifications, 2) Test different DPI settings, 3) Adjust in-game sensitivity accordingly, 4) Consider your monitor resolution and desk space. High DPI isn't always better - find the sweet spot for your usage. ${phrases.gamingMouse} often feature adjustable DPI with dedicated buttons for real-time switching.`,
    category: "dpi"
  },
  {
    question: "Mouse Polling Rate (Hz) Test - Performance Optimization",
    answer: `${phrases.pollingRate} (Hz) measures how frequently your mouse reports position data to your computer. Standard rates: 125Hz (8ms delay), 500Hz (2ms delay), 1000Hz (1ms delay). Higher polling rates provide smoother cursor movement and reduced input lag, crucial for competitive gaming and precision work. Our ${links.hz} accurately measures your mouse's actual polling rate versus advertised specifications. ${phrases.gamingMouse} typically support 1000Hz, while basic mice often operate at 125Hz. Note: Higher polling rates consume more CPU resources and may cause issues with older systems. Most modern gaming requires at least 500Hz for optimal performance.`,
    category: "performance"
  },
  {
    question: "Mouse Accuracy Test - Precision and Tracking Performance",
    answer: `Mouse accuracy testing evaluates tracking precision, sensor performance, and movement consistency across different surfaces and speeds. Our ${links.aim} measures: pointer precision, tracking stability at various speeds, acceleration handling, and surface compatibility. Factors affecting accuracy: mouse pad quality, sensor type (optical vs laser), ${phrases.dpiTest} settings, and surface texture. Gaming and design work require high accuracy for precise movements. Common accuracy issues include: cursor drift, tracking skips, acceleration inconsistency, and angle snapping. Optical sensors generally provide better accuracy than laser sensors for gaming applications.`,
    category: "accuracy"
  },
  {
    question: "Double Click Test - Diagnosing Click Issues",
    answer: `${phrases.doubleClick} test verifies your mouse's ability to register rapid consecutive clicks as intended actions. This test is crucial for detecting ${phrases.doubleClick} malfunctions, where single clicks register as double clicks or double clicks fail to register. Common in aging mice where mechanical switches wear out, causing erratic behavior. Our ${links.doubleClick} measures click timing accuracy and consistency. Troubleshooting double-click issues: 1) Adjust double-click speed in system settings, 2) Clean mouse switches, 3) Update mouse drivers, 4) Consider hardware replacement if problems persist. ${phrases.gamingMouse} with high-quality switches (Omron, Huano) typically have longer lifespans.`,
    category: "button"
  },
  {
    question: "Scroll Wheel Test - Functionality and Responsiveness",
    answer: `${phrases.scrollWheel} testing verifies vertical scrolling, horizontal scrolling (if supported), and middle-click functionality. Our ${links.scroll} detects scroll direction accuracy, wheel resistance, smooth scrolling performance, and middle-button click registration. Modern mice feature different scroll types: notched scrolling (tactile feedback), smooth scrolling (infinite scroll), and hybrid modes. ${phrases.gamingMouse} often include scroll wheel customization for weapon switching and macro functions. Common scroll issues: wheel slipping, reverse scrolling, inconsistent scroll speed, and middle-click failure. Regular cleaning and proper maintenance extend scroll wheel lifespan.`,
    category: "scroll"
  },
  {
    question: "Why Use Online Mouse Testing Tools?",
    answer: `Online ${phrases.mouseTest} tools offer immediate, comprehensive diagnostics without software installation, driver updates, or system modifications. Benefits include: cross-platform compatibility, real-time results, standardized testing environment, and free accessibility. Our web-based tests work on Windows, Mac, Linux, and mobile devices. Perfect for: troubleshooting mouse issues, pre-purchase testing in stores, gaming optimization, productivity enhancement, and hardware diagnostics. Online tools provide objective measurements unaffected by system-specific settings or driver issues. Ideal for quick testing before important gaming sessions or work presentations.`,
    category: "basic"
  },
  {
    question: "Common Mouse Problems and Solutions",
    answer: `Mouse problems we can detect and help solve: 1) Unresponsive buttons - often caused by worn switches or driver issues, test with our ${links.button}, 2) Erratic cursor movement - usually surface or sensor problems, check with ${links.dpi} and ${links.latency}, 3) ${phrases.scrollWheel} malfunctions - mechanical wear or debris buildup, verify with ${links.scroll}, 4) ${phrases.doubleClick} failures - timing issues or switch degradation, diagnose with ${links.doubleClick}, 5) DPI inconsistencies - sensor or software problems, 6) Low ${phrases.pollingRate} - USB port or driver issues, measure with ${links.hz}, 7) Tracking accuracy problems - surface compatibility or sensor dust. Prevention tips: regular cleaning, proper mouse pad usage, driver updates, and avoiding liquid damage. Most issues can be resolved through software adjustments or basic maintenance.`,
    category: "troubleshooting"
  },
  {
    question: "Gaming Mouse Test - Optimize for Competitive Play",
    answer: `${phrases.gamingMouse} testing focuses on performance metrics critical for competitive gaming: ultra-low latency (sub-1ms click response), high ${phrases.pollingRate} (1000Hz+), precise tracking at high speeds, customizable DPI switching, and programmable button reliability. Our gaming-focused tests evaluate: click latency, tracking consistency during rapid movements, acceleration handling, and button durability. Popular ${phrases.gamingMouse} features: adjustable weight systems, RGB lighting, on-the-fly DPI adjustment, and gaming-specific sensors (PMW3360, Hero, TrueMove). Essential for FPS games (CS:GO, Valorant), MOBA games (League of Legends, Dota 2), and competitive gaming where milliseconds matter. Test your setup with our ${links.minecraft}, ${links.jitter}, and ${links.butterfly} tools.`,
    category: "gaming"
  },
  {
    question: "Mouse Compatibility Test - Windows, Mac, Linux",
    answer: `Mouse compatibility testing ensures your mouse works correctly across different operating systems and applications. Our tests verify: basic functionality on all major platforms, driver compatibility, advanced feature support (programmable buttons, DPI switching), and system-specific optimizations. Cross-platform considerations: Windows offers extensive ${phrases.gamingMouse} support, Mac has different acceleration curves, Linux may require additional drivers for advanced features. Universal compatibility features: plug-and-play USB support, standard HID protocols, and basic button functionality. For optimal performance, use manufacturer-provided software for advanced features and customization.`,
    category: "compatibility"
  }
]

export default function Home() {
  const [mouseStats, setMouseStats] = useState<MouseButtonStats>({
    totalClicks: 0,
    buttonCounts: { left: 0, right: 0, middle: 0, back: 0, forward: 0 },
    activeButtons: { left: false, right: false, middle: false, back: false, forward: false }
  })
  const [error, setError] = useState<string | null>(null)

  const handleMouseStatsChange = useCallback((stats: MouseButtonStats) => {
    setMouseStats(stats)
  }, [])

  const handleError = useCallback((error: string | null) => {
    setError(error)
  }, [])

  const heroConfig = {
    title: "MOUSE TEST",
    subtitle: ">> GAMING HARDWARE DIAGNOSTICS <<",
    description: "PROFESSIONAL mouse testing suite for button functionality, click speed (CPS), DPI analysis, and performance optimization",
    icon: <Mouse className="w-10 h-10 text-black" />,
    secondIcon: <Terminal className="w-10 h-10 text-white" />,
    badges: [
      { icon: Target, text: "INSTANT RESULTS", color: "neon-green" as const },
      { icon: Settings, text: "NO INSTALL", color: "electric" as const },
      { icon: Zap, text: "GAMING READY", color: "cyber-pink" as const }
    ]
  }

  const statsItems = [
    { label: "TOTAL CLICKS", value: mouseStats.totalClicks, variant: "neon-green" as const },
    { label: "LEFT", value: mouseStats.buttonCounts.left, variant: "electric" as const },
    { label: "RIGHT", value: mouseStats.buttonCounts.right, variant: "cyber-pink" as const },
    { label: "MIDDLE", value: mouseStats.buttonCounts.middle, variant: "warning-orange" as const }
  ]

  const quickActions = [
    { label: "RESET ALL", onClick: () => window.location.reload(), variant: "warning" as const, icon: RotateCcw },
    { label: "CPS TEST >", href: "/cps", variant: "cyber" as const },
    { label: "DOUBLE CLICK >", href: "/double-click-test", variant: "purple" as const }
  ]

  return (
    <PageLayout>
      {/* Hero Section */}
      <ConfigurableHeroSection config={heroConfig} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Mouse Button Test Tool */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Test Area */}
            <div className="lg:col-span-2">
              <MouseButtonTestCore
                onStatsChange={handleMouseStatsChange}
                onError={handleError}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <TestStatsPanel
                title="CLICK STATS"
                stats={statsItems}
                error={error}
                onErrorDismiss={() => setError(null)}
              />
              <QuickActionsPanel
                title="QUICK ACTIONS"
                actions={quickActions}
              />
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <NavigationSection />

        {/* FAQ Section */}
        <section className="mb-20">
          <PageFaq 
            faqs={homepageFaqs}
            title="Mouse Test FAQ - Expert Answers"
            description="Get expert answers to common mouse testing questions. Learn about CPS tests, DPI settings, button diagnostics, and troubleshooting tips."
          />
        </section>
      </main>
    </PageLayout>
  )
}
