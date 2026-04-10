import React from 'react'

export default function Input(props) {
    return (
        <input onChange={(event) => !props.setFn ? props.handleChange(event.target.value) : props.handleChange(event.target.value, props.setFn)} value={props.value} disabled={props.disableCon ? "disable" : ""} className={props.className} type={props.type} placeholder={props.placeholder} required />
    )
}
