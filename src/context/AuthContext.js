import { createContext } from 'react';

const noop = () => { };

export const AuthContext = createContext({
    token: null,
    userId: null,
    userName: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
});