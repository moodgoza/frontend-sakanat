import React from 'react'
import { Search } from '@mui/icons-material'
import SingleChat from './SingleChat'
const ChatsList = () => {
  return (
    <div className='chatlist-container'>
        <div className='chatlist-head'>
        <strong>المحادثات</strong>
                <input className='search-input' placeholder='بحث...'/>
                
        </div>
        <div className='chatlist-body'>
            <SingleChat/>
            <hr/>
            <SingleChat/>
            <hr/>
            <SingleChat/>
            <hr/>
            <SingleChat/>
            <hr/>

            <SingleChat/>
            <hr/>
            <SingleChat/>
            <hr/>
            <SingleChat/>
            <hr/>
            <SingleChat/>
            <hr/>
        </div>
    </div>
  )
}

export default ChatsList