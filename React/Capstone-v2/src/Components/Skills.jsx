import React from 'react'
import styled from 'styled-components'
import { skills } from '../assets/skills';


const Container = styled.section`
    padding:5rem 0 7rem;
    width:70%;
    text-align:center;    
`;

const Title = styled.h1`
    color: ${({ theme }) => theme.textColor9};
    `;

const Desc = styled.p`
    color:${({ theme }) => theme.textColor15};
`;

const SkillsContainer = styled.div`
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:1rem;
    @media(max-width:768px){
        grid-template-columns:1fr;
    }
`;

const SkillContainer = styled.div`
    display:flex;
    flex-direction:column;
    gap:1rem;
    padding:1rem;
    border:solid 0.1rem ${({ theme }) => theme.bgColor3};
    box-shadow:0 1px 4px 0 ${({ theme }) => theme.bgColor3};
    background-color:${({ theme }) => theme.bgColor1};
`;

const SkillTypeTitle = styled.h2``;

const SkillTypeTechnologies = styled.div`
    display:flex;
    gap:1rem;
    flex-wrap:wrap;
    justify-content:center;
`;

const SkillTypeTechnology = styled.div`
    display:flex;
    align-items:center;
    padding:0.5rem;
    gap:0.3rem;
    border:solid 1px ${({ theme }) => theme.textColor2};
    background-color:${({ theme }) => theme.textColor10};
    border-radius:1rem;
    color:${({ theme }) => theme.textColor15};
    & img{
        height:1.5rem;
        
    }
`;


export default function Skills() {
    return (
        <Container id="skills">
            <Title>Technical Skills</Title>
            <Desc>These are the technologies I use to build scalable and efficient applications.</Desc>
            <SkillsContainer>
                {skills.map(type =>
                    <SkillContainer key={type.title}>
                        <SkillTypeTitle>{type.title}</SkillTypeTitle>
                        <SkillTypeTechnologies>
                            {type.skills.map(skill =>
                                <SkillTypeTechnology key={skill.name}>
                                    <img src={skill.image} alt={skill.name} />
                                    <p>{skill.name}</p>
                                </SkillTypeTechnology>
                            )}
                        </SkillTypeTechnologies>
                    </SkillContainer>
                )}
            </SkillsContainer>
        </Container>
    )
}
