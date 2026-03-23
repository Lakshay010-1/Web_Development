import React from 'react'

export default function NavItem(props) {
    return (
        <div className={"nav-item " + props.className} id={props.field} onClick={() => { props.selectField(props.field) }}>
            <p>{props.field}</p>
            <p id="field-bots">{props.num}</p>
        </div>
    )
}
