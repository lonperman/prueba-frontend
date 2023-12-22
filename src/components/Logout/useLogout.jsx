import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logoutRoute } from "../../utils/APIRoutes";

const useLogout = () => {
    const navigate = useNavigate();
    const handleClick = async () => {
        const id = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_API_KEY)
        )._id;
        const data = await axios.get(`${logoutRoute}/${id}`);
        if (data.status === 200) {
            localStorage.clear();
            navigate("/login");
        }
    }

    return {
        handleClick
    }
}

export default useLogout;