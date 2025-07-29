import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const MouseTestFAQ = () => {
  const faqs = [
    {
      question: "What is a Mouse Test?",
      answer: "A mouse test is a comprehensive evaluation tool that checks various aspects of your computer mouse functionality, including button responsiveness, click speed (CPS), DPI accuracy, and overall performance. It helps identify hardware issues and optimize your mouse settings for better productivity or gaming."
    },
    {
      question: "How to Test Mouse Buttons?",
      answer: "To test mouse buttons, simply click on the visual mouse diagram above. Each button (left, right, middle, back, forward) will light up green when pressed and display a click counter. This helps verify that all buttons are working correctly and responding to your inputs."
    },
    {
      question: "What is CPS Test?",
      answer: "CPS (Clicks Per Second) test measures how fast you can click your mouse button in a given time period. It's commonly used by gamers to improve their clicking speed for competitive gaming, especially in games like Minecraft PvP, osu!, and other click-intensive games."
    },
    {
      question: "How to Check Mouse DPI?",
      answer: "Mouse DPI (Dots Per Inch) determines cursor sensitivity and movement precision. You can check your mouse DPI using our DPI test tool, which measures how far your cursor moves on screen relative to physical mouse movement. Higher DPI means faster cursor movement."
    },
    {
      question: "What is Mouse Hz Test?",
      answer: "Mouse Hz (Hertz) test, also known as polling rate test, measures how often your mouse reports its position to your computer per second. Common polling rates are 125Hz, 500Hz, and 1000Hz. Higher Hz rates provide smoother cursor movement and better responsiveness."
    },
    {
      question: "How to Test Mouse Accuracy?",
      answer: "Mouse accuracy testing involves checking cursor precision, tracking consistency, and sensor performance. Our accuracy test evaluates how well your mouse tracks movement, detects lifting, and maintains precision across different speeds and surfaces."
    },
    {
      question: "What is Double Click Test?",
      answer: "Double click test verifies that your mouse can register two quick consecutive clicks as a double-click action. This is important for file operations, text selection, and general computer usage. Issues with double-clicking can indicate hardware wear or incorrect timing settings."
    },
    {
      question: "How to Test Mouse Scroll Wheel?",
      answer: "Mouse scroll wheel testing checks if your scroll wheel responds correctly to both vertical scrolling and middle-click functionality. Our scroll test detects wheel movement direction, click responsiveness, and smooth scrolling performance."
    },
    {
      question: "Why Use Online Mouse Testing Tools?",
      answer: "Online mouse testing tools provide immediate, comprehensive diagnostics without requiring software installation. They offer standardized testing environments, detailed results, and help troubleshoot mouse issues quickly. Perfect for gamers, professionals, and anyone experiencing mouse problems."
    },
    {
      question: "What Mouse Problems Can Be Detected?",
      answer: "Common mouse issues that can be detected include: unresponsive buttons, erratic cursor movement, scroll wheel malfunctions, double-click failures, DPI inconsistencies, polling rate problems, and tracking accuracy issues. Early detection helps prevent productivity loss."
    }
  ]

  return (
    <section className="w-full max-w-4xl mx-auto mt-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions About Mouse Testing</h2>
        <p className="text-muted-foreground">
          Everything you need to know about mouse testing, CPS tests, DPI analysis, and mouse performance optimization.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {faqs.map((faq, index) => (
          <Card key={index} className="h-full">
            <CardHeader>
              <CardTitle className="text-lg leading-tight">{faq.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">
                {faq.answer}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default MouseTestFAQ
