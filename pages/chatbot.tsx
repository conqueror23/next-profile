import type { NextPage } from 'next'
import { getMessage, sendMessage, socket } from '../components/socket'
import { useState } from "react"
const ChatBot: NextPage = () => {
  const [chatMessage, setChatMessage] = useState("hi")
  const [socketMsg, setSocketMsg] = useState()

  getMessage(setSocketMsg)
  return (
    <>
      <div>
        <h1>Latest Socket Message</h1>
        <p>{chatMessage}</p>

        <h2>last messags </h2>
        <p>{socketMsg}</p>
        <h2>-----</h2>
      </div>
      <button onClick={() => getMessage(setChatMessage)}>
        Get Message
      </button >
      <input
        type='text'
        placeholder={chatMessage}
        onKeyUp={(e) => setChatMessage(e.currentTarget.value)}
      />
      <button onClick={() => {
        console.log("we are sending message")
        sendMessage(chatMessage)
      }
      }
      >
        Send Message
      </button>
    </>
  )
}
export default ChatBot
