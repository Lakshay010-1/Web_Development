import React from 'react'

export default function Footer() {
    return (
        <footer>
            <a href="#web-top"><img id="footer-icon" src="images/logo.png" /></a>
            <h3 id="footer-credits">&copy;{new Date().getFullYear()} <a href="https://lakshaygoyal-lg-portfolio.vercel.app/">LAKSHAY GOYAL</a></h3>
        </footer>
    )
}
