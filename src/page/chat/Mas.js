import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Tooltip } from '@mui/material';
import { Image } from 'cloudinary-react';
import { useSelector } from 'react-redux';
const Mas = ({message}) => {
  const {user} = useSelector(state => state.user)
  console.log(user._id,  message.sender)
  console.log(user._id === message.sender)
  return (
    <div className='masseger'>
        <Tooltip title="منذ دقيقتين " placement="top">
        <p>
        {message && message.value}
        </p> 
        </Tooltip>
    </div>
  )
}

export default Mas