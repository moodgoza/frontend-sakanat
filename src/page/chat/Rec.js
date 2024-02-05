import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Tooltip } from '@mui/material';
import { Image } from 'cloudinary-react';
const Rec = ({message}) => {
  console.log(message)
  return (
    <div className='receiver'>
    <Tooltip title="منذ دقيقتين" placement="top">
     <p>
      {message && message.value}
     </p> 
     </Tooltip>
 </div>
  )
}

export default Rec