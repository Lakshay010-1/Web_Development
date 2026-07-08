import React, { useCallback, useEffect, useRef, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function LoginForm({ userDispatch }) {
    const initialState = { email: "", password: "", name: "" }
    const [credentials, setCredentials] = useState(initialState);
    const [userRegisteredStatus, setUserRegisteredStatus] = useState(false);
    const [fieldError, setFieldError] = useState(null);
    const [errorMessage, setErrorMessage] = useState("placeholder text");
    const [viewPasswordStatus, setViewPasswordStatus] = useState(false);
    const emailFieldInputRef = useRef(null);
    const passwordFieldInputRef = useRef(null);
    const API_URI = import.meta.env.VITE_API_LINK;

    async function registerUser(name, email, password) {
        try {
            const response = await fetch(`${API_URI}/api/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password })
            });
            const data = await response.json();
            if (!response.ok) {
                setErrorMessage(data.message);
                setFieldError(data.field);
            } else {
                setUserRegisteredStatus(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function loginUser(email, password) {
        try {
            const response = await fetch(`${API_URI}/api/users/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.message);
                setFieldError(data.field);
            } else {
                userDispatch({ type: "user/login", payload: data.user });
            }
        } catch (error) {
            console.error(error);
        } finally {
            userDispatch({ type: "user/loading", payload: false });
        }
    }


    async function handleLogin() {
        const { name, email, password } = credentials;
        await (userRegisteredStatus ? loginUser(email, password) : registerUser(name, email, password));
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        await handleLogin();
    }

    const resetErrorState = useCallback(function () {
        setErrorMessage("placeholder text");
        setFieldError(null);
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setCredentials(prev => { return { ...prev, [name]: value } })
        if (name === fieldError) {
            resetErrorState();
        }
    }

    useEffect(() => {
        function resetState() {
            resetErrorState();
        }
        resetState();
    }, [userRegisteredStatus, resetErrorState]);

    return (
        <>
            <div id='authenticateForm-container'>
                <h1>{userRegisteredStatus ? "Sign in" : "Sign up"}</h1>
                <form onSubmit={(e) => handleFormSubmit(e)} className="authenticateForm">
                    {!userRegisteredStatus && <div>
                        <label>Name:</label>
                        <input type="text" name="name" placeholder='name' value={credentials.name} required onChange={(e) => handleChange(e)} />
                    </div>}
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" ref={emailFieldInputRef} className={fieldError === "email" ? "errorField" : ""} placeholder='email@example.com' value={credentials.email} required onChange={(e) => handleChange(e)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <div className="passwordField">
                            <input className="password-input" type={viewPasswordStatus ? "text" : "password"} name="password" ref={passwordFieldInputRef} className={`${fieldError === "password" ? "errorField" : ""}`} placeholder='password' value={credentials.password} required onChange={(e) => handleChange(e)} />
                            <a className="passwordVisibiltyBtn" onClick={() => setViewPasswordStatus(prev => !prev)}>{viewPasswordStatus ? <VisibilityIcon /> : <VisibilityOffIcon />}</a>
                        </div>
                    </div>
                    <h4 style={{ visibility: fieldError !== null ? "" : "hidden", color: fieldError ? "red" : "var(--color-brand-1)" }}>{errorMessage}</h4>
                    <button>{userRegisteredStatus ? "Sign in" : "Sign up"}</button>
                    <h3>{userRegisteredStatus ? "Don't have an account?" : "Already have an account?"} <a onClick={() => setUserRegisteredStatus(prev => !prev)}>{userRegisteredStatus ? "Sign up" : "Log in"}</a></h3>
                </form>
            </div>
        </>
    )
}
