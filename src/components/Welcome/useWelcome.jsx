import { useEffect, useState } from "react";

const useWelcome = () => {
    const [userName, setUserName] = useState("");
    
    useEffect(() => {
        const fetchLocalStore = async () => {
            setUserName(
                await JSON.parse(
                    localStorage.getItem(process.env.REACT_APP_API_KEY)
                ).username
            );
        }
        fetchLocalStore()
    }, [])

    return {
        userName,
    }
}

export default useWelcome;