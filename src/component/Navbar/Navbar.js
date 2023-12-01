import React from "react";
import "./navbar.css";
import { ImOffice } from "react-icons/im";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../feature/user/userSlice";
import { Image } from "cloudinary-react";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Tooltip } from "@mui/material";
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
    <nav className={user ? 'container1' : 'container1 logged'}>
      
      <a className="logo" href="/"><ImOffice /><h4>sakanat</h4></a>
      { user && (<a href={`/profile/${user._id}`}><Image className="profile-img" cloudName="dim6g5ogz" publicId={user.imagePublicId}/></a> )}
      {!user && <Tooltip title="دخول" placement="top"><a href="/login"><LoginIcon/></a></Tooltip>}
      {!user && <Tooltip title="تسجيل" placement="top"><a href="/register"><PersonAddAltIcon/></a></Tooltip>}
      {user && <Tooltip title="خروج" placement="top"><a className="logout" onClick={logoutHandler}><LogoutIcon/></a></Tooltip>}
      {user && <Tooltip title="الوارد" placement="top"><a href="/chat"><MailOutlineIcon/></a></Tooltip>}
      {user && <Tooltip title="العروض" placement="top"><a href="/item"><HomeWorkIcon/></a></Tooltip>}
    </nav>
  );
};

export default Navbar;
