import { TextField } from '@mui/material'
import React, { useState } from 'react'
import "./login.css"
const Login = () => {
  const [information, setInformation] = useState({
    email: "",
    password: ""
  });
  const onSubmit = () => {
    console.log("sdadsa")
    //send them to server
  }

  const onInformationChange = (e) => {
    setInformation((prevState) => ( {...prevState, [e.target.name] : e.target.value}));
    console.log(information);
  }
  return (
    <div className='login'>
      <div className='login-head'>
      <h3> تسجيل الدخول</h3>
      </div>
     <div className='cont'>
      <div className='section'>
      <TextField endAdornment="dsa" onChange={onInformationChange} className='inp' name="password"  label="الايميل" variant="standard" />
      <TextField onChange={onInformationChange} type='password' className='inp' name="confirmPassword"  label="تاكيد كلمة السر" variant="standard" />
      </div>
     </div>
     <button onClick={onSubmit}>
        دخول
      </button>
     
    </div>
  )
}

export default Login