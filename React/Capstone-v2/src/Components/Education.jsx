import React from 'react'
import styled from 'styled-components'
import ListContainer from './ListContainer';
import ListItem from './ListItem';
import { educations } from '../assets/education';
import { certifications } from '../assets/certificates';


const Container = styled.div`
    text-align:center;
    width:70%;
    display:flex;
    flex-direction:column;
    gap:1rem;
    align-items:center;

    & h1{
        color: ${({ theme }) => theme.textColor9};
    }
`;

const ItemDesc = styled.p`
    width:80%;
    color:${({ theme }) => theme.textColor15};
`;

const CertificateItem = styled.div`
    display:flex;
    & img{
        height:5rem;
        width:auto;
    }
`;

const EducationItem = styled.div`
    display:flex;
    & img{
        height:5rem;
    }
`;

const CertificateItemBody = styled.div`
    background-color:${({ theme }) => theme.bgColor1};
    border-radius:1rem;
    padding:1rem;
    display:flex;
    flex-direction:column;
    gap:0.5rem;
    & *{
        margin:0;
    }
    & > div > div{
        display:flex;
        gap:1rem;
    }
    & > div{
        display:flex;
        gap:1rem;
        justify-content:space-between;
        
        @media(max-width:500px){
            flex-direction:column;
        }
    }
    & a{
        background-color:${({ theme }) => theme.textTransColor9};
        color:${({ theme }) => theme.textColor9};
        border-radius:0.5rem;
        height:fit-content;
        padding:0.5rem;
        text-decoration:none;

        &:hover{
            color:${({ theme }) => theme.textColor5};
            background-color:${({ theme }) => theme.textTransColor5};
        }
    }
`;

const EducationItemBody = styled.div`
    background-color:${({ theme }) => theme.bgColor1};
    border-radius:1rem;
    padding:1rem;
    display:flex;
    flex-direction:column;
    gap:0.5rem;
    & *{
        margin:0;
    }
    & > div{
        display:flex;
        gap:1rem;
        & p{
            color:${({ theme }) => theme.textColor15};
        }
        @media(max-width:500px){
            flex-direction:column;
        }
    }
    & a{
        margin-left:auto;
    }
`;

const Educations = styled.section`
    display:flex;
    justify-content:center;    
`;

const Certifications = styled.div`
    display:flex;
    justify-content:center;    
`;

const MainContainer = styled.div`
    display:flex;
    flex-direction:column;
    padding:10rem 0;
    gap:3rem
`;

const ObjectDesc = styled.p`
    color:${({ theme }) => theme.textColor15};
`;



export default function Education() {
    return (<MainContainer>
        <Educations id="education">
            <Container>
                <h1>Education</h1>
                <ItemDesc>My academic background has provided me with a strong foundation in computer science fundamentals, including problem-solving, data structures, and software development.</ItemDesc>
                <div >
                    <ListContainer>
                        {educations.map(education =>
                            <ListItem key={education.id}>
                                <EducationItem>
                                    <EducationItemBody>
                                        <div>
                                            <img src={education.img} alt={education.institue} />
                                            <div>
                                                <h2>{education.institue}</h2>
                                                <p>{education.course}</p>
                                                <p>{education.duration}</p>
                                            </div>
                                        </div>
                                        <p>Grade : {education.marksPercentage}</p>
                                        <ObjectDesc>{education.desc}</ObjectDesc>
                                    </EducationItemBody>
                                </EducationItem>
                            </ListItem>
                        )}
                    </ListContainer>
                </div>
            </Container >
        </Educations>
        <Certifications>
            <Container>
                <h1>Certifications</h1>
                <ItemDesc>These certifications reflect my practical understanding of key concepts and tools, gained through structured learning and hands-on application. They demonstrate my commitment to continuously developing relevant technical skills.</ItemDesc>
                <div>
                    <ListContainer>
                        {certifications.map(certificate =>
                            <ListItem key={certificate.id}>
                                <CertificateItem>
                                    <CertificateItemBody>
                                        <div>
                                            <div>
                                                <img src={certificate.img} alt={certificate.role + " " + certificate.company} />
                                                <div>
                                                    <h2>{certificate.role}</h2>
                                                    <p>{certificate.company}</p>
                                                </div>
                                            </div>
                                            <a href={certificate.url} target='_blank'>View Certificate</a>
                                        </div>
                                        <ObjectDesc>{certificate.desc}</ObjectDesc>
                                    </CertificateItemBody>
                                </CertificateItem>

                            </ListItem>
                        )}
                    </ListContainer>
                </div>
            </Container>
        </Certifications>
    </MainContainer>
    )
}
