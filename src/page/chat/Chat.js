import React from 'react'
import "./chatStyle.css"
import ChatContent from './ChatContent'
import ChatsList from './ChatsList'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
const socket = io.connect("http://localhost:5000")
const Chat = () => {
  const {user} = useSelector(state => state.user);
  const navigate = useNavigate();
  if(!user)
  {navigate('/')}
  return (
    <div className='chat-container'>
        <ChatContent socket={socket}/>
        <ChatsList socket={socket} />
    </div>
  )
}

export default Chat