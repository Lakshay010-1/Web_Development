import React from 'react'
import getCurrencySymbol from '../assets/getCurrencySymbol'
import Loader from './Loader'

export default function ValueNowStep3(props) {

    function createPortfolioID(type = props.selectedSearchAssetHisType, value = props.selectedSearchAssetHisValue, symbol = props.selectedSearchAssetHisSymbol, investedInCurrencyOption = props.selectedInvestedCurrencyOption, data = props.selectedAssetHistoricalResult.data) {
        let id;
        if (type == "Currency") {
            id = `${value}/${investedInCurrencyOption}`;
        } else {
            id = (type == "Commodity") ? value : symbol;
        }
        id = id + `?from=${data.fromPrice.date}&to=${data.toPrice.date}`
        return id;
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
                                    <h2>{
                                        props.selectedSearchAssetHisType == "Currency" ?
                                            props.selectedSearchAssetHisValue + "/" + props.selectedInvestedCurrencyOption
                                            :
                                            props.selectedSearchAssetHisType == "Commodity" ?
                                                props.selectedSearchAssetHisValue
                                                :
                                                props.selectedSearchAssetHisSymbol
                                    }</h2>
                                    <div id="asset-value-now-item-details">
                                        <p>Requested Date</p>
                                        <p>Resolved Date</p>
                                        <p>Price</p>
                                        <p>Investment Value</p>
                                        <p>{props.selectedAssetHistoricalResult.from}</p>
                                        <p>{props.selectedAssetHistoricalResult.data.fromPrice.date}</p>
                                        <p>{getCurrencySymbol(props.selectedInvestedCurrencyOption)} {parseFloat(props.selectedAssetHistoricalResult.data.fromPrice.price).toFixed(2)}</p>
                                        <p>{getCurrencySymbol(props.selectedInvestedCurrencyOption)} {parseFloat(props.selectedAssetHistoricalResult.amount).toFixed(2)}</p>
                                        <p>{props.selectedAssetHistoricalResult.to}</p>
                                        <p>{props.selectedAssetHistoricalResult.data.toPrice.date}</p>
                                        <p>{getCurrencySymbol(props.selectedInvestedCurrencyOption)} {parseFloat(props.selectedAssetHistoricalResult.data.toPrice.price).toFixed(2)}</p>
                                        <p>{getCurrencySymbol(props.selectedInvestedCurrencyOption)} {(Number(props.selectedAssetHistoricalResult.amount) * (1 + Number(props.selectedAssetHistoricalResult.dataDiffPer) / 100)).toFixed(2)} ({props.selectedAssetHistoricalResult.dataDiffPer > 0 ? "+" : props.selectedAssetHistoricalResult.dataDiffPer == 0 ? "" : "-"}{props.selectedAssetHistoricalResult.dataDiffPer}%)</p>
                                    </div>
                                    <div id="asset-value-now-item-total">
                                        <p>Total</p>
                                        <p id="asset-value-now-item-total-details">
                                            {getCurrencySymbol(props.selectedInvestedCurrencyOption)} {((Number(props.selectedAssetHistoricalResult.amount) * (1 + Number(props.selectedAssetHistoricalResult.dataDiffPer) / 100)).toFixed(2) - Number(props.selectedAssetHistoricalResult.amount)).toFixed(2)} ({props.selectedAssetHistoricalResult.dataDiffPer > 0 ? "Profit" : props.selectedAssetHistoricalResult.dataDiffPer == 0 ? "No Growth" : "Loss"} )
                                            <br />
                                            <span></span>
                                        </p>
                                    </div>
                                    {(props.selectedAssetHistoricalResult.from != props.selectedAssetHistoricalResult.data.fromPrice.date || props.selectedAssetHistoricalResult.to != props.selectedAssetHistoricalResult.data.toPrice.date) && <p>
                                        No data found for the selected period. Showing nearest available results instead.
                                    </p>}
                                    <button className='add-to-list-btn' onClick={() => props.setPortfolioList((prev) => {
                                        const exists = prev.some(item => item.id === createPortfolioID());
                                        if (exists) {
                                            return prev;
                                        }
                                        return [...prev,
                                        {
                                            id: createPortfolioID(),
                                            symbol: props.selectedSearchAssetHisSymbol,
                                            type: props.selectedSearchAssetHisType,
                                            invested_amount: props.selectedAssetHistoricalResult.amount,
                                            durationDate: {
                                                from: props.selectedAssetHistoricalResult.from,
                                                to: props.selectedAssetHistoricalResult.to
                                            },
                                            invested_currency: props.selectedInvestedCurrencyOption,
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
                                        }]
                                    })}>Add to Portfolio</button>
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
