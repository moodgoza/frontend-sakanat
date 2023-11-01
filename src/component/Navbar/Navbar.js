import React from "react";
import "./navbar.css";
import { ImOffice } from "react-icons/im";
import { Link, NavLink, Navigate } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="container">
      <a className="logo" href="/"><ImOffice /><h4>sakanat</h4></a>

      <a href="/login">دخول</a>
      <a href="/register">تسجيل</a>
      
    </nav>
  );
};

export default Navbar;
