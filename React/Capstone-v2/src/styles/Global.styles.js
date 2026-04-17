import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    html{
        scroll-behavior: smooth;
    }
    body{
        font-family:"IBM Plex Mono",sans-serif;
        background-color:${({ theme }) => theme.bgColor1};
        margin:0;
        color:${({ theme }) => theme.textColor1};
        position:relative;
        min-width:365px;
    }
    section {
        scroll-margin-top: 7rem;
    }
    p{
        font-size:1.1rem;
    }
`;