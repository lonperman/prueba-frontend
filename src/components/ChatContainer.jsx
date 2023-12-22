import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { recieveMessageRoute, sendMessageRoute } from '../utils/APIRoutes';
import { v4 as uuidv4 } from "uuid";
import Logout from './Logout';
import ChatInput from './ChatInput';

export default function ChatContainer({ currentChat, socket }) {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            const data = await JSON.parse(
                localStorage.getItem("chat-app-user")
            );
            const response = await axios.post(recieveMessageRoute, {
                from: data._id,
                to: currentChat._id,
            });
            setMessages(response.data);
        }
        fetchMessages()
    }, [currentChat])

    useEffect(() => {
        const getCurrentChat = async () => {
            if (currentChat) {
                await JSON.parse(
                    localStorage.getItem("chat-app-user")
                )._id;
            }
        };
        getCurrentChat();
    }, [currentChat])

    const handleSendMsg = async (msg) => {
        const data = await JSON.parse(
            localStorage.getItem("chat-app-user")
        );
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: data._id,
            msg,
        });
        await axios.post(sendMessageRoute, {
            from: data._id,
            to: currentChat._id,
            message: msg,
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
                console.log(socket.current)
                console.log("new Mensaje: ", msg)
            });
        }
    }, [currentChat, socket]);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className='containerChatContainer'>
            <div className='flex justify-content-between align-items-center pt-0 pr-5 bg-gray-400 h-4rem shadow-3 border-round'>
                <div className='flex align-items-center gap-3 ml-2'>
                    <div>
                        <img
                            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                            alt=""
                            className='h-3rem'
                        />
                    </div>
                    <div>
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                <Logout />
            </div>
            <div className='flex flex-column gap-3 pt-1rem pr-2rem overflow-auto childMessages'>
                {
                    messages.map((message) => {
                        return (
                            <div
                                ref={scrollRef}
                                key={uuidv4()}
                            >
                                <div className={`flex align-items-center ${message.fromSelf ? "sended" : "recieved"}`}>
                                    <div className='childMessagesContent'>
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
        </div>
    )
}