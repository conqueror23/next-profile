import { render, screen } from '@testing-library/react'
import PersonalDetails from '../../components/PersonalDetails'

describe('PersonalDetails Component', () => {
  test('renders personal details heading', () => {
    render(<PersonalDetails />)
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Personal Details')
  })

  test('renders without crashing', () => {
    expect(() => render(<PersonalDetails />)).not.toThrow()
  })

  test('has correct heading structure', () => {
    render(<PersonalDetails />)
    
    const heading = screen.getByText('Personal Details')
    expect(heading.tagName).toBe('H2')
  })
})