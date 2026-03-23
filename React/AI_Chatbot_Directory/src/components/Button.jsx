import React from 'react'

export default function Button(props) {
    const text = props.curECState ? "CLOSE" : props.selectedCards > 1 ? "COMPARE" : "EXPAND";
    return props.selectedCards > 0 && (<div id="diff-expand-div">
        <button id="diff-expand-btn" onClick={() => props.selectECState()}>
            <span id="diff-expand-text">{text.split("").map((char, idx) => {
                return <span key={idx}>
                    {char}
                </span>
            })}</span>
            {(props.selectedCards > 1 && !props.curECState) && <span id="diff-expand-sltCards">{props.selectedCards}</span>}
        </button>
    </div>)
}
