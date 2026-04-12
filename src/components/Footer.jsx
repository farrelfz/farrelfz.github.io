import Container from './Container'

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 py-6">
      <Container>
        <p className="text-sm text-slate-500">Muhamad Farrel — {new Date().getFullYear()}</p>
      </Container>
    </footer>
  )
}

export default Footer
