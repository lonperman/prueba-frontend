
import React from 'react'
import { v4 as uuidv4 } from "uuid";
import Logout from '../Logout';
import ChatInput from '../ChatInput';
import useChatContainer from './useChatContainer';

export default function ChatContainer({ currentChat, socket }) {

    const {
        messages,
        scrollRef,
        handleSendMsg
    } = useChatContainer({ currentChat, socket })

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
