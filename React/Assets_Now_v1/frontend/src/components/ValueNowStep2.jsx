import React from 'react'
import Date from './Date'

export default function ValueNowStep2(props) {
    return (
        <>
            <Date label="From:" value={props.from} handleChange={props.setDate} source="from" />
            <Date label="To:" value={props.to} handleChange={props.setDate} source="to" />
            {props.from >= props.to && <div>The start date must be before the end date</div>}
        </>
    )
}
