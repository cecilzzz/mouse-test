'use client'

import React, { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface MouseButtonState {
  left: boolean
  right: boolean
  middle: boolean
  back: boolean
  forward: boolean
}

interface ClickCount {
  left: number
  right: number
  middle: number
  back: number
  forward: number
}

const MouseButtonTest = () => {
  const [buttonStates, setButtonStates] = useState<MouseButtonState>({
    left: false,
    right: false,
    middle: false,
    back: false,
    forward: false
  })

  const [clickCounts, setClickCounts] = useState<ClickCount>({
    left: 0,
    right: 0,
    middle: 0,
    back: 0,
    forward: 0
  })

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    event.preventDefault()
    const button = event.button
    
    setButtonStates(prev => {
      const newState = { ...prev }
      switch (button) {
        case 0: newState.left = true; break
        case 1: newState.middle = true; break
        case 2: newState.right = true; break
        case 3: newState.back = true; break
        case 4: newState.forward = true; break
      }
      return newState
    })

    setClickCounts(prev => {
      const newCounts = { ...prev }
      switch (button) {
        case 0: newCounts.left++; break
        case 1: newCounts.middle++; break
        case 2: newCounts.right++; break
        case 3: newCounts.back++; break
        case 4: newCounts.forward++; break
      }
      return newCounts
    })
  }, [])

  const handleMouseUp = useCallback((event: React.MouseEvent) => {
    event.preventDefault()
    const button = event.button
    
    setButtonStates(prev => {
      const newState = { ...prev }
      switch (button) {
        case 0: newState.left = false; break
        case 1: newState.middle = false; break
        case 2: newState.right = false; break
        case 3: newState.back = false; break
        case 4: newState.forward = false; break
      }
      return newState
    })
  }, [])

  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault()
  }, [])

  const resetTest = () => {
    setButtonStates({
      left: false,
      right: false,
      middle: false,
      back: false,
      forward: false
    })
    setClickCounts({
      left: 0,
      right: 0,
      middle: 0,
      back: 0,
      forward: 0
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Mouse Button Test</CardTitle>
        <CardDescription>
          Test all your mouse buttons by clicking them. The buttons will light up when pressed.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mouse Visual */}
        <div className="flex justify-center">
          <div 
            className="relative bg-gray-200 dark:bg-gray-700 rounded-2xl p-8 cursor-pointer select-none w-64 h-80"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onContextMenu={handleContextMenu}
          >
            {/* Left Button */}
            <div 
              className={`absolute top-2 left-2 w-24 h-32 rounded-tl-2xl border-2 transition-colors ${
                buttonStates.left 
                  ? 'bg-green-500 border-green-600' 
                  : 'bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500'
              }`}
            >
              <div className="flex items-center justify-center h-full text-sm font-medium">
                Left<br/>
                <Badge variant="secondary" className="mt-1">{clickCounts.left}</Badge>
              </div>
            </div>

            {/* Right Button */}
            <div 
              className={`absolute top-2 right-2 w-24 h-32 rounded-tr-2xl border-2 transition-colors ${
                buttonStates.right 
                  ? 'bg-green-500 border-green-600' 
                  : 'bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500'
              }`}
            >
              <div className="flex items-center justify-center h-full text-sm font-medium">
                Right<br/>
                <Badge variant="secondary" className="mt-1">{clickCounts.right}</Badge>
              </div>
            </div>

            {/* Middle Button/Scroll Wheel */}
            <div 
              className={`absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-20 rounded-lg border-2 transition-colors ${
                buttonStates.middle 
                  ? 'bg-green-500 border-green-600' 
                  : 'bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500'
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full text-xs font-medium">
                <div className="text-center">Mid</div>
                <Badge variant="secondary" className="mt-1 text-xs">{clickCounts.middle}</Badge>
              </div>
            </div>

            {/* Back Button */}
            <div 
              className={`absolute bottom-16 left-2 w-16 h-12 rounded-lg border-2 transition-colors ${
                buttonStates.back 
                  ? 'bg-green-500 border-green-600' 
                  : 'bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500'
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full text-xs font-medium">
                Back
                <Badge variant="secondary" className="mt-1 text-xs">{clickCounts.back}</Badge>
              </div>
            </div>

            {/* Forward Button */}
            <div 
              className={`absolute bottom-16 right-2 w-16 h-12 rounded-lg border-2 transition-colors ${
                buttonStates.forward 
                  ? 'bg-green-500 border-green-600' 
                  : 'bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500'
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full text-xs font-medium">
                Forward
                <Badge variant="secondary" className="mt-1 text-xs">{clickCounts.forward}</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-center">
          <Button onClick={resetTest} variant="outline">
            Reset Test
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-sm text-muted-foreground text-center">
          <p>Click any mouse button to test it. The button will highlight in green when pressed.</p>
          <p className="mt-2">This test detects left click, right click, middle click (scroll wheel), and side buttons.</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default MouseButtonTest
