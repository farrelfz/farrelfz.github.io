import Section from '../components/Section'

const About = () => {
  return (
    <Section
      id="about"
      title="About"
      subtitle="A focused academic profile centered on physics education, simulation development, and computational inquiry."
    >
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-5 text-sm leading-7 text-slate-700 sm:text-base">
          <p>
            I am a Physics Education student at Universitas Negeri Jakarta with a sustained interest in integrating
            computational tools into meaningful science learning experiences. My work focuses on translating physical
            phenomena into interactive simulation environments that support conceptual depth and analytical reasoning.
          </p>
          <p>
            My primary focus areas include simulation-based instruction, computational physics modeling, and
            technology-enhanced educational design. I am particularly interested in how digital laboratory experiences
            can be structured to improve scientific argumentation, interpretation of evidence, and long-term concept
            retention.
          </p>
          <p>
            Current research interests include numerical literacy in physics learning, simulation-supported conceptual
            change, and the design of scalable educational tools for inquiry-oriented classrooms.
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <div className="mb-5 h-36 rounded-md border border-dashed border-slate-300 bg-slate-50" />
          <h3 className="text-base font-semibold text-slate-900">Academic Profile</h3>
          <dl className="mt-4 space-y-3 text-sm text-slate-600">
            <div>
              <dt className="font-medium text-slate-700">Institution</dt>
              <dd>Universitas Negeri Jakarta</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-700">Program</dt>
              <dd>Physics Education</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-700">Focus</dt>
              <dd>Simulation, Computational Modeling, and Education Research</dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  )
}

export default About
