import { render, screen, fireEvent } from '@testing-library/react'
import ServiceCard from '../../components/ServiceCard'
import { Service } from '../../models/service'

const mockService = new Service(
  '1',
  'Web Development',
  'Full-stack web development services using modern technologies',
  'Development',
  '$150/hour',
  '2-6 months',
  [
    'React/Next.js Frontend',
    'Node.js Backend',
    'Database Design',
    'API Development',
    'Responsive Design',
    'SEO Optimization'
  ],
  '/images/web-dev.jpg',
  true
)

const mockServiceBasic = new Service(
  '2',
  'Code Review',
  'Professional code review and optimization',
  'Consulting',
  '$80/hour',
  '1-2 weeks',
  [
    'Code Quality Analysis',
    'Performance Optimization',
    'Security Review'
  ],
  undefined,
  false
)

describe('ServiceCard Component', () => {
  const mockOnLearnMore = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders service information correctly', () => {
    render(<ServiceCard service={mockService} />)
    
    expect(screen.getByText('Web Development')).toBeInTheDocument()
    expect(screen.getByText('Full-stack web development services using modern technologies')).toBeInTheDocument()
    expect(screen.getByText('Development')).toBeInTheDocument()
    expect(screen.getByText('$150/hour')).toBeInTheDocument()
    expect(screen.getByText('Duration: 2-6 months')).toBeInTheDocument()
  })

  test('displays popular badge for popular services', () => {
    render(<ServiceCard service={mockService} />)
    
    expect(screen.getByText('⭐ Popular')).toBeInTheDocument()
  })

  test('does not display popular badge for non-popular services', () => {
    render(<ServiceCard service={mockServiceBasic} />)
    
    expect(screen.queryByText('⭐ Popular')).not.toBeInTheDocument()
  })

  test('displays key features correctly', () => {
    render(<ServiceCard service={mockService} />)
    
    expect(screen.getByText('Key Features:')).toBeInTheDocument()
    expect(screen.getByText('React/Next.js Frontend')).toBeInTheDocument()
    expect(screen.getByText('Node.js Backend')).toBeInTheDocument()
    expect(screen.getByText('Database Design')).toBeInTheDocument()
  })

  test('shows "more features" indicator when there are more than 3 features', () => {
    render(<ServiceCard service={mockService} />)
    
    expect(screen.getByText('+3 more...')).toBeInTheDocument()
  })

  test('does not show "more features" indicator when there are 3 or fewer features', () => {
    render(<ServiceCard service={mockServiceBasic} />)
    
    expect(screen.queryByText(/\+\d+ more\.\.\./)).not.toBeInTheDocument()
  })

  test('calls onLearnMore when Learn More button is clicked', () => {
    render(<ServiceCard service={mockService} onLearnMore={mockOnLearnMore} />)
    
    const learnMoreButton = screen.getByText('Learn More')
    fireEvent.click(learnMoreButton)
    
    expect(mockOnLearnMore).toHaveBeenCalledWith(mockService)
  })

  test('renders Get Quote button', () => {
    render(<ServiceCard service={mockService} />)
    
    expect(screen.getByText('Get Quote')).toBeInTheDocument()
  })

  test('renders without onLearnMore callback', () => {
    render(<ServiceCard service={mockService} />)
    
    const learnMoreButton = screen.getByText('Learn More')
    expect(learnMoreButton).toBeInTheDocument()
    
    fireEvent.click(learnMoreButton)
  })

  test('has correct heading structure', () => {
    render(<ServiceCard service={mockService} />)
    
    const serviceNameHeading = screen.getByRole('heading', { level: 2 })
    expect(serviceNameHeading).toHaveTextContent('Web Development')
    
    const featuresHeading = screen.getByRole('heading', { level: 4 })
    expect(featuresHeading).toHaveTextContent('Key Features:')
  })

  test('renders without crashing', () => {
    expect(() => render(<ServiceCard service={mockService} />)).not.toThrow()
  })
})