import { render, screen } from '@testing-library/react'
import { CardWrapper } from '../../components/card/CardWrapper'

describe('CardWrapper Component', () => {
  test('renders title and content correctly', () => {
    const testContent = <p>Test content</p>
    const result = CardWrapper('Test Title', testContent)
    
    render(result)
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Title')
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  test('renders with different content types', () => {
    const complexContent = (
      <div>
        <p>First paragraph</p>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
        </ul>
      </div>
    )
    
    const result = CardWrapper('Complex Title', complexContent)
    render(result)
    
    expect(screen.getByText('Complex Title')).toBeInTheDocument()
    expect(screen.getByText('First paragraph')).toBeInTheDocument()
    expect(screen.getByText('List item 1')).toBeInTheDocument()
    expect(screen.getByText('List item 2')).toBeInTheDocument()
  })

  test('renders with empty title', () => {
    const testContent = <span>Some content</span>
    const result = CardWrapper('', testContent)
    
    render(result)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('')
    expect(screen.getByText('Some content')).toBeInTheDocument()
  })

  test('renders with string content in ReactNode', () => {
    const result = CardWrapper('String Content Test', 'This is string content')
    
    render(result)
    
    expect(screen.getByText('String Content Test')).toBeInTheDocument()
    expect(screen.getByText('This is string content')).toBeInTheDocument()
  })

  test('has correct HTML structure', () => {
    const testContent = <p>Structure test</p>
    const result = CardWrapper('Structure Title', testContent)
    
    render(result)
    
    const container = screen.getByRole('heading', { level: 1 }).parentElement
    expect(container?.tagName).toBe('DIV')
    expect(container?.children).toHaveLength(2)
  })
})