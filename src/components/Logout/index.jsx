import React from 'react';
import { Button } from 'primereact/button';
import { BiPowerOff } from 'react-icons/bi';
import useLogout from './useLogout';

export default function Logout() {
    
    const { handleClick } = useLogout()

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
