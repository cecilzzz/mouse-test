'use client'

import React, { Component, ReactNode } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="max-w-lg w-full border-rgb-red/50 bg-black/90">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-rgb-red to-warning-orange-500 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-black text-rgb-red font-mono">
                SYSTEM ERROR
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="glass-effect p-4 rounded-lg border border-rgb-red/30">
                <p className="text-lg font-mono text-electric-400 mb-2">
                  &gt;&gt; DIAGNOSTIC REPORT
                </p>
                <p className="text-muted-foreground">
                  An unexpected error occurred while running the mouse test. 
                  This might be due to browser compatibility or temporary issues.
                </p>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={this.handleReset}
                  className="cyber-button w-full gap-2"
                  size="lg"
                >
                  <RotateCcw className="w-4 h-4" />
                  RESTART TEST
                </Button>
                
                <Button 
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="w-full"
                >
                  RELOAD PAGE
                </Button>
              </div>

              <div className="text-xs text-muted-foreground font-mono">
                <p>Error ID: {Date.now().toString(36).toUpperCase()}</p>
                <p>If this persists, try a different browser or device.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary