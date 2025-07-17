import type { Project } from '../models/project'
const ProjectCard = (project: Project) => {
  const { name, description, time, techStacks } = project
  return (
    <div>
      <h1> {name}</h1>
      <p>{description}</p>
      <span>{time}</span>
      <span>{techStacks}</span>
    </div>
  )
}
export default ProjectCard
