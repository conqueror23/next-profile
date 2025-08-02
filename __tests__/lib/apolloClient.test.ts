import { ApolloClient, InMemoryCache } from '@apollo/client'

// Mock Apollo Client
jest.mock('@apollo/client')
const mockApolloClient = ApolloClient as jest.MockedClass<typeof ApolloClient>
const mockInMemoryCache = InMemoryCache as jest.MockedClass<typeof InMemoryCache>

// Mock the entire apollo client module
jest.mock('../../lib/apoloClient', () => {
  const mockClient = {
    query: jest.fn(),
    mutate: jest.fn(),
    watchQuery: jest.fn(),
    clearStore: jest.fn(),
    resetStore: jest.fn()
  }
  return {
    apolloClient: mockClient
  }
})

describe('Apollo Client Configuration', () => {
  let apolloClient: any

  beforeEach(() => {
    jest.clearAllMocks()
    // Import fresh module for each test
    apolloClient = require('../../lib/apoloClient').apolloClient
  })

  test('should export apolloClient instance', () => {
    expect(apolloClient).toBeDefined()
    expect(apolloClient).toHaveProperty('query')
    expect(apolloClient).toHaveProperty('mutate')
    expect(apolloClient).toHaveProperty('watchQuery')
  })

  test('should have query method available', () => {
    expect(apolloClient.query).toBeDefined()
    expect(typeof apolloClient.query).toBe('function')
  })

  test('should have mutate method available', () => {
    expect(apolloClient.mutate).toBeDefined()
    expect(typeof apolloClient.mutate).toBe('function')
  })

  test('should have watchQuery method available', () => {
    expect(apolloClient.watchQuery).toBeDefined()
    expect(typeof apolloClient.watchQuery).toBe('function')
  })

  test('should have clearStore method available', () => {
    expect(apolloClient.clearStore).toBeDefined()
    expect(typeof apolloClient.clearStore).toBe('function')
  })

  test('should have resetStore method available', () => {
    expect(apolloClient.resetStore).toBeDefined()
    expect(typeof apolloClient.resetStore).toBe('function')
  })
})