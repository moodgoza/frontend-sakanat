import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Mas from "./Mas";
import Rec from "./Rec";
import { TextField, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "../../feature/chat/messageSlice";
import { changeMessagesBySocket } from "../../feature/chat/messageSlice";
import chatService from "../../feature/chat/chatService";
import CircularProgress from "@mui/material/CircularProgress";
import { Cloudinary } from "@cloudinary/url-gen";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
const ChatContent = ({ socket }) => {
  const { chat, isLoading, chats } = useSelector((state) => state.chat);
  const { messages, messageIsLoading } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.user);
  const [currentMessages, setCurrentMessages] = useState(messages);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const roomName =
    chat &&
    (chat.firstUser.userName > chat.secondUser.userName
      ? chat.firstUser.userName + chat.secondUser.userName
      : chat.secondUser.userName + chat.firstUser.userName);

  useEffect(() => {
    const o = () => {
      return "kakak";
    };
    socket.on("receive_message", (data) => {
      
      console.log(o(), user, messages, chat, chats);
      dispatch(changeMessagesBySocket(data));
    });
  }, [socket]);

  const onChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  const onSendHandler = async (e) => {
    const data = await dispatch(
      createMessage({
        chat: chat._id,
        sender:
          chat.firstUser._id === user._id
            ? chat.firstUser._id
            : chat.secondUser._id,
        receiver:
          chat.firstUser._id !== user._id
            ? chat.firstUser._id
            : chat.secondUser._id,
        value: message,
      })
    );
    setCurrentMessages(messages);
    console.log(messages);
    socket.emit("send_message", { message: data.payload, room: roomName });
    console.log(data.payload);
  };

  return (
    <div className="chat-content">
      {chat ? (<div className="chat-body">
        <div className="chat-head">
            {chat ? 
            (<Image
              className="chatImg"
              cloudName="dim6g5ogz"
              publicId={chat.secondUser.imagePublicId}
            />
            ) :(<img src="/profile.jpg" />)}
          <h4>
            <strong>
              {chat &&
                (chat.firstUser._id !== user._id
                  ? `${chat.firstUser.firstName }`
                  : `${chat.secondUser.firstName} ${chat.secondUser.lastName}`)}
            </strong>
          </h4>
        </div>
        <div className="messages">
          {messages &&
            messages.slice()
            .reverse().map((m) =>
              m.sender === user._id ? <Rec message={m} /> : <Mas message={m} />
            )}
        </div>{" "}
        <div className="chat-send">
          <div className="button-container">
            <button onClick={onSendHandler}> <SendRoundedIcon /> ارسال</button>
          </div>
          <TextField
            className="textarea"
            id="outlined-multiline-static"
            placeholder="اكتب رسالة..."
            multiline
            rows={1}
            onChange={onChangeHandler}
            style={{backgroundColor: "white", padding: "0", borderWidth: "0"}}
          />
        </div>
      </div>) : 
      (<div className="emptyMsg"><h4>لا يوجد دردشات حديثة</h4></div>)}
    </div>
  );
};

export default ChatContent;
