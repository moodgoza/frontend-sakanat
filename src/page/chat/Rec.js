import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Tooltip } from '@mui/material';
const Rec = () => {
  return (
    <div className='receiver'>
     <img src='/profile.jpg'/>
    <Tooltip title="منذ دقيقتين" placement="top">
     <p>
        مرحبا محمود الحمدلله انت كيفك طمنا عنك كيف حال الوالد
     </p> 
     </Tooltip>
 </div>
  )
}

export default Rec