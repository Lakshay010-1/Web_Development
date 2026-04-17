import React, { useState } from 'react'
import styled from 'styled-components'
import { projects } from '../assets/projects';


const Container = styled.section`
    padding:3rem 0 10rem;
    width:80%;
    text-align:center;
    display:flex;
    flex-direction:column;
    align-items:center;
    @media(max-width:1024px){
        padding:5rem 0 15rem;
    }
    @media(max-width:768px){
        padding:13rem 0 25rem;
    }
`;

const ProjectsContainer = styled.div`
    background-color:${({ theme }) => theme.bgColor5};
    box-shadow:0 1px 4px 0 ${({ theme }) => theme.bgColor3};
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:1rem;
    padding:1rem;
    @media(max-width:1024px){
        grid-template-columns:repeat(2,1fr);
    }
    @media(max-width:768px){
        grid-template-columns:1fr;
    }
`;

const Button = styled.a`
    text-decoration:none;
    color:${({ theme }) => theme.textColor10};  
    padding:0.5rem;
    border-radius:0.3rem;
    background-color:${({ theme }) => theme.textColor2};  
    &:hover{
        background-color:${({ theme }) => theme.textColor1}
    }
`;

const ProjectContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color:${({ theme }) => theme.textColor10};
    border-radius:2rem;
    box-sizing:border-box;
    padding:1rem;   
    gap:0.5rem;
    transition:transform 0.4s ease;
    & *{
        margin:0;
    }
    & img{
        box-sizing:border-box;
        width:100%;
        border-radius:1rem;
        border:solid 1px ${({ theme }) => theme.textColor2};
    }
    &:hover{
        transform:scale(1.01);
        border:solid 1px ${({ theme }) => theme.textColor12};
    }
`;

const ProjectsDesc = styled.p`
    width:70%;
    color:${({ theme }) => theme.textColor15};
`;

const ProjectsTitle = styled.h1`
    color: ${({ theme }) => theme.textColor9};
`;

const Box = styled.p`
    background-color:${({ theme }) => theme.bgColor2};
    border-radius:1rem;
    font-size:small;
    padding:0.2rem;
`;

const Box2 = styled(Box)`
    color:${({ theme }) => theme.textColor5};
`;

const ProjectTechnologies = styled.div`
    margin:0.5rem 0;
    display:flex;
    flex-wrap:wrap;    
    gap:0.5rem;
    justify-content:center;
    color:${({ theme }) => theme.textColor9};
`;

const ProjectDesc = styled.p`
    font-size:0.95rem;
    color:${({ theme }) => theme.textColor12}
`;

const ProjectBody = styled.div`
    height:100%;
    gap:1rem;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
`;

const ProjectBodySubContainer = styled.div`
    display:flex;
    flex-direction:column;
    gap:0.5rem;
`;

const ProjectTitle = styled.h2`
    color:${({ theme }) => theme.textColor2}
`;


export default function Projects() {
    const [displayBtns, setDisplayBtns] = useState(-1);
    return (
        <Container id="projects-and-experience">
            <ProjectsTitle>Projects</ProjectsTitle>
            <ProjectsDesc>These projects represent my practical experience in designing and building real-world solutions. They highlight my ability to apply technical skills, solve complex problems, and deliver efficient, user-focused outcomes across different domains.</ProjectsDesc>
            <ProjectsContainer>
                {projects.map(project =>
                    <ProjectContainer key={project.id} onMouseOver={() => setDisplayBtns(project.id)} onMouseOut={() => setDisplayBtns(-1)}>
                        <img src={project.homepageImg} alt={project.title + " img"} />
                        <ProjectBody>
                            <ProjectBodySubContainer>
                                <ProjectTitle>{project.title}</ProjectTitle>
                                <ProjectDesc>{project.desc}</ProjectDesc>
                            </ProjectBodySubContainer>
                            <ProjectBodySubContainer>
                                <ProjectTechnologies>
                                    {project.technologies.map(technology =>
                                        <Box key={technology}>{technology}</Box>
                                    )}
                                </ProjectTechnologies>
                                <Box2>{project.category}</Box2>
                            </ProjectBodySubContainer>
                            <ProjectBodySubContainer style={{ display: displayBtns == project.id ? "flex" : "none" }}>
                                <Button href={project.sourceCode} target="_blank">Source Code</Button>
                                <Button href={project.hostedOnUrl} target="_blank">View Project</Button>
                            </ProjectBodySubContainer>
                        </ProjectBody>
                    </ProjectContainer>
                )}
            </ProjectsContainer>
        </Container>
    )
}
