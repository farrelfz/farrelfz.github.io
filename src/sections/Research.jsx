import Section from '../components/Section'
import { researchItems } from '../data/content'

const statusStyles = {
  Ongoing: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  'In Preparation': 'border-amber-200 bg-amber-50 text-amber-700',
  Published: 'border-blue-200 bg-blue-50 text-blue-700',
}

const Research = () => {
  return (
    <Section
      id="research"
      title="Research"
      subtitle="Current and developing research directions with emphasis on computational approaches in physics education."
      className="bg-white"
    >
      <div className="space-y-4">
        {researchItems.map((item) => (
          <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 sm:p-6">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[item.status]}`}>
                {item.status}
              </span>
            </div>
            <p className="text-sm leading-6 text-slate-600 sm:text-base">{item.abstract}</p>
            <p className="mt-3 text-xs tracking-wide text-slate-500 sm:text-sm">
              <span className="font-semibold text-slate-600">Keywords:</span> {item.keywords.join(' · ')}
            </p>
          </article>
        ))}
      </div>
    </Section>
  )
}

export default Research
