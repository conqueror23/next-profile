import { render, screen } from '@testing-library/react'
import { EducationCard } from '../../components/EducationCard'
import { Education } from '../../models/education'

const mockEducation = new Education(
  'University of Technology',
  'Bachelor of Computer Science',
  'Software Engineering',
  '2020-01-01',
  '2024-01-01',
  '3.8 GPA',
  'Focused on full-stack development and software architecture',
  ['Dean\'s List', 'Outstanding Student Award']
)

const mockEducationMinimal = new Education(
  'Tech Institute',
  'Certificate',
  'Web Development',
  '2023-01-01',
  '2023-06-01'
)

describe('EducationCard Component', () => {
  test('renders education card with complete information', () => {
    render(<EducationCard education={mockEducation} />)
    
    expect(screen.getByText('Bachelor of Computer Science')).toBeInTheDocument()
    expect(screen.getByText('University of Technology')).toBeInTheDocument()
    expect(screen.getByText('Software Engineering')).toBeInTheDocument()
    expect(screen.getByText((content, element) => {
      return element?.textContent === 'Grade: 3.8 GPA'
    })).toBeInTheDocument()
    expect(screen.getByText('3.8 GPA')).toBeInTheDocument()
    expect(screen.getByText('Focused on full-stack development and software architecture')).toBeInTheDocument()
  })

  test('renders achievements when provided', () => {
    render(<EducationCard education={mockEducation} />)
    
    expect(screen.getByText('Key Achievements:')).toBeInTheDocument()
    expect(screen.getByText('Dean\'s List')).toBeInTheDocument()
    expect(screen.getByText('Outstanding Student Award')).toBeInTheDocument()
  })

  test('renders minimal education information correctly', () => {
    render(<EducationCard education={mockEducationMinimal} />)
    
    expect(screen.getByText('Certificate')).toBeInTheDocument()
    expect(screen.getByText('Tech Institute')).toBeInTheDocument()
    expect(screen.getByText('Web Development')).toBeInTheDocument()
    expect(screen.queryByText((content, element) => {
      return element?.textContent?.includes('Grade: ') || false
    })).not.toBeInTheDocument()
    expect(screen.queryByText('Key Achievements:')).not.toBeInTheDocument()
  })

  test('formats dates correctly', () => {
    render(<EducationCard education={mockEducation} />)
    
    expect(screen.getByText('Jan 2020 - Jan 2024')).toBeInTheDocument()
  })

  test('renders without crashing', () => {
    expect(() => render(<EducationCard education={mockEducation} />)).not.toThrow()
  })

  test('has correct heading structure', () => {
    render(<EducationCard education={mockEducation} />)
    
    const degreeHeading = screen.getByRole('heading', { level: 3 })
    expect(degreeHeading).toHaveTextContent('Bachelor of Computer Science')
    
    const institutionHeading = screen.getByRole('heading', { level: 4 })
    expect(institutionHeading).toHaveTextContent('University of Technology')
  })
})