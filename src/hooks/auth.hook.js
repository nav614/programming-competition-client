import React, { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userName, setUserName] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = useCallback((jwtToken, id, userName, role) => {
        setToken(jwtToken);
        setUserId(id);
        setUserName(userName);
        setUserRole(role);

        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken,
            userId: id,
            userName: userName,
            userRole: role,
        }));
    }, []);

    const logout = useCallback(
        () => {
            setToken(null);
            setUserId(null);
            setUserName(null);
            setUserRole(null);
            localStorage.setItem(storageName, null);
        }, []);

    useEffect(() => {
        setLoading(true);
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data && data.token) {
            login(data.token, data.userId, data.userName, data.userRole);
        }
        setLoading(false);
    }, [login]);

    return { login, logout, token, userId, userRole, userName, loading };
}