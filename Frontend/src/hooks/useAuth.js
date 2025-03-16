import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            navigate("/login");
        } else {
            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        }
    }, [navigate]);
};