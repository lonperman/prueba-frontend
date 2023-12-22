import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { recieveMessageRoute, sendMessageRoute } from "../../utils/APIRoutes";

const useChatContainer = ({ currentChat, socket }) => {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            const data = await JSON.parse(
                localStorage.getItem(process.env.REACT_APP_API_KEY)
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
                    localStorage.getItem(process.env.REACT_APP_API_KEY)
                )._id;
            }
        };
        getCurrentChat();
    }, [currentChat])

    const handleSendMsg = async (msg) => {
        const data = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_API_KEY)
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

    return {
        messages,
        scrollRef,
        handleSendMsg
    }
}

export default useChatContainer;