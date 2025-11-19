import { ParallaxProvider } from './components/ParallaxProvider'
import { Hero, Courses, Why, Testimonials, Contact, Footer } from './components/Sections'

function App() {
  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-white text-[#111] antialiased selection:bg-[#FFA559]/20">
        <Hero />
        <Courses />
        <Why />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </ParallaxProvider>
  )
}

export default App
