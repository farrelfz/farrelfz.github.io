import Card from '../components/Card'
import Section from '../components/Section'
import { projects } from '../data/content'

const Projects = () => {
  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Selected technical projects in simulation development and educational computing."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.title}>
            <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs text-blue-700">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-4 text-sm">
              <a href={project.links.demo} className="text-accent hover:underline">
                Demo
              </a>
              <a href={project.links.github} className="text-accent hover:underline">
                GitHub
              </a>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}

export default Projects
