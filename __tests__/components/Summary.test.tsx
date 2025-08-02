import { render, screen } from '@testing-library/react'
import Summary from '../../components/Summary'

describe('Summary Component', () => {
  test('renders summary heading', () => {
    render(<Summary />)
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Summary')
  })

  test('renders without crashing', () => {
    expect(() => render(<Summary />)).not.toThrow()
  })

  test('has correct heading structure', () => {
    render(<Summary />)
    
    const heading = screen.getByText('Summary')
    expect(heading.tagName).toBe('H2')
  })
})