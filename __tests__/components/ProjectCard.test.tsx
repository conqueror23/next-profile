import { render, screen } from '@testing-library/react'
import ProjectCard from '../../components/ProjectCard'
import { Project } from '../../models/project'

describe('ProjectCard Component', () => {
  const mockProject = new Project(
    'E-commerce Platform',
    'Full-stack e-commerce application with React frontend and Node.js backend',
    '2023-06',
    ['React', 'Node.js', 'MongoDB', 'TypeScript']
  )

  test('renders project information correctly', () => {
    render(<ProjectCard {...mockProject} />)
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('E-commerce Platform')
    expect(screen.getByText('Full-stack e-commerce application with React frontend and Node.js backend')).toBeInTheDocument()
    expect(screen.getByText('2023-06')).toBeInTheDocument()
    // Check for individual tech stack items - they're rendered consecutively
    const techStackContainer = screen.getByText('2023-06').nextElementSibling
    expect(techStackContainer).toHaveTextContent('ReactNode.jsMongoDBTypeScript')
  })

  test('displays all required project fields', () => {
    render(<ProjectCard {...mockProject} />)
    
    // Check name
    expect(screen.getByText('E-commerce Platform')).toBeInTheDocument()
    
    // Check description
    expect(screen.getByText(/Full-stack e-commerce application/)).toBeInTheDocument()
    
    // Check time
    expect(screen.getByText('2023-06')).toBeInTheDocument()
    
    // Check tech stacks are present in the container
    const container = screen.getByRole('heading', { level: 1 }).closest('div')
    expect(container).toHaveTextContent('MongoDB')
    expect(container).toHaveTextContent('TypeScript')
  })

  test('handles empty tech stacks array', () => {
    const projectWithNoTech = new Project(
      'Simple Website',
      'Basic HTML website',
      '2023-01',
      []
    )
    
    render(<ProjectCard {...projectWithNoTech} />)
    
    expect(screen.getByText('Simple Website')).toBeInTheDocument()
    expect(screen.getByText('Basic HTML website')).toBeInTheDocument()
    expect(screen.getByText('2023-01')).toBeInTheDocument()
  })

  test('handles single tech stack', () => {
    const singleTechProject = new Project(
      'Static Site',
      'Simple static website',
      '2023-01',
      ['HTML']
    )
    
    render(<ProjectCard {...singleTechProject} />)
    
    const container = screen.getByRole('heading', { level: 1 }).closest('div')
    expect(container).toHaveTextContent('HTML')
  })

  test('renders with different project data', () => {
    const differentProject = new Project(
      'Mobile App',
      'Simple mobile application for task management',
      '2022-12',
      ['Flutter', 'Dart', 'SQLite']
    )
    
    render(<ProjectCard {...differentProject} />)
    
    expect(screen.getByText('Mobile App')).toBeInTheDocument()
    expect(screen.getByText('Simple mobile application for task management')).toBeInTheDocument()
    expect(screen.getByText('2022-12')).toBeInTheDocument()
    const container = screen.getByRole('heading', { level: 1 }).closest('div')
    expect(container).toHaveTextContent('Flutter')
    expect(container).toHaveTextContent('Dart')
    expect(container).toHaveTextContent('SQLite')
  })

  test('has proper HTML structure', () => {
    render(<ProjectCard {...mockProject} />)
    
    const container = screen.getByRole('heading', { level: 1 }).closest('div')
    expect(container).toBeInTheDocument()
    
    // Check that we have the expected elements
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    
    // Check that description is in a paragraph
    const descriptionText = screen.getByText(/Full-stack e-commerce application/)
    expect(descriptionText.tagName).toBe('P')
    
    // Check that time is in a span
    const timeElement = screen.getByText('2023-06')
    expect(timeElement.tagName).toBe('SPAN')
  })

  test('renders without crashing with valid props', () => {
    expect(() => render(<ProjectCard {...mockProject} />)).not.toThrow()
  })

  test('handles empty strings in project data', () => {
    const emptyProject = new Project('', '', '', [])
    
    render(<ProjectCard {...emptyProject} />)
    
    // Should still render the structure
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('')
  })

  test('tech stacks render as individual items', () => {
    const multiTechProject = new Project(
      'Complex App',
      'Description',
      '2023',
      ['Vue', 'Nuxt', 'Vuex', 'Sass', 'Jest']
    )
    
    render(<ProjectCard {...multiTechProject} />)
    
    const container = screen.getByRole('heading', { level: 1 }).closest('div')
    expect(container).toHaveTextContent('Vue')
    expect(container).toHaveTextContent('Nuxt')
    expect(container).toHaveTextContent('Vuex')
    expect(container).toHaveTextContent('Sass')
    expect(container).toHaveTextContent('Jest')
  })
})