import React, { useEffect } from 'react'
import { Search } from '@mui/icons-material'
import SingleChat from './SingleChat'
import { useDispatch, useSelector } from 'react-redux'
import { getChats } from '../../feature/chat/chatSlice'
import { CircularProgress } from '@mui/material'
const ChatsList = ({socket}) => {
  const {chats, isLoading} = useSelector(state => state.chat);
  const {user} = useSelector(state => state.user)
  const dispatch = useDispatch();
  
  useEffect(() => {
    const featchedData = async() => {
      const data = await dispatch(getChats(user._id));
    return data;
    }
  
    featchedData()
    .then(data => console.log(chats))
  }, [])

  
 console.log(chats)
  return (
    <div className='chatlist-container'>
        <div className='chatlist-head'>
        <strong><h3>المحادثات</h3></strong>
                <input className='search-input' placeholder='بحث...'/>
                
        </div>
        <div className='chatlist-body'>
            {chats && chats.map(c => {
              return <>
              <SingleChat socket={socket} chat={c} />
            </>
            })}
            
        </div>
    </div>
  )
}

export default ChatsList