import React, { useState } from 'react';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import Picker from 'emoji-picker-react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';


export default function ChatInput({ handleSendMsg }) {
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
    return (
        <div className='containerInputChat py-1 bg-gray-400'>
            <div className='flex align-items-center gap-3'>
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                </div>
            </div>
            <form className='flex align-items-center w-full border-round-3xl gap-5' onSubmit={(event) => sendChat(event)}>
                <InputText
                    id="msg"
                    name="msg"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder='type your message here'
                    className='inputSendMsg'
                />
                <Button type='submit' className='flex justify-content-center align-items-center buttonSend'>
                    <IoMdSend />
                </Button>
            </form>
        </div>
    )
}
