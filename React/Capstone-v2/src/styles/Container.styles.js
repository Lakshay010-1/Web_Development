import styled from "styled-components";

const ContainerOne = styled.div`
    clip-path: polygon(0 0,25% 2%,49% 1%,70% 0,85% 2%,100% 0,100% 100%,75% 98%,51% 97%,25% 99%,0 100%);
    width:100%;
    display:flex;
    justify-content:center;
    background-color:${({ theme }) => theme.bgColor1};
`;

const ContainerTwo = styled(ContainerOne)`
    background-color:${({ theme }) => theme.bgColor2};
`;

export { ContainerOne, ContainerTwo };