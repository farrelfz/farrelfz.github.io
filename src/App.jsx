import Navbar from './components/Navbar'
import Footer from './components/Footer'
import About from './sections/About'
import Contact from './sections/Contact'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Publications from './sections/Publications'
import Research from './sections/Research'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Research />
        <Publications />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
