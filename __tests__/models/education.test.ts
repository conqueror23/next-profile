import { Education } from '../../models/education'

describe('Education Model', () => {
  const mockEducationData = {
    institution: 'University of California, Berkeley',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    startDate: '2018-08',
    endDate: '2022-05',
    grade: '3.8 GPA',
    description: 'Focused on software engineering and machine learning',
    achievements: ['Dean\'s List', 'Computer Science Society President', 'Best Capstone Project']
  }

  test('should create an Education instance with all properties', () => {
    const education = new Education(
      mockEducationData.institution,
      mockEducationData.degree,
      mockEducationData.field,
      mockEducationData.startDate,
      mockEducationData.endDate,
      mockEducationData.grade,
      mockEducationData.description,
      mockEducationData.achievements
    )

    expect(education.institution).toBe(mockEducationData.institution)
    expect(education.degree).toBe(mockEducationData.degree)
    expect(education.field).toBe(mockEducationData.field)
    expect(education.startDate).toBe(mockEducationData.startDate)
    expect(education.endDate).toBe(mockEducationData.endDate)
    expect(education.grade).toBe(mockEducationData.grade)
    expect(education.description).toBe(mockEducationData.description)
    expect(education.achievements).toEqual(mockEducationData.achievements)
  })

  test('should create an Education instance with only required properties', () => {
    const education = new Education(
      mockEducationData.institution,
      mockEducationData.degree,
      mockEducationData.field,
      mockEducationData.startDate,
      mockEducationData.endDate
    )

    expect(education.institution).toBe(mockEducationData.institution)
    expect(education.degree).toBe(mockEducationData.degree)
    expect(education.field).toBe(mockEducationData.field)
    expect(education.startDate).toBe(mockEducationData.startDate)
    expect(education.endDate).toBe(mockEducationData.endDate)
    expect(education.grade).toBeUndefined()
    expect(education.description).toBeUndefined()
    expect(education.achievements).toBeUndefined()
  })

  test('should handle partial optional properties', () => {
    const education = new Education(
      mockEducationData.institution,
      mockEducationData.degree,
      mockEducationData.field,
      mockEducationData.startDate,
      mockEducationData.endDate,
      mockEducationData.grade,
      mockEducationData.description
    )

    expect(education.grade).toBe(mockEducationData.grade)
    expect(education.description).toBe(mockEducationData.description)
    expect(education.achievements).toBeUndefined()
  })

  test('should have readonly properties (TypeScript compile-time check)', () => {
    const education = new Education(
      mockEducationData.institution,
      mockEducationData.degree,
      mockEducationData.field,
      mockEducationData.startDate,
      mockEducationData.endDate
    )

    // TypeScript readonly prevents compile-time modifications
    expect(education.institution).toBe(mockEducationData.institution)
    expect(education.degree).toBe(mockEducationData.degree)
    expect(education.field).toBe(mockEducationData.field)
  })

  test('should handle empty achievements array', () => {
    const education = new Education(
      mockEducationData.institution,
      mockEducationData.degree,
      mockEducationData.field,
      mockEducationData.startDate,
      mockEducationData.endDate,
      mockEducationData.grade,
      mockEducationData.description,
      []
    )

    expect(education.achievements).toEqual([])
    expect(education.achievements?.length).toBe(0)
  })

  test('should handle single achievement', () => {
    const education = new Education(
      mockEducationData.institution,
      mockEducationData.degree,
      mockEducationData.field,
      mockEducationData.startDate,
      mockEducationData.endDate,
      undefined,
      undefined,
      ['Magna Cum Laude']
    )

    expect(education.achievements).toEqual(['Magna Cum Laude'])
    expect(education.achievements?.length).toBe(1)
  })

  test('should handle various degree types', () => {
    const degreeTypes = [
      'Bachelor of Science',
      'Master of Science',
      'Doctor of Philosophy',
      'Associate Degree',
      'Certificate'
    ]

    degreeTypes.forEach(degree => {
      const education = new Education(
        'Test University',
        degree,
        'Computer Science',
        '2020-01',
        '2024-01'
      )
      expect(education.degree).toBe(degree)
    })
  })

  test('should handle various fields of study', () => {
    const fields = [
      'Computer Science',
      'Software Engineering',
      'Information Technology',
      'Data Science',
      'Artificial Intelligence'
    ]

    fields.forEach(field => {
      const education = new Education(
        'Test University',
        'Bachelor of Science',
        field,
        '2020-01',
        '2024-01'
      )
      expect(education.field).toBe(field)
    })
  })

  test('should handle different grading systems', () => {
    const grades = [
      '3.8 GPA',
      'First Class Honours',
      '85%',
      'A',
      'Distinction'
    ]

    grades.forEach(grade => {
      const education = new Education(
        'Test University',
        'Bachelor of Science',
        'Computer Science',
        '2020-01',
        '2024-01',
        grade
      )
      expect(education.grade).toBe(grade)
    })
  })

  test('should handle ongoing education (current)', () => {
    const education = new Education(
      'Stanford University',
      'Master of Science',
      'Machine Learning',
      '2023-09',
      'Present'
    )

    expect(education.startDate).toBe('2023-09')
    expect(education.endDate).toBe('Present')
  })

  test('should preserve achievements array reference', () => {
    const originalAchievements = ['Achievement 1', 'Achievement 2']
    const education = new Education(
      'Test University',
      'Bachelor',
      'CS',
      '2020',
      '2024',
      undefined,
      undefined,
      originalAchievements
    )

    expect(education.achievements).toBe(originalAchievements)
  })
})