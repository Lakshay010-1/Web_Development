import React, { useEffect, useState } from 'react'
import emailjs from "@emailjs/browser";
import styled from 'styled-components';


const Container = styled.section`
    display:flex;
    flex-direction:column;
    gap:3rem;
    align-items:center;
    width:70%;
    padding:5rem 0 8rem;

    & *{
        margin:0;
    }

    @media(max-width:1024px){
        width:80%;
    }

    @media(max-width:768px){
        width:90%;
    }
    @media(max-width:425px){
        width:100%;
    }
`;

const ContactStatment = styled.p`
    width:80%;
    text-align:center;
    color:${({ theme }) => theme.textColor15};
`;

const Form = styled.form`
    width:55%;
    display:flex;
    text-align:center;
    flex-direction:column;
    gap:1rem;
    padding:2rem;
    border-radius:1rem;
    background-color:${({ theme }) => theme.bgColor4};
    box-shadow:  0 0 20px  ${({ theme }) => theme.bgColor3};

    & label{
        padding:1rem 0;
    }


    & input,
    & button,
    & textarea{
        background-color:${({ theme }) => theme.bgColor5};
        padding:1rem;
        border:0;
        color:${({ theme }) => theme.textColor1};
        border-radius:0.5rem;
        border:solid 2px ${({ theme }) => theme.bgColorTrans3};
    }

    & button{
        background-color:${({ theme }) => theme.bgColorTrans3};
    }
    
    & textarea{
        resize:vertical;
        min-height:4rem;
    }

    & textarea:focus,
    & input:focus,
    & button:focus{
        outline:solid 2px ${({ theme }) => theme.textColor9};
    }

    & button:hover{
        background-color:${({ theme }) => theme.textColor9};
        cursor:pointer;
    }
    & button:active{
        background-color:${({ theme }) => theme.textTransColor9};
        color:${({ theme }) => theme.textColor9};
        border:solid 2px ${({ theme }) => theme.textColor9};
    }

    & input::placeholder,
    & textarea::placeholder
    {
        color:${({ theme }) => theme.textColor1};
    }
`;

const FormStatus = styled.div`
    padding:1rem;
    color: ${({ sendStatus, theme }) => {
        if (sendStatus === 0) return theme.textColor4;
        if (sendStatus === 1) return theme.textColor13;
        return theme.textColor14;
    }};
`;

const Title = styled.h1`
    color: ${({ theme }) => theme.textColor9};
`;

export default function Contact() {
    const [formData, setFormData] = useState({ email: "", name: "", subject: "", message: "" });
    const [sendStatus, setSendStatus] = useState(2);
    const emailJSKey = import.meta.env.VITE_PUBLIC_KEY;
    const templateID = import.meta.env.VITE_TEMPLATE_ID;
    const serviceID = import.meta.env.VITE_SERVICE_ID;

    useEffect(() => {
        if (sendStatus !== 2 && sendStatus !== 0) {
            const timer = setTimeout(() => {
                setSendStatus(2);
            }, 5000)
            return () => clearTimeout(timer);
        }
    }, [sendStatus]);


    function handleFormData(e) {
        const key = e.target.name;
        const value = e.target.value;
        const newValue = {
            ...formData,
            [key]: value
        };
        setFormData(newValue)
    }

    const sendEmail = (e) => {
        e.preventDefault();
        setSendStatus(0);
        emailjs.send(
            serviceID,
            templateID,
            {
                title: `New Message from ${formData.email}`,
                name: formData.name,
                email: formData.email,
                message: `Name : ${formData.name},\nEmail : ${formData.email},\nSubject : ${formData.subject},\nMessage : ${formData.message}`,
                time: new Date().toLocaleString()
            },
            emailJSKey
        )
            .then(() => {
                setSendStatus(1);
                setFormData({ email: "", name: "", subject: "", message: "" });
            })
            .catch(() => setSendStatus(() => -1));
    };

    return (
        <Container id="contact">
            <Title>Contact</Title>
            <ContactStatment>I am actively seeking opportunities where I can contribute, learn, and grow as a developer. If my profile aligns with your requirements, I would welcome the opportunity to connect and discuss further.</ContactStatment>
            <Form onSubmit={sendEmail}>
                <label>Get in Touch : </label>
                <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleFormData} autoComplete="off" required />
                <input type="text" name="name" placeholder='Name' value={formData.name} onChange={handleFormData} autoComplete="off" required />
                <input type="text" name="subject" placeholder='Subject' value={formData.subject} onChange={handleFormData} autoComplete="off" required />
                <textarea name="message" placeholder='Message' value={formData.message} onChange={handleFormData} autoComplete="off" required ></textarea>
                <button type="submit">Forward</button>
            </Form>
            {sendStatus != 2 && <FormStatus sendStatus={sendStatus} >{sendStatus == 0 ? "Sending..." : sendStatus == 1 ? "Message sent!" : "Failed to send."}</FormStatus>}
        </Container>
    )
}
