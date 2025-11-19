import { useEffect, useMemo, useRef, useState } from 'react'
import { useParallax } from './ParallaxProvider'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle2, Star, Quote, Send } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay } }),
}

function Section({ id, title, className = '', bgIntensity = 0.08, depth = 0.15, horizon = 0.0, children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3, margin: '0px 0px -10% 0px' })
  const layerRef = useParallax(`${id}-bg`, { depth: bgIntensity, horizon: horizon * 0.4 })

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      <div ref={layerRef} className="pointer-events-none absolute inset-0 opacity-[0.6]">
        <GridPattern />
      </div>
      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={fadeUp}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </section>
  )
}

function GridPattern() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />
      <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#ececec" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}

export function Hero() {
  const layerDeep = useParallax('hero-deep', { depth: 0.35, horizon: 0.1 })
  const layerMid = useParallax('hero-mid', { depth: 0.22, horizon: 0.06 })
  const layerSoft = useParallax('hero-soft', { depth: 0.12, horizon: 0.03 })

  return (
    <Section id="hero" className="pt-28 pb-24 bg-white">
      <div ref={layerSoft} className="absolute inset-[10%] rounded-3xl bg-white/60 backdrop-blur-md border border-[#ececec]" />
      <div ref={layerMid} className="absolute -inset-x-16 -top-24 h-64 bg-[#FFA559]/10 blur-3xl" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl font-light tracking-tight text-black"
            >
              Ascendia
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-lg text-[#111]/70"
            >
              Premium learning experiences designed with elegance and clarity.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <a href="#courses" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#FFA559] text-white hover:brightness-95 transition will-change-transform">
                Explore Courses <ArrowRight size={18} />
              </a>
            </motion.div>
          </div>
          <div className="relative h-72 md:h-96">
            <div ref={layerDeep} className="absolute inset-0 flex items-center justify-center">
              <div className="size-52 md:size-64 rounded-[28%] bg-gradient-to-br from-[#FFA559] to-[#ffbe82] rotate-12 blur-xl opacity-60" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-40 md:size-52 rounded-full border border-[#ececec] backdrop-blur supports-[backdrop-filter]:bg-white/50" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export function Courses() {
  const bg = useParallax('courses-bg', { depth: 0.14, horizon: 0.04 })
  const cards = [
    { title: 'Design Systems', desc: 'Build scalable, consistent interfaces.' },
    { title: 'React for Pros', desc: 'Patterns and performance, simplified.' },
    { title: 'Motion & Microinteractions', desc: 'Delight through subtlety.' },
    { title: 'AI for Builders', desc: 'Ship faster with modern tooling.' },
  ]
  return (
    <Section id="courses" className="py-24 bg-white" bgIntensity={0.1} depth={0.18}>
      <div ref={bg} className="absolute -inset-x-10 -top-10 h-40 bg-[#FFA559]/10 blur-2xl" />
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-light text-black mb-10">Featured Courses</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group relative p-6 rounded-2xl border border-[#ececec] bg-white/60 backdrop-blur hover:shadow-xl hover:shadow-black/5 transition-transform will-change-transform"
            >
              <div className="h-14 w-14 rounded-lg bg-[#FFA559]/15 mb-4" />
              <h3 className="text-lg font-medium text-black">{c.title}</h3>
              <p className="text-sm text-[#111]/70 mt-1">{c.desc}</p>
              <button className="mt-6 inline-flex items-center gap-2 text-[#111] group-hover:translate-x-0.5 transition">
                Enroll <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export function Why() {
  const items = [
    { icon: <CheckCircle2 className="text-[#FFA559]" size={20} />, title: 'Expert-crafted', desc: 'Curriculum built by industry leaders.' },
    { icon: <Star className="text-[#FFA559]" size={20} />, title: 'Premium minimalism', desc: 'Focus on clarity and results.' },
    { icon: <CheckCircle2 className="text-[#FFA559]" size={20} />, title: 'Flexible', desc: 'Learn anywhere, any time.' },
  ]
  return (
    <Section id="why" className="py-24 bg-white" bgIntensity={0.06} depth={0.1}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-light text-black mb-10">Why Choose Ascendia</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-6 rounded-2xl border border-[#ececec] bg-white/60 backdrop-blur hover:shadow-xl hover:shadow-black/5 transition-transform"
            >
              <div className="flex items-center gap-3">
                {it.icon}
                <h3 className="text-lg font-medium text-black">{it.title}</h3>
              </div>
              <p className="text-sm text-[#111]/70 mt-2">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export function Testimonials() {
  const scroller = useParallax('testimonials-scroll', { depth: 0.0, horizon: 0.12 })
  const row1 = [
    'Ascendia transformed how I learn.',
    'Minimal, focused, effective.',
    'The motion feels alive but calm.',
    'Best UI for learning I have used.',
  ]
  const row2 = [
    'Polished from top to bottom.',
    'Courses with actual depth.',
    'Fast, fluid, zero clutter.',
    'Worth every minute.',
  ]
  return (
    <Section id="testimonials" className="py-24 bg-white" bgIntensity={0.05} depth={0.06} horizon={0.1}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-light text-black mb-10">What learners say</h2>
        <div className="relative overflow-hidden">
          <div ref={scroller} className="absolute inset-0 pointer-events-none">
            {/* subtle drifting layer handled globally */}
          </div>
          <Marquee texts={row1} reverse={false} />
          <Marquee texts={row2} reverse={true} />
        </div>
      </div>
    </Section>
  )
}

function Marquee({ texts, reverse }) {
  return (
    <div className="flex gap-6 whitespace-nowrap py-4 will-change-transform" aria-hidden>
      {[...Array(2)].map((_, k) => (
        <div key={k} className={`flex gap-6 animate-[marquee_18s_linear_infinite] ${reverse ? '[-animation-direction:reverse]' : ''}`}>
          {texts.map((t, i) => (
            <span key={i} className="px-5 py-3 rounded-full border border-[#ececec] bg-white/60 backdrop-blur text-[#111]/80">{t}</span>
          ))}
        </div>
      ))}
      <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  )
}

export function Contact() {
  const [state, setState] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setResult(null)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed')
      setResult({ ok: true })
      setState({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setResult({ ok: false, error: String(err.message || err) })
    } finally {
      setSending(false)
    }
  }

  return (
    <Section id="contact" className="py-24 bg-white" bgIntensity={0.05} depth={0.08}>
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-light text-black mb-10">Contact</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Input placeholder="Your name" value={state.name} onChange={(e)=>setState(s=>({...s,name:e.target.value}))} />
            <Input placeholder="Your email" type="email" value={state.email} onChange={(e)=>setState(s=>({...s,email:e.target.value}))} />
          </div>
          <Input placeholder="Subject (optional)" value={state.subject} onChange={(e)=>setState(s=>({...s,subject:e.target.value}))} />
          <Textarea placeholder="Message" value={state.message} onChange={(e)=>setState(s=>({...s,message:e.target.value}))} />
          <div className="flex items-center gap-3">
            <button disabled={sending} className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#FFA559] text-white hover:brightness-95 transition">
              {sending ? 'Sending…' : 'Send'} <Send size={18} />
            </button>
            {result && (
              result.ok ? <span className="text-green-600">Thanks! We got your message.</span> : <span className="text-red-600">{result.error}</span>
            )}
          </div>
        </form>
      </div>
    </Section>
  )
}

function Input(props){
  return <input {...props} className={`w-full px-4 py-3 rounded-xl border border-[#ececec] bg-white/60 backdrop-blur placeholder-[#111]/40 text-[#111] outline-none focus:ring-2 focus:ring-[#FFA559]/40 transition ${props.className||''}`} />
}
function Textarea(props){
  return <textarea rows={5} {...props} className={`w-full px-4 py-3 rounded-xl border border-[#ececec] bg-white/60 backdrop-blur placeholder-[#111]/40 text-[#111] outline-none focus:ring-2 focus:ring-[#FFA559]/40 transition ${props.className||''}`} />
}

export function Footer(){
  const soft = useParallax('footer-soft', { depth: 0.03, horizon: 0.02 })
  return (
    <Section id="footer" className="py-16 bg-white border-t border-[#ececec]" bgIntensity={0.03} depth={0.03}>
      <div ref={soft} className="absolute -inset-x-8 -top-10 h-24 bg-[#FFA559]/5 blur-xl" />
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-[#111]/60">
        <span>© {new Date().getFullYear()} Ascendia</span>
        <a href="#hero" className="hover:text-[#111] transition">Back to top</a>
      </div>
    </Section>
  )
}
