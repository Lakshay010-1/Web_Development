import React from 'react'
import styles from './styles/Footer.module.css'
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <h1><a href="https://lakshaygoyal-lg.vercel.app/" target="_blank">Lakshay Goyal</a></h1>
            <div className={styles.socialsContainer}>
                <a href="mailto:lakshaybyte@gmail.com" target="_blank"><EmailIcon /></a>
                <a href="https://www.linkedin.com/in/goyal-lakshay" target="_blank"><LinkedInIcon /></a>
                <a href="https://github.com/Lakshay010-1" target="_blank"><GitHubIcon /></a>
            </div>
            <p>&copy; {new Date().getFullYear()} Lakshay Goyal. All rights reserved.</p>
        </footer>
    )
}
