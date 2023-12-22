import React from 'react'
import logo from "../../assets/helpdesk.jpg";
import useContacts from './useContacts';

export default function Contacts({ contacts, changeChat }) {
    const {
        currentUserName,
        currentUserImage,
        currentSelected,
        changeCurrentChat
    } = useContacts({ changeChat })
    return (
        <>
            {
                currentUserImage && currentUserName && (
                    <div className='containerContact'>
                        <div className='flex justify-content-center align-items-center mt-3 mb-2'>
                            <img
                                src={logo}
                                alt="logo"
                                className='h-2rem 2-5rem mr-1'
                            />
                            <h1>Help Desk</h1>
                        </div>
                        <div className='flex flex-column align-items-center overflow-auto gap-2 bg-gray-500 .childContainerContacts'>
                            {
                                contacts.map((contact, index) => {
                                    return (
                                        <div
                                            key={contact._id}
                                            className={`mt-2 shadow-2 childContainerContact ${index === currentSelected ? "bg-gray-300" : ""
                                                }`}
                                            onClick={() => changeCurrentChat(index, contact)}
                                        >
                                            <div>
                                                <img
                                                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                                    alt=""
                                                    className='h-3rem'
                                                />
                                            </div>
                                            <div>
                                                <h3>{contact.username}</h3>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className='flex justify-content-center align-items-center gap-5'>
                            <div>
                                <img
                                    src={`data:image/svg+xml;base64,${currentUserImage}`}
                                    alt="avatar"
                                    className='h-4rem'
                                    style={{ maxInlineSize: "100%" }}
                                />
                            </div>
                            <div className='childContainerUsername'>
                                <h2>{currentUserName}</h2>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
