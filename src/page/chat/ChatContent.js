import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Mas from './Mas';
import Rec from './Rec';
import { TextField, Tooltip } from '@mui/material'
const ChatContent = () => {
  return (
    <div className='chat-content'>
        
        <div className='chat-body'>
        <div className='chat-head'>
        <img src='/profile.jpg'/> 
            <span>محمود ابو غزة</span>
        </div>
        <hr/>
        <br/>
            <div className='messages'>
            <Mas/>
            <Rec/>
            <Mas/>
            <Rec/>
            <Mas/>
            <Rec/>
            <Mas/>
            <Rec/>
            <Mas/>
            <Rec/>
            <Mas/>
            <Rec/>
            </div> <br/><hr/>
            <div className='chat-send'>
            <TextField
             className="textarea"
          id="outlined-multiline-static"
          label="اكتب..."
          multiline
          rows={5}
        />
            <div className='button-container'>
                <button>ارسال</button>
            </div>
        </div>
        </div>
        
    </div>
  )
}

export default ChatContent