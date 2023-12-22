/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Buffer } from "buffer";
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { setAvatarRoute } from '../utils/APIRoutes';


function SetAvatar() {
    const api = `https://api.multiavatar.com/4645646`;
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastSetImgAvatar = useRef(null);

    useEffect(() => {
        const fetchLocalStore = async () => {
            if (!localStorage.getItem("chat-app-user"))
                navigate("/login");
        }
        fetchLocalStore()
    }, []);

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            showError("Please select an avatar")
        } else {
            const user = await JSON.parse(
                localStorage.getItem("chat-app-user")
            );

            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });

            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem(
                    "chat-app-user",
                    JSON.stringify(user)
                );
                navigate("/");
            } else {
                showError("Error setting avatar. Please try again.");
            }
        }
    };

    const showError = (msg) => {
        toastSetImgAvatar.current?.show({
            severity: "error",
            summary: "Error",
            detail: msg,
            life: 1000,
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newData = [];
                for (let i = 0; i < 4; i++) {
                    const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                    const buffer = Buffer.from(response.data);
                    newData.push(buffer.toString("base64"));
                }
                setAvatars(newData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Toast ref={toastSetImgAvatar} position="bottom-left" />
            {
                isLoading ? (
                    <div className='flex flex-column justify-content-center align-content-center align-items-center gap-6 w-screen h-screem my-8 py-8'>
                        <ProgressSpinner />
                    </div>
                ) : (
                    <div className='flex flex-column justify-content-center align-content-center align-items-center gap-6 w-screen h-screem my-8 py-8'>
                        <div>
                            <h1>Pick an avatar as your profile picture</h1>
                        </div>
                        <div className='flex gap-5'>
                            {
                                avatars.map((avatar, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={`flex justify-content-center align-items-center border-solid border-circle border-transparent p-2 ${selectedAvatar === index ? "border-indigo-800 border-3" : ""
                                                }`}
                                        >
                                            <img
                                                src={`data:image/svg+xml;base64,${avatar}`}
                                                alt='avatar'
                                                key={avatar}
                                                onClick={() => setSelectedAvatar(index)}
                                                className='w-6rem transition-ease-in-out'
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <Button
                            label='Set as Profile Picture'
                            severity='success'
                            onClick={setProfilePicture}
                            className='pt-3 pr-5'
                        />
                    </div>
                )
            }
        </>
    )
}

export default SetAvatar