import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Tooltip } from '@mui/material';
const Rec = ({message}) => {
  return (
    <div className='receiver'>
     <img src='/profile.jpg'/>
    <Tooltip title="منذ دقيقتين" placement="top">
     <p>
      {message && message.value}
     </p> 
     </Tooltip>
 </div>
  )
}

export default Rec