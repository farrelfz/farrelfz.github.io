import { useEffect, useState } from 'react'
import Container from './Container'
import { navLinks } from '../data/content'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-slate-50/95 backdrop-blur transition-all duration-200 ${
        scrolled ? 'border-b border-slate-200' : 'border-b border-transparent'
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className="text-sm font-semibold tracking-wide text-slate-900 sm:text-base">
          Muhamad Farrel
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </Container>
    </header>
  )
}

export default Navbar
