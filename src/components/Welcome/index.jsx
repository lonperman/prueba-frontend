import React from 'react'
import Robot from "../../assets/robot.gif"
import Logout from '../Logout';
import useWelcome from './useWelcome';

export default function Welcome() {

    const {
        userName
    } = useWelcome()
   
    return (
        <div className='flex flex-column justify-content-center align-items-center '>
            <div className='flex flex-row-reverse w-full pt-0 mt-0 mr-5'>
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
