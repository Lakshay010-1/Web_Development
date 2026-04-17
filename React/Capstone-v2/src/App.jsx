import React, { useState } from 'react'
import Header from './Components/Header'
import Hero from './Components/Hero'
import { GlobalStyles } from './styles/Global.styles'
import { createTheme, ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from "./styles/themes.js"
import { ContainerOne, ContainerTwo } from "./styles/Container.styles.js"
import Skills from './Components/Skills.jsx'
import Projects from './Components/Projects.jsx'
import Education from './Components/Education.jsx'
import Contact from './Components/Contact.jsx'
import Footer from './Components/Footer.jsx'

export default function App() {
    const [isDarkTheme, setTheme] = useState(true);
    return (
        <>
            <div id="top-view"></div>
            <ThemeProvider theme={createTheme(isDarkTheme ? darkTheme : lightTheme)}>
                <GlobalStyles />
                <Header isDarkTheme={isDarkTheme} setTheme={setTheme} />
                <ContainerOne>
                    <Hero />
                </ContainerOne>
                <ContainerTwo>
                    <Skills />
                </ContainerTwo>
                <ContainerOne>
                    <Projects />
                </ContainerOne>
                <ContainerTwo>
                    <Education />
                </ContainerTwo>
                <ContainerOne>
                    <Contact />
                </ContainerOne>
                <ContainerOne>
                    <Footer />
                </ContainerOne>
            </ThemeProvider>
        </>
    )
}
