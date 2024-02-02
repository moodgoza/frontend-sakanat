import React, { useEffect, useState } from "react";
import CreateItemForm from "./CreateItemForm";
import { useSelector, useDispatch } from "react-redux";
import Item from "./Item";
import { getItems, filterItem } from "../../feature/item/itemSlice";
import { Form } from "react-bootstrap";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, FormControl, InputLabel } from "@mui/material";
const Items = () => {
  let { filterdItems, isSucces } = useSelector((state) => state.item);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const data = await dispatch(getItems());
      console.log(data);
    };
    getData();
  }, []);

  const [value, setValue] = useState(5);
  const onChangeHandler = (e) => {
    setValue(e.target.value);
    if (parseInt(e.target.value) >= 3) {
      console.log(e.target.value);
      dispatch(filterItem({ type: e.target.value, value: "" }));
    }
    console.log(e.target.value);
  };

  const inputOnchangeHandler = (e) => {
    dispatch(filterItem({ type: value, value: e.target.value }));
  };

  return (
   
    <div className="items">


      <div className="itemsHeader">
        <CreateItemForm />
        <div className="itemsfilter">
          <Form.Select
            className="filterselect"
            onChange={onChangeHandler}
            name="type"
          >
            <option className="op" value={5}>الكل
            
            </option>
            <hr />
            <option value={1}>السعر</option>
            <hr />
            <option value={2}>المدينة</option>
            <hr />
            <option value={3}>شقة</option>
            <hr />
            <option value={4}>بيت منفصل</option>
          </Form.Select>

          {value < '3' && <Form.Control
            className="filterinput"
            onChange={inputOnchangeHandler}
            
          />}
           
          
        
        </div>
      </div>

      <div className="itemsBody">
        {filterdItems && filterdItems.map((i) => <Item item={i} />)}
      </div>
    </div>
  );
};

export default Items;
