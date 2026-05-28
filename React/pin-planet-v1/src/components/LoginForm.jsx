import React, { useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from '../contexts/useAuthContext';
import styles from './styles/LoginForm.module.css'

export default function LoginForm() {
    const [credentials, setCredentials] = useState({ email: "lakshaybyte@gmail.com", password: "fakepassword" });
    const { login } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from;
    function handleLogin() {
        login(credentials.email, credentials.password);

        const redirectTo =
            from?.pathname + from?.search || "/dashboard";

        navigate(redirectTo, { replace: true });
    }
    return (
        <form onSubmit={(e) => { e.preventDefault(); handleLogin() }} className={styles.authenticateForm}>
            <div>
                <label>Email:</label>
                <input type="email" placeholder='lakshaybyte@gmail.com' value={credentials.email} required onChange={(e) => setCredentials(prev => { return { ...prev, "email": e.target.value } })} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" placeholder='fakepassword' value={credentials.password} onChange={(e) => setCredentials(prev => { return { ...prev, "password": e.target.value } })} required />
            </div>
            <button>Login</button>
        </form>
    )
}
