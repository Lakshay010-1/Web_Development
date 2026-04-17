import React from 'react'
import styled from 'styled-components'
import { NavItem } from '../styles/NavItem.styles';
import { navItems } from '../assets/navItems';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';


const Container = styled.div`
    background-color:${({ theme }) => theme.bgColor4};
    width:100%;
    display:flex;
    flex-direction:column;
    gap:1.5rem;
    align-items:center;
    padding:2rem 0;
    text-align:center;

    & a{
        color: ${({ theme }) => theme.textColor2};
    }
    & a:hover{
        color: ${({ theme }) => theme.textColor9};
    }
`;

const NavBarContainer = styled.footer`
    display:flex;  
    gap:1.5rem;
    align-items:center;
    text-align:center;
    flex-wrap:wrap;
    justify-content:center;
    @media(max-width:1024px){
        font-size:0.8rem;
    }
`;

const SocialMedias = styled.div`
    display:flex;
    gap:1.5rem;
`;

const Title = styled.h2`
    color:${({ theme }) => theme.textColor3};
    margin:0;   
`;

export default function Footer() {
    return (
        <Container>
            <Title>Lakshay Goyal</Title>
            {/* Nav Bar */}
            <NavBarContainer>
                {navItems.map(item => <NavItem key={item.id} href={item.id}>{item.name}</NavItem>)}
                <NavItem href="#top-view">↑</NavItem>
            </NavBarContainer>
            <SocialMedias>
                <a href='mailto:contactlakshay3302@gmail.com' target='_blank'><EmailIcon /></a>
                <a href='https://www.linkedin.com/in/goyal-lakshay/' target='_blank'><LinkedInIcon /></a>
                <a href='https://github.com/Lakshay010-1' target='_blank'><GitHubIcon /></a>
            </SocialMedias>
            <p>
                &copy; {new Date().getFullYear()} Lakshay Goyal. All rights reserved.
            </p>

        </Container>
    )
}
