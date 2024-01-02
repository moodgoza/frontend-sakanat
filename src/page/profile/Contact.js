import Modal from '@mui/material/Modal';
import React, { useState } from 'react'
import MessageIcon from "@mui/icons-material/Message";
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createChat } from '../../feature/chat/chatSlice';
import { createMessage } from '../../feature/chat/messageSlice';
const Contact = () => {
    const [seen, setSeen] = useState(false);
    const dispatch = useDispatch();
    const {chat} = useSelector(state => state.chat)

    const [message, setMessage] = useState('');
    const messageOnchangeHandler = (e) => {
        setMessage(e.target.value);
    }

    const {profileUser, user} = useSelector(state => state.user);
    const navigate = useNavigate();
    const oSendHandler = async() => {
        const ret = await dispatch(createChat({firstUser: user._id, secondUser: profileUser._id}));
        dispatch(createMessage({chat: ret.payload._id, sender: user._id, receiver: profileUser._id, value: message}));
       navigate('/chat')
    }
    
  return (
    <div>
        <button onClick={() => setSeen(!seen)}><MessageIcon /> تواصل</button>
        <Modal open={seen}>
        <div className='modal-profile-cntainer'>
            <label>الرسالة</label>
        <Form.Group className="inputMessage">
        <Form.Control as="textarea" rows={5} name="message" onChange={messageOnchangeHandler}/>
              
            </Form.Group>
            <button onClick={oSendHandler}>ارسال</button>
        </div>
        </Modal>
    </div>
  )
}

export default Contact