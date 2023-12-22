import React from 'react';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import Picker from 'emoji-picker-react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import useChatInput from './useChatInput';


export default function ChatInput({ handleSendMsg }) {

    const {
        msg,
        showEmojiPicker,
        setMsg,
        sendChat,
        handleEmojiClick,
        handleEmojiPickerhideShow
    } = useChatInput({ handleSendMsg })
    
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
