import { render, screen } from '@testing-library/react'
import { ResumeHeader } from '../../components/ResumeHeader'

const mockProps = {
  title: 'Senior Software Engineer',
  summary: 'Experienced developer with 5+ years in full-stack development, specializing in React and Node.js',
  highlights: [
    'Led team of 5 developers',
    'Increased performance by 40%',
    'Built scalable microservices'
  ],
  skills: [
    'React',
    'TypeScript',
    'Node.js',
    'Python',
    'AWS',
    'Docker'
  ]
}

describe('ResumeHeader Component', () => {
  test('renders title and summary correctly', () => {
    render(<ResumeHeader {...mockProps} />)
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Senior Software Engineer')
    expect(screen.getByText('Experienced developer with 5+ years in full-stack development, specializing in React and Node.js')).toBeInTheDocument()
  })

  test('renders all highlights', () => {
    render(<ResumeHeader {...mockProps} />)
    
    expect(screen.getByText('Key Highlights')).toBeInTheDocument()
    expect(screen.getByText('Led team of 5 developers')).toBeInTheDocument()
    expect(screen.getByText('Increased performance by 40%')).toBeInTheDocument()
    expect(screen.getByText('Built scalable microservices')).toBeInTheDocument()
  })

  test('renders all skills', () => {
    render(<ResumeHeader {...mockProps} />)
    
    expect(screen.getByText('Core Skills')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('AWS')).toBeInTheDocument()
    expect(screen.getByText('Docker')).toBeInTheDocument()
  })

  test('renders section headings correctly', () => {
    render(<ResumeHeader {...mockProps} />)
    
    const sectionHeadings = screen.getAllByRole('heading', { level: 3 })
    expect(sectionHeadings).toHaveLength(2)
    expect(sectionHeadings[0]).toHaveTextContent('Key Highlights')
    expect(sectionHeadings[1]).toHaveTextContent('Core Skills')
  })

  test('renders with empty arrays', () => {
    const emptyProps = {
      title: 'Test Title',
      summary: 'Test summary',
      highlights: [],
      skills: []
    }
    
    render(<ResumeHeader {...emptyProps} />)
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test summary')).toBeInTheDocument()
    expect(screen.getByText('Key Highlights')).toBeInTheDocument()
    expect(screen.getByText('Core Skills')).toBeInTheDocument()
  })

  test('renders without crashing', () => {
    expect(() => render(<ResumeHeader {...mockProps} />)).not.toThrow()
  })
})