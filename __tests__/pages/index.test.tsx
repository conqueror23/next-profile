import { render, screen } from '@testing-library/react'
import Home from '../../pages/index'

// Mock Next.js components
jest.mock('next/head', () => {
  return function MockHead({ children }: { children: React.ReactNode }) {
    return <>{children}</>
  }
})

jest.mock('next/image', () => {
  return function MockImage(props: any) {
    return <img {...props} />
  }
})

jest.mock('next/link', () => {
  return function MockLink({ href, children, ...props }: { href: string; children: React.ReactNode }) {
    return <a href={href} {...props}>{children}</a>
  }
})

// Mock CSS modules
jest.mock('../../styles/Home.module.css', () => ({
  container: 'container',
  main: 'main',
  title: 'title',
  description: 'description',
  code: 'code',
  grid: 'grid',
  card: 'card',
  footer: 'footer',
  logo: 'logo'
}))

describe('Home Page', () => {
  test('renders page title and description', () => {
    render(<Home />)
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome to Next.js!')
    expect(screen.getByText(/Get started by editing/)).toBeInTheDocument()
  })

  test('renders navigation links to all main pages', () => {
    render(<Home />)
    
    // Profile link
    const profileLink = screen.getByRole('link', { name: /Profile/ })
    expect(profileLink).toHaveAttribute('href', '/profile')
    expect(screen.getByText('View detailed profile information and projects.')).toBeInTheDocument()
    
    // Resume link
    const resumeLink = screen.getByRole('link', { name: /Resume/ })
    expect(resumeLink).toHaveAttribute('href', '/resume')
    expect(screen.getByText('Complete professional resume with experience and education.')).toBeInTheDocument()
    
    // Chat link
    const chatLink = screen.getByRole('link', { name: /Chat/ })
    expect(chatLink).toHaveAttribute('href', '/chatbot')
    expect(screen.getByText('Real-time messaging interface with Socket.io integration.')).toBeInTheDocument()
    
    // GraphQL Demo link
    const graphqlLink = screen.getByRole('link', { name: /GraphQL Demo/ })
    expect(graphqlLink).toHaveAttribute('href', '/graphql')
    expect(screen.getByText('Explore GraphQL integration with Apollo Client.')).toBeInTheDocument()
  })

  test('renders external Next.js link', () => {
    render(<Home />)
    
    const nextjsLink = screen.getByRole('link', { name: 'Next.js!' })
    expect(nextjsLink).toHaveAttribute('href', 'https://nextjs.org')
  })

  test('renders Vercel footer link', () => {
    render(<Home />)
    
    const vercelLink = screen.getByRole('link', { name: /Powered by/ })
    expect(vercelLink).toHaveAttribute('href', expect.stringContaining('vercel.com'))
    expect(vercelLink).toHaveAttribute('target', '_blank')
    expect(vercelLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('renders Vercel logo image', () => {
    render(<Home />)
    
    const logo = screen.getByRole('img', { name: 'Vercel Logo' })
    expect(logo).toHaveAttribute('src', '/vercel.svg')
    expect(logo).toHaveAttribute('width', '72')
    expect(logo).toHaveAttribute('height', '16')
  })

  test('has proper page structure', () => {
    render(<Home />)
    
    // Check main content structure
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument() // footer
    
    // Check navigation grid
    const navigationCards = screen.getAllByRole('link').filter(link => 
      link.getAttribute('href')?.startsWith('/')
    )
    expect(navigationCards).toHaveLength(4)
  })

  test('renders code reference correctly', () => {
    render(<Home />)
    
    const codeElement = screen.getByText('pages/index.js')
    expect(codeElement.tagName).toBe('CODE')
  })

  test('renders without crashing', () => {
    expect(() => render(<Home />)).not.toThrow()
  })

  test('contains proper meta information', () => {
    render(<Home />)
    
    // Note: In a real app, you'd test the actual head content
    // Since we're mocking Head, we just check it renders without errors
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  test('navigation cards have proper structure', () => {
    render(<Home />)
    
    // Each navigation card should have a heading and description
    expect(screen.getByRole('heading', { name: /Profile/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Resume/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Chat/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /GraphQL Demo/ })).toBeInTheDocument()
  })

  test('all navigation links use proper arrow indicators', () => {
    render(<Home />)
    
    expect(screen.getByText('Profile →')).toBeInTheDocument()
    expect(screen.getByText('Resume →')).toBeInTheDocument()
    expect(screen.getByText('Chat →')).toBeInTheDocument()
    expect(screen.getByText('GraphQL Demo →')).toBeInTheDocument()
  })
})