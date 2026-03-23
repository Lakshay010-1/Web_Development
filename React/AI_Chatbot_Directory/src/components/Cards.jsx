import React from 'react'
import aiChatbots from '../../public/data.js'
import Card from "./Card.jsx"

export default function Cards(props) {
    var filteredChatBots = [];
    if (props.curField === "all") {
        filteredChatBots = aiChatbots;
    } else {
        aiChatbots.forEach(bot => {
            bot.specialty.forEach(s => {
                if (s === props.curField) {
                    filteredChatBots.push(bot);
                }
            });
        });
    }
    return (
        <div className='cards'>
            {filteredChatBots.map((llm) => {
                return <Card key={llm.id + "-card"} properties={llm} curCards={props.curCards} selectCards={props.selectCards} />
            })}
        </div>
    )
}
