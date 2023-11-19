import React from "react";
import { Image } from "cloudinary-react";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import "./item.css";
import { useDispatch, useSelector } from "react-redux";
import itemService from "../../feature/item/itemService";
import {getItem} from '../../feature/item/itemSlice'
import { Navigate, useNavigate } from 'react-router-dom';
const Item = ({ item }) => {
  TimeAgo.addDefaultLocale(en);
  TimeAgo.addLocale(ru);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onDetailsHandler = async(e) => {
   
    navigate(`/item/${item._id}`);
  }
  return (
    <div className="item-card">
      <div className="item-card-header">
        <Image
          className="item-user-img"
          cloudName="dim6g5ogz"
          publicId={item.user.imagePublicId}
        />
        <div className="date-name">
          <span>محمود ابو عزة</span>
          <small>
          منذ ساعتين
          </small>
        </div>
      </div>
      <hr/>
      <div className="item-card-body">
        <Image
          className="body-item-img"
          cloudName="dim6g5ogz"
          publicId={item.mainImage}
        />
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
      <hr/>
      <div className="item-card-footer">
        <button onClick={onDetailsHandler}>التفاصيل</button>
      </div>
    </div>
  );
};

export default Item;
