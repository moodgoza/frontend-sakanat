import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChatMessages } from '../../feature/chat/messageSlice';
import { getChat } from '../../feature/chat/chatSlice';
import { Image } from 'cloudinary-react';

const SingleChat = ({ chat, socket }) => {

  console.log(chat)
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch();
  const onClickHandler = async (e) => {
    console.log(e.target.id)
    const data = await dispatch(getChatMessages(chat._id));
    const roomName =
      chat.firstUser.email > chat.secondUser.email
        ? chat.firstUser.email + chat.secondUser.email
        : chat.secondUser.email + chat.firstUser.email;
    console.log(roomName)
    dispatch(getChat(chat));
    socket.emit('join_room', roomName);
  }
  return (
    <div className='singlechat' onClick={onClickHandler} id={chat._id}>
      {chat ?
        (<Image
          className="chatImg"
          cloudName="dim6g5ogz"
          publicId={chat.secondUser.imagePublicId}
        />
        ) : (<img src="/profile.jpg" />)}
      <div className='singlechat-content'>
        <h5>{chat && (chat.secondUser._id !== user._id ? chat.secondUser.firstName + ' ' + chat.secondUser.lastName :
          chat.firstUser.firstName + ' ' + chat.firstUser.lastName)}</h5>
      </div>

    </div>
  )
}

export default SingleChat