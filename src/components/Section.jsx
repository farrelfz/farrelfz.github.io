import { motion } from 'framer-motion'
import Container from './Container'

const Section = ({ id, title, subtitle, children, className = '' }) => {
  return (
    <section id={id} className={`py-16 sm:py-20 ${className}`}>
      <Container>
        {(title || subtitle) && (
          <motion.header
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="mb-8 border-l-2 border-blue-100 pl-4"
          >
            {title && <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>}
            {subtitle && <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">{subtitle}</p>}
          </motion.header>
        )}
        {children}
      </Container>
    </section>
  )
}

export default Section
