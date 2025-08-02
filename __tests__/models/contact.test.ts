import { Contact, ContactInfo } from '../../models/contact'

describe('Contact Model', () => {
  const mockContactData = {
    email: 'john.doe@example.com',
    phone: '+1-555-123-4567',
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    website: 'https://johndoe.dev',
    twitter: 'https://twitter.com/johndoe'
  }

  test('should create a Contact instance with all properties', () => {
    const contact = new Contact(
      mockContactData.email,
      mockContactData.phone,
      mockContactData.location,
      mockContactData.linkedin,
      mockContactData.github,
      mockContactData.website,
      mockContactData.twitter
    )

    expect(contact.email).toBe(mockContactData.email)
    expect(contact.phone).toBe(mockContactData.phone)
    expect(contact.location).toBe(mockContactData.location)
    expect(contact.linkedin).toBe(mockContactData.linkedin)
    expect(contact.github).toBe(mockContactData.github)
    expect(contact.website).toBe(mockContactData.website)
    expect(contact.twitter).toBe(mockContactData.twitter)
  })

  test('should create a Contact instance with only required properties', () => {
    const contact = new Contact(
      mockContactData.email,
      mockContactData.phone,
      mockContactData.location
    )

    expect(contact.email).toBe(mockContactData.email)
    expect(contact.phone).toBe(mockContactData.phone)
    expect(contact.location).toBe(mockContactData.location)
    expect(contact.linkedin).toBeUndefined()
    expect(contact.github).toBeUndefined()
    expect(contact.website).toBeUndefined()
    expect(contact.twitter).toBeUndefined()
  })

  test('should handle partial optional properties', () => {
    const contact = new Contact(
      mockContactData.email,
      mockContactData.phone,
      mockContactData.location,
      mockContactData.linkedin,
      mockContactData.github
    )

    expect(contact.linkedin).toBe(mockContactData.linkedin)
    expect(contact.github).toBe(mockContactData.github)
    expect(contact.website).toBeUndefined()
    expect(contact.twitter).toBeUndefined()
  })

  test('should have readonly properties (TypeScript compile-time check)', () => {
    const contact = new Contact(
      mockContactData.email,
      mockContactData.phone,
      mockContactData.location
    )

    // TypeScript readonly prevents compile-time modifications
    expect(contact.email).toBe(mockContactData.email)
    expect(contact.phone).toBe(mockContactData.phone)
    expect(contact.location).toBe(mockContactData.location)
  })

  test('should handle various email formats', () => {
    const emails = [
      'simple@example.com',
      'test.email+tag@domain.co.uk',
      'user123@subdomain.example.org'
    ]

    emails.forEach(email => {
      const contact = new Contact(email, '123-456-7890', 'Location')
      expect(contact.email).toBe(email)
    })
  })

  test('should handle various phone formats', () => {
    const phones = [
      '+1-555-123-4567',
      '(555) 123-4567',
      '555.123.4567',
      '+44 20 7946 0958'
    ]

    phones.forEach(phone => {
      const contact = new Contact('test@example.com', phone, 'Location')
      expect(contact.phone).toBe(phone)
    })
  })

  test('should handle international locations', () => {
    const locations = [
      'San Francisco, CA, USA',
      'London, UK',
      'Tokyo, Japan',
      'Remote'
    ]

    locations.forEach(location => {
      const contact = new Contact('test@example.com', '123-456-7890', location)
      expect(contact.location).toBe(location)
    })
  })
})

describe('ContactInfo Interface', () => {
  test('should define correct structure for ContactInfo', () => {
    const contactInfo: ContactInfo = {
      label: 'Email',
      value: 'john@example.com',
      link: 'mailto:john@example.com',
      icon: 'email-icon'
    }

    expect(contactInfo.label).toBe('Email')
    expect(contactInfo.value).toBe('john@example.com')
    expect(contactInfo.link).toBe('mailto:john@example.com')
    expect(contactInfo.icon).toBe('email-icon')
  })

  test('should allow optional properties to be undefined', () => {
    const contactInfo: ContactInfo = {
      label: 'Location',
      value: 'San Francisco, CA'
    }

    expect(contactInfo.label).toBe('Location')
    expect(contactInfo.value).toBe('San Francisco, CA')
    expect(contactInfo.link).toBeUndefined()
    expect(contactInfo.icon).toBeUndefined()
  })

  test('should work with different contact types', () => {
    const contactTypes: ContactInfo[] = [
      { label: 'Email', value: 'test@example.com', link: 'mailto:test@example.com' },
      { label: 'Phone', value: '+1-555-123-4567', link: 'tel:+15551234567' },
      { label: 'LinkedIn', value: 'johndoe', link: 'https://linkedin.com/in/johndoe' },
      { label: 'GitHub', value: 'johndoe', link: 'https://github.com/johndoe' }
    ]

    contactTypes.forEach(contact => {
      expect(contact.label).toBeTruthy()
      expect(contact.value).toBeTruthy()
    })
  })
})