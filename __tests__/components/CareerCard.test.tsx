import { render, screen } from '@testing-library/react'
import CareerCard from '../../components/CareerCard'
import { Career } from '../../models/career'

describe('CareerCard Component', () => {
  const mockCareer = new Career(
    'Senior Software Engineer',
    'Tech Corp Inc.',
    'Led development of web applications using React and Node.js. Mentored junior developers and implemented CI/CD pipelines.',
    '2020-01',
    '2023-12',
    '4 years'
  )

  test('renders career information correctly', () => {
    render(<CareerCard career={mockCareer} />)
    
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Senior Software Engineer')
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Tech Corp Inc.')
    expect(screen.getByText('2020-01')).toBeInTheDocument()
    expect(screen.getByText('2023-12')).toBeInTheDocument()
    expect(screen.getByText(/Led development of web applications/)).toBeInTheDocument()
  })

  test('displays all required career fields', () => {
    render(<CareerCard career={mockCareer} />)
    
    // Check title
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument()
    
    // Check company
    expect(screen.getByText('Tech Corp Inc.')).toBeInTheDocument()
    
    // Check start and end time
    expect(screen.getByText('2020-01')).toBeInTheDocument()
    expect(screen.getByText('2023-12')).toBeInTheDocument()
    
    // Check responsibilities
    expect(screen.getByText(/Led development of web applications/)).toBeInTheDocument()
  })

  test('handles empty or minimal career data', () => {
    const minimalCareer = new Career('', '', '', '', '', '')
    
    render(<CareerCard career={minimalCareer} />)
    
    // Should still render the structure
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
  })

  test('renders with different career data', () => {
    const differentCareer = new Career(
      'Frontend Developer',
      'Startup XYZ',
      'Built responsive web interfaces using Vue.js and CSS frameworks.',
      '2018-06',
      '2020-05',
      '2 years'
    )
    
    render(<CareerCard career={differentCareer} />)
    
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText('Startup XYZ')).toBeInTheDocument()
    expect(screen.getByText('2018-06')).toBeInTheDocument()
    expect(screen.getByText('2020-05')).toBeInTheDocument()
    expect(screen.getByText(/Built responsive web interfaces/)).toBeInTheDocument()
  })

  test('handles special characters in career data', () => {
    const specialCareer = new Career(
      'Senior Software Engineer & Team Lead',
      'Tech Corp (Remote)',
      'Led team of 5+ developers; implemented CI/CD pipelines & improved performance by 50%.',
      '2020-01',
      '2023-12',
      '3.5 years'
    )
    
    render(<CareerCard career={specialCareer} />)
    
    expect(screen.getByText('Senior Software Engineer & Team Lead')).toBeInTheDocument()
    expect(screen.getByText('Tech Corp (Remote)')).toBeInTheDocument()
    expect(screen.getByText(/Led team of 5\+ developers/)).toBeInTheDocument()
  })

  test('has proper HTML structure', () => {
    render(<CareerCard career={mockCareer} />)
    
    const container = screen.getByRole('heading', { level: 2 }).closest('div')
    expect(container).toBeInTheDocument()
    
    // Check that we have the expected elements
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
    
    // Check that responsibilities are in a paragraph
    const responsibilitiesText = screen.getByText(/Led development of web applications/)
    expect(responsibilitiesText.tagName).toBe('P')
  })

  test('renders without crashing with valid props', () => {
    expect(() => render(<CareerCard career={mockCareer} />)).not.toThrow()
  })
})