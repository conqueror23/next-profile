import { render, screen } from '@testing-library/react'
import Achievements from '../../components/Achievements'

describe('Achievements Component', () => {
  test('renders achievements heading', () => {
    render(<Achievements />)
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Achievements')
  })

  test('renders without crashing', () => {
    expect(() => render(<Achievements />)).not.toThrow()
  })

  test('has correct heading structure', () => {
    render(<Achievements />)
    
    const heading = screen.getByText('Achievements')
    expect(heading.tagName).toBe('H2')
  })
})