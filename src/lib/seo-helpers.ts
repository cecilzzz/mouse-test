/**
 * SEO Helper Functions
 * 
 * Simple utilities for creating consistent internal links in FAQ content.
 * These helpers ensure link consistency and make it easier to write FAQ content.
 */

// Helper function to create internal links with consistent styling
export const createLink = (url: string, text: string, title?: string): string => {
  const titleAttr = title ? ` title="${title}"` : ''
  return `<a href="${url}" class="text-neon-green-400 hover:text-electric-400 underline font-semibold"${titleAttr}>${text}</a>`
}

// Commonly used internal links for FAQ content
export const links = {
  home: createLink('/', 'Mouse Test', 'Complete Mouse Testing Tools'),
  
  // CPS Tests
  cpsMain: createLink('/cps/', 'CPS test', 'Click Speed Test'),
  cps1s: createLink('/cps/1-second/', '1-second CPS test', '1 Second Click Speed Test'),
  cps5s: createLink('/cps/5-second/', '5-second CPS test', '5 Second Click Speed Test'),
  cps10s: createLink('/cps/10-second/', '10-second CPS test', '10 Second Click Speed Test'),
  cps100s: createLink('/cps/100-second/', '100-second CPS test', '100 Second Click Speed Test'),
  cpsRight: createLink('/cps/right-click/', 'right-click test', 'Right Click Speed Test'),
  cpsSpace: createLink('/cps/spacebar/', 'spacebar test', 'Spacebar Click Speed Test'),
  cpsMobile: createLink('/cps/mobile/', 'mobile CPS test', 'Mobile Click Speed Test'),
  
  // Performance Tests  
  dpi: createLink('/dpi-test/', 'DPI test', 'Mouse DPI Test'),
  hz: createLink('/hz-test/', 'polling rate test', 'Mouse Hz Test'),
  latency: createLink('/latency-test/', 'latency test', 'Mouse Latency Test'),
  
  // Diagnostic Tests
  button: createLink('/button-test/', 'button test', 'Mouse Button Test'),
  scroll: createLink('/scroll-test/', 'scroll test', 'Mouse Scroll Test'),
  doubleClick: createLink('/double-click-test/', 'double-click test', 'Double Click Test'),
  
  // Gaming Tests
  jitter: createLink('/gaming/jitter-click/', 'jitter click', 'Jitter Click Test'),
  butterfly: createLink('/gaming/butterfly-click/', 'butterfly click', 'Butterfly Click Test'),
  minecraft: createLink('/gaming/minecraft-cps/', 'Minecraft CPS', 'Minecraft CPS Test'),
  aim: createLink('/gaming/aim-test/', 'aim test', 'Mouse Aim Test')
}

// Helper to emphasize keywords with <strong> tags
export const strong = (text: string): string => `<strong>${text}</strong>`

// Common SEO phrases for FAQ content
export const phrases = {
  cpsTest: strong('CPS test'),
  clickSpeed: strong('click speed'),
  mouseTest: strong('mouse test'),
  dpiTest: strong('DPI test'),
  pollingRate: strong('polling rate'),
  mouseButton: strong('mouse button'),
  scrollWheel: strong('scroll wheel'),
  gamingMouse: strong('gaming mouse'),
  doubleClick: strong('double-click'),
  rightClick: strong('right-click'),
  jitterClick: strong('jitter clicking'),
  butterflyClick: strong('butterfly clicking')
}