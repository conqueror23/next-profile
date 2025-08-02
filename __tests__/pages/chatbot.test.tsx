// Mock the socket functions before importing
jest.mock('../../lib/socket', () => ({
  connectServer: jest.fn(),
  getMessage: jest.fn(),
  sendMessage: jest.fn(),
  disconnect: jest.fn(),
  socketManager: {
    on: jest.fn(),
    off: jest.fn(),
  }
}))

import { render, screen, waitFor, act } from '@testing-library/react'
import ChatBot from '../../pages/chatbot'
import { connectServer, getMessage, sendMessage, disconnect, socketManager } from '../../lib/socket'

const mockConnectServer = connectServer as jest.MockedFunction<typeof connectServer>
const mockGetMessage = getMessage as jest.MockedFunction<typeof getMessage>
const mockSendMessage = sendMessage as jest.MockedFunction<typeof sendMessage>
const mockDisconnect = disconnect as jest.MockedFunction<typeof disconnect>
const mockSocketManager = socketManager as jest.Mocked<typeof socketManager>

describe('ChatBot Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders chatbot interface', () => {
    render(<ChatBot />)
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Chatbot')
    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument()
  })

  test('shows connection status', () => {
    render(<ChatBot />)
    
    expect(screen.getByText('Disconnected')).toBeInTheDocument()
  })

  test('initializes socket connection on mount', () => {
    render(<ChatBot />)
    
    expect(mockConnectServer).toHaveBeenCalledTimes(1)
    expect(mockGetMessage).toHaveBeenCalledWith(expect.any(Function))
    expect(mockSocketManager.on).toHaveBeenCalledWith('connect', expect.any(Function))
    expect(mockSocketManager.on).toHaveBeenCalledWith('disconnect', expect.any(Function))
    expect(mockSocketManager.on).toHaveBeenCalledWith('connect_error', expect.any(Function))
  })

  test('displays empty message state initially', () => {
    render(<ChatBot />)
    
    expect(screen.getByText('No messages yet. Start a conversation!')).toBeInTheDocument()
  })

  test('input and send button are disabled when disconnected', () => {
    render(<ChatBot />)
    
    const input = screen.getByPlaceholderText('Type your message...')
    const sendButton = screen.getByRole('button', { name: 'Send' })
    
    expect(input).toBeDisabled()
    expect(sendButton).toBeDisabled()
  })

  test('can simulate connection state change', async () => {
    render(<ChatBot />)
    
    // Simulate connection by calling the connect handler
    const connectHandler = mockSocketManager.on.mock.calls.find(
      call => call[0] === 'connect'
    )?.[1]
    
    if (connectHandler) {
      await act(async () => {
        connectHandler('connected')
      })
    }
    
    await waitFor(() => {
      expect(screen.getByText('Connected')).toBeInTheDocument()
    })
  })

  test('displays bot responses in chat history', async () => {
    render(<ChatBot />)
    
    // Get the message handler that was registered
    const messageHandler = mockGetMessage.mock.calls[0]?.[0]
    
    // Simulate receiving a message from the bot
    if (messageHandler) {
      await act(async () => {
        messageHandler('Hello from bot!')
      })
    }
    
    await waitFor(() => {
      expect(screen.getByText('Hello from bot!')).toBeInTheDocument()
      expect(screen.getByText('Bot')).toBeInTheDocument()
    })
  })

  test('shows connection error when connection fails', async () => {
    render(<ChatBot />)
    
    // Simulate connection error
    const errorHandler = mockSocketManager.on.mock.calls.find(
      call => call[0] === 'connect_error'
    )?.[1]
    
    if (errorHandler) {
      await act(async () => {
        errorHandler({ message: 'Connection failed' })
      })
    }
    
    await waitFor(() => {
      expect(screen.getByText(/Error: Connection failed/)).toBeInTheDocument()
      expect(screen.getByText(/Make sure the Socket.io server is running/)).toBeInTheDocument()
    })
  })

  test('updates connection status on disconnect', async () => {
    render(<ChatBot />)
    
    // First connect
    const connectHandler = mockSocketManager.on.mock.calls.find(
      call => call[0] === 'connect'
    )?.[1]
    
    if (connectHandler) {
      await act(async () => {
        connectHandler('connected')
      })
    }
    
    await waitFor(() => {
      expect(screen.getByText('Connected')).toBeInTheDocument()
    })
    
    // Then disconnect
    const disconnectHandler = mockSocketManager.on.mock.calls.find(
      call => call[0] === 'disconnect'
    )?.[1]
    
    if (disconnectHandler) {
      await act(async () => {
        disconnectHandler('disconnect reason')
      })
    }
    
    await waitFor(() => {
      expect(screen.getByText('Disconnected')).toBeInTheDocument()
    })
  })

  test('disconnects socket on unmount', () => {
    const { unmount } = render(<ChatBot />)
    
    unmount()
    
    expect(mockDisconnect).toHaveBeenCalledTimes(1)
  })

  test('renders without crashing', () => {
    expect(() => render(<ChatBot />)).not.toThrow()
  })
})