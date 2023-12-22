import React from 'react';
import Contacts from '../../components/Contacts';
import Welcome from '../../components/Welcome';
import ChatContainer from '../../components/ChatContainer';
import useChat from './useChat';

function Chat() {

  const {
    contacts,
    currentChat,
    socket,
    handleChatChange
  } = useChat()
  
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