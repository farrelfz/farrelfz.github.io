import { motion } from 'framer-motion'
import Container from '../components/Container'
import Button from '../components/Button'

const Hero = () => {
  return (
    <section id="home" className="border-b border-slate-200 py-20 sm:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-sm font-medium tracking-wide text-accent">
            Physics Education Student — Universitas Negeri Jakarta
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Physics Simulation Developer &amp; Research Enthusiast
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            Focusing on interactive physics experiments, computational modeling, and educational innovation
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#research">View Research</Button>
            <Button href="#projects" variant="secondary">
              View Projects
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default Hero
