import React from "react"
import styled from "styled-components"
import myInfo from "../assets/about.js"
import TextType from './TextType';
import Particles from './Particles';


const HeroContainer = styled.section`
    display:flex;
    width:80%;
    gap:2rem;
    justify-content:space-evenly;
    align-items:center;
    padding:2rem 0 4rem;

    @media(max-width:1000px){
        flex-direction:column-reverse;
    }
`;

const About = styled.div`
    white-space:pre-line;
    width:50%;
    display:flex;
    flex-direction:column;
    gap:1.5rem;
    & p{
        color:${({ theme }) => theme.textColor15};
    }
    @media(max-width:1000px){
        width:80%;
    }
`;

const PIC = styled.img`
    position:relative;
    z-index:1;
    height:25rem;
    border-radius:50%;
    border:${({ theme }) => `solid 0.3rem ${theme.bgColor3}`};
    transition:transform 0.8s ease;

    &:hover{
        transform:scale(1.05);
    }

    @media(max-width:425px){
        height:20rem;
    }
    @media(max-width:320px){
        height:15rem;
    }
`;

const PicContainer = styled.div`
    display: inline-block;
    position: relative;
    padding: 24px;
    border-radius: 16px;
    overflow: hidden;
`;

const PicBG = styled(Particles)`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    mask-image: radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 80%);
`;

const ContactInfoContainer = styled.div`
    display:flex;
    gap:1rem;    
    width:100%;
    justify-content:center;

    @media(max-width:540px){
        flex-direction:column;
        align-items:center;
        
    }
`;

const ContactInfo = styled.a`
    text-decoration:none;
    padding:0.1rem;
    font-size:1.2rem;
    width:30%;
    background-color:${({ theme }) => theme.textColor5};
    color:${({ theme }) => theme.textColor1};
    border-radius:2rem;
    text-align:center;
    transition:transform 0.8s ease;
    &:hover{
    background-color:${({ theme }) => theme.textColor6};
        transform:scale(1.1);
        border:${({ theme }) => `solid 1px ${theme.textColor1}`};
    }
    @media(max-width:540px){
        width:50%;
        padding:0.2rem
        
    }
`;

const Roles = styled(TextType)`
    color:${({ theme }) => theme.textColor9};
`;


export default function Hero() {
    return (
        <HeroContainer id="about">
            <About>
                <div>
                    <h1>Hello, I am {myInfo.name}</h1>
                    <h2>I am a&nbsp;
                        <span>
                            <Roles
                                text={myInfo.roles}
                                typingSpeed={75}
                                pauseDuration={1500}
                                showCursor
                                cursorCharacter="_"
                                texts={["Welcome to React Bits! Good to see you!", "Build some amazing experiences!"]}
                                deletingSpeed={50}
                                variableSpeedEnabled={false}
                                variableSpeedMin={60}
                                variableSpeedMax={120}
                                cursorBlinkDuration={0.5}
                            />
                        </span>
                    </h2>
                    <p>{myInfo.about}</p>
                </div>
                <ContactInfoContainer>
                    <ContactInfo href={myInfo.resume} target="_blank">Resume</ContactInfo>
                    <ContactInfo href={myInfo.linkedin} target="_blank">Linkedin</ContactInfo>
                    <ContactInfo href={myInfo.github} target="_blank">GitHub</ContactInfo>
                </ContactInfoContainer>
            </About>

            <PicContainer>
                <PicBG
                    particleColors={["#fff", "#000"]}
                    particleCount={1000}
                    particleSpread={10}
                    speed={0.15}
                    particleBaseSize={200}
                    alphaParticles={true}
                    disableRotation={false}
                    pixelRatio={1}
                />
                <PIC src={myInfo.picURL} />
            </PicContainer>
        </HeroContainer >
    )
}