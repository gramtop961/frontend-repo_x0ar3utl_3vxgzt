import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'

// Global Parallax Engine
// - Uses a single requestAnimationFrame loop
// - Tracks scroll and velocity
// - Each section registers with custom intensities for vertical and horizontal drift

const ParallaxContext = createContext(null)

export function ParallaxProvider({ children }) {
  const rafRef = useRef(null)
  const lastTimeRef = useRef(0)
  const lastScrollRef = useRef(0)
  const [scrollY, setScrollY] = useState(0)
  const [velocity, setVelocity] = useState(0)

  // subscribers: Set of { id, ref, config }
  const subscribersRef = useRef(new Map())

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY || window.pageYOffset)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const loop = (ts) => {
      if (!lastTimeRef.current) lastTimeRef.current = ts
      const dt = (ts - lastTimeRef.current) / 1000
      lastTimeRef.current = ts

      const currentScroll = scrollY
      const lastScroll = lastScrollRef.current
      const v = (currentScroll - lastScroll) / Math.max(dt, 0.016)
      // Low-pass filter for smooth velocity
      const smoothedV = 0.9 * (velocity || 0) + 0.1 * v
      setVelocity(smoothedV)
      lastScrollRef.current = currentScroll

      // Apply transforms to all subscribers
      subscribersRef.current.forEach(({ ref, config }) => {
        const el = ref.current
        if (!el) return
        // depth controls sensitivity
        const depth = config.depth ?? 0.2
        const horiz = config.horizon ?? 0 // small horizontal drift factor
        const base = config.base ?? 0 // base offset
        // Velocity-aware ease: slow down when nearly stopped
        const ease = Math.min(1, Math.max(0.2, 1 - Math.min(1, Math.abs(smoothedV) / 4000)))
        const y = -(currentScroll * depth) + base
        const x = Math.sin(currentScroll / 600) * 10 * horiz * ease
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`
        el.style.willChange = 'transform'
      })

      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [scrollY])

  const api = useMemo(() => ({
    register: (id, ref, config) => {
      subscribersRef.current.set(id, { ref, config })
    },
    unregister: (id) => {
      subscribersRef.current.delete(id)
    },
  }), [])

  return (
    <ParallaxContext.Provider value={api}>
      {children}
    </ParallaxContext.Provider>
  )
}

export function useParallax(id, config = {}) {
  const ctx = useContext(ParallaxContext)
  const ref = useRef(null)

  useEffect(() => {
    if (!ctx) return
    ctx.register(id, ref, config)
    return () => ctx.unregister(id)
  }, [id, JSON.stringify(config)])

  return ref
}
