import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';

function Chat() {
  const navigate = useNavigate();
  const socket = useRef()
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
 

  useEffect(() => {
    const fetchLocalStore = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
      }

    }
    fetchLocalStore()
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchCurrent = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }

    fetchCurrent()
  }, [currentUser])

  useEffect(() => {
    if (socket.current) {
        socket.current.on("msg-recieve", (msg) => {
            console.log("new Mensaje: ", msg)
        });
    }
}, [currentChat, socket]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className='w-screen h-screem flex flex-column justify-content-center gap-3 align-items-center'>
      <div className='bg-gray-200 childContainerChat'>
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </div>
  )
}

export default Chat;