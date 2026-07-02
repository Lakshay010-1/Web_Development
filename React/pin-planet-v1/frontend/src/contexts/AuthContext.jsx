import React from 'react'
import { useEffect, useReducer, createContext } from 'react'
import { registerUser, loginUser, logoutUser, checkUser } from '../api/userAuthAPI';

const AuthContext = createContext();

const intialState = {
    user: null,
    isAuthenticated: false,
    authLoading: true
};
const PROFILE_PIC = "https://avatars.githubusercontent.com/u/151618570";

function authReducer(state, action) {
    switch (action.type) {
        case "user/login":
            return { ...state, isAuthenticated: true, user: action.payload.user };
        case "user/reset":
            return { ...state, ...intialState };
        case "user/loading/start":
            return { ...state, authLoading: true };
        case "user/loading/stop":
            return { ...state, authLoading: false };
        default:
            throw new Error("Unknown action type!");
    }
}

function AuthProvider({ children }) {
    const [{ user, isAuthenticated, authLoading }, authDispatch] = useReducer(authReducer, intialState);



    async function checkAuth() {
        const response = await checkUser();
        if (response.error) {
            authDispatch({ type: "user/reset" });
        } else {
            authDispatch({ type: "user/login", payload: { user: { ...response.user, profilePic: PROFILE_PIC } } });
        }
        authDispatch({ type: "user/loading/stop" });
    }

    async function login(email, password) {
        const response = await loginUser(email, password);
        if (!response.error) {
            authDispatch({ type: "user/login", payload: { user: response.user } });
        }
        return response;
    }

    async function logout() {
        const response = await logoutUser();
        if (!response.error) {
            authDispatch({ type: "user/reset" });
            authDispatch({ type: "user/loading/stop" });
        }
    }

    async function register(name, email, password) {
        const user = {
            email,
            password,
            name
        }
        const response = await registerUser(user);
        if (!response.error) {
            user.profilePic = PROFILE_PIC;
            authDispatch({ type: "user/register", payload: user });
        }
        return response;
    }

    useEffect(() => {
        checkAuth();
    }, []);


    return (
        <AuthContext.Provider value={{ user, isAuthenticated, authLoading, register, login, logout }}>{children}</AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext };