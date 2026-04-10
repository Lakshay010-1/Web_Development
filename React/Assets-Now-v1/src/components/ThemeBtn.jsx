import React, { useEffect, useState } from 'react'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';

export default function ThemeBtn() {
    const [isDark, setTheme] = useState(false);

    useEffect(function () {
        document.body.classList.toggle("dark-mode");
    }, [isDark]);

    return (
        <div id="theme-btn" onClick={() => { setTheme(curTheme => !curTheme) }} >{isDark ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}</div>
    )
}
