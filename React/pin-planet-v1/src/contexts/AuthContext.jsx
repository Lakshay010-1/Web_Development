import React from 'react'
import { useEffect, useReducer, createContext } from 'react'

const AuthContext = createContext();

const ONLY_USER = {
    name: "Lakshay",
    email: "lakshaybyte@gmail.com",
    password: "fakepassword",
    profilePic: "https://raw.githubusercontent.com/Lakshay010-1/Resume/refs/heads/main/profilePic.png"
}

const intialState = {
    user: null,
    isAuthenticated: false
};
function authReducer(state, action) {
    switch (action.type) {
        case "login":
            return { ...state, user: action.payload, isAuthenticated: true };
        case "logout":
            return { ...state, ...intialState };
        default:
            throw new Error("Unknown action type!");
    }
}

function AuthContextProvider({ children }) {
    const [{ user, isAuthenticated }, authDispatch] = useReducer(authReducer, intialState);

    function login(email, password) {
        console.log("login function called");
        if (email === ONLY_USER.email && password === ONLY_USER.password) {
            authDispatch({ type: "login", payload: ONLY_USER });
        }
    }

    function logout() {
        console.log("logout function called");
        authDispatch({ type: "logout" });
    }

    useEffect(() => {
        console.log(isAuthenticated);
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
    )
}

export { AuthContextProvider, AuthContext };