'use client'

import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ThemeToggle = () => {
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    // Check for saved theme or default to light
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full shadow-lg glass-effect hover:scale-110 transition-all duration-300"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-yellow-500" />
      ) : (
        <Moon className="w-4 h-4 text-blue-600" />
      )}
    </Button>
  )
}

export default ThemeToggle
