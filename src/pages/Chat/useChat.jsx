import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import { allUsersRoute, host } from '../../utils/APIRoutes';

const useChat = () => {
    const navigate = useNavigate();
    const socket = useRef()
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);


    useEffect(() => {
        const fetchLocalStore = async () => {
            if (!localStorage.getItem(process.env.LOCALHOST_KEY)) {
                navigate("/login");
            } else {
                setCurrentUser(await JSON.parse(localStorage.getItem(process.env.LOCALHOST_KEY)))
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

    return {
        contacts,
        currentChat,
        socket,
        handleChatChange,
    }
}

export default useChat;