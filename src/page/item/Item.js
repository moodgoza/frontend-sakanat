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
          <small>منذ ساعتين</small>
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
