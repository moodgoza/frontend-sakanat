import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import userService from "../../feature/user/userService";
import { getUser } from "../../feature/user/userSlice";
import "./profile.css";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import { useState } from "react";
import MessageIcon from "@mui/icons-material/Message";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import itemService from "../../feature/item/itemService";
import ProfileItem from "./ProfileItem";
import Contact from "./Contact";
const Profile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const { profileUser } = useSelector((state) => state.user);
  const {user} = useSelector(state => state.user);
  const navigate = useNavigate();
  console.log(profileUser)
  if(!user)
  {
    navigate('/')
  }
  useEffect(() => {
    dispatch(getUser(userId));
    const getui = async() => {
      const uu = await itemService.getUserItem(userId);
      setItems(uu);
    }
    getui();
  }, []);

  const [typeOfSelected, setTypeOfSelected] = useState(1);
  return (
    <div className="profile-container">
      {/* <div className="profile-header">
        <span
          onClick={() => setTypeOfSelected(1)}
          className={typeOfSelected === 1 ? "select" : "not-select"}
        >
          الملف الشخصي
        </span>

        <span
          onClick={() => setTypeOfSelected(2)}
          className={typeOfSelected === 2 ? "select" : "not-select"}
        >
          العروض{" "}
        </span>
      </div> */}

      {profileUser && (
        <div className="profile-body" aria-labelledby="login">
          
            <div className="personal-info">

            <div className="info">
                  <span>الاسم : {profileUser.firstName + profileUser.lastName}</span>
                  <span>المدينة: {profileUser.city}</span>
                </div>
              <div className="img-message">
                <Image
                  className="user-img"
                  cloudName="dim6g5ogz"
                  publicId={profileUser.imagePublicId}
                />

                <div className="messaging">
                  
                    <Contact /> 
                  
                  <a
                    className="send-message-button"
                    target="blanck"
                    href="https://wa.me/+972599364699"
                  >
                    <button className="send-message-button">
                      <WhatsAppIcon /> واتس اب
                    </button>
                  </a>
                </div>
                
              </div>
              
            </div>
          
            <div className="offer">
              <h1>
                العروض
              </h1>
              {items.map(i => <ProfileItem item={i}/>)}
            </div>
      
        </div>
      )}
    </div>
  );
};

export default Profile;
