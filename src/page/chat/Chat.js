import React from 'react'
import "./chatStyle.css"
import ChatContent from './ChatContent'
import ChatsList from './ChatsList'
const Chat = () => {
  return (
    <div className='chat-container'>
        <ChatContent/>
        <ChatsList/>
    </div>
  )
}

export default Chat