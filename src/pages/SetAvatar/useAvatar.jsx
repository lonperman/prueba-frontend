import axios from 'axios';
import { Buffer } from "buffer";
import { useNavigate } from 'react-router-dom';
import { setAvatarRoute } from '../../utils/APIRoutes';
import { useEffect, useRef, useState } from 'react';

const useAvatar = () => {
    const api = `https://api.multiavatar.com/4645646`;
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastSetImgAvatar = useRef(null);

    useEffect(() => {
        const fetchLocalStore = async () => {
            if (!localStorage.getItem(process.env.REACT_APP_API_KEY))
                navigate("/login");
        }
        fetchLocalStore()
    }, []);

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            showError("Please select an avatar")
        } else {
            const user = await JSON.parse(
                localStorage.getItem(process.env.REACT_APP_API_KEY)
            );

            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });

            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem(
                    process.env.REACT_APP_API_KEY,
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

    return {
        toastSetImgAvatar,
        isLoading,
        avatars,
        selectedAvatar,
        setSelectedAvatar,
        setProfilePicture
    }
}

export default useAvatar;