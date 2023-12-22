import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from 'primereact/button';
import { BiPowerOff } from 'react-icons/bi';
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
    const navigate = useNavigate();
    const handleClick = async () => {
        const id = await JSON.parse(
            localStorage.getItem("chat-app-user")
        )._id;
        const data = await axios.get(`${logoutRoute}/${id}`);
        if (data.status === 200) {
            localStorage.clear();
            navigate("/login");
        }
    }

    return (
        <Button
            label='Logout'
            onClick={handleClick}
            className='flex justify-content-center align-items-center p-2 cursor-pointer'
        >
            <BiPowerOff className='ml-1'/>
        </Button>
    )
}
