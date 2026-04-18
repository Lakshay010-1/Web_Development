import React from 'react'

export default function Footer() {
    return (
        <footer>
            <a href="#top">
                <img src="images/budget.png" alt="logo" className="app-logo" />
            </a>
            <div id="footer-credits">
                <span>&copy; {new Date().getFullYear()}</span>
                <a href="https://lakshaygoyal-lg.vercel.app">
                    Lakshay Goyal</a>
            </div>
        </footer>
    )
}
