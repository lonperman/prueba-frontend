import { useEffect, useState } from "react";

const useContacts = ({changeChat}) => {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        const fetchLocalStore = async () => {
            const data = await JSON.parse(
                localStorage.getItem(process.env.REACT_APP_API_KEY)
            );
            setCurrentUserName(data.username);
            setCurrentUserImage(data.avatarImage);
        }

        fetchLocalStore()
    }, []);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };

    return {
        currentUserImage,
        currentUserName,
        currentSelected,
        changeCurrentChat,
    }
}

export default useContacts;