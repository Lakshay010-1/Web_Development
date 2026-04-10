import React from 'react'
import getCurrencySymbol from '../assets/getCurrencySymbol';
import Loader from './Loader';

export default function SearchResultItem(props) {
    return (
        props.loadingSearchResultItem ?
            <Loader message={props.searchAssetType + "details"}/>
            :
            <div id="search-result-item" onClick={() => props.setToggleResultWindowStatus(false)}>
                <div id="search-result-item-result" onClick={(event) => event.stopPropagation()} style={{ border: "solid 0.5rem " + props.assetResultBorderColour }} >
                    {
                        props.selectedSearchItemResult?.data && (Object.keys(props.selectedSearchItemResult.data).length > (props.searchAssetType == "Stock" ? 1 : 0)) ?
                            (props.selectedSearchItemResult.data?.apiLimit) ?
                                <div className='temp-unavail'>Service is temporarily unavailable. Please try again in a while</div>
                                :
                                <div id='asset-result-item'>
                                    <div className='stock-crypto-top'>
                                        {props.selectedSearchItemResult.data?.image && <img src={props.selectedSearchItemResult.data.image} alt={props.selectedSearchItemResult.data.name + "-logo"} />}
                                        <div>
                                            <h1>{props.selectedSearchItemResult.data.name}</h1>
                                            <a href={props.selectedSearchItemResult.data.website} className='asset-result-item-url'>{props.selectedSearchItemResult.data.website}</a>
                                        </div>
                                        <button className='add-to-list-btn' onClick={() => props.addToWatchListFn(props.createWatchlistID())} >Add to Watchlist</button>
                                    </div>
                                    <div className='stock-crypto-body'>
                                        <p className="stock-crypto-body-title" >Current Price </p>
                                        <p className="stock-crypto-body-mark" >:</p>
                                        <p className="stock-crypto-body-field-desc" > {getCurrencySymbol("INR")} {parseFloat(props.selectedSearchItemResult.data.curPrice).toFixed(2)}</p>
                                        <p className="stock-crypto-body-title" >Percentage Change </p>
                                        <p className="stock-crypto-body-mark" >:</p>
                                        <p className="stock-crypto-body-field-desc" > {parseFloat(props.selectedSearchItemResult.data.perDiff).toFixed(2)}%</p>
                                        <p className="stock-crypto-body-title" >Price Difference </p>
                                        <p className="stock-crypto-body-mark" >:</p>
                                        <p className="stock-crypto-body-field-desc" > {getCurrencySymbol("INR")} {parseFloat(props.selectedSearchItemResult.data.diffPrice).toFixed(2)}</p>
                                        {props.selectedSearchItemResult.data?.address1 && <>
                                            <p className="stock-crypto-body-title" > Address </p>
                                            <p className="stock-crypto-body-mark" >:</p>
                                            <p className="stock-crypto-body-field-desc" > {props.selectedSearchItemResult.data.address1}, {props.selectedSearchItemResult.data.country}</p></>}
                                        {props.selectedSearchItemResult.data?.fullTimeEmployees && <>
                                            <p className="stock-crypto-body-title" > Full Time Empoyees </p>
                                            <p className="stock-crypto-body-mark" >:</p>
                                            <p className="stock-crypto-body-field-desc" > {props.selectedSearchItemResult.data.fullTimeEmployees}</p></>}
                                        {props.selectedSearchItemResult.data?.desc && <>
                                            <p className="stock-crypto-body-title" >About </p>
                                            <p className="stock-crypto-body-mark" >:</p>
                                            <p className="stock-crypto-body-field-desc" > {props.selectedSearchItemResult.data.desc}</p>
                                        </>}
                                        {(props.selectedSearchItemResult.data?.industry) && <>
                                            <p className="stock-crypto-body-title" >Industry Sector(s) </p>
                                            <p className="stock-crypto-body-mark" >:</p>
                                            <p className="stock-crypto-body-field-desc" > {props.selectedSearchItemResult.data.industry + " ," + props.selectedSearchItemResult.data.sector}</p>
                                        </>
                                        }
                                        {(props.selectedSearchItemResult.data?.categories) && <>
                                            <p className="stock-crypto-body-title" >Ecosystem </p>
                                            <p className="stock-crypto-body-mark" >:</p>
                                            <p className="stock-crypto-body-field-desc" >
                                                {props.selectedSearchItemResult.data?.categories.join(" | ")
                                                }</p>
                                        </>
                                        }
                                    </div>
                                </div>
                            :
                            <div>Records un-available. Check back later or try another option</div>
                    }
                </div>
            </div>
    )
}
