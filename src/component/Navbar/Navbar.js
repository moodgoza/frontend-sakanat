import React from "react";
import "./navbar.css";
import { ImOffice } from "react-icons/im";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../feature/user/userSlice";
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
    reset();
    await dispatch(logout())
  }
  console.log(user);
  return (
    <nav className={user ? 'container1' : 'container1 logged'}>
      <div className="rightSide">
        {!user && <Tooltip title="دخول" placement="top"><a href="/login" className="smallLogo"><span>تسجيل دخول</span><LoginIcon/></a></Tooltip>}
        {!user && <Tooltip title="تسجيل" placement="top"><a href="/register" className="smallLogo"><span>انشاء حساب</span><PersonAddAltIcon/></a></Tooltip>}
        {user && <Tooltip title="خروج" placement="top"><a className="logout" onClick={logoutHandler}><LogoutIcon/></a></Tooltip>}
        { user && (<a href={`/profile/${user._id}`} className="smallLogo">{user.firstName}<Image className="profile-img" cloudName="dim6g5ogz" publicId={user.imagePublicId}/></a> )}
      </div>
      <div className="leftSide">
        {user && <Tooltip title="الوارد" placement="top"><a href="/chat" className="smallLogo"><span>الوارد</span><MailOutlineIcon/></a></Tooltip>}
        {user && <Tooltip title="العروض" placement="top"><a href="/item" className="smallLogo"><span>العروض</span><HomeWorkIcon/></a></Tooltip>}
        <a className="logo" href="/"><h4>sakanat</h4><ImOffice /></a>
      </div>
    </nav>
  );
};

export default Navbar;
