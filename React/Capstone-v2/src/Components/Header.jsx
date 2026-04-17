import React from 'react'
import { navItems } from "../assets/navItems.js"
import { NavItem } from "../styles/NavItem.styles.js";
import MenuListComposition from './Menu';
import styled from 'styled-components'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';


const HeaderContainer = styled.header`
    display:flex;
    gap:1rem;
    padding:1rem;
    width:100%;
    justify-content:space-between;
    box-sizing:border-box;
    background-color:${({ theme }) => theme.bgColor1};
    align-items: center;
    position:sticky;
    top:0;
    margin:0 auto;
    z-index:1;
    @media(max-width:768px){
        width:100%
    }
`;

const HeaderContent = styled.div`
    display:flex;
    gap:1rem;
    padding:1rem;
    width:80%;
    justify-content:space-between;
    background-color:${({ theme }) => theme.bgColor1};
    align-items: center;
    position:sticky;
    top:0;
    margin:0 auto;
    @media(max-width:768px){
        width:100%
    }
`;

const NavBarContainer = styled.div`
    display:flex;  
    gap:1.5rem;
    align-items:center;
    grid-area:b;
    z-index:1000;
    text-align:center;
    @media(max-width:1024px){
        font-size:0.8rem;
    }
    @media(max-width:600px){
        display:none;
    }
`;

const Logo = styled.img`
    height: 3.5rem;
    grid-area:a;
`;

const ThemeBtn = styled.div`
    grid-area:c;
`;

const MenuContainer = styled.div`
    display:none;
    @media(max-width:600px){
        display:block;
    }
`;

const NavThemeContainer = styled.div`
    @media(max-width:600px){
    display:flex;
    gap:1rem;
    align-items:center;
    }
`;

const LightThemeIcon = styled(LightModeRoundedIcon)`
    color:${({ theme }) => theme.textColor3};
    &:hover{
        color:${({ theme }) => theme.textColor7}
    }
`;

const DarkThemeIcon = styled(DarkModeRoundedIcon)`
    color:${({ theme }) => theme.textColor3};
    &:hover{
        color:${({ theme }) => theme.textColor1}
    }
`;


export default function Header(props) {
    const iconStyle = {
        sx: { fontSize: 30 }
    }
    return (
        <HeaderContainer>
            <HeaderContent>

                {/* Logo */}
                <a href="#top-view">
                    <Logo src="images/logo.png" />
                </a>

                {/* Nav Bar */}
                <NavBarContainer>
                    {navItems.map(item => <NavItem key={item.id} href={item.id}>{item.name}</NavItem>)}
                </NavBarContainer>

                <NavThemeContainer>
                    {/* Nav Options Menu */}
                    <MenuContainer>
                        <MenuListComposition optionsList={navItems} />
                    </MenuContainer>

                    {/* Theme Button */}
                    <ThemeBtn onClick={() => props.setTheme(prev => !prev)}>
                        {props.isDarkTheme ? <LightThemeIcon {...iconStyle} /> : <DarkThemeIcon {...iconStyle} />}
                    </ThemeBtn>
                </NavThemeContainer>

            </HeaderContent>
        </HeaderContainer>
    )
}
