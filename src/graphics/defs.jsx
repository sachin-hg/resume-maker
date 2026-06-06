import React from 'react'

// ── Graphic SVG components ─────────────────────────────────────────────────────
// Each full-size graphic is rendered on the resume at a specific slot position.
// "Theme-colored" graphics use var(--th-accent) so they adapt to the active theme.

// Blobs — organic corner fills, theme-colored
const BlobTR = () => (
  <svg width="250" height="200" viewBox="0 0 250 200" fill="none">
    <path d="M250 0 L250 200 C220 198 168 190 120 170 C72 150 30 106 24 62 C18 18 48 0 92 0 Z"
      fill="var(--th-accent,#6b7280)" fillOpacity="0.09"/>
    <path d="M250 0 L250 175 C222 173 172 165 126 146 C80 127 38 86 35 44 C32 2 64 0 108 0 Z"
      fill="var(--th-accent,#6b7280)" fillOpacity="0.06"/>
    <path d="M250 0 L250 140 C224 138 178 130 136 112 C94 94 56 62 58 28 C60 -4 90 -4 130 0 Z"
      fill="var(--th-accent,#6b7280)" fillOpacity="0.04"/>
  </svg>
)
const BlobBL = () => (
  <svg width="180" height="150" viewBox="0 0 180 150" fill="none">
    <path d="M0 150 L0 0 C38 3 88 16 122 46 C156 76 172 116 168 140 C164 164 140 152 108 150 Z"
      fill="var(--th-accent,#6b7280)" fillOpacity="0.08"/>
    <path d="M0 150 L0 22 C34 25 80 38 112 66 C144 94 158 130 152 148 C146 166 124 152 94 150 Z"
      fill="var(--th-accent,#6b7280)" fillOpacity="0.05"/>
  </svg>
)

// Arcs — quarter-ring arcs, theme-colored
const ArcTR = () => (
  <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
    <path d="M0 0 A320 320 0 0 1 320 320 L320 255 A255 255 0 0 0 65 0 Z"
      fill="var(--th-accent,#6b7280)" fillOpacity="0.07"/>
    <path d="M0 0 A320 320 0 0 1 320 320 L320 295 A295 295 0 0 0 25 0 Z"
      fill="var(--th-accent,#6b7280)" fillOpacity="0.04"/>
  </svg>
)
const ArcBL = () => (
  <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
    <path d="M320 320 A320 320 0 0 0 0 0 L0 65 A255 255 0 0 1 255 320 Z"
      fill="var(--th-accent,#6b7280)" fillOpacity="0.07"/>
    <path d="M320 320 A320 320 0 0 0 0 0 L0 25 A295 295 0 0 1 295 320 Z"
      fill="var(--th-accent,#6b7280)" fillOpacity="0.04"/>
  </svg>
)

// Triangles — scattered left-pointing triangles, neutral gray
const TrianglesBR = () => (
  <svg width="260" height="240" viewBox="0 0 260 240" fill="none">
    <polygon points="170,220 255,178 255,262" fill="rgba(0,0,0,0.09)"/>
    <polygon points="130,238 215,196 215,280" fill="rgba(0,0,0,0.08)"/>
    <polygon points="90,228 175,186 175,270" fill="rgba(0,0,0,0.07)"/>
    <polygon points="190,168 260,130 260,206" fill="rgba(0,0,0,0.08)"/>
    <polygon points="152,183 232,145 232,221" fill="rgba(0,0,0,0.07)"/>
    <polygon points="114,198 196,160 196,236" fill="rgba(0,0,0,0.06)"/>
    <polygon points="210,120 260,90 260,150" fill="rgba(0,0,0,0.07)"/>
    <polygon points="178,134 240,104 240,164" fill="rgba(0,0,0,0.06)"/>
    <polygon points="146,150 208,120 208,180" fill="rgba(0,0,0,0.05)"/>
    <polygon points="228,80 260,62 260,98" fill="rgba(0,0,0,0.06)"/>
    <polygon points="200,92 238,74 238,110" fill="rgba(0,0,0,0.05)"/>
    <polygon points="172,106 210,88 210,124" fill="rgba(0,0,0,0.04)"/>
    <polygon points="242,48 260,36 260,60" fill="rgba(0,0,0,0.05)"/>
    <polygon points="218,60 244,46 244,74" fill="rgba(0,0,0,0.04)"/>
    <polygon points="194,72 222,58 222,86" fill="rgba(0,0,0,0.04)"/>
    <polygon points="170,86 198,72 198,100" fill="rgba(0,0,0,0.03)"/>
    <polygon points="252,22 260,16 260,28" fill="rgba(0,0,0,0.04)"/>
    <polygon points="232,32 246,24 246,40" fill="rgba(0,0,0,0.03)"/>
    <polygon points="210,44 224,36 224,52" fill="rgba(0,0,0,0.03)"/>
  </svg>
)

// Network — connected nodes, neutral gray
const NetworkBR = () => (
  <svg width="330" height="160" viewBox="0 0 330 160" fill="none">
    <g stroke="rgba(0,0,0,0.06)" strokeWidth="1">
      <line x1="38" y1="58" x2="108" y2="38"/>
      <line x1="108" y1="38" x2="175" y2="52"/>
      <line x1="175" y1="52" x2="248" y2="32"/>
      <line x1="248" y1="32" x2="302" y2="48"/>
      <line x1="108" y1="38" x2="128" y2="92"/>
      <line x1="175" y1="52" x2="198" y2="100"/>
      <line x1="248" y1="32" x2="268" y2="80"/>
      <line x1="38" y1="58" x2="65" y2="112"/>
      <line x1="128" y1="92" x2="198" y2="100"/>
      <line x1="198" y1="100" x2="268" y2="80"/>
      <line x1="65" y1="112" x2="128" y2="92"/>
      <line x1="302" y1="48" x2="318" y2="92"/>
      <line x1="268" y1="80" x2="318" y2="92"/>
      <line x1="38" y1="58" x2="25" y2="110"/>
      <line x1="65" y1="112" x2="42" y2="148"/>
      <line x1="128" y1="92" x2="110" y2="140"/>
    </g>
    <g fill="rgba(0,0,0,0.06)">
      <circle cx="38" cy="58" r="13"/>
      <circle cx="108" cy="38" r="17"/>
      <circle cx="175" cy="52" r="10"/>
      <circle cx="248" cy="32" r="15"/>
      <circle cx="302" cy="48" r="8"/>
      <circle cx="128" cy="92" r="9"/>
      <circle cx="198" cy="100" r="12"/>
      <circle cx="268" cy="80" r="8"/>
      <circle cx="65" cy="112" r="6"/>
      <circle cx="318" cy="92" r="6"/>
      <circle cx="25" cy="110" r="4"/>
      <circle cx="42" cy="148" r="5"/>
      <circle cx="110" cy="140" r="4"/>
    </g>
  </svg>
)

// Hexagons — outlined hex circuit shapes, neutral gray
const HexagonsBR = () => {
  const hex = (cx, cy, r, fill = 'none', stroke = 'rgba(0,0,0,0.07)') => {
    const pts = [0, 60, 120, 180, 240, 300].map(a => {
      const rad = (a * Math.PI) / 180
      return `${(cx + r * Math.cos(rad)).toFixed(1)},${(cy + r * Math.sin(rad)).toFixed(1)}`
    }).join(' ')
    return <polygon key={`${cx}-${cy}`} points={pts} fill={fill} stroke={stroke} strokeWidth="1.5"/>
  }
  return (
    <svg width="280" height="230" viewBox="0 0 280 230" fill="none">
      {hex(195, 145, 78)}
      {hex(100, 170, 55)}
      {hex(258, 82, 44)}
      {hex(148, 88, 32)}
      {/* connector dots */}
      <circle cx="195" cy="67" r="3.5" fill="rgba(0,0,0,0.07)"/>
      <circle cx="195" cy="223" r="3.5" fill="rgba(0,0,0,0.07)"/>
      <circle cx="117" cy="115" r="3" fill="rgba(0,0,0,0.07)"/>
      <circle cx="273" cy="38" r="3" fill="rgba(0,0,0,0.07)"/>
      <circle cx="148" cy="56" r="3" fill="rgba(0,0,0,0.07)"/>
      <circle cx="240" cy="126" r="3" fill="rgba(0,0,0,0.07)"/>
      <circle cx="45" cy="170" r="3" fill="rgba(0,0,0,0.07)"/>
      {/* connector lines */}
      <line x1="195" y1="67" x2="195" y2="20" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
      <line x1="148" y1="56" x2="148" y2="20" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
      <line x1="273" y1="38" x2="280" y2="38" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
      <line x1="45" y1="170" x2="0" y2="170" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
    </svg>
  )
}

// Waves — flowing sine curves, neutral gray
const WavesBR = () => (
  <svg width="310" height="150" viewBox="0 0 310 150" fill="none">
    <path d="M0 80 C40 45 80 115 120 80 C160 45 200 115 240 80 C270 55 290 70 310 65"
      stroke="rgba(0,0,0,0.08)" strokeWidth="2" fill="none"/>
    <path d="M0 100 C40 65 80 135 120 100 C160 65 200 135 240 100 C270 75 290 90 310 85"
      stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" fill="none"/>
    <path d="M0 118 C40 83 80 153 120 118 C160 83 200 153 240 118 C270 93 290 108 310 103"
      stroke="rgba(0,0,0,0.04)" strokeWidth="1" fill="none"/>
    <path d="M0 60 C40 28 80 92 120 60 C160 28 200 92 240 60 C270 38 290 52 310 48"
      stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" fill="none"/>
    <path d="M0 38 C40 10 80 66 120 38 C160 10 200 66 240 38 C270 18 290 30 310 28"
      stroke="rgba(0,0,0,0.04)" strokeWidth="1" fill="none"/>
    <path d="M0 134 C40 105 80 163 120 134 C160 105 200 163 240 134 C270 112 290 126 310 122"
      stroke="rgba(0,0,0,0.03)" strokeWidth="1" fill="none"/>
  </svg>
)

// Dots — scattered circles cloud, neutral gray
const DotsTR = () => (
  <svg width="210" height="200" viewBox="0 0 210 200" fill="rgba(0,0,0,0.07)">
    <circle cx="195" cy="12" r="9"/><circle cx="168" cy="28" r="5"/>
    <circle cx="148" cy="10" r="3.5"/><circle cx="188" cy="42" r="4.5"/>
    <circle cx="210" cy="58" r="7"/><circle cx="178" cy="62" r="10"/>
    <circle cx="154" cy="46" r="4"/><circle cx="132" cy="28" r="7.5"/>
    <circle cx="112" cy="14" r="4.5"/><circle cx="192" cy="82" r="4.5"/>
    <circle cx="210" cy="100" r="7.5"/><circle cx="180" cy="96" r="5.5"/>
    <circle cx="158" cy="80" r="9"/><circle cx="136" cy="66" r="4"/>
    <circle cx="114" cy="52" r="6"/><circle cx="92" cy="38" r="3.5"/>
    <circle cx="72" cy="22" r="4.5"/><circle cx="172" cy="122" r="5.5"/>
    <circle cx="198" cy="138" r="7"/><circle cx="210" cy="158" r="4.5"/>
    <circle cx="180" cy="150" r="3.5"/><circle cx="158" cy="136" r="8"/>
    <circle cx="134" cy="120" r="4.5"/><circle cx="112" cy="106" r="6"/>
    <circle cx="88" cy="90" r="3.5"/><circle cx="68" cy="72" r="5"/>
    <circle cx="48" cy="56" r="3"/><circle cx="185" cy="172" r="4"/>
    <circle cx="162" cy="182" r="5.5"/><circle cx="140" cy="168" r="3.5"/>
    <circle cx="118" cy="152" r="4"/><circle cx="95" cy="136" r="3"/>
    <circle cx="72" cy="118" r="4.5"/><circle cx="50" cy="100" r="3.5"/>
    <circle cx="28" cy="82" r="3"/><circle cx="210" cy="185" r="5"/>
    <circle cx="190" cy="198" r="3.5"/><circle cx="168" cy="206" r="4"/>
  </svg>
)

// Circuits — PCB-style node diagram, neutral gray
const CircuitsBL = () => (
  <svg width="230" height="210" viewBox="0 0 230 210" fill="none">
    <g stroke="rgba(0,0,0,0.065)" strokeWidth="1.5">
      <line x1="55" y1="48" x2="55" y2="200"/>
      <line x1="135" y1="28" x2="135" y2="200"/>
      <line x1="0" y1="98" x2="55" y2="98"/>
      <line x1="0" y1="148" x2="42" y2="148"/>
      <line x1="42" y1="148" x2="42" y2="200"/>
      <line x1="55" y1="72" x2="135" y2="72"/>
      <line x1="55" y1="138" x2="95" y2="138"/>
      <line x1="95" y1="138" x2="95" y2="200"/>
      <line x1="135" y1="98" x2="188" y2="98"/>
      <line x1="188" y1="98" x2="188" y2="200"/>
      <line x1="135" y1="48" x2="230" y2="48"/>
      <line x1="0" y1="68" x2="22" y2="68"/>
      <line x1="22" y1="68" x2="22" y2="200"/>
    </g>
    <circle cx="55" cy="48" r="24" stroke="rgba(0,0,0,0.065)" strokeWidth="1.5"/>
    <circle cx="135" cy="28" r="30" stroke="rgba(0,0,0,0.065)" strokeWidth="1.5"/>
    <circle cx="55" cy="98" r="5.5" fill="rgba(0,0,0,0.07)"/>
    <circle cx="55" cy="138" r="4.5" fill="rgba(0,0,0,0.07)"/>
    <circle cx="135" cy="72" r="4.5" fill="rgba(0,0,0,0.07)"/>
    <circle cx="135" cy="98" r="5.5" fill="rgba(0,0,0,0.07)"/>
    <circle cx="95" cy="138" r="4.5" fill="rgba(0,0,0,0.07)"/>
    <circle cx="188" cy="98" r="4.5" fill="rgba(0,0,0,0.07)"/>
    <circle cx="22" cy="68" r="4" fill="rgba(0,0,0,0.07)"/>
  </svg>
)

// ── Thumbnail SVGs (for the GraphicPicker grid, ~130×55 viewport) ─────────────
const ThumbBlobs = () => (
  <svg width="130" height="55" viewBox="0 0 130 55" fill="none">
    <path d="M130 0 L130 55 C112 54 88 50 68 40 C48 30 32 14 30 4 C28 -5 42 0 65 0 Z"
      fill="var(--th-accent,#6b7280)" fillOpacity="0.12"/>
    <path d="M130 0 L130 44 C114 43 92 39 74 30 C56 21 42 8 42 0 Z"
      fill="var(--th-accent,#6b7280)" fillOpacity="0.07"/>
    <path d="M0 55 L0 25 C12 26 28 32 40 42 C50 51 55 55 48 55 Z"
      fill="var(--th-accent,#6b7280)" fillOpacity="0.09"/>
  </svg>
)
const ThumbArcs = () => (
  <svg width="130" height="55" viewBox="0 0 130 55" fill="none">
    <path d="M0 0 A130 130 0 0 1 130 130 L130 110 A110 110 0 0 0 20 0 Z"
      fill="var(--th-accent,#6b7280)" fillOpacity="0.08"/>
    <path d="M0 0 A130 130 0 0 1 130 130 L130 124 A124 124 0 0 0 6 0 Z"
      fill="var(--th-accent,#6b7280)" fillOpacity="0.05"/>
  </svg>
)
const ThumbTriangles = () => (
  <svg width="130" height="55" viewBox="0 0 130 55" fill="none">
    <polygon points="75,50 118,32 118,68" fill="rgba(0,0,0,0.09)"/>
    <polygon points="52,55 95,37 95,73" fill="rgba(0,0,0,0.08)"/>
    <polygon points="92,32 124,18 124,46" fill="rgba(0,0,0,0.07)"/>
    <polygon points="72,36 106,22 106,50" fill="rgba(0,0,0,0.06)"/>
    <polygon points="104,16 128,5 128,27" fill="rgba(0,0,0,0.06)"/>
    <polygon points="88,18 114,7 114,29" fill="rgba(0,0,0,0.05)"/>
    <polygon points="115,4 130,0 130,10" fill="rgba(0,0,0,0.04)"/>
  </svg>
)
const ThumbNetwork = () => (
  <svg width="130" height="55" viewBox="0 0 130 55" fill="none">
    <g stroke="rgba(0,0,0,0.07)" strokeWidth="1">
      <line x1="18" y1="22" x2="48" y2="14"/><line x1="48" y1="14" x2="78" y2="20"/>
      <line x1="78" y1="20" x2="108" y2="10"/><line x1="108" y1="10" x2="126" y2="18"/>
      <line x1="48" y1="14" x2="55" y2="36"/><line x1="78" y1="20" x2="82" y2="40"/>
      <line x1="108" y1="10" x2="112" y2="32"/><line x1="18" y1="22" x2="22" y2="44"/>
      <line x1="55" y1="36" x2="82" y2="40"/><line x1="82" y1="40" x2="112" y2="32"/>
      <line x1="22" y1="44" x2="55" y2="36"/>
    </g>
    <g fill="rgba(0,0,0,0.07)">
      <circle cx="18" cy="22" r="6"/><circle cx="48" cy="14" r="8"/>
      <circle cx="78" cy="20" r="5"/><circle cx="108" cy="10" r="7"/>
      <circle cx="126" cy="18" r="4"/><circle cx="55" cy="36" r="4"/>
      <circle cx="82" cy="40" r="6"/><circle cx="112" cy="32" r="4"/>
      <circle cx="22" cy="44" r="3"/>
    </g>
  </svg>
)
const ThumbHexagons = () => {
  const hex = (cx, cy, r) => {
    const pts = [0,60,120,180,240,300].map(a => {
      const rad = a * Math.PI / 180
      return `${(cx + r * Math.cos(rad)).toFixed(1)},${(cy + r * Math.sin(rad)).toFixed(1)}`
    }).join(' ')
    return <polygon key={`${cx}`} points={pts} fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="1.2"/>
  }
  return (
    <svg width="130" height="55" viewBox="0 0 130 55" fill="none">
      {hex(85, 32, 30)}{hex(38, 38, 22)}{hex(118, 12, 18)}
      <circle cx="85" cy="2" r="2.5" fill="rgba(0,0,0,0.07)"/>
      <circle cx="55" cy="16" r="2" fill="rgba(0,0,0,0.07)"/>
      <circle cx="118" cy="30" r="2" fill="rgba(0,0,0,0.07)"/>
    </svg>
  )
}
const ThumbWaves = () => (
  <svg width="130" height="55" viewBox="0 0 130 55" fill="none">
    <path d="M0 30 C18 16 36 44 54 30 C72 16 90 44 108 30 C120 20 126 26 130 24"
      stroke="rgba(0,0,0,0.09)" strokeWidth="2" fill="none"/>
    <path d="M0 40 C18 26 36 54 54 40 C72 26 90 54 108 40 C120 30 126 36 130 34"
      stroke="rgba(0,0,0,0.07)" strokeWidth="1.5" fill="none"/>
    <path d="M0 18 C18 4 36 32 54 18 C72 4 90 32 108 18 C120 8 126 14 130 12"
      stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" fill="none"/>
    <path d="M0 50 C18 38 36 62 54 50 C72 38 90 62 108 50 C120 42 126 46 130 44"
      stroke="rgba(0,0,0,0.04)" strokeWidth="1" fill="none"/>
  </svg>
)
const ThumbDots = () => (
  <svg width="130" height="55" viewBox="0 0 130 55" fill="rgba(0,0,0,0.07)">
    <circle cx="120" cy="6" r="5"/><circle cx="104" cy="14" r="3"/>
    <circle cx="92" cy="4" r="2"/><circle cx="116" cy="22" r="3"/>
    <circle cx="128" cy="32" r="4.5"/><circle cx="112" cy="30" r="6"/>
    <circle cx="95" cy="20" r="2.5"/><circle cx="80" cy="8" r="4.5"/>
    <circle cx="120" cy="44" r="3.5"/><circle cx="98" cy="44" r="5.5"/>
    <circle cx="80" cy="36" r="2.5"/><circle cx="65" cy="22" r="4"/>
    <circle cx="50" cy="10" r="2.5"/><circle cx="108" cy="54" r="3"/>
    <circle cx="88" cy="54" r="4"/><circle cx="68" cy="48" r="3"/>
    <circle cx="50" cy="36" r="5"/><circle cx="32" cy="24" r="2.5"/>
    <circle cx="18" cy="12" r="3"/><circle cx="130" cy="54" r="2.5"/>
  </svg>
)
const ThumbCircuits = () => (
  <svg width="130" height="55" viewBox="0 0 130 55" fill="none">
    <g stroke="rgba(0,0,0,0.07)" strokeWidth="1.2">
      <line x1="28" y1="14" x2="28" y2="55"/>
      <line x1="65" y1="8" x2="65" y2="55"/>
      <line x1="0" y1="32" x2="28" y2="32"/>
      <line x1="28" y1="22" x2="65" y2="22"/>
      <line x1="65" y1="32" x2="100" y2="32"/>
      <line x1="100" y1="32" x2="100" y2="55"/>
      <line x1="65" y1="12" x2="130" y2="12"/>
      <line x1="0" y1="46" x2="18" y2="46"/>
      <line x1="18" y1="46" x2="18" y2="55"/>
    </g>
    <circle cx="28" cy="14" r="12" stroke="rgba(0,0,0,0.07)" strokeWidth="1.2"/>
    <circle cx="65" cy="8" r="16" stroke="rgba(0,0,0,0.07)" strokeWidth="1.2"/>
    <circle cx="28" cy="32" r="3" fill="rgba(0,0,0,0.07)"/>
    <circle cx="65" cy="22" r="3" fill="rgba(0,0,0,0.07)"/>
    <circle cx="65" cy="32" r="3.5" fill="rgba(0,0,0,0.07)"/>
    <circle cx="100" cy="32" r="3" fill="rgba(0,0,0,0.07)"/>
    <circle cx="18" cy="46" r="2.5" fill="rgba(0,0,0,0.07)"/>
  </svg>
)

// ── GRAPHIC_DEFS ───────────────────────────────────────────────────────────────
// placements: each { slot, render } where slot is one of:
//   'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'bottom-center'

export const GRAPHIC_DEFS = [
  {
    id: 'none',
    name: 'None',
    placements: [],
    thumbnail: (
      <svg width="130" height="55" viewBox="0 0 130 55">
        <rect width="130" height="55" fill="#fff"/>
        <line x1="10" y1="10" x2="120" y2="45" stroke="#e0e0e0" strokeWidth="1.5"/>
        <line x1="120" y1="10" x2="10" y2="45" stroke="#e0e0e0" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: 'blobs',
    name: 'Blobs',
    placements: [
      { slot: 'top-right', render: () => <BlobTR/> },
      { slot: 'bottom-left', render: () => <BlobBL/> },
    ],
    thumbnail: <ThumbBlobs/>,
  },
  {
    id: 'arcs',
    name: 'Arcs',
    placements: [
      { slot: 'top-right', render: () => <ArcTR/> },
      { slot: 'bottom-left', render: () => <ArcBL/> },
    ],
    thumbnail: <ThumbArcs/>,
  },
  {
    id: 'triangles',
    name: 'Triangles',
    placements: [
      { slot: 'bottom-right', render: () => <TrianglesBR/> },
    ],
    thumbnail: <ThumbTriangles/>,
  },
  {
    id: 'network',
    name: 'Network',
    placements: [
      { slot: 'bottom-right', render: () => <NetworkBR/> },
    ],
    thumbnail: <ThumbNetwork/>,
  },
  {
    id: 'hexagons',
    name: 'Hexagons',
    placements: [
      { slot: 'bottom-right', render: () => <HexagonsBR/> },
    ],
    thumbnail: <ThumbHexagons/>,
  },
  {
    id: 'waves',
    name: 'Waves',
    placements: [
      { slot: 'bottom-right', render: () => <WavesBR/> },
    ],
    thumbnail: <ThumbWaves/>,
  },
  {
    id: 'dots',
    name: 'Dots',
    placements: [
      { slot: 'top-right', render: () => <DotsTR/> },
    ],
    thumbnail: <ThumbDots/>,
  },
  {
    id: 'circuits',
    name: 'Circuits',
    placements: [
      { slot: 'bottom-left', render: () => <CircuitsBL/> },
    ],
    thumbnail: <ThumbCircuits/>,
  },
]
