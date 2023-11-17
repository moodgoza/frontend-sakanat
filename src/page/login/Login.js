import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./login.css"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login, logout } from '../../feature/user/userSlice';
const Login = () => {
  const navigate = useNavigate();
  const [information, setInformation] = useState({
    email: "",
    password: ""
  });
 
  let { isLoading, isSuccess, isError, message, user } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    else if (isSuccess || user) {
      navigate("/");
    }
  });

  const onSubmit = async() => {
    const data = dispatch(login(information));
    console.log(data);
  }

  const onInformationChange = (e) => {
    setInformation((prevState) => ( {...prevState, [e.target.name] : e.target.value}));
    console.log(information);
  }
  return (
   <div>
     <img src='/mainbg.jpg' className='mainbg'/>
    <div className='overlayBlur'>
<div className='login'>
      
      <div className='login-head'>
      <h3> تسجيل الدخول</h3>
      </div>
     <div className='cont'>
      <div className='section'>
      <input type='text'  onChange={onInformationChange}  name="email" placeholder='ايميل'/>
      <input  onChange={onInformationChange} type='password'  name="password" placeholder='كلمة السر'/>
      </div>
     </div>
     <button onClick={onSubmit}>
        دخول
      </button>
     
    </div>
    </div>
   </div>
  )
}

export default Login