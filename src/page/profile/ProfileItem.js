import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProfileItem = ({item}) => {
    const navigate = useNavigate();
    const onDetailsHandler = async (e) => {
        navigate(`/item/${item._id}`);
      };
  return (
    <div className='profile-item-container' onClick={onDetailsHandler}>
        <span><h6>المدينة</h6>{item.city}</span>
        <span><h6>المنطقة</h6>{item.region}</span>
        <span><h6>النوع</h6>{item.type === "1" ? "شقة" : "بيت منفصل"}</span>
        <span><h6>السعر</h6>{item.price}</span>
        
    </div>
  )
}

export default ProfileItem