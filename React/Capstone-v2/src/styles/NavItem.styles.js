import styled from "styled-components";

export const NavItem = styled.a`
    margin:0;
    text-decoration:none;
    font-size:110%;
    color:${({ theme }) => theme.textColor3};
    &:hover{
        color:${({ theme }) => theme.textColor1};
    }
`;