import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Gallary from "../../component/gallary/Gallary";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getItem } from "../../feature/item/itemSlice";
import { Image } from "cloudinary-react";
const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const { item } = useSelector((state) => state.item);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const data = dispatch(getItem(itemId));
  }, []);

  return (
    <div className="item-details">
      {item && (<div className="details">
        <div className="details-header">
        {item && (
            <Image
              className="item-user-img"
              cloudName="dim6g5ogz"
              publicId={item.item.user.imagePublicId}
            />
          )}
          <h3>{item && item.item.user.firstName + " " + item.item.user.lastName}</h3>
        </div>
        <hr/>
        {item && (
          <Image
            className="details-img"
            cloudName="dim6g5ogz"
            publicId={item.item.mainImage}
          />
        )}

        {item && (
          <div className="basic-info">
            <span>السعر: {item.item.price}</span>
            <span>النوع: {item.item.type === "1" ? "شقة" : "بيت منفصل"}</span>
          </div>
        )}

        {item && (
          <div className="basic-info">
            <span>المدينة: {item.item.city}</span>
            <span>المنطقة: {item.item.region}</span>
          </div>
        )}

        {item && <p className="description">{item.item.description}</p>}
      </div>
      )}
      {item && <Gallary images={item.images} />}
    </div>
  );
};

export default ItemDetails;
