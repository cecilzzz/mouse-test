const Footer = () => {
  return (
    <footer className="border-t-2 border-neon-green-500/30 bg-black/90">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-sm space-y-3">
          <p className="font-mono font-bold text-electric-400">
            {'>> MOUSE TEST © 2025 - GAMING HARDWARE DIAGNOSTICS <<'}
          </p>
          <p className="text-muted-foreground font-mono">
            Professional testing for{' '}
            <span className="text-neon-green-400">CPS</span> |{' '}
            <span className="text-electric-400">DPI</span> |{' '}
            <span className="text-cyber-pink-400">BUTTONS</span> |{' '}
            <span className="text-warning-orange-400">ACCURACY</span> |{' '}
            <span className="text-hacker-purple-400">PERFORMANCE</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-xs font-mono">
            <span className="text-neon-green-400">🎮 GAMING OPTIMIZED</span>
            <span className="text-electric-400">⚡ INSTANT RESULTS</span>
            <span className="text-cyber-pink-400">🎯 PRO GRADE</span>
            <span className="text-warning-orange-400">📱 MOBILE READY</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
