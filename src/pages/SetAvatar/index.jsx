import React from 'react'
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import useAvatar from './useAvatar';


function SetAvatar() {

    const {
        avatars,
        isLoading,
        selectedAvatar,
        toastSetImgAvatar,
        setSelectedAvatar,
        setProfilePicture,
    } = useAvatar()

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