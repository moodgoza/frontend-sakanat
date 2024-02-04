import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProfileItem = ({item}) => {
    const navigate = useNavigate();
    const onDetailsHandler = async (e) => {
        navigate(`/item/${item._id}`);
      };
  return (
    <div className='profile-item-container' onClick={onDetailsHandler}>
        <span>{item.city}</span>
        <span>{item.region}</span>
        <span>{item.type === "1" ? "شقة" : "بيت منفصل"}</span>
        <span>{item.price}</span>
    </div>
  )
}

export default ProfileItem