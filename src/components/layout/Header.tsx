'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Mouse, ChevronDown } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  // Handle ESC key and clicks outside
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null)
        setIsMenuOpen(false)
      }
    }

    if (activeDropdown || isMenuOpen) {
      document.addEventListener('keydown', handleEscKey)
      return () => document.removeEventListener('keydown', handleEscKey)
    }
  }, [activeDropdown, isMenuOpen])

  const cpsTests = [
    { href: '/cps/1-second', label: '1 SECOND CPS' },
    { href: '/cps/5-second', label: '5 SECOND CPS' },
    { href: '/cps/10-second', label: '10 SECOND CPS' },
    { href: '/cps/100-second', label: '100 SECOND CPS' },
    { href: '/cps/mobile', label: 'MOBILE TAP TEST' },
    { href: '/cps/right-click', label: 'RIGHT CLICK TEST' },
    { href: '/cps/spacebar', label: 'SPACEBAR TEST' }
  ]

  const gamingTests = [
    { href: '/gaming/jitter-click', label: 'JITTER CLICK' },
    { href: '/gaming/butterfly-click', label: 'BUTTERFLY CLICK' },
    { href: '/gaming/minecraft-cps', label: 'MINECRAFT CPS' }
  ]

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b-2 border-neon-green-500/50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group hover:scale-105 transition-transform duration-300"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-neon-green-500 to-electric-500 rounded-lg flex items-center justify-center border-2 border-neon-green-400 group-hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] transition-all duration-300">
              <Mouse className="w-6 h-6 text-black" />
            </div>
            <div className="font-mono">
              <div className="text-2xl font-black text-neon-green-400 group-hover:text-neon-green-300 transition-colors">
                MOUSE TEST
              </div>
              <div className="text-xs text-electric-400 font-normal">
                &gt;&gt; HARDWARE DIAGNOSTICS &lt;&lt;
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* CPS Tests Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => toggleDropdown('cps')}
                className="flex items-center space-x-2 font-mono font-bold text-electric-400 hover:text-neon-green-400 transition-colors duration-300"
              >
                <span>CPS TESTS</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'cps' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === 'cps' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-black/95 border-2 border-electric-500/50 rounded-lg backdrop-blur-sm shadow-[0_0_20px_rgba(0,191,255,0.3)] z-50">
                  {cpsTests.map((test) => (
                    <Link
                      key={test.href}
                      href={test.href}
                      className="block px-4 py-3 font-mono text-sm text-electric-300 hover:text-neon-green-400 hover:bg-electric-500/10 transition-colors duration-300 border-b border-electric-500/20 last:border-b-0"
                      onClick={() => setActiveDropdown(null)}
                    >
                      &gt; {test.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Single Page Links */}
            <Link 
              href="/button-test" 
              className="font-mono font-bold text-electric-400 hover:text-cyber-pink-400 transition-colors duration-300"
            >
              BUTTON TEST
            </Link>
            
            <Link 
              href="/double-click-test" 
              className="font-mono font-bold text-electric-400 hover:text-cyber-pink-400 transition-colors duration-300"
            >
              DOUBLE CLICK
            </Link>
            
            <Link 
              href="/scroll-test" 
              className="font-mono font-bold text-electric-400 hover:text-warning-orange-400 transition-colors duration-300"
            >
              SCROLL TEST
            </Link>

            {/* Gaming Tests Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => toggleDropdown('gaming')}
                className="flex items-center space-x-2 font-mono font-bold text-electric-400 hover:text-hacker-purple-400 transition-colors duration-300"
              >
                <span>GAMING</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'gaming' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === 'gaming' && (
                <div className="absolute top-full right-0 mt-2 w-52 bg-black/95 border-2 border-hacker-purple-500/50 rounded-lg backdrop-blur-sm shadow-[0_0_20px_rgba(138,43,226,0.3)] z-50">
                  {gamingTests.map((test) => (
                    <Link
                      key={test.href}
                      href={test.href}
                      className="block px-4 py-3 font-mono text-sm text-hacker-purple-300 hover:text-cyber-pink-400 hover:bg-hacker-purple-500/10 transition-colors duration-300 border-b border-hacker-purple-500/20 last:border-b-0"
                      onClick={() => setActiveDropdown(null)}
                    >
                      &gt; {test.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="lg:hidden p-2 text-neon-green-400 hover:text-neon-green-300 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t-2 border-neon-green-500/30 bg-black/90 rounded-lg">
            <div className="space-y-4">
              {/* CPS Tests Section */}
              <div>
                <div className="font-mono font-bold text-electric-400 mb-3 px-2">
                  &gt;&gt; CPS TESTS
                </div>
                <div className="space-y-2">
                  {cpsTests.map((test) => (
                    <Link
                      key={test.href}
                      href={test.href}
                      className="block px-4 py-2 font-mono text-sm text-electric-300 hover:text-neon-green-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {test.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other Tests */}
              <div className="space-y-2 border-t border-electric-500/20 pt-4">
                <Link 
                  href="/button-test" 
                  className="block px-2 py-2 font-mono font-bold text-electric-400 hover:text-cyber-pink-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  BUTTON TEST
                </Link>
                <Link 
                  href="/double-click-test" 
                  className="block px-2 py-2 font-mono font-bold text-electric-400 hover:text-cyber-pink-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  DOUBLE CLICK
                </Link>
                <Link 
                  href="/scroll-test" 
                  className="block px-2 py-2 font-mono font-bold text-electric-400 hover:text-warning-orange-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SCROLL TEST
                </Link>
              </div>

              {/* Gaming Tests Section */}
              <div className="border-t border-hacker-purple-500/20 pt-4">
                <div className="font-mono font-bold text-hacker-purple-400 mb-3 px-2">
                  &gt;&gt; GAMING TESTS
                </div>
                <div className="space-y-2">
                  {gamingTests.map((test) => (
                    <Link
                      key={test.href}
                      href={test.href}
                      className="block px-4 py-2 font-mono text-sm text-hacker-purple-300 hover:text-cyber-pink-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {test.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* 🎯 點擊外部關閉下拉菜單 */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setActiveDropdown(null)}
        />
      )}
      {/* 🎯 點擊外部關閉手機菜單 */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  )
}

export default Header