import { message } from "antd";
import axios from "axios";
import { useState, useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useHttp = () => {
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-type'] = 'application/json';
            }

            if (token) {
                headers['Authorization'] = 'Bearer ' + token;
            }

            const { data, status } = await axios({
                baseURL: process.env.REACT_APP_WEBAPI_URL,
                method,
                url,
                headers,
                data: body
            });

            if (status !== 200) {
                throw new Error('Something is wrong after fetch.');
            }

            setLoading(false);
            return data;

        } catch (error) {
            setLoading(false);
            message.error(error?.response?.data?.detail || error?.message);
            throw error;
        }
    }, []);

    return { loading, request };
}