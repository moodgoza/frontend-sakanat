import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createItem } from "../../feature/item/itemSlice";
import axios from "axios";
import "./item.css";
import { Form } from "react-bootstrap";
const CreateItemForm = () => {
  const [seen, setSeen] = useState(false);
  const [information, setInformation] = useState({
    price: 0,
    type: "",
    city: "",
    region: "",
    images: [],
    mainImage: "",
  });

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    setInformation((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name !== "images" && e.target.name !== "mainImage"
          ? e.target.value
          : e.target.name !== "images"
          ? e.target.files[0]
          : Array.from(e.target.files),
    }));
    console.log(information);
  };

  const onSubmitHnadler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", information.mainImage);
    formData.append("upload_preset", "l0moj8hc");
    const d1 = await axios.post(
      "https://api.cloudinary.com/v1_1/dim6g5ogz/image/upload",
      formData
    );
    const { public_id } = d1.data;
    information.mainImage = public_id;

    for (let i = 0; i < information.images.length; i++) {
      const formData = new FormData();
      formData.append("file", information.images[i]);
      formData.append("upload_preset", "l0moj8hc");
      const d1 = await axios.post(
        "https://api.cloudinary.com/v1_1/dim6g5ogz/image/upload",
        formData
      );
      const { public_id } = d1.data;
      information.images[i] = public_id;
    }
    console.log(information);
    const data = dispatch(createItem({ item: information, userId: user._id }));
    console.log(data);
  };

  return (
    <>
      <button onClick={() => setSeen(!seen)}>اضافة سكن</button>
      <div className={`${seen ? "seen" : "backContainer" } `}>
        <div className={`createItemContainer`}>
          <form className="createItemForm" onSubmit={onSubmitHnadler}>
            <div className="itemHeader">
              <h3>اضافة سكن جديد</h3>
            </div>
            <hr className="jk" />
            <Form.Group className="inputItem">
              <Form.Label>المدينة</Form.Label>
              <Form.Control onChange={onChangeHandler} name="city" />
            </Form.Group>
            <Form.Group className="inputItem">
              <Form.Label>المنطقة داخل المدينة</Form.Label>
              <Form.Control onChange={onChangeHandler} name="region" />
            </Form.Group>
            <Form.Group className="inputItem">
              <Form.Label>السعر</Form.Label>
              <Form.Control onChange={onChangeHandler} name="price" />
            </Form.Group>

            <Form.Select
              className="inputItem"
              onChange={onChangeHandler}
              name="type"
            >
              <option value="1">شقة</option>
              <option value="2">بيت منفصل</option>
            </Form.Select>
            <Form.Group className="inputItem">
              <Form.Label>الصورة الرئيسية</Form.Label>
              <Form.Control
                onChange={onChangeHandler}
                type="file"
                name="mainImage"
              />
            </Form.Group>

            <Form.Group className="inputItem">
              <Form.Label>الصور الاضافية</Form.Label>
              <Form.Control
                onChange={onChangeHandler}
                type="file"
                multiple
                name="images"
              />
            </Form.Group>
            <button>اضافة </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateItemForm;
