const styles = {
  primary:
    'bg-accent text-white border border-accent hover:bg-blue-700 hover:border-blue-700 focus-visible:outline-blue-500',
  secondary:
    'bg-white text-slate-700 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-slate-400',
}

const Button = ({ href, children, variant = 'primary' }) => {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${styles[variant]}`}
    >
      {children}
    </a>
  )
}

export default Button
