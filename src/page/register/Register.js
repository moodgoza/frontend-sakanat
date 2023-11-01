import React, { useState } from 'react'
import { TextField } from '@mui/material'
import "./register.css"
const Register = () => {

  const [information, setInformation] = useState({
    firstName: "",
    lastName: "",
    city: "",
    password: "",
    confirmPassword: "",
    email: ""
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
    <div className='card'>
      <div className='register-head'>
      <h3>التسجيل بالموقع</h3>
      </div>
     <div className='cont'>
     <div className='section1'>
      <TextField onChange={onInformationChange} className='inp' name="fisrtName" label="الاسم الاول" variant="standard" />
      <TextField onChange={onInformationChange} className='inp' name="email"  label="الايميل" variant="standard" />
      <TextField onChange={onInformationChange} type='password' className='inp' name="password"  label="كلمة السر" variant="standard" />

      </div>

      <div className='section2'>
      <TextField onChange={onInformationChange} className='inp' name="lastName" label="اسم العائلة" variant="standard" />
      <TextField onChange={onInformationChange} className='inp' name="city"  label="البلد" variant="standard" />
      <TextField onChange={onInformationChange} type='password' className='inp' name="confirmPassword"  label="تاكيد كلمة السر" variant="standard" />
      </div>
     </div>
     <button onClick={onSubmit}>
        تسجيل
      </button>
     
    </div>
  )
}

export default Register