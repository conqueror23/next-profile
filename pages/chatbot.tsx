import type { NextPage } from 'next'
import { getMessage, sendMessage, socketManager, connectServer, disconnect } from '../lib/socket'
import { useState, useEffect, useRef } from 'react'

interface Message {
  id: string
  user: string
  text: string
  timestamp: number
}

const ChatBot: NextPage = () => {
  const [currentMessage, setCurrentMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const messageIdRef = useRef(0)

  useEffect(() => {
    connectServer()

    const handleMessage = (data: string) => {
      const newMessage: Message = {
        id: `msg-${messageIdRef.current++}`,
        user: 'Bot',
        text: data,
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, newMessage])
    }

    const handleConnect = (data: string) => {
      console.log("connected", data)
      setIsConnected(true)
      setConnectionError(null)
    }

    const handleDisconnect = () => {
      setIsConnected(false)
    }

    const handleError = (error: any) => {
      setConnectionError(error.message || 'Connection error')
      setIsConnected(false)
    }
    const handlerServerMessage = (data: string) => {
      console.log("message get from backend", data)
    }

    getMessage(handleMessage)

    socketManager.on('connect', handleConnect)
    socketManager.on("response", handlerServerMessage)
    socketManager.on('disconnect', handleDisconnect)
    socketManager.on('connect_error', handleError)
    socketManager.on('error', handleError)

    return () => {
      disconnect()
    }
  }, [])

  const handleSendMessage = () => {
    if (!currentMessage.trim() || !isConnected) return

    const userMessage: Message = {
      id: `msg-${messageIdRef.current++}`,
      user: 'User',
      text: currentMessage,
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, userMessage])
    sendMessage(currentMessage)
    setCurrentMessage('')
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1>Chatbot</h1>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '10px'
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: isConnected ? '#4CAF50' : '#f44336'
          }} />
          <span>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        {connectionError && (
          <div style={{ color: '#f44336', marginBottom: '10px' }}>
            Error: {connectionError}
            <br />
            <small>Make sure the Socket.io server is running on localhost:5005</small>
          </div>
        )}
      </div>

      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        height: '400px',
        overflowY: 'auto',
        padding: '10px',
        marginBottom: '20px',
        backgroundColor: '#f9f9f9'
      }}>
        {messages.length === 0 ? (
          <div style={{ color: '#666', textAlign: 'center', paddingTop: '20px' }}>
            No messages yet. Start a conversation!
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} style={{
              marginBottom: '10px',
              padding: '8px 12px',
              borderRadius: '12px',
              backgroundColor: message.user === 'User' ? '#007bff' : '#e9ecef',
              color: message.user === 'User' ? 'white' : 'black',
              alignSelf: message.user === 'User' ? 'flex-end' : 'flex-start',
              maxWidth: '70%',
              marginLeft: message.user === 'User' ? 'auto' : '0',
              marginRight: message.user === 'User' ? '0' : 'auto'
            }}>
              <div style={{ fontWeight: 'bold', fontSize: '0.8em', marginBottom: '4px' }}>
                {message.user}
              </div>
              <div>{message.text}</div>
            </div>
          ))
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type='text'
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder='Type your message...'
          disabled={!isConnected}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '14px'
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={!isConnected || !currentMessage.trim()}
          style={{
            padding: '10px 20px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: isConnected && currentMessage.trim() ? '#007bff' : '#ccc',
            color: 'white',
            cursor: isConnected && currentMessage.trim() ? 'pointer' : 'not-allowed'
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}
export default ChatBot
