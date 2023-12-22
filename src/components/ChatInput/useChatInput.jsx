import { useState } from "react";

const useChatInput = ({ handleSendMsg }) => {
    const [msg, setMsg] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const handleEmojiPickerhideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (event) => {
        let message = msg;
        message += event.emoji;
        setMsg(message);
    }

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    }

    return {
        showEmojiPicker,
        msg,
        handleEmojiClick,
        sendChat,
        setMsg,
        handleEmojiPickerhideShow,
    }
}

export default useChatInput;