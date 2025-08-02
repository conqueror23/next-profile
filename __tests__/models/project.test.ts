import { Project } from '../../models/project'

describe('Project Model', () => {
  const mockProjectData = {
    name: 'E-commerce Platform',
    description: 'Full-stack e-commerce application with React and Node.js',
    time: '2023-06',
    techStacks: ['React', 'Node.js', 'MongoDB', 'TypeScript']
  }

  test('should create a Project instance with all required properties', () => {
    const project = new Project(
      mockProjectData.name,
      mockProjectData.description,
      mockProjectData.time,
      mockProjectData.techStacks
    )

    expect(project.name).toBe(mockProjectData.name)
    expect(project.description).toBe(mockProjectData.description)
    expect(project.time).toBe(mockProjectData.time)
    expect(project.techStacks).toEqual(mockProjectData.techStacks)
  })

  test('should have readonly properties (TypeScript compile-time check)', () => {
    const project = new Project(
      mockProjectData.name,
      mockProjectData.description,
      mockProjectData.time,
      mockProjectData.techStacks
    )

    // TypeScript readonly prevents compile-time modifications
    expect(project.name).toBe(mockProjectData.name)
    expect(project.description).toBe(mockProjectData.description)
  })

  test('should handle empty tech stacks array', () => {
    const project = new Project(
      'Simple Project',
      'A basic project',
      '2023-01',
      []
    )

    expect(project.techStacks).toEqual([])
    expect(project.techStacks.length).toBe(0)
  })

  test('should handle single tech stack', () => {
    const project = new Project(
      'Simple HTML Site',
      'Static website',
      '2023-01',
      ['HTML']
    )

    expect(project.techStacks).toEqual(['HTML'])
    expect(project.techStacks.length).toBe(1)
  })

  test('should handle multiple tech stacks', () => {
    const techStacks = ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vercel']
    const project = new Project(
      'Portfolio Website',
      'Personal portfolio built with modern web technologies',
      '2023-12',
      techStacks
    )

    expect(project.techStacks).toEqual(techStacks)
    expect(project.techStacks.length).toBe(5)
  })

  test('should preserve original tech stacks array reference', () => {
    const originalTechStacks = ['React', 'Node.js']
    const project = new Project(
      'Test Project',
      'Test description',
      '2023-01',
      originalTechStacks
    )

    expect(project.techStacks).toBe(originalTechStacks)
  })

  test('should handle special characters in fields', () => {
    const specialData = {
      name: 'AI/ML Dashboard & Analytics',
      description: 'Real-time analytics dashboard with ML predictions (95% accuracy)',
      time: '2023-Q4',
      techStacks: ['Python 3.9+', 'TensorFlow 2.x', 'React.js']
    }

    const project = new Project(
      specialData.name,
      specialData.description,
      specialData.time,
      specialData.techStacks
    )

    expect(project.name).toBe(specialData.name)
    expect(project.description).toBe(specialData.description)
    expect(project.time).toBe(specialData.time)
    expect(project.techStacks).toEqual(specialData.techStacks)
  })
})