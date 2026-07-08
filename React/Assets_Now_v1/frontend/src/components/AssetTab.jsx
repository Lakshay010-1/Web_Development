import React from 'react'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';


export default function AssetTab(props) {
    return (
        <div className="asset-tab-container">
            <div className='asset-tab' onClick={() => { props.handleClick({ type: "setTab", payload: props.id }) }} >
                <div className='asset-tab-title'>
                    <h3>{props.title}</h3>
                    {props?.itemsCount > 0 && <h3 className='asset-tab-item-count'>{props.itemsCount}</h3>}
                </div>
                {props.openedTab ? <KeyboardArrowUpOutlinedIcon /> : <KeyboardArrowDownOutlinedIcon />}
            </div>
            <div className='asset-tab-content' >
                {props.openedTab && props.children}
            </div>
        </div>
    )
}