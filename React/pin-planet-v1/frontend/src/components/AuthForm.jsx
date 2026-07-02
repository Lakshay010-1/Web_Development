import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from '../contexts/useAuthContext';
import styles from './styles/AuthForm.module.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function LoginForm() {
    const initialState = { email: "", password: "", name: "" }
    const [credentials, setCredentials] = useState(initialState);
    const [userRegisteredStatus, setUserRegisteredStatus] = useState(false);
    const [fieldError, setFieldError] = useState(null);
    const [errorMessage, setErrorMessage] = useState("placeholder text");
    const [viewPasswordStatus, setViewPasswordStatus] = useState(false);
    const emailFieldInputRef = useRef(null);
    const passwordFieldInputRef = useRef(null);

    const { login, register } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from;



    async function handleLogin() {
        const { name, email, password } = credentials;
        const response = await (userRegisteredStatus ? login(credentials.email, credentials.password) : register(name, email, password));
        if (response.error) {
            setErrorMessage(response.message);
            setFieldError(response.field)
            const errorFieldRef = response.field === "email" ? emailFieldInputRef : passwordFieldInputRef;
            errorFieldRef.current.focus();
        } else {
            if (userRegisteredStatus) {
                const redirectTo =
                    from?.pathname + from?.search || "/dashboard";
                navigate(redirectTo);
            } else {
                setUserRegisteredStatus(true);
            }
        }
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
            <form onSubmit={(e) => handleFormSubmit(e)} className={styles.authenticateForm}>
                {!userRegisteredStatus && <div>
                    <label>Name:</label>
                    <input type="text" name="name" placeholder='name' value={credentials.name} required onChange={(e) => handleChange(e)} />
                </div>}
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" ref={emailFieldInputRef} className={fieldError === "email" ? `${styles.errorField}` : ""} placeholder='email@example.com' value={credentials.email} required onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Password:</label>
                    <div className={styles.passwordField}>
                        <input type={viewPasswordStatus ? "text" : "password"} name="password" ref={passwordFieldInputRef} className={`${fieldError === "password" ? styles.errorField : ""}`} placeholder='password' value={credentials.password} required onChange={(e) => handleChange(e)} />
                        <a className={styles.passwordVisibiltyBtn} onClick={() => setViewPasswordStatus(prev => !prev)}>{viewPasswordStatus ? <VisibilityIcon /> : <VisibilityOffIcon />}</a>
                    </div>
                </div>
                <h4 style={{ color: fieldError ? "red" : "var(--color-brand-1)" }}>{errorMessage}</h4>
                <button>{userRegisteredStatus ? "Log in" : "Sign up"}</button>
                <h3>{userRegisteredStatus ? "Don't have an account?" : "Already have an account?"} <a onClick={() => setUserRegisteredStatus(prev => !prev)}>{userRegisteredStatus ? "Sign up" : "Log in"}</a></h3>
            </form>
        </>
    )
}
