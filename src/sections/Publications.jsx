import Section from '../components/Section'
import { publications } from '../data/content'

const Publications = () => {
  return (
    <Section
      id="publications"
      title="Publications"
      subtitle="Reference-ready publication records in an academic citation format."
    >
      <ol className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 sm:p-6">
        {publications.map((publication, index) => (
          <li key={publication.title} className="text-sm leading-7 text-slate-700 sm:text-base">
            <span className="font-medium text-slate-500">[{index + 1}] </span>
            {publication.authors} ({publication.year}). <span className="font-medium">{publication.title}</span>{' '}
            <span className="text-slate-600">{publication.venue}</span>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export default Publications
