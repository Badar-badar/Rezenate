import { useEffect, useRef, useState } from 'react'
import heroArtwork from './assets/hero-art.png'
import lightArtwork from './assets/light-art.png'

function BrandMark({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 36 36" fill="none">
      <path d="M7 7h22v22h-7V14H7V7Z" fill="currentColor" />
      <path d="M7 18h11v11L7 18Z" fill="currentColor" />
      <path d="M19 7h10v10L19 7Z" fill="currentColor" />
    </svg>
  )
}

const navigation = [
  ['Home', '#home'],
  ['Philosophy', '#philosophy'],
  ['How We Partner', '#partner'],
  ['Founders', '#founders'],
  ['Contact', '#contact'],
]

function App() {
  const [active, setActive] = useState('#home')

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const locked = useRef(false) // true after a nav click, until the user scrolls manually

  useEffect(() => {
    const unlock = () => { locked.current = false }
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      if (locked.current) return
      const ph = document.getElementById('philosophy')
      const line = window.innerHeight * 0.4
      setActive(ph && ph.getBoundingClientRect().top <= line ? '#philosophy' : '#home')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', unlock, { passive: true })
    window.addEventListener('touchmove', unlock, { passive: true })
    window.addEventListener('keydown', unlock)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', unlock)
      window.removeEventListener('touchmove', unlock)
      window.removeEventListener('keydown', unlock)
    }
  }, [])

  // close the mobile menu with Escape or when the screen grows past the phone size
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    const onResize = () => { if (window.innerWidth > 640) setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <main className="page">
      {/* ---------- HERO ---------- */}
      <section id="home" className="hero-section">
        <div className="hero-art-layer" aria-hidden="true">
          <div className="hero-wash" />
          <img src={heroArtwork} alt="" className="hero-sculpture" />
        </div>

        <div className={`header-bar${scrolled ? ' is-scrolled' : ''}`}>
        <header className="site-header">
          <a href="#home" aria-label="Rezenate home" className="brand">
            <BrandMark className="brand-mark" />
            <span>REZENATE</span>
          </a>

          <nav id="site-nav" aria-label="Main navigation" className={`nav-pill${menuOpen ? ' is-open' : ''}`}>
            {navigation.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => {
                  locked.current = true
                  setActive(href)
                  setMenuOpen(false)
                }}
                className={active === href ? 'is-active' : ''}
              >
                {label}
              </a>
            ))}
          </nav>

          <a href="mailto:hello@rezenate.com" className="contact-link">
            Contact us
          </a>

          <button
            type="button"
            className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </header>
        </div>

        <div className="hero-copy">
          <h1 className="hero-title">
            Leadership
            <br />
            Changes <span className="accent-serif">everything.</span>
          </h1>
          <p className="hero-description">
            We partner with organisations and leaders to attract,{' '}
            <br className="desk-br" />
            assess and support exceptional leadership{' '}
            <br className="desk-br" />
            that creates lasting impact.
          </p>
        </div>

        <a href="#philosophy" aria-label="Scroll to explore" className="scroll-cue">
          <svg aria-hidden="true" viewBox="0 0 144 126" fill="none" style={{ overflow: 'visible' }}>
            <defs>
              <path id="scroll-label-arc" d="M 29 66 A 43 43 0 0 1 115 66" />
              <radialGradient id="scroll-glass-fill">
                <stop stopColor="white" stopOpacity=".58" />
                <stop offset="1" stopColor="white" stopOpacity=".1" />
              </radialGradient>
              <filter id="scroll-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
            </defs>
            <ellipse cx="72" cy="65" rx="54" ry="45" fill="white" fillOpacity=".28" filter="url(#scroll-glow)" />
            <ellipse
              cx="72"
              cy="65"
              rx="53"
              ry="43"
              fill="url(#scroll-glass-fill)"
              stroke="white"
              strokeOpacity=".94"
              strokeWidth="2.2"
            />
            <text fill="#211d27" fontFamily="Outfit, sans-serif" fontSize="10.5" fontWeight="500" letterSpacing=".9">
              <textPath href="#scroll-label-arc" startOffset="50%" textAnchor="middle">
                SCROLL TO EXPLORE
              </textPath>
            </text>
            <path d="M72 54v25" stroke="#9855f2" strokeLinecap="round" strokeWidth="2.5" />
            <path d="m64 74 8 12 8-12H64Z" fill="#9855f2" />
          </svg>
        </a>
      </section>

      {/* ---------- PHILOSOPHY ---------- */}
      <section id="philosophy" className="philosophy-section">
        <div className="light-installation" aria-hidden="true">
          <img src={lightArtwork} alt="" className="light-artwork" />
          <div className="light-mark">
            <BrandMark />
          </div>
          <blockquote className="quote-card">
            <p>
              People buy into the leader
              <br />
              before they buy into the vision.
            </p>
            <cite>— JOHN C MAXWELL</cite>
          </blockquote>
        </div>

        <div className="philosophy-copy">
          <h2>
            Every Leader Influences A{' '}
            <br className="desk-br" />
            Culture Long Before They{' '}
            <br className="desk-br" />
            <span className="accent-serif">change a strategy.</span>
          </h2>
          <div className="philosophy-text">
            <p>
              Some support people
              <br />
              to become more of themselves.
            </p>
            <p>
              Others slowly ask
              <br />
              them to become less.
            </p>
            <p>
              Rezenate exists because
              <br />
              leadership resonates.
            </p>
          </div>
        </div>
      </section>

      <section id="partner" className="sr-only">How we partner with leaders and organizations</section>
      <section id="founders" className="sr-only">Rezenate founders</section>
      <div id="contact" className="sr-only">Contact Rezenate</div>
    </main>
  )
}

export default App
