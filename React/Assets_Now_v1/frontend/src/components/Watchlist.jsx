import React from 'react'
import AssetTab from './AssetTab'
import getCurrencySymbol from "../assets/getCurrencySymbol.js"
import BackspaceIcon from '@mui/icons-material/Backspace';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ClearIcon from '@mui/icons-material/Clear';

export default function Watchlist(props) {

    async function deleteListItem(id) {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/api/list/w/${id}`, {
            method: "DELETE"
        });
        if (response.ok) {
            props.setWatchlistList(prev => {
                return prev.filter(item => item.id !== id);
            });
        }
    }

    return (
        <AssetTab title="Watchlist" className="watchlist" itemsCount={props.watchlistList.length} openedTab={props.openedTab === props.id} handleClick={props.handleOpenedTab} id={props.id}>
            <div id="watch-list">
                {props.watchlistList.length > 0
                    ?
                    props.watchlistList.map(item => <div key={item.id} className='watchlist-item'>
                        <div className='watchlist-item-top'>
                            {
                                item.type == "Currency" ?
                                    <div className='watchlist-item-top-currency'>
                                        <h2>{item.value}</h2> <h2>/</h2>
                                        <h2>{item.exchangeTo}</h2>
                                        <h2>,</h2>
                                    </div> :
                                    <>
                                        <h2>{item?.symbol ? item.symbol : item.value},</h2>
                                    </>
                            }
                            {item?.type && <h2>{item.type}</h2>}
                        </div>
                        <div className='watchlist-item-details'>
                            <p >{getCurrencySymbol(item?.exchangeTo ? item.exchangeTo : "INR")} {parseFloat(item.curPrice).toFixed(2)}</p>
                            <p>({new Date(item.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })})</p>
                            <p>({new Date(item.updatedAt).toLocaleDateString()})</p>
                        </div>
                        <div onClick={() => deleteListItem(item.id)} className='list-delete-btn'><HighlightOffIcon sx={{ fontSize: 35, color: "black" }} /></div>
                    </div>)
                    :
                    "You haven’t added anything yet"}
            </div>
        </AssetTab>
    )
}
