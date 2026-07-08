import React from 'react'
import getCurrencySymbol from '../assets/getCurrencySymbol.js'
import Loader from './Loader'
import { useState } from 'react';
import { useEffect } from 'react';

export default function ValueNowStep3(props) {
    const [statusColor, setStatusColor] = useState("black");
    const selectedInvestedCurrencyOption = props.selectedInvestedCurrencyOption === undefined ? "INR" : props.selectedInvestedCurrencyOption;

    useEffect(() => {
        async function setColor() {
            setStatusColor(props.selectedAssetHistoricalResult.dataDiffPer > 0 ? "var(--up-2)" : props.selectedAssetHistoricalResult.dataDiffPer == 0 ? "var(--draw-2)" : "var(--down-2)");
        }
        setColor();
    }, [props.selectedAssetHistoricalResult.dataDiffPer]);


    async function addToPortfolio() {
        const newAsset = {
            symbol: props.selectedSearchAssetHisSymbol,
            type: props.selectedSearchAssetHisType,
            invested_amount: props.selectedAssetHistoricalResult.amount,
            durationDate: {
                from: props.selectedAssetHistoricalResult.from,
                to: props.selectedAssetHistoricalResult.to
            },
            invested_currency: selectedInvestedCurrencyOption,
            value: props.selectedSearchAssetHisValue,
            price: {
                toPrice: {
                    date: props.selectedAssetHistoricalResult.data.toPrice.date,
                    price: (Number(props.selectedAssetHistoricalResult.amount) * (1 + Number(props.selectedAssetHistoricalResult.dataDiffPer) / 100)).toFixed(2)
                },
                fromPrice: {
                    date: props.selectedAssetHistoricalResult.data.fromPrice.date,
                    price: parseFloat(props.selectedAssetHistoricalResult.amount).toFixed(2)
                }
            },
            list: "p",
            user: props.user.user.email
        };
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/api/list/p`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newAsset)
        });
        if (response.ok) {
            const data = await response.json();
            props.setPortfolioList(prev => [...prev, data.asset]);
        }
    }

    return (
        <div className='asset-dates'>
            {props.selectedAssetHistoricalResult.status == "loading" ?
                <Loader message="historical data" />
                :
                props.selectedAssetHistoricalResult?.data ?
                    (
                        props.selectedAssetHistoricalResult.data.apiLimit ?
                            (<p className='temp-unavail'>
                                Services Temperary Unavailable (API LIMIT REACHED)
                            </p>)
                            :
                            (
                                <div id="asset-value-now-item">
                                    <h2 style={{color:"var(--title)"}}>{
                                        props.selectedSearchAssetHisType == "Currency" ?
                                            props.selectedSearchAssetHisValue + "/" + selectedInvestedCurrencyOption
                                            :
                                            props.selectedSearchAssetHisType == "Commodity" ?
                                                props.selectedSearchAssetHisValue
                                                :
                                                props.selectedSearchAssetHisSymbol
                                    }</h2>
                                    <div id="asset-value-now-item-details">
                                        <p className='asset-value-now-item-header'>Requested Date</p>
                                        <p className='asset-value-now-item-header'>Resolved Date</p>
                                        <p className='asset-value-now-item-header'>Price</p>
                                        <p className='asset-value-now-item-header'>Investment Value</p>
                                        <p>{props.selectedAssetHistoricalResult.from}</p>
                                        <p>{props.selectedAssetHistoricalResult.data.fromPrice.date}</p>
                                        <p>{getCurrencySymbol(selectedInvestedCurrencyOption)} {parseFloat(props.selectedAssetHistoricalResult.data.fromPrice.price).toFixed(2)}</p>
                                        <p>{getCurrencySymbol(selectedInvestedCurrencyOption)} {parseFloat(props.selectedAssetHistoricalResult.amount).toFixed(2)}</p>
                                        <p>{props.selectedAssetHistoricalResult.to}</p>
                                        <p>{props.selectedAssetHistoricalResult.data.toPrice.date}</p>
                                        <p>{getCurrencySymbol(selectedInvestedCurrencyOption)} {parseFloat(props.selectedAssetHistoricalResult.data.toPrice.price).toFixed(2)}</p>
                                        <p>{getCurrencySymbol(selectedInvestedCurrencyOption)} {(Number(props.selectedAssetHistoricalResult.amount) * (1 + Number(props.selectedAssetHistoricalResult.dataDiffPer) / 100)).toFixed(2)} (<span style={{ color: statusColor }}>{props.selectedAssetHistoricalResult.dataDiffPer > 0 ? "+" : props.selectedAssetHistoricalResult.dataDiffPer == 0 ? "" : "-"}{props.selectedAssetHistoricalResult.dataDiffPer.toFixed(2)}%</span>)</p>
                                    </div>
                                    <div id="asset-value-now-item-total">
                                        <p id="asset-value-now-item-total-details" style={{ color: statusColor }}>
                                            {getCurrencySymbol(selectedInvestedCurrencyOption)} {((Number(props.selectedAssetHistoricalResult.amount) * (1 + Number(props.selectedAssetHistoricalResult.dataDiffPer) / 100)).toFixed(2) - Number(props.selectedAssetHistoricalResult.amount)).toFixed(2)} ({props.selectedAssetHistoricalResult.dataDiffPer > 0 ? "Profit" : props.selectedAssetHistoricalResult.dataDiffPer == 0 ? "No Growth" : "Loss"} )
                                            <br />
                                            <span></span>
                                        </p>
                                    </div>
                                    {(props.selectedAssetHistoricalResult.from != props.selectedAssetHistoricalResult.data.fromPrice.date || props.selectedAssetHistoricalResult.to != props.selectedAssetHistoricalResult.data.toPrice.date)
                                        && <p className='asset-value-now-item-date-error'>
                                            No data found for the selected period. Showing nearest available results instead.
                                        </p>}
                                    <button className='add-to-list-btn' onClick={() => addToPortfolio()}>Add to Portfolio</button>
                                </div>
                            )
                    )
                    :
                    (
                        <div>No Search Result Found </div>
                    )
            }
        </div>
    )
}
