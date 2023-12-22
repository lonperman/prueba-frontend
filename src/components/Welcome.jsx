import React, { useEffect, useState } from 'react'
import Robot from "../assets/robot.gif"
import Logout from './Logout';

export default function Welcome() {
    const [userName, setUserName] = useState("");
    useEffect(() => {
        const fetchLocalStore = async () => {
            setUserName(
                await JSON.parse(
                    localStorage.getItem("chat-app-user")
                ).username
            );
        }
        fetchLocalStore()
    }, [])
    return (
        <div className='flex flex-column justify-content-center align-items-center '>
            <div className='flex flex-row-reverse w-full mr-5'>
                <Logout />
            </div>
            <img className='h-20rem' src={Robot} alt='' />
            <h1>
                Welcome, <span>{userName}!</span>
            </h1>
            <h3>Please select a chat to Start messaging.</h3>
        </div>
    )
}
