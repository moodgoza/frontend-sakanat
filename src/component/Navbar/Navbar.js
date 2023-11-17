import React from "react";
import "./navbar.css";
import { ImOffice } from "react-icons/im";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../feature/user/userSlice";
import { Image } from "cloudinary-react";
const Navbar = () => {

  let { isLoading, isSuccess, isError, message, user, kk } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const logoutHandler = async(e) => {
    await dispatch(logout())
  }
  console.log(user);
  return (
    <nav className={user ? 'container1' : 'container1 hoto'}>
      
      <a className="logo" href="/"><ImOffice /><h4>sakanat</h4></a>
      { user && (<><Image className="profile-img" cloudName="dim6g5ogz" publicId={user.imagePublicId}/><span>{user.firstName }</span></> )}
      {!user && <a href="/login">دخول</a>}
      {!user && <a href="/register">تسجيل</a>}
      {user && <a className="logout" onClick={logoutHandler}>خروج</a>}
      {user && <a href="/chat">الوارد</a>}
      {user && <a href="/item">العروض</a>}
    </nav>
  );
};

export default Navbar;
