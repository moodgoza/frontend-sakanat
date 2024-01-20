import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import "./register.css";
import { register } from "../../feature/user/userSlice";
import { reset } from "../../feature/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MuiFileInput } from "mui-file-input";
import styled from "@emotion/styled";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [information, setInformation] = useState({
    firstName: "",
    lastName: "",
    city: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNumber: ""
  });

  let { isLoading, isSuccess, isError, message, user } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "l0moj8hc");
    const d1 = await axios.post(
      "https://api.cloudinary.com/v1_1/dim6g5ogz/image/upload",
      formData
    );
    const { public_id } = d1.data;
    console.log({ ...information, imagePublicId: public_id })
    const data = await dispatch(
      register({ ...information, imagePublicId: public_id })
    );
    console.log(data);
  };

  const onInformationChange = (e) => {
    setInformation((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(information);
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess || user) {
      navigate("/");
    }
  });
  return (
    <div>
      <img src="/mainbg.jpg" className="mainbg" />
      <div className="overlayBlur">
        <div className="register-card">
          <div className="register-head">
            <h3>التسجيل بالموقع</h3>
          </div>
          <div className="cont">
            <div className="section1">
              <input
                type="text"
                onChange={onInformationChange}
                name="firstName"
                placeholder="الاسم الاول"
              />
              <input
                type="text"
                onChange={onInformationChange}
                name="email"
                placeholder="الايميل"
              />
              <input
                onChange={onInformationChange}
                type="password"
                name="password"
                placeholder="كلمة السر"
              />
              
              
              <input type="file" size="60" onChange={onFileChange} />
                
             
            </div>

            <div className="section2">
              <input
                type="text"
                onChange={onInformationChange}
                name="lastName"
                placeholder="اسم العائلة"
              />
              <input
                type="text"
                onChange={onInformationChange}
                name="city"
                placeholder="البلد"
              />
              <input
                onChange={onInformationChange}
                type="password"
                name="confirmPassword"
                placeholder="تاكيد كلمة السر"
              />
              <input
                onChange={onInformationChange}
                type="password"
                name="phoneNumber"
                placeholder="رقم الهاتف"
              />
            </div>
          </div>

          <button onClick={onSubmit}>تسجيل</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
