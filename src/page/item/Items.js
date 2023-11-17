import React, { useEffect } from "react";
import CreateItemForm from "./CreateItemForm";
import { useSelector, useDispatch } from "react-redux";
import Item from "./Item";
import { getItems } from "../../feature/item/itemSlice";
const Items = () => {
  const { items, isSucces } = useSelector((state) => state.item);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async() => {
      const data = await dispatch(getItems());
      console.log(data);
    }
    getData();
  }, []);
  
  return (
    <div className="items">
      <div className="itemsHeader">
      <CreateItemForm />
      </div>

      <div className="itemsBody">
      {items && items.map((i) => <Item item={i} />)}
      </div>
      
    </div>
  );
};

export default Items;
