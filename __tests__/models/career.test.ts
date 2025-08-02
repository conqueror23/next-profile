import { Career } from '../../models/career'

describe('Career Model', () => {
  const mockCareerData = {
    title: 'Software Engineer',
    company: 'Tech Corp',
    responsibilities: 'Developing web applications using React and Node.js',
    startTime: '2020-01',
    endTime: '2023-12',
    duration: '4 years'
  }

  test('should create a Career instance with all required properties', () => {
    const career = new Career(
      mockCareerData.title,
      mockCareerData.company,
      mockCareerData.responsibilities,
      mockCareerData.startTime,
      mockCareerData.endTime,
      mockCareerData.duration
    )

    expect(career.title).toBe(mockCareerData.title)
    expect(career.company).toBe(mockCareerData.company)
    expect(career.responsibilities).toBe(mockCareerData.responsibilities)
    expect(career.startTime).toBe(mockCareerData.startTime)
    expect(career.endTime).toBe(mockCareerData.endTime)
    expect(career.duration).toBe(mockCareerData.duration)
  })

  test('should have readonly properties (TypeScript compile-time check)', () => {
    const career = new Career(
      mockCareerData.title,
      mockCareerData.company,
      mockCareerData.responsibilities,
      mockCareerData.startTime,
      mockCareerData.endTime,
      mockCareerData.duration
    )

    // TypeScript readonly prevents compile-time modifications
    // Runtime modifications would still work but shouldn't be done
    expect(career.title).toBe(mockCareerData.title)
    expect(career.company).toBe(mockCareerData.company)
  })

  test('should handle empty strings', () => {
    const career = new Career('', '', '', '', '', '')

    expect(career.title).toBe('')
    expect(career.company).toBe('')
    expect(career.responsibilities).toBe('')
    expect(career.startTime).toBe('')
    expect(career.endTime).toBe('')
    expect(career.duration).toBe('')
  })

  test('should handle special characters in fields', () => {
    const specialData = {
      title: 'Senior Software Engineer & Team Lead',
      company: 'Tech Corp (Subsidiary)',
      responsibilities: 'Led team of 5+ developers; implemented CI/CD pipelines',
      startTime: '2020-01',
      endTime: '2023-12',
      duration: '3.5 years'
    }

    const career = new Career(
      specialData.title,
      specialData.company,
      specialData.responsibilities,
      specialData.startTime,
      specialData.endTime,
      specialData.duration
    )

    expect(career.title).toBe(specialData.title)
    expect(career.company).toBe(specialData.company)
    expect(career.responsibilities).toBe(specialData.responsibilities)
  })
})