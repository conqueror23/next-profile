import { render, screen } from '@testing-library/react'
import { SectionWrapper } from '../../components/section/SectionWrapper'

describe('SectionWrapper Component', () => {
  test('renders title and children correctly', () => {
    render(
      <SectionWrapper title="Test Section">
        <p>Test content</p>
      </SectionWrapper>
    )
    
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Section')
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  test('generates correct id from title', () => {
    render(
      <SectionWrapper title="My Test Section">
        <div>Content</div>
      </SectionWrapper>
    )
    
    const section = document.querySelector('section')
    expect(section).toHaveAttribute('id', 'my-test-section')
  })

  test('handles titles with special characters', () => {
    render(
      <SectionWrapper title="Section with Special Characters!@#">
        <div>Content</div>
      </SectionWrapper>
    )
    
    const section = document.querySelector('section')
    expect(section).toHaveAttribute('id', 'section-with-special-characters!@#')
  })

  test('handles titles with multiple spaces', () => {
    render(
      <SectionWrapper title="Multiple    Spaces   Test">
        <div>Content</div>
      </SectionWrapper>
    )
    
    const section = document.querySelector('section')
    expect(section).toHaveAttribute('id', 'multiple-spaces-test')
  })

  test('renders complex children correctly', () => {
    render(
      <SectionWrapper title="Complex Content">
        <div>
          <h3>Subsection</h3>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
          <p>Description text</p>
        </div>
      </SectionWrapper>
    )
    
    expect(screen.getByText('Complex Content')).toBeInTheDocument()
    expect(screen.getByText('Subsection')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Description text')).toBeInTheDocument()
  })

  test('applies correct styles to heading', () => {
    render(
      <SectionWrapper title="Styled Title">
        <div>Content</div>
      </SectionWrapper>
    )
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveStyle({
      fontSize: '1.875rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '1.5rem',
      borderBottom: '2px solid #e5e7eb',
      paddingBottom: '0.5rem'
    })
  })

  test('renders as semantic section element', () => {
    render(
      <SectionWrapper title="Semantic Test">
        <div>Content</div>
      </SectionWrapper>
    )
    
    const section = document.querySelector('section')
    expect(section?.tagName).toBe('SECTION')
  })

  test('renders with empty title', () => {
    render(
      <SectionWrapper title="">
        <div>Empty title test</div>
      </SectionWrapper>
    )
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('')
    expect(screen.getByText('Empty title test')).toBeInTheDocument()
  })

  test('renders without crashing', () => {
    expect(() => 
      render(
        <SectionWrapper title="Crash Test">
          <p>Test content</p>
        </SectionWrapper>
      )
    ).not.toThrow()
  })
})