import React from 'react'

export default function Card(props) {
    return (
        <div className={"card " + (props.curCards.includes(props.properties) ? "selected-card" : "")} id={props.properties.id + "-card"} onClick={() => { props.selectCards(props.properties) }}>
            <div className='image-container'>
                <img src={props.properties.imageSrc} alt={props.properties.id + "-logo"} />
            </div>
            <div className='card-desc'>
                <div>
                    <h1 className='card-name'>{props.properties.name}</h1>
                    <div>
                        <p className='card-feature'>{props.properties.standoutFeature}</p>
                        <p className='card-models'>Models: {props.properties.aiModels.join(", ")}</p>
                    </div>
                </div>
                <p className='card-specialty'>{props.properties.specialty.join(", ")}</p>
            </div>

        </div>
    )
}
