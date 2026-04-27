import React, { useState, useEffect, useRef, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  Menu, X, ChevronDown, Download, ArrowRight, Shield, Scale, Sparkles,
  Lock, Eye, Cpu, Coins, Layers, Github, MessageCircle,
  Send, Users, Twitter, ExternalLink, CheckCircle2, Circle,
  FileText, Calendar, Clock, Tag, ArrowLeft,
  RotateCcw, Terminal, Wallet, BookOpen, Smartphone, Globe,
  HelpCircle, TrendingUp, Pickaxe, ArrowLeftRight, Server, Search,
  Copy, Heart, AlertTriangle,
} from 'lucide-react'

import { SEED_POSTS, ROADMAP, PRIVACY_FLOW, STATS, TOKENOMICS } from './data/seed.js'
import {
  ABOUT_CONTENT, FAQ_CONTENT, PAPERS_CONTENT,
  TOOLS_CONTENT, EXCHANGES_CONTENT, POOLS_CONTENT,
} from './data/pages.js'

// ---------------------------------------------------------------------------
// Lightweight client-side router. Tracks pathname (+ hash) and exposes a
// `Link` component plus a `navigate(to)` helper. GitHub Pages serves
// dist/404.html (a copy of index.html) for unknown routes so deep links
// like /blog or /about survive a hard refresh.
// ---------------------------------------------------------------------------
function usePath() {
  const [path, setPath] = useState(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname + window.location.hash
  )
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname + window.location.hash)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  return path
}

function navigate(to) {
  if (typeof window === 'undefined' || !to) return
  const url = new URL(to, window.location.origin)
  const target = url.pathname + url.hash
  const current = window.location.pathname + window.location.hash
  if (target === current) {
    if (url.hash) {
      const el = document.querySelector(url.hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    return
  }
  window.history.pushState({}, '', target)
  window.dispatchEvent(new PopStateEvent('popstate'))
  if (url.hash) {
    requestAnimationFrame(() => {
      const el = document.querySelector(url.hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      else window.scrollTo(0, 0)
    })
  } else {
    window.scrollTo(0, 0)
  }
}

function Link({ to, children, className, onClick, ...rest }) {
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        e.preventDefault()
        if (onClick) onClick(e)
        navigate(to)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}

// ---------------------------------------------------------------------------
// Animated cryptographic node-network background (canvas)
// ---------------------------------------------------------------------------
function NodeNetwork({ density = 0.00012, intensity = 1 }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = canvas.getContext('2d')
    let raf, w, h, nodes
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -9999, y: -9999 }

    function resize() {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(28, Math.floor(w * h * density))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 0.8 + Math.random() * 1.6,
      }))
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    function onLeave() { mouse.x = -9999; mouse.y = -9999 }

    function tick() {
      ctx.clearRect(0, 0, w, h)
      // Lines
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        a.x += a.vx; a.y += a.vy
        if (a.x < 0 || a.x > w) a.vx *= -1
        if (a.y < 0 || a.y > h) a.vy *= -1
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < 140 * 140) {
            const alpha = (1 - d2 / (140 * 140)) * 0.35 * intensity
            ctx.strokeStyle = `rgba(64, 224, 208, ${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        // Mouse interaction
        const mdx = a.x - mouse.x, mdy = a.y - mouse.y
        const md2 = mdx * mdx + mdy * mdy
        if (md2 < 180 * 180) {
          const alpha = (1 - md2 / (180 * 180)) * 0.6
          ctx.strokeStyle = `rgba(10, 235, 133, ${alpha})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }
      // Nodes
      for (const n of nodes) {
        ctx.fillStyle = 'rgba(10, 235, 133, 0.9)'
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    resize()
    tick()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [density, intensity])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-hidden="true" />
}

// ---------------------------------------------------------------------------
// Reveal-on-scroll wrapper
// ---------------------------------------------------------------------------
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } },
      { threshold: 0.12 }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity .8s ease ${delay}ms, transform .8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Section eyebrow — small numbered label above each section heading
// ---------------------------------------------------------------------------
function SectionEyebrow({ num, label }) {
  return (
    <div className="flex items-end gap-5">
      <span
        className="font-display font-semibold leading-none text-white/[0.06] select-none"
        style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)', letterSpacing: '-0.04em' }}
      >
        {num}
      </span>
      <span className="pb-3 flex items-center gap-3">
        <span className="h-px w-10 bg-teal/70" />
        <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-teal">
          {label}
        </span>
      </span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Count-up number when in view
// ---------------------------------------------------------------------------
function CountUp({ value, duration = 1400 }) {
  // value can contain numeric parts mixed with text. We animate any leading number.
  const ref = useRef(null)
  const [display, setDisplay] = useState(value)
  useEffect(() => {
    const match = value.match(/^([\d.,]+)(.*)$/)
    if (!match) { setDisplay(value); return }
    const numStr = match[1].replace(/,/g, '')
    const target = parseFloat(numStr)
    if (Number.isNaN(target)) { setDisplay(value); return }
    const suffix = match[2]
    let raf, started = false, t0
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started) { started = true; raf = requestAnimationFrame(step) } },
      { threshold: 0.4 }
    )
    function step(t) {
      if (!t0) t0 = t
      const p = Math.min((t - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      const cur = target * eased
      const decimals = numStr.includes('.') ? (numStr.split('.')[1].length) : 0
      const fixed = decimals > 0 ? cur.toFixed(decimals) : Math.round(cur).toLocaleString()
      setDisplay(fixed + suffix)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    if (ref.current) io.observe(ref.current)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [value, duration])
  return <span ref={ref}>{display}</span>
}

// ---------------------------------------------------------------------------
// NAV
// ---------------------------------------------------------------------------
// NAV items support either `to` (internal route) or `href` (external link).
const NAV_GROUPS = [
  {
    label: 'Protocol',
    items: [
      { label: 'About', to: '/about' },
      { label: 'Privacy', href: 'https://docs.salvium.io/THE%20PROTOCOL/About%20Privacy/' },
      { label: 'Staking & Yield', href: 'https://docs.salvium.io/THE%20PROTOCOL/Staking%20and%20Yield/' },
      { label: 'CARROT', href: 'https://docs.salvium.io/THE%20PROJECT/carrot/' },
      { label: 'SPARC', href: 'https://docs.salvium.io/THE%20PROJECT/sparc/' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'Documentation', href: 'https://docs.salvium.io/' },
      { label: 'Papers', to: '/papers' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Knowledge Base', href: 'https://salvium.github.io/salvium_docs/' },
    ],
  },
  {
    label: 'Network',
    items: [
      { label: 'Block Explorer', href: 'https://explorer.salvium.io/' },
      { label: 'Statistics', href: 'https://explorer.salvium.tools/' },
      { label: 'Mining Pools', to: '/pools' },
      { label: 'Exchanges', to: '/exchanges' },
      { label: 'Tools', to: '/tools' },
    ],
  },
  {
    label: 'Community',
    items: [
      { label: 'Community Hub', to: '/#community' },
      { label: 'X (Twitter)', href: 'https://x.com/salvium_io' },
      { label: 'Telegram', href: 'https://t.me/salviumcommunity' },
      { label: 'Discord', href: 'https://discord.com/invite/P3rrAjkyYs' },
      { label: 'GitHub', href: 'https://github.com/salvium' },
    ],
  },
]

// Render either an internal Link or an external <a> based on item shape.
function NavLinkItem({ item, className, onClick, children }) {
  if (item.to) {
    return (
      <Link to={item.to} className={className} onClick={onClick}>
        {children}
      </Link>
    )
  }
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onClick}
    >
      {children}
    </a>
  )
}

// Salvium wordmark, paths from the official brand SVG, cropped viewBox so the
// rendered height equals the actual wordmark height (the original 1024×1024 file
// has large transparent padding which made the visible logo tiny at small sizes).
// Colors are the brand-mandated values: white wordmark + #0AEB85 dot (sacred).
function WordmarkSVG({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="80 380 870 210"
      className={className}
      role="img"
      aria-label="Salvium"
    >
      <polygon fill="#fff" points="933.27 579.09 907.81 579.09 907.81 501.7 863.89 549.94 822.43 502.64 822.43 579.09 796.98 579.09 796.98 433.9 864.24 510.65 933.27 434.84 933.27 579.09" />
      <path fill="#fff" d="M280.37,551.53h-46.73l-11.49,27h-27.39l63.58-143.41h1.53l63.58,143.41h-32.17l-10.92-27ZM271.18,528.66l-13.6-33.56-14.17,33.56h27.77Z" />
      <circle fill="#0AEB85" cx="596.32" cy="402.81" r="17.38" />
      <polygon fill="#fff" points="493.36 513.41 460.7 435.93 426.88 435.93 492.2 579.69 557.51 435.93 524.08 435.93 493.36 513.41" />
      <path fill="#fff" d="M131.46,462.89c3.43-2.46,8.25-3.69,14.46-3.69,9.19,0,20,3.43,32.42,10.29l10.68-21.55c-6.73-4.4-13.66-7.8-20.77-10.19-7.12-2.39-15.99-3.59-26.6-3.59-13.46.65-24.24,4.73-32.33,12.23-8.09,7.51-12.14,17.41-12.14,29.71,0,8.42,1.97,15.41,5.92,20.97,3.95,5.57,8.64,9.84,14.08,12.81,5.44,2.98,12.23,6.08,20.39,9.32,13.85,5.44,20.77,11.84,20.77,19.22,0,5.7-2.2,9.81-6.6,12.33-4.4,2.52-9.58,3.79-15.53,3.79-5.05,0-10.75-1.16-17.09-3.49-6.34-2.33-11.97-5.31-16.89-8.93l-12.43,21.94c7.25,5.18,15.08,9.03,23.49,11.55,8.41,2.53,16.89,3.79,25.44,3.79,10.22,0,19.03-1.85,26.41-5.53,7.38-3.69,12.98-8.67,16.79-14.95,3.82-6.28,5.73-13.11,5.73-20.48,0-8.54-1.59-15.6-4.76-21.16-3.17-5.56-7.15-9.93-11.94-13.11-4.79-3.17-10.55-5.99-17.28-8.45-8.28-3.11-14.92-6.37-19.9-9.81-4.98-3.43-7.48-7.41-7.48-11.94,0-4.92,1.71-8.61,5.15-11.07Z" />
      <polygon fill="#fff" points="370.49 435.93 342.3 435.93 342.3 579.01 437.75 579.01 437.75 551.79 370.49 551.79 370.49 435.93" />
      <path fill="#fff" d="M736.58,526.13c0,4.54-1.33,8.88-3.98,13.03-2.66,4.15-6.32,7.52-10.98,10.11-4.67,2.59-9.79,3.89-15.36,3.89-5.18,0-10.04-1.29-14.58-3.89-4.54-2.59-8.16-5.96-10.89-10.11-2.72-4.15-4.08-8.49-4.08-13.03v-90.2h-28.19v90.79c0,10.24,2.56,19.47,7.68,27.7,5.12,8.23,12.08,14.65,20.9,19.25,8.81,4.6,18.53,6.9,29.16,6.9s20.38-2.3,29.26-6.9c8.88-4.6,15.91-11.01,21.09-19.25,5.18-8.23,7.78-17.46,7.78-27.7v-90.79h-27.8v90.2Z" />
      <rect fill="#fff" x="582.2" y="435.93" width="28.19" height="143.08" />
    </svg>
  )
}

function Logo({ className = '', size = 'sm' }) {
  // size maps to actual wordmark height (no hidden padding).
  const h = size === 'xl' ? 'h-12' : size === 'lg' ? 'h-10' : size === 'md' ? 'h-9' : 'h-8'
  return (
    <Link to="/" className={`inline-flex items-center ${className}`} aria-label="Salvium home">
      <WordmarkSVG className={`${h} w-auto block select-none`} />
    </Link>
  )
}

const ASSET = {
  wordmarkWhite: '/brand/wordmark_logo/white/svg/salvium_wordmark_white_1024x1024px.svg',
  wordmarkWhitePng: '/brand/wordmark_logo/white/transparent/salvium_wordmark_white_1024x1024px_transparent.png',
  coinCircleWhite: '/brand/coin_icon/white/circular/svg/salvium_coin_circle_white_solid.svg',
  coinWhiteTransparent: '/brand/coin_icon/white/circular/svg/salvium_coin_white_transparent.svg',
  coinSquareWhite: '/brand/coin_icon/white/square/svg/salvium_coin_square_white_solid.svg',
  coinCirclePng512: '/brand/coin_icon/white/circular/solid/salvium_coin_circle_white_512x512px_solid.png',
  banner: '/brand/banner.jpg',
}

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openGroup, setOpenGroup] = useState(null)

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  // Close drawer on hash navigation (clicking an in-page link)
  function closeDrawer() { setOpen(false) }

  // Mobile drawer: which collapsible group is currently open
  const [mobileOpenGroup, setMobileOpenGroup] = useState(null)
  function toggleMobileGroup(label) {
    setMobileOpenGroup((cur) => (cur === label ? null : label))
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? 'backdrop-blur-xl bg-black/40 border-b border-teal/15' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_GROUPS.map((g) => (
            <div
              key={g.label}
              className="relative"
              onMouseEnter={() => setOpenGroup(g.label)}
              onMouseLeave={() => setOpenGroup(null)}
            >
              <button className="px-3.5 py-2 text-sm text-white/80 hover:text-white inline-flex items-center gap-1">
                {g.label}
                <ChevronDown size={14} className={`transition-transform ${openGroup === g.label ? 'rotate-180' : ''}`} />
              </button>
              {openGroup === g.label && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="nav-dropdown rounded-2xl p-2 min-w-[220px] glow-border">
                    {g.items.map((it) => (
                      <NavLinkItem
                        key={it.label}
                        item={it}
                        className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-sm text-white/85 hover:bg-teal/10 hover:text-white"
                      >
                        <span>{it.label}</span>
                        {it.to
                          ? <ArrowRight size={12} className="opacity-40" />
                          : <ExternalLink size={12} className="opacity-50" />}
                      </NavLinkItem>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link to="/blog" className="px-3.5 py-2 text-sm text-white/80 hover:text-white">Blog</Link>
          <Link to="/#roadmap" className="px-3.5 py-2 text-sm text-white/80 hover:text-white">Roadmap</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/#products"
            className="hidden lg:inline-flex btn-primary text-sm py-2 px-4 whitespace-nowrap"
          >
            <Download size={16} /> Download Wallet
          </Link>
          <button
            className="lg:hidden text-white/90 p-2 rounded-lg hover:bg-white/5"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="mobile-drawer fixed inset-0 z-[60] backdrop-blur-xl flex flex-col"
          style={{ height: '100dvh' }}
          role="dialog"
          aria-modal="true"
        >
          {/* Pinned header */}
          <div className="shrink-0 flex items-center justify-between px-5 h-16 border-b border-teal/15">
            <Logo />
            <button
              onClick={closeDrawer}
              aria-label="Close menu"
              className="p-2.5 -mr-1 rounded-lg hover:bg-white/5 text-white/90"
            >
              <X size={22} />
            </button>
          </div>

          {/* Scrollable links */}
          <nav className="flex-1 overflow-y-auto overscroll-contain px-5 pt-5 pb-6">
            {/* In-page sections — collapsible Explore */}
            <div className="mb-6">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-mute mb-2 px-1">Navigate</div>
              <div className="grid gap-1">
                {(() => {
                  const isOpen = mobileOpenGroup === '__explore__'
                  return (
                    <div
                      className={`rounded-xl border transition-colors ${
                        isOpen ? 'border-white/15 bg-white/[0.03]' : 'border-transparent'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleMobileGroup('__explore__')}
                        aria-expanded={isOpen}
                        className="w-full px-2 py-3.5 flex items-center justify-between text-left text-base text-white/90 hover:bg-white/5 rounded-xl"
                      >
                        <span>Explore</span>
                        <ChevronDown
                          size={16}
                          className={`opacity-60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="grid pb-2 px-1">
                          {[
                            { label: 'Home', to: '/' },
                            { label: 'Why Salvium', to: '/#why' },
                            { label: 'How It Works', to: '/#how' },
                            { label: 'Ecosystem', to: '/#ecosystem' },
                            { label: 'Tokenomics', to: '/#tokenomics' },
                            { label: 'Roadmap', to: '/#roadmap' },
                            { label: 'Products', to: '/#products' },
                            { label: 'Blog', to: '/blog' },
                            { label: 'Community', to: '/#community' },
                          ].map((it) => (
                            <Link
                              key={it.label}
                              to={it.to}
                              onClick={closeDrawer}
                              className="pl-4 pr-2 py-3 rounded-xl text-sm text-white/80 hover:bg-white/5 hover:text-white flex items-center justify-between"
                            >
                              <span>{it.label}</span>
                              <ArrowRight size={12} className="opacity-40" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })()}
              </div>
            </div>

            <div className="mb-6">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-mute mb-2 px-1">Categories</div>
              <div className="grid gap-1">
                {NAV_GROUPS.map((g) => {
                  const isOpen = mobileOpenGroup === g.label
                  return (
                    <div
                      key={g.label}
                      className={`rounded-xl border transition-colors ${
                        isOpen ? 'border-white/15 bg-white/[0.03]' : 'border-transparent'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleMobileGroup(g.label)}
                        aria-expanded={isOpen}
                        className="w-full px-2 py-3.5 flex items-center justify-between text-left text-base text-white/90 hover:bg-white/5 rounded-xl"
                      >
                        <span>{g.label}</span>
                        <ChevronDown
                          size={16}
                          className={`opacity-60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="grid pb-2 px-1">
                          {g.items.map((it) => (
                            <NavLinkItem
                              key={it.label}
                              item={it}
                              onClick={closeDrawer}
                              className="pl-4 pr-2 py-3 rounded-xl text-sm text-white/80 hover:bg-white/5 hover:text-white flex items-center justify-between"
                            >
                              <span>{it.label}</span>
                              {it.to
                                ? <ArrowRight size={12} className="opacity-40" />
                                : <ExternalLink size={12} className="opacity-40" />}
                            </NavLinkItem>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </nav>

          {/* Sticky CTA */}
          <div
            className="shrink-0 px-5 pt-4 border-t border-teal/15 backdrop-blur"
            style={{
              paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
              background: 'rgba(20,20,20,0.55)',
            }}
          >
            <Link
              to="/#products"
              onClick={closeDrawer}
              className="btn-primary w-full justify-center"
            >
              <Download size={16} /> Download Wallet
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

// ---------------------------------------------------------------------------
// HERO
// ---------------------------------------------------------------------------
function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] flex items-center pt-24 pb-20 overflow-hidden">
      {/* Hero backdrop: Aura-style vertical aurora beams */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Deep base — cinematic vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(130% 100% at 50% 40%, #181818 0%, #0a0a0a 75%, #050505 100%)' }} />

        {/* Aurora beam stage — multiple thin iridescent columns drifting in parallax */}
        <div className="aurora-stage" aria-hidden="true">
          <span className="beam beam-1" />
          <span className="beam beam-2" />
          <span className="beam beam-3" />
          <span className="beam beam-4" />
          <span className="beam beam-5" />
          <span className="beam beam-6" />
          <span className="beam beam-7" />
        </div>

        {/* Floating bloom orbs that drift upward like embers of light */}
        <div className="bloom-stage" aria-hidden="true">
          <span className="bloom bloom-a" />
          <span className="bloom bloom-b" />
          <span className="bloom bloom-c" />
        </div>

        {/* Center darkening to keep headline crisp */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_50%_50%,rgba(0,0,0,0.55)_0%,transparent_75%)]" />

        {/* Top + bottom fade for seamless edges */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />

        {/* Film grain for organic texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        <style>{`
          .aurora-stage {
            position: absolute;
            inset: -10% -5%;
            filter: blur(40px) saturate(140%);
            will-change: transform, filter;
            animation: hue-shift 24s linear infinite;
          }
          .beam {
            position: absolute;
            top: -20%;
            height: 140%;
            border-radius: 50%;
            mix-blend-mode: screen;
            opacity: 0.85;
            transform-origin: 50% 50%;
            will-change: transform, opacity, filter;
          }
          /* Each beam: tall narrow column with vertical iridescent gradient */
          .beam-1 {
            left: 6%;  width: 10vw; max-width: 220px;
            background: linear-gradient(180deg, transparent 0%, rgba(64,224,208,0.55) 25%, rgba(0,191,165,0.85) 50%, rgba(10,235,133,0.55) 75%, transparent 100%);
            animation: beam-drift 18s ease-in-out infinite;
          }
          .beam-2 {
            left: 18%; width: 7vw;  max-width: 160px;
            background: linear-gradient(180deg, transparent 0%, rgba(128,203,196,0.5) 30%, rgba(64,224,208,0.75) 55%, rgba(0,191,165,0.45) 80%, transparent 100%);
            animation: beam-drift 22s ease-in-out -4s infinite;
            opacity: 0.7;
          }
          .beam-3 {
            left: 32%; width: 12vw; max-width: 280px;
            background: linear-gradient(180deg, transparent 0%, rgba(10,235,133,0.4) 20%, rgba(0,191,165,0.85) 50%, rgba(64,224,208,0.5) 80%, transparent 100%);
            animation: beam-drift 26s ease-in-out -8s infinite;
          }
          .beam-4 {
            left: 47%; width: 8vw;  max-width: 180px;
            background: linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.25) 30%, rgba(64,224,208,0.85) 55%, rgba(10,235,133,0.5) 85%, transparent 100%);
            animation: beam-drift 16s ease-in-out -2s infinite;
            opacity: 0.95;
          }
          .beam-5 {
            left: 62%; width: 11vw; max-width: 250px;
            background: linear-gradient(180deg, transparent 0%, rgba(0,191,165,0.55) 25%, rgba(10,235,133,0.75) 55%, rgba(128,203,196,0.5) 80%, transparent 100%);
            animation: beam-drift 20s ease-in-out -6s infinite;
          }
          .beam-6 {
            left: 76%; width: 7vw;  max-width: 160px;
            background: linear-gradient(180deg, transparent 0%, rgba(64,224,208,0.45) 25%, rgba(0,191,165,0.7) 55%, rgba(10,235,133,0.4) 85%, transparent 100%);
            animation: beam-drift 24s ease-in-out -10s infinite;
            opacity: 0.75;
          }
          .beam-7 {
            left: 87%; width: 10vw; max-width: 220px;
            background: linear-gradient(180deg, transparent 0%, rgba(128,203,196,0.5) 25%, rgba(64,224,208,0.85) 50%, rgba(0,191,165,0.55) 80%, transparent 100%);
            animation: beam-drift 19s ease-in-out -3s infinite;
          }
          @keyframes beam-drift {
            0%,100% { transform: translateY(0) translateX(0) scaleY(1) skewX(-6deg); opacity: var(--o,0.85); filter: blur(0px); }
            25%     { transform: translateY(-3vh) translateX(1.5vw) scaleY(1.06) skewX(-3deg); opacity: 1; }
            50%     { transform: translateY(2vh) translateX(-1vw) scaleY(0.96) skewX(-8deg); opacity: 0.7; filter: blur(2px); }
            75%     { transform: translateY(-1vh) translateX(0.8vw) scaleY(1.03) skewX(-5deg); opacity: 0.95; }
          }
          @keyframes hue-shift {
            0%,100% { filter: blur(40px) saturate(140%) hue-rotate(0deg); }
            50%     { filter: blur(40px) saturate(155%) hue-rotate(-12deg); }
          }

          /* Bloom orbs */
          .bloom-stage { position: absolute; inset: 0; filter: blur(60px); }
          .bloom {
            position: absolute;
            border-radius: 50%;
            mix-blend-mode: screen;
            will-change: transform, opacity;
          }
          .bloom-a {
            left: 22%; top: 55%;
            width: 22vw; height: 22vw; max-width: 380px; max-height: 380px;
            background: radial-gradient(closest-side, rgba(255,255,255,0.25), rgba(0,191,165,0.55) 30%, transparent 75%);
            animation: bloom-float 14s ease-in-out infinite;
          }
          .bloom-b {
            left: 58%; top: 30%;
            width: 26vw; height: 26vw; max-width: 440px; max-height: 440px;
            background: radial-gradient(closest-side, rgba(255,255,255,0.2), rgba(64,224,208,0.5) 32%, transparent 75%);
            animation: bloom-float 18s ease-in-out -5s infinite reverse;
          }
          .bloom-c {
            left: 78%; top: 60%;
            width: 18vw; height: 18vw; max-width: 320px; max-height: 320px;
            background: radial-gradient(closest-side, rgba(255,255,255,0.18), rgba(10,235,133,0.45) 30%, transparent 75%);
            animation: bloom-float 16s ease-in-out -3s infinite;
          }
          @keyframes bloom-float {
            0%,100% { transform: translate(0,0) scale(1);   opacity: 0.55; }
            50%     { transform: translate(-2vw,-4vh) scale(1.12); opacity: 0.9; }
          }

          @media (prefers-reduced-motion: reduce) {
            .aurora-stage, .beam, .bloom { animation: none !important; }
          }
        `}</style>
      </div>

      <div className="relative max-w-6xl mx-auto px-5 lg:px-8 w-full text-center">
        <Reveal>
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-mute font-mono">
            The Future of Private DeFi
          </div>
        </Reveal>

        <h1
          className="hero-equation mt-3 font-display font-semibold tracking-[-0.02em] leading-[0.95]"
          style={{ fontSize: 'clamp(2rem, 7.5vw, 6rem)' }}
          aria-label="Private and Programmable equals Sovereign"
        >
          <span className="drop word"   style={{ '--d': '0.40s' }}>Private</span>
          <span className="drop op"     style={{ '--d': '0.85s' }} aria-hidden="true">&amp;</span>
          <span className="drop word"   style={{ '--d': '1.15s' }}>Programmable</span>
          <span className="drop op"     style={{ '--d': '1.75s' }} aria-hidden="true">=</span>
          <span className="drop word sovereign" style={{ '--d': '2.05s' }}>Sovereign</span>
        </h1>

        <Reveal delay={360}>
          <p className="mt-6 max-w-xl mx-auto text-sm sm:text-base text-white/65 leading-relaxed">
            The industry's first Layer 1 PoW privacy blockchain that balances enhanced privacy, regulatory compatibility, and private DeFi.
          </p>
        </Reveal>

        <Reveal delay={460}>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/about" className="btn-primary">
              Get Started <ArrowRight size={16} />
            </Link>
            <a className="btn-ghost" href="https://docs.salvium.io/" target="_blank" rel="noopener noreferrer">
              Read the Docs
            </a>
          </div>
        </Reveal>

        <Reveal delay={580}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[10px] sm:text-xs uppercase tracking-[0.22em] text-mute font-mono">
            <span className="flex items-center gap-2"><Shield size={12} className="text-teal" /> Privacy by Design</span>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-mute/40" />
            <span className="flex items-center gap-2"><Scale size={12} className="text-teal" /> Regulatory Resilience</span>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-mute/40" />
            <span className="flex items-center gap-2"><Sparkles size={12} className="text-teal" /> Privacy Meets Possibility</span>
          </div>
        </Reveal>
      </div>

    </section>
  )
}

// ---------------------------------------------------------------------------
// MARQUEE — endlessly scrolling brand phrases (Solana-style ticker)
// ---------------------------------------------------------------------------
function Marquee() {
  // Identity / themes only — no metrics (those live in the StatsBar below)
  const items = [
    'Privacy by Design',
    'MiCAR Eligible',
    'Monero-based',
    'Stealth Addresses',
    'Ring Confidential Tx',
    'CARROT Addressing',
    'SPARC Spend Proofs',
    'Refundable Transactions',
    'Selective Transparency',
    'Forward Secrecy',
    'T-CLSAG Audited',
    'Programmable Privacy',
    'Private DeFi',
    'Salvium One · Live',
  ]
  // Duplicate the list so the loop is seamless
  const loop = [...items, ...items]
  return (
    <section aria-hidden="true" className="relative py-6 border-y border-white/[0.06] overflow-hidden">
      <div className="marquee flex gap-12 whitespace-nowrap will-change-transform">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-3 text-[13px] uppercase tracking-[0.22em] text-white/55 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-neon shadow-[0_0_8px_#0AEB85]" />
            {t}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee { animation: marquee-scroll 45s linear infinite; }
        .marquee:hover { animation-play-state: paused; }
        @media (max-width: 768px) { .marquee { animation-duration: 28s; } }
        @media (prefers-reduced-motion: reduce) { .marquee { animation: none; } }
      `}</style>
    </section>
  )
}

// ---------------------------------------------------------------------------
// STATS
// ---------------------------------------------------------------------------
function StatsBar() {
  return (
    <section className="relative py-10">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="relative glass glow-border p-6 md:p-8 rounded-3xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-6 md:gap-x-4 lg:gap-x-6 divide-y md:divide-y-0 md:divide-x divide-white/5">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`text-center md:text-left ${i >= 2 ? 'pt-6 md:pt-0' : ''} md:px-4 lg:px-5 first:md:pl-0 last:md:pr-0`}
                >
                  <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-mute mb-2">
                    {s.label}
                  </div>
                  <div className="flex items-baseline justify-center md:justify-start gap-1.5 flex-wrap">
                    <span className="text-xl md:text-2xl font-display font-semibold text-white leading-none">
                      <CountUp value={s.value} />
                    </span>
                    {s.suffix && (
                      <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-mute leading-none">
                        {s.suffix}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// WHY SALVIUM
// ---------------------------------------------------------------------------
function Why() {
  const cards = [
    {
      icon: <Lock size={22} />,
      title: 'Privacy by Design',
      body:
        'Built on robust cryptographic foundations with zero-knowledge proofs for uncompromising security and confidentiality. Stealth addresses, ring signatures, and RingCT inherited from Monero, extended with CARROT and SPARC.',
    },
    {
      icon: <Scale size={22} />,
      title: 'Regulatory Resilience',
      body:
        "One of the few privacy-focused chains striving for MiCA compliance, designed to thrive where others cannot operate. Refundable transactions, view keys, and spend authority proofs make Salvium exchange-ready.",
    },
    {
      icon: <Sparkles size={22} />,
      title: 'Privacy Meets Possibility',
      body:
        'Developing private smart contract capabilities for DeFi, stablecoins, and more, all while preserving transaction confidentiality. Ethereum dApp porting middleware is on the roadmap.',
    },
  ]
  return (
    <section id="why" className="section-chapter relative py-20 md:py-36">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <SectionEyebrow num="01" label="Why Salvium" />
            <h2 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.02em] leading-[1.02]">
              Privacy, regulatory compatibility,<br />and smart contracts.
            </h2>
            <p className="mt-4 text-white/70">
              The foundation of a truly sovereign financial future, built without
              compromise on either side of the regulatory line.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-4">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <article className="s-card h-full pb-20">
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-lg bg-white/[0.03] border border-white/10 text-teal flex items-center justify-center">
                    {c.icon}
                  </div>
                  <span className="s-card-index">0{i + 1}</span>
                </div>
                <h3 className="mt-7 text-2xl font-display font-semibold text-white tracking-tight">{c.title}</h3>
                <p className="mt-3 text-white/65 leading-relaxed text-[0.95rem]">{c.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// HOW IT WORKS, privacy flow
// ---------------------------------------------------------------------------
function HowItWorks() {
  return (
    <section id="how" className="section-chapter relative py-20 md:py-36">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <SectionEyebrow num="02" label="How It Works" />
            <h2 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.02em] leading-[1.02]">
              The Salvium<br />privacy stack.
            </h2>
            <p className="mt-4 text-white/70">
              Six cryptographic primitives compose into a single end-to-end private,
              compliance-ready transaction flow.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 hidden lg:flex items-stretch gap-3">
            {PRIVACY_FLOW.map((p, i) => (
              <React.Fragment key={p.name}>
                <div className="glass glow-border rounded-2xl p-4 flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-teal">
                    <span className="font-mono text-[11px] text-teal">0{i + 1}</span>
                    <span className="text-xs uppercase tracking-[0.18em] text-mute">layer</span>
                  </div>
                  <div className="mt-2 font-semibold text-white">{p.name}</div>
                  <div className="mt-1.5 text-sm text-white/65 leading-snug">{p.desc}</div>
                </div>
                {i < PRIVACY_FLOW.length - 1 && (
                  <div className="self-center w-10 connector" />
                )}
              </React.Fragment>
            ))}
          </div>
        </Reveal>

        {/* Mobile / tablet vertical */}
        <div className="lg:hidden mt-10 grid gap-3">
          {PRIVACY_FLOW.map((p, i) => (
            <Reveal key={p.name} delay={i * 60}>
              <div className="flex items-stretch gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-teal/20 border border-teal/40 text-neon font-mono text-xs flex items-center justify-center">
                    {i + 1}
                  </div>
                  {i < PRIVACY_FLOW.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-neon/60 to-transparent my-1" />
                  )}
                </div>
                <div className="glass rounded-2xl p-4 flex-1">
                  <div className="font-semibold text-white">{p.name}</div>
                  <div className="text-sm text-white/65 mt-1">{p.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-8 text-sm text-mute">
            Read the protocol details on the docs:{' '}
            <a href="https://docs.salvium.io/THE%20PROTOCOL/About%20Privacy/" target="_blank" rel="noopener noreferrer" className="text-teal hover:text-white transition-colors">About Privacy</a>
            {' · '}
            <a href="https://docs.salvium.io/THE%20PROJECT/carrot/" target="_blank" rel="noopener noreferrer" className="text-teal hover:text-white transition-colors">CARROT</a>
            {' · '}
            <a href="https://docs.salvium.io/THE%20PROJECT/sparc/" target="_blank" rel="noopener noreferrer" className="text-teal hover:text-white transition-colors">SPARC</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// ECOSYSTEM
// ---------------------------------------------------------------------------
function Ecosystem() {
  const cards = [
    {
      icon: <Users size={20} />,
      title: 'Decentralized & Community-Driven',
      body:
        'A fair and open ecosystem where miners, stakers, and developers collectively shape the future of privacy-focused finance.',
    },
    {
      icon: <Coins size={20} />,
      title: 'Earn While Securing the Network',
      body:
        'Stake SAL tokens to strengthen the ecosystem and receive 15% of block rewards as incentive. 21,600-block (~30 day) lock period.',
    },
    {
      icon: <Layers size={20} />,
      title: 'Expanding the Private Economy',
      body:
        'From staking to comprehensive private DeFi, Salvium is evolving to support next-generation financial applications with balanced compliance and privacy.',
    },
    {
      icon: <Eye size={20} />,
      title: 'Privacy with Accountability',
      body:
        'Experience how Salvium uniquely balances user privacy with regulatory requirements through innovative cryptographic solutions.',
    },
  ]
  return (
    <section id="ecosystem" className="section-chapter relative py-20 md:py-36">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <SectionEyebrow num="03" label="Ecosystem" />
            <h2 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.02em] leading-[1.02]">
              The components powering a privacy-preserving network.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-4">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <Link to="/about" className="s-card h-full pb-20 flex gap-5 no-underline">
                <div className="w-11 h-11 shrink-0 rounded-lg bg-white/[0.03] border border-white/10 text-teal flex items-center justify-center">
                  {c.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="text-2xl font-display font-semibold text-white tracking-tight">{c.title}</h3>
                    <span className="s-card-index ml-3">0{i + 1}</span>
                  </div>
                  <p className="mt-3 text-white/65 leading-relaxed text-[0.95rem]">{c.body}</p>
                </div>
                <span className="s-card-arrow"><ArrowRight size={14} /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// TOKENOMICS
// ---------------------------------------------------------------------------
function Tokenomics() {
  return (
    <section id="tokenomics" className="section-chapter relative py-20 md:py-36">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <Reveal>
            <div>
              <SectionEyebrow num="04" label="Tokenomics" />
              <h2 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.02em] leading-[1.02]">
                Designed to reward participation.
              </h2>
              <p className="mt-4 text-white/70">
                Salvium's tokenomics reward active participation, fund ongoing innovation,
                and ensure long-term sustainability. Percentages refer to the capped
                184.4M SAL supply and exclude tail emissions, which continue beyond the
                cap to support long-term miner incentives.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link className="btn-ghost text-sm py-2 px-4" to="/papers">
                  <FileText size={14} /> Read the papers
                </Link>
                <Link className="btn-ghost text-sm py-2 px-4" to="/about">
                  <ExternalLink size={14} /> Full breakdown
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative glass glow-border rounded-3xl p-5 sm:p-7 overflow-hidden">
              <img
                src={ASSET.coinWhiteTransparent}
                alt=""
                aria-hidden="true"
                className="absolute -right-16 -bottom-16 w-72 opacity-[0.06] pointer-events-none select-none"
                draggable="false"
              />
              <div className="relative text-xs uppercase tracking-[0.18em] text-mute mb-3">Capped supply distribution</div>
              <div className="h-3 w-full rounded-full overflow-hidden flex bg-white/5">
                {TOKENOMICS.map((t) => (
                  <div
                    key={t.label}
                    style={{ width: `${t.pct}%`, background: t.color }}
                    className="h-full"
                  />
                ))}
              </div>

              <div className="mt-6 grid gap-4">
                {TOKENOMICS.map((t) => (
                  <div key={t.label} className="flex gap-4">
                    <div className="mt-1 w-3 h-3 rounded shrink-0" style={{ background: t.color }} />
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <div className="font-semibold text-white">{t.label}</div>
                        <div className="font-mono text-teal">{t.pct}%</div>
                      </div>
                      <p className="text-sm text-white/65 mt-1 leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-white/5 grid grid-cols-3 gap-3 sm:gap-4 text-sm">
                <div>
                  <div className="text-mute text-xs uppercase tracking-[0.18em]">Cap</div>
                  <div className="font-mono text-white mt-1">184.4M SAL</div>
                </div>
                <div>
                  <div className="text-mute text-xs uppercase tracking-[0.18em]">Tail emission</div>
                  <div className="font-mono text-white mt-1">Yes</div>
                </div>
                <div>
                  <div className="text-mute text-xs uppercase tracking-[0.18em]">Algo</div>
                  <div className="font-mono text-white mt-1">RandomX</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// ROADMAP
// ---------------------------------------------------------------------------
function StatusBadge({ status }) {
  const base = 'inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] font-medium font-display'
  if (status === 'completed') {
    return (
      <span className={`${base} text-teal`}>
        <span className="w-1.5 h-1.5 rounded-full bg-teal" />
        Completed
      </span>
    )
  }
  if (status === 'in-progress') {
    return (
      <span className={`${base} text-white`}>
        <span className="w-1.5 h-1.5 rounded-full bg-white" />
        In progress
      </span>
    )
  }
  return (
    <span className={`${base} text-mute`}>
      <span className="w-1.5 h-1.5 rounded-full border border-mute/60" />
      Upcoming
    </span>
  )
}

function Roadmap() {
  return (
    <section id="roadmap" className="section-chapter relative py-20 md:py-36">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <SectionEyebrow num="05" label="Roadmap" />
            <h2 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.02em] leading-[1.02]">
              Our journey to revolutionize private DeFi.
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 relative">
          <div className="grid lg:grid-cols-4 gap-5">
            {ROADMAP.map((p, i) => (
              <Reveal key={p.phase} delay={i * 110}>
                <div className="relative">
                  <div className="s-card h-full">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">{p.phase}</span>
                      <StatusBadge status={p.status} />
                    </div>
                    <h3 className="mt-4 text-xl font-display font-semibold text-white tracking-tight">{p.title}</h3>
                    <ul className="mt-5 space-y-2">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5 text-sm text-white/70 leading-relaxed">
                          <span className="mt-2 w-1 h-1 shrink-0 rounded-full bg-teal" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// BLOG — posts are built from /_posts/*.md by scripts/build-blog.mjs.
// Editing = edit the markdown file in /_posts/, commit, push. No admin UI.
// ---------------------------------------------------------------------------

// Custom renderer for links inside blog posts. Rewrites legacy salvium.io URLs
// to internal SPA routes so navigation stays client-side once the site is
// hosted at salvium.io, and forces every other external link into a new tab.
function MarkdownLink({ href = '', children, ...rest }) {
  const blogMatch = /^https?:\/\/(?:www\.)?salvium\.io\/blog\/\d{4}\/\d{2}\/\d{2}\/([^/?#]+)\/?/i.exec(href)
  if (blogMatch) {
    return <Link to={`/blog#${blogMatch[1]}`}>{children}</Link>
  }
  // Other same-origin salvium.io paths: send to home (downloads, knowledge-base, etc.).
  const sameOrigin = /^https?:\/\/(?:www\.)?salvium\.io\//i.test(href)
  if (sameOrigin) {
    return <Link to="/">{children}</Link>
  }
  // External: open in a new tab safely.
  if (/^https?:\/\//i.test(href)) {
    return <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>
  }
  // Anchors / relative paths: leave alone.
  return <a href={href} {...rest}>{children}</a>
}

const MARKDOWN_COMPONENTS = { a: MarkdownLink }

function readableTime(text) {
  const words = (text || '').trim().split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  } catch { return iso }
}

function BlogCover({ post, eager = false }) {
  const cat = (post.category || 'default').toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const knownCats = ['compliance', 'engineering', 'release', 'whitepaper', 'security', 'update']
  const palette = knownCats.includes(cat) ? `bc-${cat}` : 'bc-default'
  return (
    <div className="blog-cover">
      {post.cover ? (
        <img src={post.cover} alt={post.title} loading={eager ? 'eager' : 'lazy'} />
      ) : (
        <div className={`blog-cover-fallback ${palette}`}>
          <span className="cat-label">{post.category}</span>
        </div>
      )}
    </div>
  )
}

function BlogPreview({ posts }) {
  const latest = useMemo(
    () => [...posts].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3),
    [posts]
  )

  return (
    <section id="blog" className="section-chapter relative py-20 md:py-36">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div className="max-w-3xl">
              <SectionEyebrow num="06" label="Blog" />
              <h2 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.02em] leading-[1.02]">
                Field notes from<br />the protocol.
              </h2>
              <p className="mt-4 text-white/70">
                Releases, cryptography, compliance, and updates from the Salvium team.
              </p>
            </div>
            <Link to="/blog" className="btn-ghost text-sm py-2 px-4">
              View all posts <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {latest.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <Link to={`/blog#${p.id}`} className="s-card h-full pb-16 text-left flex flex-col w-full">
                <BlogCover post={p} />
                <div className="mt-5 flex items-center justify-between gap-3 text-[11px]">
                  <span className="font-mono uppercase tracking-[0.18em] text-teal">{p.category}</span>
                  <span className="flex items-center gap-1.5 font-mono text-mute"><Calendar size={11} /> {formatDate(p.date)}</span>
                </div>
                <h3 className="mt-3 text-lg font-display font-semibold text-white leading-snug tracking-tight">{p.title}</h3>
                <p className="mt-3 text-sm text-white/60 leading-relaxed line-clamp-4">{p.excerpt}</p>
                <div className="mt-auto pt-5 text-[11px] text-mute flex items-center gap-1.5 font-mono"><Clock size={11} /> {readableTime(p.body)}</div>
                <span className="s-card-arrow"><ArrowRight size={14} /></span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 flex justify-center">
            <Link to="/blog" className="btn-primary">
              Read the blog <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Blog({ posts }) {
  const initialId = typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : ''
  const hasInitial = initialId && posts.some((p) => p.id === initialId)
  const [view, setView] = useState(hasInitial ? { mode: 'post', id: initialId } : { mode: 'list', id: null })
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.replace(/^#/, '')
      if (id && posts.some((p) => p.id === id)) {
        setView({ mode: 'post', id })
        window.scrollTo({ top: 0, behavior: 'auto' })
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [posts])

  const [query, setQuery] = useState('')

  const categoryCounts = useMemo(() => {
    const counts = {}
    posts.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1 })
    return counts
  }, [posts])

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(posts.map((p) => p.category))).sort()],
    [posts]
  )

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = filter === 'All' ? posts : posts.filter((p) => p.category === filter)
    if (q) {
      list = list.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        (p.body || '').toLowerCase().includes(q)
      )
    }
    return [...list].sort((a, b) => (a.date < b.date ? 1 : -1))
  }, [posts, filter, query])

  const current = posts.find((p) => p.id === view.id)

  // ── Post detail view ────────────────────────────────────────────────────
  if (view.mode === 'post' && current) {
    return (
      <>
        <PageHero eyebrow="/ Blog" title={current.title} />
        <section className="relative pb-16">
          <div className="max-w-3xl mx-auto px-5 lg:px-8">
            <button
              onClick={() => { setView({ mode: 'list', id: null }); if (window.location.hash) window.history.replaceState({}, '', '/blog') }}
              className="text-sm text-teal hover:text-white transition-colors inline-flex items-center gap-1 mb-6"
            >
              <ArrowLeft size={14} /> Back to all posts
            </button>
            <div className="flex flex-wrap items-center gap-3 text-xs text-mute">
              <span className="pill !text-[10px]"><Tag size={11} /> {current.category}</span>
              <span className="flex items-center gap-1.5 font-mono"><Calendar size={12} /> {formatDate(current.date)}</span>
              <span className="flex items-center gap-1.5 font-mono"><Clock size={12} /> {readableTime(current.body)}</span>
            </div>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">{current.excerpt}</p>
            <div className="mt-8"><BlogCover post={current} eager /></div>
            <hr className="my-10 border-white/10" />
            <div className="prose-salvium max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={MARKDOWN_COMPONENTS}>{current.body}</ReactMarkdown>
            </div>
          </div>
        </section>
      </>
    )
  }

  // ── Archive (list) view ─────────────────────────────────────────────────
  return (
    <>
      <PageHero
        eyebrow="/ Blog"
        title="Salvium Journal"
        intro="Releases, cryptography, compliance, and field notes from the Salvium team."
      />

      <section id="blog" className="relative pb-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          {/* Toolbar: search + category filter */}
          <Reveal>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative flex-1 min-w-[240px]">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search posts by title, excerpt, or content…"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-full pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-teal/50 focus:bg-white/[0.05] transition-colors"
                />
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid lg:grid-cols-[220px_1fr] gap-10">
            {/* Sidebar — categories */}
            <Reveal>
              <aside className="lg:sticky lg:top-24 self-start">
                <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-teal mb-4">
                  Categories
                </div>
                <div className="flex lg:flex-col flex-wrap gap-1.5">
                  {categories.map((c) => {
                    const active = filter === c
                    const count = c === 'All' ? posts.length : (categoryCounts[c] || 0)
                    return (
                      <button
                        key={c}
                        onClick={() => setFilter(c)}
                        className={`flex items-center justify-between gap-3 px-3.5 py-2 rounded-lg text-sm border transition-colors ${
                          active
                            ? 'border-teal/40 bg-teal/10 text-white'
                            : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <span>{c}</span>
                        <span className={`font-mono text-[10px] ${active ? 'text-teal' : 'text-mute'}`}>{count}</span>
                      </button>
                    )
                  })}
                </div>
              </aside>
            </Reveal>

            {/* Posts grid */}
            <div>
              <div className="flex items-center justify-between mb-4 text-xs text-mute font-mono">
                <span>
                  {visible.length} {visible.length === 1 ? 'post' : 'posts'}
                  {filter !== 'All' && ` · ${filter}`}
                  {query && ` · "${query}"`}
                </span>
              </div>

              {visible.length === 0 ? (
                <Reveal>
                  <div className="glass rounded-2xl p-10 text-center">
                    <Search size={28} className="mx-auto text-white/30" />
                    <h3 className="mt-4 font-display text-lg font-semibold">No posts found</h3>
                    <p className="mt-2 text-sm text-white/60">Try a different search term or category.</p>
                    <button
                      onClick={() => { setQuery(''); setFilter('All') }}
                      className="mt-5 btn-ghost text-sm py-2 px-4"
                    >
                      <RotateCcw size={14} /> Reset filters
                    </button>
                  </div>
                </Reveal>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {visible.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => { setView({ mode: 'post', id: p.id }); window.history.pushState({}, '', `/blog#${p.id}`); window.scrollTo({ top: 0, behavior: 'auto' }) }}
                      className="s-card h-full pb-16 text-left flex flex-col w-full"
                    >
                      <BlogCover post={p} />
                      <div className="mt-5 flex items-center justify-between gap-3 text-[11px]">
                        <span className="font-mono uppercase tracking-[0.18em] text-teal">{p.category}</span>
                        <span className="flex items-center gap-1.5 font-mono text-mute"><Calendar size={11} /> {formatDate(p.date)}</span>
                      </div>
                      <h3 className="mt-3 text-lg font-display font-semibold text-white leading-snug tracking-tight">{p.title}</h3>
                      <p className="mt-3 text-sm text-white/60 leading-relaxed line-clamp-4">{p.excerpt}</p>
                      <div className="mt-auto pt-5 text-[11px] text-mute flex items-center gap-1.5 font-mono"><Clock size={11} /> {readableTime(p.body)}</div>
                      <span className="s-card-arrow"><ArrowRight size={14} /></span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// (admin UI removed: posts now live in /_posts/*.md — see scripts/build-blog.mjs)

// ---------------------------------------------------------------------------
// PRODUCTS — Salvium Wallet + Salvium One (qubic-style two-up)
// ---------------------------------------------------------------------------
// Filename patterns per OS, in priority order — first match wins. Listing
// multiple patterns per OS lets us gracefully fall through architectures
// (e.g. macOS Apple Silicon preferred, fallback to Intel; Linux x86_64
// preferred, fallback to aarch64). Without this, an Intel-Mac or ARM-Linux
// user would silently get the releases page instead of a working binary.
const WALLET_PATTERNS = {
  windows: [/windows-x64.*\.zip$/i, /win.*\.zip$/i],
  macos:   [/\.dmg$/i, /macos.*\.zip$/i],
  linux:   [/linux-x64.*\.zip$/i, /linux-x86_64.*\.zip$/i, /linux.*\.zip$/i],
}
const CLI_PATTERNS = {
  windows: [/win64.*\.zip$/i],
  macos:   [/macos-(aarch64|arm64).*\.zip$/i, /macos-x86_64.*\.zip$/i],
  linux:   [/linux-x86_64.*\.zip$/i, /linux-aarch64.*\.zip$/i],
}

// Fallback to the GitHub releases page if the API call fails (rate limit, offline).
const WALLET_FALLBACK = 'https://github.com/salvium/salvium-gui/releases/latest'
const CLI_FALLBACK    = 'https://github.com/salvium/salvium/releases/latest'

// A real release-asset URL looks like /<owner>/<repo>/releases/download/...
// The /releases/latest *page* URL doesn't match — useful for distinguishing
// "real binary link" from "fallback page link" when validating cached state.
function isAssetUrl(s) {
  return typeof s === 'string' &&
    /^https:\/\/github\.com\/[^/]+\/[^/]+\/releases\/download\//.test(s)
}
function allAssetUrls(links) {
  return links && typeof links === 'object' &&
    isAssetUrl(links.windows) && isAssetUrl(links.macos) && isAssetUrl(links.linux)
}

// Resolve latest-release asset URLs for a GitHub repo. Returns:
//   { status: 'loading' | 'ready' | 'error', links: { windows, macos, linux }, error }
// On any failure (rate limit, network error, malformed JSON) status='error'
// and links contain the releases-page fallback so the chips still go *somewhere*
// useful. Only successful asset URLs are cached — failures are NOT cached so
// a single rate-limit hit doesn't poison the whole session.
function useLatestRelease(owner, repo, patterns, fallback) {
  const fallbackLinks = { windows: fallback, macos: fallback, linux: fallback }
  const [state, setState] = useState({ status: 'loading', links: fallbackLinks, error: null })

  useEffect(() => {
    let alive = true
    const cacheKey = `gh-latest:${owner}/${repo}`

    // Try cache — but only trust it if every entry is a real asset URL.
    // A poisoned cache (e.g. previous session cached the fallback page URL)
    // is dropped so the next fetch can recover.
    try {
      const raw = sessionStorage.getItem(cacheKey)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (allAssetUrls(parsed)) {
          setState({ status: 'ready', links: parsed, error: null })
          return () => { alive = false }
        }
        sessionStorage.removeItem(cacheKey)
      }
    } catch (e) {
      console.warn(`[useLatestRelease ${owner}/${repo}] cache parse failed:`, e)
      try { sessionStorage.removeItem(cacheKey) } catch {}
    }

    fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then(async (r) => {
        if (!r.ok) throw new Error(`GitHub API ${r.status} ${r.statusText}`)
        const data = await r.json()
        if (!data || !Array.isArray(data.assets)) throw new Error('Malformed release JSON')
        if (!alive) return
        const next = { ...fallbackLinks }
        for (const os of Object.keys(patterns)) {
          for (const re of patterns[os]) {
            const hit = data.assets.find((a) => re.test(a.name))
            if (hit?.browser_download_url) { next[os] = hit.browser_download_url; break }
          }
        }
        setState({ status: 'ready', links: next, error: null })
        if (allAssetUrls(next)) {
          try { sessionStorage.setItem(cacheKey, JSON.stringify(next)) } catch {}
        }
      })
      .catch((err) => {
        if (!alive) return
        console.error(`[useLatestRelease ${owner}/${repo}]`, err)
        setState({ status: 'error', links: fallbackLinks, error: err.message })
      })

    return () => { alive = false }
  }, [owner, repo, fallback])

  return state
}

// Renders a row of compact platform chips. Accepts either:
//   - state={ status, links } from useLatestRelease (GUI/CLI products)
//   - items=[{ label, href }] (custom set, e.g. Android/iOS/Desktop)
// On error status, chips still link to the fallback (releases page) and a
// small inline notice tells the user GitHub couldn't be reached.
function OsChips({ state, items, releasesUrl }) {
  const list = items ?? (state ? [
    { label: 'Windows', href: state.links.windows },
    { label: 'macOS',   href: state.links.macos },
    { label: 'Linux',   href: state.links.linux },
  ] : [])
  const isError = state?.status === 'error'
  return (
    <div className="mt-4 flex flex-col items-center gap-2">
      <div className="flex flex-wrap justify-center gap-2">
        {list.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="os-chip"
            aria-label={`Download for ${label}`}
          >
            <Download size={11} />
            {label}
          </a>
        ))}
      </div>
      {isError && releasesUrl && (
        <p className="text-[10px] text-yellow-200/80 font-mono uppercase tracking-[0.18em]">
          Couldn&rsquo;t reach GitHub.{' '}
          <a href={releasesUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-100">
            Open releases
          </a>
        </p>
      )}
    </div>
  )
}

function Products() {
  const wallet = useLatestRelease('salvium', 'salvium-gui', WALLET_PATTERNS, WALLET_FALLBACK)
  const cli    = useLatestRelease('salvium', 'salvium',     CLI_PATTERNS,    CLI_FALLBACK)
  return (
    <section id="products" className="section-chapter relative py-20 md:py-36">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-teal">
              / Products
            </div>
            <h2
              className="mt-5 font-display font-semibold tracking-[-0.02em] leading-[1.02] text-white"
              style={{ fontSize: 'clamp(2.25rem, 6vw, 4.75rem)' }}
            >
              Salvium <span className="neon-text">Wallets</span>
            </h2>
            <p className="mt-5 text-white/70">
              Self-custody your SAL. Choose between the official desktop wallet and CLI
              built by the core team, or community-supported third-party wallets for
              mobile and web — every option is non-custodial.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-5">
          <Reveal>
            <div className="product-card h-full">
              <div className="px-8 pt-10 pb-6 text-center">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-mute font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon shadow-[0_0_8px_#0AEB85]" />
                  GUI Wallet
                </div>
                <h3 className="mt-4 font-display text-2xl md:text-3xl font-semibold text-white">
                  Salvium Wallet
                </h3>
                <p className="mt-3 text-white/65 max-w-md mx-auto">
                  The official desktop wallet. Manage SAL, stake, and transact privately
                  on Windows, macOS, and Linux.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a className="btn-primary no-underline" href="https://docs.salvium.io/" target="_blank" rel="noopener noreferrer">
                    <span className="icon-chip"><BookOpen size={14} /></span>
                    Read Docs
                  </a>
                  <a className="btn-ghost no-underline" href="https://github.com/salvium/salvium-gui" target="_blank" rel="noopener noreferrer">
                    <Github size={14} /> Source
                  </a>
                </div>
                <OsChips state={wallet} releasesUrl={WALLET_FALLBACK} />
              </div>
              <div className="product-visual">
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur flex items-center justify-center text-white">
                    <Wallet size={28} />
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
                    Self-custodial · Open-source
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="product-card h-full">
              <div className="px-8 pt-10 pb-6 text-center">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-mute font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon shadow-[0_0_8px_#0AEB85]" />
                  CLI &amp; Node
                </div>
                <h3 className="mt-4 font-display text-2xl md:text-3xl font-semibold text-white">
                  Salvium CLI
                </h3>
                <p className="mt-3 text-white/65 max-w-md mx-auto">
                  Run a full node, mine, or script transactions from the terminal.
                  The reference implementation for builders and power users.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a className="btn-primary no-underline" href="https://docs.salvium.io/" target="_blank" rel="noopener noreferrer">
                    <span className="icon-chip"><BookOpen size={14} /></span>
                    Read Docs
                  </a>
                  <a className="btn-ghost no-underline" href="https://github.com/salvium/salvium" target="_blank" rel="noopener noreferrer">
                    <Github size={14} /> Source
                  </a>
                </div>
                <OsChips state={cli} releasesUrl={CLI_FALLBACK} />
              </div>
              <div className="product-visual">
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur flex items-center justify-center text-white">
                    <Terminal size={28} />
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
                    salvium-wallet-cli
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="product-card h-full">
              <div className="px-8 pt-10 pb-6 text-center">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-mute font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon shadow-[0_0_8px_#0AEB85]" />
                  3rd Party · Mobile
                </div>
                <h3 className="mt-4 font-display text-2xl md:text-3xl font-semibold text-white">
                  Stack Wallet
                </h3>
                <p className="mt-3 text-white/65 max-w-md mx-auto">
                  An open-source, multi-coin mobile and desktop wallet by Cypher Stack
                  with native Salvium support.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a className="btn-primary no-underline" href="https://docs.stackwallet.com/" target="_blank" rel="noopener noreferrer">
                    <span className="icon-chip"><BookOpen size={14} /></span>
                    Read Docs
                  </a>
                  <a className="btn-ghost no-underline" href="https://github.com/cypherstack/stack_wallet" target="_blank" rel="noopener noreferrer">
                    <Github size={14} /> Source
                  </a>
                </div>
                <OsChips items={[
                  { label: 'Android', href: 'https://play.google.com/store/apps/details?id=com.cypherstack.stackwallet' },
                  { label: 'iOS',     href: 'https://apps.apple.com/us/app/stack-wallet-by-cypher-stack/id1634811534' },
                  { label: 'Desktop', href: 'https://github.com/cypherstack/stack_wallet/releases/latest' },
                ]} />
              </div>
              <div className="product-visual">
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur flex items-center justify-center text-white">
                    <Smartphone size={28} />
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
                    Cypher Stack · Multi-coin
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={360}>
            <div className="product-card h-full">
              <div className="px-8 pt-10 pb-6 text-center">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-mute font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon shadow-[0_0_8px_#0AEB85]" />
                  3rd Party · Web
                </div>
                <h3 className="mt-4 font-display text-2xl md:text-3xl font-semibold text-white">
                  Salvium Vault
                </h3>
                <p className="mt-3 text-white/65 max-w-md mx-auto">
                  A browser-based wallet for SAL. No installation — open it in any
                  modern browser and connect. Built and operated by a third party.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a className="btn-primary no-underline" href="https://vault.salvium.tools/" target="_blank" rel="noopener noreferrer">
                    <Globe size={14} /> Launch Vault
                  </a>
                </div>
                <p className="mt-5 text-[10px] uppercase tracking-[0.22em] text-mute font-mono">
                  Hosted at vault.salvium.tools
                </p>
              </div>
              <div className="product-visual">
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur flex items-center justify-center text-white">
                    <Globe size={28} />
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
                    Web wallet · 3rd party
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// COMMUNITY
// ---------------------------------------------------------------------------
function Community() {
  const socials = [
    { name: 'X (Twitter)', href: 'https://x.com/salvium_io', icon: <Twitter size={16} /> },
    { name: 'Telegram', href: 'https://t.me/salviumcommunity', icon: <Send size={16} /> },
    { name: 'Discord', href: 'https://discord.com/invite/P3rrAjkyYs', icon: <MessageCircle size={16} /> },
    { name: 'GitHub', href: 'https://github.com/salvium', icon: <Github size={16} /> },
    { name: 'Reddit', href: 'https://www.reddit.com/user/Salvium_Project/', icon: <Users size={16} /> },
  ]
  return (
    <section id="community" className="section-chapter relative py-20 md:py-36">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="feature-card px-5 sm:px-10 py-14 sm:py-20 md:py-28 text-center">
            <div className="relative max-w-3xl mx-auto">
              <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-teal">
                / Community
              </div>
              <h2 className="mt-5 font-display font-semibold tracking-[-0.02em] leading-[1.02] text-white"
                  style={{ fontSize: 'clamp(2.25rem, 6vw, 4.75rem)' }}>
                Join the private<br />DeFi revolution.
              </h2>
              <p className="mt-5 text-white/70 max-w-xl mx-auto">
                Be part of a movement reshaping money. Salvium's community is built by
                cypherpunks, builders, and users who believe privacy is a right, not a feature.
                Connect, contribute, and help shape what comes next.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary no-underline"
                  >
                    <span className="icon-chip">{s.icon}</span>
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// FOOTER
// ---------------------------------------------------------------------------
function Footer() {
  return (
    <footer className="relative pt-24 pb-10 border-t border-white/5 mt-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <a href="#top" aria-label="Salvium home" className="inline-block">
              <img
                src={ASSET.coinCircleWhite}
                alt="Salvium"
                className="h-14 w-14 block select-none"
                draggable="false"
              />
            </a>
            <p className="mt-6 text-white/65 max-w-sm">
              Salvium, a Layer 1 blockchain that balances privacy and regulations.
              Built for a sovereign, programmable private economy.
            </p>
            <p className="mt-4 font-display text-base text-teal">
              Privacy is a right, not a feature.
            </p>
          </div>

          {NAV_GROUPS.slice(0, 3).map((g) => (
            <div key={g.label}>
              <div className="text-xs uppercase tracking-[0.2em] text-mute mb-3">{g.label}</div>
              <ul className="space-y-2">
                {g.items.map((it) => (
                  <li key={it.label}>
                    <NavLinkItem
                      item={it}
                      className="text-white/75 hover:text-white transition-colors text-sm"
                    >
                      {it.label}
                    </NavLinkItem>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 text-sm text-mute">
          <span className="font-mono">© 2026 Salvium Protocol. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

// ---------------------------------------------------------------------------
// CTA strip before footer
// ---------------------------------------------------------------------------
function FinalCTA() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="relative glass-strong rounded-2xl p-6 sm:p-10 md:p-16 overflow-hidden">
            {/* Brand banner backdrop, very faint */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-15"
              style={{ backgroundImage: `url(${ASSET.banner})` }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1e1e1e] via-[#1e1e1e]/90 to-[#1e1e1e]/40" />
            <div className="relative max-w-2xl">
              <h3 className="font-display text-3xl md:text-5xl font-semibold tracking-tight">
                Ready to take the <span className="neon-text">green pill</span>?
              </h3>
              <p className="mt-4 text-white/70 text-lg">
                Start your journey with Salvium today and be part of the next
                generation of Private DeFi.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/#products" className="btn-primary">
                  <Download size={16} /> Get Started Now
                </Link>
                <Link to="/about" className="btn-ghost">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// LOCAL PAGES — About / FAQ / Papers / Tools / Exchanges / Mining Pools
// ---------------------------------------------------------------------------
function PageHero({ eyebrow, title, intro }) {
  return (
    <section className="relative pt-32 pb-10 md:pt-40 md:pb-14">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-teal">
          {eyebrow}
        </div>
        <h1
          className="mt-5 font-display font-semibold tracking-[-0.02em] leading-[1.02] text-white"
          style={{ fontSize: 'clamp(2.25rem, 6vw, 4.75rem)' }}
        >
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-white/70 text-base sm:text-lg leading-relaxed">
            {intro}
          </p>
        )}
      </div>
    </section>
  )
}

// Square icon chip used across all sub-pages — matches the Why-section style.
function CardIcon({ children }) {
  return (
    <div className="w-11 h-11 rounded-lg bg-white/[0.03] border border-white/10 text-teal flex items-center justify-center shrink-0">
      {children}
    </div>
  )
}

const ABOUT_ICONS = [
  <Shield size={22} />,
  <Cpu size={22} />,
  <Coins size={22} />,
  <Lock size={22} />,
]

function AboutPage() {
  const c = ABOUT_CONTENT
  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} intro={c.intro} />
      <section className="relative py-6">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 grid md:grid-cols-2 gap-4">
          {c.sections.map((s, i) => (
            <Reveal key={s.title}>
              <div className="glass rounded-2xl p-7 h-full">
                <CardIcon>{ABOUT_ICONS[i] || <Sparkles size={22} />}</CardIcon>
                <h2 className="mt-5 font-display text-xl md:text-2xl font-semibold">{s.title}</h2>
                <p className="mt-3 text-white/70 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="relative py-12">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Reveal>
            <div className="glass-strong rounded-2xl p-7 sm:p-10">
              <h2 className="font-display text-2xl md:text-3xl font-semibold">
                {c.distribution.title}
              </h2>
              <p className="mt-3 text-white/70 max-w-2xl">{c.distribution.intro}</p>
              <div className="mt-7 grid sm:grid-cols-3 gap-4">
                {c.distribution.items.map((it) => (
                  <div key={it.label} className="rounded-xl border border-teal/15 bg-white/[0.02] p-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-teal">{it.percent}</div>
                    <div className="mt-2 font-display text-lg font-semibold">{it.label}</div>
                    <p className="mt-2 text-sm text-white/65 leading-relaxed">{it.body}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs text-mute italic">{c.distribution.footnote}</p>
            </div>
          </Reveal>
        </div>
      </section>
      <FinalCTA />
    </>
  )
}

const FAQ_ICONS = {
  'General Information': <HelpCircle size={16} />,
  'Tokenomics & Mining': <Coins size={16} />,
  'Privacy & Security': <Lock size={16} />,
  'Technology & Features': <Cpu size={16} />,
  'Usage & Participation': <Users size={16} />,
}

function FaqPage() {
  const [openKey, setOpenKey] = useState(null)
  return (
    <>
      <PageHero
        eyebrow="/ FAQ"
        title="Frequently Asked Questions"
        intro="Answers to the most common questions about Salvium — its technology, tokenomics, privacy approach, and how to get involved."
      />
      <section className="relative pb-12">
        <div className="max-w-4xl mx-auto px-5 lg:px-8 space-y-10">
          {FAQ_CONTENT.map((cat) => (
            <Reveal key={cat.category}>
              <div>
                <div className="flex items-center gap-2 text-teal mb-4">
                  {FAQ_ICONS[cat.category] || <HelpCircle size={16} />}
                  <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
                    {cat.category}
                  </span>
                </div>
                <div className="space-y-2">
                  {cat.items.map((it, i) => {
                    const key = `${cat.category}-${i}`
                    const open = openKey === key
                    return (
                      <div
                        key={key}
                        className={`rounded-xl border transition-colors ${open ? 'border-teal/30 bg-white/[0.03]' : 'border-white/10 bg-white/[0.015]'}`}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenKey(open ? null : key)}
                          aria-expanded={open}
                          className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                        >
                          <span className="font-display text-base sm:text-lg font-medium">{it.q}</span>
                          <ChevronDown size={16} className={`shrink-0 transition-transform ${open ? 'rotate-180 text-teal' : 'text-white/50'}`} />
                        </button>
                        {open && (
                          <div className="px-5 pb-5 -mt-1 text-white/70 leading-relaxed">
                            {it.a}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <FinalCTA />
    </>
  )
}

function PapersPage() {
  const renderCard = (p) => (
    <a
      key={`${p.title}-${p.lang}`}
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group glass rounded-2xl p-6 h-full flex flex-col hover:border-teal/40 transition-colors"
    >
      <div className="flex items-center gap-2 text-teal">
        <FileText size={16} />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em]">{p.lang}</span>
      </div>
      <h3 className="mt-3 font-display text-lg sm:text-xl font-semibold">{p.title}</h3>
      <p className="mt-2 text-sm text-white/65 flex-1 leading-relaxed">{p.desc}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm text-white group-hover:text-teal transition-colors">
        Read paper <ArrowRight size={14} />
      </span>
    </a>
  )
  return (
    <>
      <PageHero
        eyebrow="/ Papers"
        title="Salvium Papers"
        intro="Explore our technical documentation, white paper, and translated lite papers covering the Salvium Protocol architecture, privacy features, and economic model."
      />
      <section className="relative pb-8">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-teal mb-4">White Paper</div>
          <div className="grid md:grid-cols-2 gap-4">
            {PAPERS_CONTENT.whitePapers.map(renderCard)}
          </div>
        </div>
      </section>
      <section className="relative py-10">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-teal mb-4">Lite Papers</div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PAPERS_CONTENT.litePapers.map(renderCard)}
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  )
}

function ToolsPage() {
  const renderTool = (icon) => (t) => (
    <a
      key={t.name}
      href={t.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group glass rounded-2xl p-6 h-full flex flex-col hover:border-teal/40 transition-colors"
    >
      <CardIcon>{icon}</CardIcon>
      <h3 className="mt-5 font-display text-lg sm:text-xl font-semibold">{t.name}</h3>
      <p className="mt-2 text-sm text-white/65 flex-1 leading-relaxed">{t.desc}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm text-white group-hover:text-teal transition-colors">
        {t.cta} <ExternalLink size={13} />
      </span>
    </a>
  )
  return (
    <>
      <PageHero
        eyebrow="/ Tools"
        title="Third-Party Tools"
        intro="Track Salvium across the major coin-tracking platforms and explore mining tools that help you monitor pools, hashrate, and profitability."
      />
      <section className="relative pb-8">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="flex items-center gap-2 text-teal mb-4">
            <TrendingUp size={16} />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em]">Coin Trackers</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOOLS_CONTENT.trackers.map(renderTool(<TrendingUp size={20} />))}
          </div>
        </div>
      </section>
      <section className="relative py-10">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="flex items-center gap-2 text-teal mb-4">
            <Pickaxe size={16} />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em]">Mining Tools</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOOLS_CONTENT.mining.map(renderTool(<Server size={20} />))}
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  )
}

// Donation addresses for the project. These are project-controlled — they fund
// development, audits, and community initiatives. Always verify before sending.
const DONATE_ADDRESSES = [
  {
    label: 'Standard Donation Address',
    description: 'Use this for regular SAL donations.',
    address: 'SaLvdTpya4SEgMWDVQ9eDsgJJEwhB2pb5N4YZPMeVjg4BpwoigpKuTMS1TC92ziNyu5EvKaXLMy2LX8PXa1kNsRjBSYPTgyc3J5',
  },
  {
    label: 'Carrot Donation Address',
    description: 'Use this Carrot address if your wallet supports it.',
    address: 'SC11SxSj5yuT71WCWB1VsthazjnakytLLZrdpD3k7RKGVQEWH57w6zNbvhvP14dheJNiGwvwy3Fp915khxe1KMGuAea3anrm8a',
  },
]

function DonateAddressCard({ entry }) {
  // Local state for "copied" feedback. Resets after 2s so users can copy again.
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(entry.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('[DonateAddressCard] clipboard write failed:', err)
    }
  }
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-xl md:text-2xl font-semibold text-white">{entry.label}</h2>
          <p className="mt-1 text-sm text-white/65">{entry.description}</p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy ${entry.label}`}
          className="shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono uppercase tracking-[0.18em] text-white/85 transition-colors"
        >
          {copied ? <CheckCircle2 size={13} /> : <Copy size={13} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="mt-4 rounded-lg border border-white/10 bg-black/30 p-4">
        <p className="font-mono text-sm md:text-base break-all text-white/90 leading-relaxed">
          {entry.address}
        </p>
      </div>
    </div>
  )
}

function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="/ Donate"
        title="Support Salvium"
        intro="Your support funds development, audits, and community initiatives. Thank you."
      />
      <section className="relative pb-12">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 space-y-5">
          {DONATE_ADDRESSES.map((entry) => (
            <DonateAddressCard key={entry.label} entry={entry} />
          ))}
          <div className="rounded-2xl border border-yellow-500/25 bg-yellow-100/[0.04] p-5 flex items-start gap-3">
            <AlertTriangle size={18} className="text-yellow-200/85 shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-100/85 leading-relaxed">
              Always verify the address before sending. On-chain transactions are irreversible —
              double-check every character matches what&rsquo;s shown above.
            </p>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  )
}

function ExchangesPage() {
  return (
    <>
      <PageHero
        eyebrow="/ Exchanges"
        title="Available Exchanges"
        intro="Trade Salvium on these trusted platforms. Always do your own research before depositing funds on any exchange."
      />
      <section className="relative pb-12">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXCHANGES_CONTENT.map((ex) => (
            <a
              key={ex.name}
              href={ex.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass rounded-2xl p-6 hover:border-teal/40 transition-colors"
            >
              <div className="flex items-start justify-between">
                <CardIcon><ArrowLeftRight size={20} /></CardIcon>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-teal px-2 py-1 rounded-full border border-teal/30">
                  {ex.pair}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{ex.name}</h3>
              <p className="mt-2 text-sm text-white/65 leading-relaxed">{ex.desc}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm text-white group-hover:text-teal transition-colors">
                Trade {ex.pair} <ExternalLink size={13} />
              </span>
            </a>
          ))}
        </div>
      </section>
      <FinalCTA />
    </>
  )
}

function PoolsPage() {
  return (
    <>
      <PageHero
        eyebrow="/ Mining Pools"
        title="Mining Pools"
        intro="Salvium uses the RandomX algorithm. Pick a pool that matches your preferred payment system and fee structure, then point your miner."
      />
      <section className="relative pb-12">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POOLS_CONTENT.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass rounded-2xl p-6 h-full flex flex-col hover:border-teal/40 transition-colors"
            >
              <CardIcon><Pickaxe size={20} /></CardIcon>
              <h3 className="mt-5 font-display text-xl font-semibold">{p.name}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70 px-2 py-0.5 rounded-full border border-white/15"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-white/65 flex-1 leading-relaxed">{p.desc}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm text-white group-hover:text-teal transition-colors">
                Visit pool <ExternalLink size={13} />
              </span>
            </a>
          ))}
        </div>
      </section>
      <FinalCTA />
    </>
  )
}

// ---------------------------------------------------------------------------
// 404 — fallback for unknown routes.
// ---------------------------------------------------------------------------
function NotFoundPage() {
  return (
    <>
      <PageHero
        eyebrow="/ 404"
        title="Page not found"
        intro="The page you're looking for doesn't exist on the new Salvium site. It may have moved, or the link may be outdated."
      />
      <section className="relative pb-16">
        <div className="max-w-2xl mx-auto px-5 lg:px-8 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn-primary">
              <ArrowLeft size={16} /> Back to home
            </Link>
            <Link to="/blog" className="btn-ghost">
              <FileText size={16} /> Read the blog
            </Link>
            <Link to="/about" className="btn-ghost">
              <BookOpen size={16} /> About Salvium
            </Link>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  )
}

// ---------------------------------------------------------------------------
// APP ROOT
// ---------------------------------------------------------------------------
export default function App() {
  const posts = SEED_POSTS

  // Route by pathname (hash anchors are handled within home content).
  const fullPath = usePath()
  const route = (fullPath.split('#')[0] || '/').replace(/\/$/, '') || '/'

  // Legacy paths that the old Jekyll site exposed as standalone pages but
  // are now home-page sections. Redirect (replace, don't push) to the
  // appropriate hash so deep links from search engines / old bookmarks
  // land in the right place.
  const HOME_SECTION_REDIRECTS = {
    '/download': '/#products',
    '/community': '/#community',
    '/roadmap': '/#roadmap',
  }
  useEffect(() => {
    const target = HOME_SECTION_REDIRECTS[route]
    if (target && typeof window !== 'undefined') {
      window.history.replaceState({}, '', target)
      window.dispatchEvent(new PopStateEvent('popstate'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route])

  let page
  switch (route) {
    case '/about':     page = <AboutPage />; break
    case '/faq':       page = <FaqPage />; break
    case '/papers':    page = <PapersPage />; break
    case '/tools':     page = <ToolsPage />; break
    case '/exchanges': page = <ExchangesPage />; break
    case '/pools':     page = <PoolsPage />; break
    case '/donate':    page = <DonatePage />; break
    case '/blog':      page = (
      <>
        <Blog posts={posts} />
        <FinalCTA />
      </>
    ); break
    case '/':
    case '/download':
    case '/community':
    case '/roadmap':
      page = (
        <>
          <Hero />
          <Marquee />
          <StatsBar />
          <Why />
          <HowItWorks />
          <Ecosystem />
          <Tokenomics />
          <Roadmap />
          <Products />
          <BlogPreview posts={posts} />
          <Community />
          <FinalCTA />
        </>
      )
      break
    default:
      page = <NotFoundPage />
  }

  return (
    <>
      <Nav />
      <main className="relative z-10">{page}</main>
      <Footer />
    </>
  )
}
