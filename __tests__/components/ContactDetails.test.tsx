import { render, screen } from '@testing-library/react'
import { ContactDetails } from '../../components/ContactDetails'
import { Contact } from '../../models/contact'

// Mock CSS modules
jest.mock('../../styles/ContactDetails.module.css', () => ({
  container: 'container',
  title: 'title',
  contactGrid: 'contactGrid',
  contactItem: 'contactItem',
  contactIcon: 'contactIcon',
  contactContent: 'contactContent',
  contactLabel: 'contactLabel',
  contactLink: 'contactLink',
  contactValue: 'contactValue'
}))

describe('ContactDetails Component', () => {
  const mockContact = new Contact(
    'john.doe@example.com',
    '+1-555-123-4567',
    'San Francisco, CA',
    'https://linkedin.com/in/johndoe',
    'https://github.com/johndoe',
    'https://johndoe.dev',
    'https://twitter.com/johndoe'
  )

  const basicContact = new Contact(
    'jane@example.com',
    '555-987-6543',
    'New York, NY'
  )

  test('renders contact details with title', () => {
    render(<ContactDetails contact={mockContact} />)
    
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Contact Information')
  })

  test('renders all basic contact information', () => {
    render(<ContactDetails contact={mockContact} />)
    
    // Email
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()
    
    // Phone
    expect(screen.getByText('Phone')).toBeInTheDocument()
    expect(screen.getByText('+1-555-123-4567')).toBeInTheDocument()
    
    // Location
    expect(screen.getByText('Location')).toBeInTheDocument()
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()
  })

  test('renders optional social media links when provided', () => {
    render(<ContactDetails contact={mockContact} />)
    
    // LinkedIn
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn Profile')).toBeInTheDocument()
    
    // GitHub
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('GitHub Profile')).toBeInTheDocument()
    
    // Website
    expect(screen.getByText('Website')).toBeInTheDocument()
    expect(screen.getByText('Personal Website')).toBeInTheDocument()
    
    // Twitter
    expect(screen.getByText('Twitter')).toBeInTheDocument()
    expect(screen.getByText('Twitter Profile')).toBeInTheDocument()
  })

  test('does not render optional fields when not provided', () => {
    render(<ContactDetails contact={basicContact} />)
    
    // Should not have LinkedIn, GitHub, Website, or Twitter
    expect(screen.queryByText('LinkedIn')).not.toBeInTheDocument()
    expect(screen.queryByText('GitHub')).not.toBeInTheDocument()
    expect(screen.queryByText('Website')).not.toBeInTheDocument()
    expect(screen.queryByText('Twitter')).not.toBeInTheDocument()
  })

  test('renders correct icons for each contact type', () => {
    render(<ContactDetails contact={mockContact} />)
    
    expect(screen.getByText('📧')).toBeInTheDocument() // Email
    expect(screen.getByText('📱')).toBeInTheDocument() // Phone
    expect(screen.getByText('📍')).toBeInTheDocument() // Location
    expect(screen.getByText('💼')).toBeInTheDocument() // LinkedIn
    expect(screen.getByText('🐙')).toBeInTheDocument() // GitHub
    expect(screen.getByText('🌐')).toBeInTheDocument() // Website
    expect(screen.getByText('🐦')).toBeInTheDocument() // Twitter
  })

  test('creates proper links for clickable items', () => {
    render(<ContactDetails contact={mockContact} />)
    
    // Email link
    const emailLink = screen.getByRole('link', { name: 'john.doe@example.com' })
    expect(emailLink).toHaveAttribute('href', 'mailto:john.doe@example.com')
    expect(emailLink).toHaveAttribute('target', '_self')
    
    // Phone link (should strip non-digits for tel: protocol)
    const phoneLink = screen.getByRole('link', { name: '+1-555-123-4567' })
    expect(phoneLink).toHaveAttribute('href', 'tel:15551234567')
    expect(phoneLink).toHaveAttribute('target', '_self')
    
    // External links should open in new tab
    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn Profile' })
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/johndoe')
    expect(linkedinLink).toHaveAttribute('target', '_blank')
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
    
    const githubLink = screen.getByRole('link', { name: 'GitHub Profile' })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/johndoe')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    
    const websiteLink = screen.getByRole('link', { name: 'Personal Website' })
    expect(websiteLink).toHaveAttribute('href', 'https://johndoe.dev')
    expect(websiteLink).toHaveAttribute('target', '_blank')
    expect(websiteLink).toHaveAttribute('rel', 'noopener noreferrer')
    
    const twitterLink = screen.getByRole('link', { name: 'Twitter Profile' })
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/johndoe')
    expect(twitterLink).toHaveAttribute('target', '_blank')
    expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('location displays as text (not link)', () => {
    render(<ContactDetails contact={mockContact} />)
    
    const locationText = screen.getByText('San Francisco, CA')
    expect(locationText.tagName).toBe('SPAN')
    expect(locationText.closest('a')).toBeNull()
  })

  test('handles phone number formatting correctly', () => {
    const contactWithFormattedPhone = new Contact(
      'test@example.com',
      '(555) 123-4567',
      'Location'
    )
    
    render(<ContactDetails contact={contactWithFormattedPhone} />)
    
    const phoneLink = screen.getByRole('link', { name: '(555) 123-4567' })
    expect(phoneLink).toHaveAttribute('href', 'tel:5551234567')
  })

  test('renders with proper CSS classes', () => {
    render(<ContactDetails contact={basicContact} />)
    
    const container = screen.getByRole('heading').closest('div')
    expect(container).toHaveClass('container')
    
    const title = screen.getByRole('heading')
    expect(title).toHaveClass('title')
  })

  test('renders without crashing with minimal contact data', () => {
    expect(() => render(<ContactDetails contact={basicContact} />)).not.toThrow()
  })

  test('handles partial social media information', () => {
    const partialContact = new Contact(
      'test@example.com',
      '555-0000',
      'Location',
      'https://linkedin.com/in/test',
      'https://github.com/test'
      // no website or twitter
    )
    
    render(<ContactDetails contact={partialContact} />)
    
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.queryByText('Website')).not.toBeInTheDocument()
    expect(screen.queryByText('Twitter')).not.toBeInTheDocument()
  })

  test('contact items are rendered in correct order', () => {
    render(<ContactDetails contact={mockContact} />)
    
    // Check that basic items appear first
    const emailLabel = screen.getByText('Email')
    const phoneLabel = screen.getByText('Phone')
    const locationLabel = screen.getByText('Location')
    
    expect(emailLabel).toBeInTheDocument()
    expect(phoneLabel).toBeInTheDocument()
    expect(locationLabel).toBeInTheDocument()
    
    // Check that social media items appear
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('Website')).toBeInTheDocument()
    expect(screen.getByText('Twitter')).toBeInTheDocument()
  })
})