const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const API_BASE_URL = BACKEND_URL + "/api/users";

const checkUser = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/me`, {
            credentials: "include"
        });
        console.log(response);
        if (!response.ok) {
            console.log("CHECK USER ERROR");
            return { error: 1 };
        } else {
            const data = await response.json();
            console.log("CHECK USER FINE");
            console.log(data);
            return { ...data, error: 0 }
        }
    } catch (error) {
        console.error(error);
        throw new Error("Failed to check tokens : ", error);
    }
};

const registerUser = async (user) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();

        if (!response.ok) {
            return { ...data, error: 1 };
        }
        return { ...data, error: 0 };
    } catch (error) {
        throw new Error("Failed to register user : ", error);
    }
};

const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (!response.ok) {
            return { ...data, error: 1 };
        }
        return { ...data, error: 0 };
    } catch (error) {
        throw new Error("Failed to login user : ", error);
    }
};

const logoutUser = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/logout`, {
            method: "POST",
            credentials: "include"
        });
        if (!response.ok) {
            return { error: 1 };
        }
        const data = await response.json();
        return { ...data, error: 0 };
    } catch (error) {
        throw new Error("Failed to logout user : ", error);
    }
}

export {
    registerUser,
    loginUser,
    logoutUser,
    checkUser
}