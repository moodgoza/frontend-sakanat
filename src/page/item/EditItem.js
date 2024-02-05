import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createItem } from "../../feature/item/itemSlice";
import axios from "axios";
import "./item.css";
import { Form } from "react-bootstrap";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import itemService from "../../feature/item/itemService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditItem = ({ item }) => {
  console.log(item);
  const [seen, setSeen] = useState(false);

  const [information, setInformation] = useState({
    price: item.price,
    type: item.type,
    city: item.city,
    region: item.region,
    images: [],
    mainImage: null,
    description: item.description,
  });

  console.log(information);
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
    if (information.price === 0 ||
      information.city === "" ||
      information.region === "" ||
      information.description === "") {
      toast.error("املا جميع الفراغات لو سمحت");
      return;
    }
    console.log(information);
    console.log(item.mainImage)
    let d1 = null;
    if (information.mainImage) {
      const formData = new FormData();
      formData.append("file", information.mainImage);
      formData.append("upload_preset", "l0moj8hc");
      d1 = await axios.post(
        "https://api.cloudinary.com/v1_1/dim6g5ogz/image/upload",
        formData
      );
      const { public_id } = d1.data;
      information.mainImage = public_id;
    }
    else {
      information.mainImage = item.mainImage;
    }

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

    const data = itemService.updateItem(item._id, information);

    console.log(data);
    window.location.reload();
  };

  const onCloseHandler = (e) => {
    setSeen(false);
  };

  return (
    <>
      <h5 className="icon-details" onClick={() => setSeen(!seen)}>
        تعديل
        <ModeEditIcon />
      </h5>
      <Modal open={seen} className="model">
        <form className="createItemForm" onSubmit={onSubmitHnadler}>
          <div className="itemHeader">
            <h3>تعديل السكن </h3>
          </div>
          <div className="inputSection">
            <Form.Group className="inputItem">
              <Form.Label>المدينة</Form.Label>
              <Form.Control
                onChange={onChangeHandler}
                name="city"
                value={information.city}
              />
            </Form.Group>
            <Form.Group className="inputItem">
              <Form.Label>المنطقة داخل المدينة</Form.Label>
              <Form.Control
                onChange={onChangeHandler}
                name="region"
                value={information.region}
              />
            </Form.Group>
          </div>
          <div className="inputSection">
            <Form.Group className="inputItem">
              <Form.Label>السعر</Form.Label>
              <Form.Control
                onChange={onChangeHandler}
                name="price"
                value={information.price}
              />
            </Form.Group>

            <Form.Select
              className="inputItem"
              onChange={onChangeHandler}
              name="type"
              value={information.type}
            >
              <option value="1">شقة</option>
              <option value="2">بيت منفصل</option>
            </Form.Select>
          </div>
          <Form.Group className="inputItem">
            <Form.Label>التفاصيل</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              onChange={onChangeHandler}
              name="description"
              value={information.description}
            />
          </Form.Group>
          <div className="inputSection">
            <Form.Group className="inputItem">
              <Form.Label>تغير الصورة الرئيسية</Form.Label>
              <Form.Control
                onChange={onChangeHandler}
                type="file"
                name="mainImage"
              />
            </Form.Group>

            <Form.Group className="inputItem">
              <Form.Label>اضافة صور اضافية</Form.Label>
              <Form.Control
                onChange={onChangeHandler}
                type="file"
                multiple
                name="images"
              />
            </Form.Group>
          </div>
          <div className="create-form-footer">
            <button>تعديل </button>
            <button onClick={onCloseHandler}>اغلاق </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditItem;
