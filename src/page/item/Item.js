import React from "react";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import "./item.css";
import { useDispatch, useSelector } from "react-redux";
import itemService from "../../feature/item/itemService";
import { getItem } from "../../feature/item/itemSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { Effect } from "@cloudinary/url-gen/actions/effect";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { byAngle } from "@cloudinary/url-gen/actions/rotate";
import { AdvancedImage, lazyload, placeholder, responsive } from "@cloudinary/react";
const Item = ({ item }) => {
  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  
  function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    let minutes = date.getMinutes();
  
    if (minutes < 10) {
      // Adding leading zero to minutes
      minutes = `0${ minutes }`;
    }
  
    if (prefomattedDate) {
      // Today at 10:20
      // Yesterday at 10:20
      return `${ prefomattedDate } at ${ hours }:${ minutes }`;
    }
  
    if (hideYear) {
      // 10. January at 10:20
      return `${ day }. ${ month } at ${ hours }:${ minutes }`;
    }
  
    // 10. January 2017. at 10:20
    return `${ day }. ${ month } ${ year }. at ${ hours }:${ minutes }`;
  }
  
  
  // --- Main function
  function timeAgo(dateParam) {
    if (!dateParam) {
      return null;
    }
  
    const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();
  
  
    if (seconds < 5) {
      return 'now';
    } else if (seconds < 60) {
      return `${ seconds } seconds ago`;
    } else if (seconds < 90) {
      return 'about a minute ago';
    } else if (minutes < 60) {
      return `${ minutes } minutes ago`;
    } else if (isToday) {
      return getFormattedDate(date, 'Today'); // Today at 10:20
    } else if (isYesterday) {
      return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
    } else if (isThisYear) {
      return getFormattedDate(date, false, true); // 10. January at 10:20
    }
  
    return getFormattedDate(date); // 10. January 2017. at 10:20
  }
  const {user} = useSelector(state => state.user);
  TimeAgo.addDefaultLocale(en);
  TimeAgo.addLocale(ru);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if(!user)
  {
    navigate('/')
  }
  const onDetailsHandler = async (e) => {
    navigate(`/item/${item._id}`);
  };

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dim6g5ogz'
    }
  })

  const myImage = cld.image(item.mainImage);
  const image = 
  myImage
  


  return (
    <div className="item-card">
      <div className="item-card-header">
        <Image
          className="item-user-img"
          cloudName="dim6g5ogz"
          publicId={item.user.imagePublicId}
          onClick={() => {navigate(`/profile/${item.user._id}`);}}
        />

        <div className="date-name" >
          <span onClick={onDetailsHandler}>{item.user.firstName + ' ' + item.user.lastName} </span>
          <small>{timeAgo(item.createdAt)}</small>
        </div>
      </div>
      <hr />
      <div className="item-card-body">
       
          
      
        <AdvancedImage  className="body-item-img" cldImg={image} />
        <div>
          <div>
            <span>المدينة: {item.city}</span>
            <span>المنطقة: {item.region}</span>
          </div>
          <div>
            <span>السعر: {item.price}</span>
            <span>النوع: {item.type === "1" ? "شقة" : "بيت منفصل"}</span>
          </div>
        </div>
      </div>
      <hr />
      <div className="item-card-footer">
        <button className="details-button" onClick={onDetailsHandler}>
          التفاصيل
        </button>
      </div>
    </div>
  );
};

export default Item;
