import Section from '../components/Section'
import { contacts } from '../data/content'

const Contact = () => {
  return (
    <Section
      id="contact"
      title="Contact"
      subtitle="For academic collaboration, research discussion, or project consultation."
      className="border-t border-slate-200"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {contacts.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.label === 'Email' ? undefined : '_blank'}
            rel={item.label === 'Email' ? undefined : 'noreferrer'}
            className="rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</p>
            <p className="mt-2 text-sm text-slate-700">{item.value}</p>
          </a>
        ))}
      </div>
    </Section>
  )
}

export default Contact
