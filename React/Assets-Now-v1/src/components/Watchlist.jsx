import React from 'react'
import AssetTab from './AssetTab'
import getCurrencySymbol from "../assets/getCurrencySymbol.js"

export default function Watchlist(props) {

    return (
        <AssetTab title="Watchlist" className="watchlist" itemsCount={props.watchlistList.length} openedTab={props.openedTab === props.id} handleClick={props.handleOpenedTab} id={props.id}>
            <div id="watch-list">
                {props.watchlistList.length > 0
                    ?
                    props.watchlistList.map(item => <div className='watchlist-item'>
                        <div className='watchlist-item-top'>
                            {
                                item.type == "Currency" ?
                                    <div className='watchlist-item-top-currency'>
                                        <h2>{item.value}</h2> <h2>/</h2>
                                        <h2>{item.to}</h2>
                                        <h2>,</h2>
                                    </div> :
                                    <>
                                        <h2>{item?.symbol ? item.symbol : item.value},</h2>
                                    </>
                            }
                            {item?.type && <h2>{item.type}</h2>}
                        </div>
                        <div className='watchlist-item-details'>
                            <p >{getCurrencySymbol(item?.to ? item.to : "INR")} {parseFloat(item.curPrice).toFixed(2)}</p>
                            <p>(Current Price)</p>
                        </div>
                    </div>)
                    :
                    "You haven’t added anything yet"}
            </div>
        </AssetTab>
    )
}
