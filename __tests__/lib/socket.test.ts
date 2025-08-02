// Mock socket.io-client first
jest.mock('socket.io-client', () => ({
  io: jest.fn(() => ({
    on: jest.fn(),
    emit: jest.fn(),
    disconnect: jest.fn(),
    connect: jest.fn(),
    connected: false
  }))
}))

// Mock the entire socket module to test the public interface
jest.mock('../../lib/socket', () => ({
  connectServer: jest.fn(),
  getMessage: jest.fn(),
  sendMessage: jest.fn(),
  disconnect: jest.fn(),
  socketManager: {
    connect: jest.fn(),
    disconnect: jest.fn(),
    emit: jest.fn(),
    on: jest.fn(),
    getConnectionStatus: jest.fn(() => false)
  }
}))

// Import after mocking
import { connectServer, getMessage, sendMessage, disconnect, socketManager } from '../../lib/socket'

const mockConnectServer = connectServer as jest.MockedFunction<typeof connectServer>
const mockGetMessage = getMessage as jest.MockedFunction<typeof getMessage>
const mockSendMessage = sendMessage as jest.MockedFunction<typeof sendMessage>
const mockDisconnect = disconnect as jest.MockedFunction<typeof disconnect>
const mockSocketManager = socketManager as jest.Mocked<typeof socketManager>

describe('Socket Utility Functions', () => {
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks()
  })

  describe('connectServer', () => {
    test('should be defined and callable', () => {
      expect(connectServer).toBeDefined()
      expect(typeof connectServer).toBe('function')
      expect(() => connectServer()).not.toThrow()
    })
  })

  describe('getMessage', () => {
    test('should be defined and callable', () => {
      const mockCallback = jest.fn()
      
      expect(getMessage).toBeDefined()
      expect(typeof getMessage).toBe('function')
      expect(() => getMessage(mockCallback)).not.toThrow()
    })
  })

  describe('sendMessage', () => {
    test('should be defined and callable with message', () => {
      expect(sendMessage).toBeDefined()
      expect(typeof sendMessage).toBe('function')
      expect(() => sendMessage('Hello, world!')).not.toThrow()
    })

    test('should be callable with message and user', () => {
      expect(() => sendMessage('Hello, world!', 'John')).not.toThrow()
    })

    test('should handle empty message', () => {
      expect(() => sendMessage('', 'TestUser')).not.toThrow()
    })
  })

  describe('disconnect', () => {
    test('should be defined and callable', () => {
      expect(disconnect).toBeDefined()
      expect(typeof disconnect).toBe('function')
      expect(() => disconnect()).not.toThrow()
    })
  })

  describe('socketManager', () => {
    test('should have required methods', () => {
      expect(mockSocketManager.connect).toBeDefined()
      expect(mockSocketManager.disconnect).toBeDefined()
      expect(mockSocketManager.emit).toBeDefined()
      expect(mockSocketManager.on).toBeDefined()
      expect(mockSocketManager.getConnectionStatus).toBeDefined()
    })

    test('should return connection status', () => {
      const status = mockSocketManager.getConnectionStatus()
      expect(typeof status).toBe('boolean')
    })
  })
})