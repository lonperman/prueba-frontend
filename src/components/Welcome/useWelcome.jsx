import { useEffect, useState } from "react";

const useWelcome = () => {
    const [userName, setUserName] = useState("");
    
    useEffect(() => {
        const fetchLocalStore = async () => {
            setUserName(
                await JSON.parse(
                    localStorage.getItem(process.env.LOCALHOST_KEY)
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