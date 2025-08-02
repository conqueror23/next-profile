import handler from '../../../pages/api/hello'
import { createMocks } from 'node-mocks-http'
import type { NextApiRequest, NextApiResponse } from 'next'

describe('/api/hello API route', () => {
  test('returns correct response for GET request', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    
    const data = JSON.parse(res._getData())
    expect(data).toEqual({
      name: 'John Doe'
    })
  })

  test('returns correct response for POST request', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    
    const data = JSON.parse(res._getData())
    expect(data).toEqual({
      name: 'John Doe'
    })
  })

  test('returns correct response for any HTTP method', async () => {
    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
    
    for (const method of methods) {
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method,
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(200)
      
      const data = JSON.parse(res._getData())
      expect(data).toEqual({
        name: 'John Doe'
      })
    }
  })

  test('response has correct content type', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    })

    await handler(req, res)

    expect(res.getHeader('content-type')).toEqual('application/json')
  })

  test('response data structure matches type definition', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    })

    await handler(req, res)

    const data = JSON.parse(res._getData())
    
    // Check that response matches the Data type
    expect(data).toHaveProperty('name')
    expect(typeof data.name).toBe('string')
    expect(data.name).toBe('John Doe')
  })

  test('handles request without query parameters', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: {},
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.name).toBe('John Doe')
  })

  test('handles request with query parameters', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: {
        test: 'value',
        another: 'param'
      },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.name).toBe('John Doe')
  })

  test('handles request with body data', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        test: 'data',
        user: 'testuser'
      },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.name).toBe('John Doe')
  })

  test('response is valid JSON', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    })

    await handler(req, res)

    const responseData = res._getData()
    expect(() => JSON.parse(responseData)).not.toThrow()
  })

  test('handler function exists and is callable', () => {
    expect(typeof handler).toBe('function')
    expect(handler.length).toBe(2) // Should accept req and res parameters
  })
})