import React, { useEffect, useState } from 'react'
import AssetTab from './AssetTab';
import getCurrencySymbol from '../assets/getCurrencySymbol';

export default function Portfolio(props) {
    const [portfolioValueDiff, setPortfolioValueDiff] = useState(0);
    const [totalInvested, setTotalInvested] = useState(0);
    const [totalInvestedValueNow, setInvestedValueNow] = useState(0);
    const [statusColor, setStatusColor] = useState("black");

    useEffect(() => {
        async function setColor() {
            setStatusColor(portfolioValueDiff > 0 ? "var(--up-2)" : portfolioValueDiff == 0 ? "var(--draw-2)" : "var(--down-2)");
        }
        setColor();
    }, [portfolioValueDiff]);

    useEffect(() => {
        async function setStatus() {
            let fromPriceTotal = 0, toPriceTotal = 0, diffPriceTotal = 0;
            props.portfolioList.sort((a, b) => a.type - b.type).forEach(item => {
                const fromPrice = item.price.fromPrice.price, toPrice = item.price.toPrice.price;
                const diffPrice = toPrice - fromPrice;
                fromPriceTotal += parseFloat(fromPrice);
                toPriceTotal += parseFloat(toPrice);
                diffPriceTotal += parseFloat(diffPrice);
            });
            setTotalInvested(fromPriceTotal);
            setInvestedValueNow(toPriceTotal);
            setPortfolioValueDiff(diffPriceTotal);
        }
        setStatus();
    }, [props.portfolioList])

    return (
        <AssetTab className="portfolio" title="Portfolio" itemsCount={props.portfolioList.length} openedTab={props.openedTab === props.id} handleClick={props.handleOpenedTab} id={props.id}>
            <div id="portfolio-list">
                {props.portfolioList.length <= 0 ?
                    "You haven’t added anything yet"
                    :
                    <>
                        <div id="portfolio-items">
                            <div id="portfolio-items-footer">
                                <p>Total:</p>
                                <div id="portfolio-items-total">
                                    <h4 style={{ color: statusColor }}>{getCurrencySymbol("INR")}</h4>
                                    <h4 style={{ color: statusColor }}>{portfolioValueDiff.toFixed(2)}</h4>
                                    <h4 style={{ color: statusColor }}>({portfolioValueDiff > 0 ? "Profit" : portfolioValueDiff == 0 ? "Zero Growth" : "Loss"})</h4>

                                    <h4>{getCurrencySymbol("INR")}</h4>
                                    <h4> {totalInvested}</h4>
                                    <h4>(Investment)</h4>
                                    <h4>{getCurrencySymbol("INR")}</h4>
                                    <h4>{totalInvestedValueNow}</h4>
                                    <h4>(Investment Value Now)</h4>
                                </div>
                            </div>
                            {props.portfolioList.sort((a, b) => a.type - b.type).map(item => {
                                const fromPrice = item.price.fromPrice.price, toPrice = item.price.toPrice.price;
                                const diffPrice = toPrice - fromPrice;
                                return (
                                    <div key={item.selectedSearchAssetHisSymbol} style={{ padding: "1rem", border: "solid 0.2rem " + (diffPrice > 0 ? "var(--up-2)" : diffPrice == 0 ? "var(--draw-2)" : "var(--down-2)") }} className='portfolio-item' >

                                        <div className='portfolio-item-top'>
                                            {item.type == "Currency" ?
                                                <div className='portfolio-item-top-currency'>
                                                    <h2>{item.value}</h2> <h2>/</h2>
                                                    <h2>{item.invested_currency}</h2>
                                                    <h2>,</h2>
                                                </div>
                                                :
                                                <>
                                                    <h2>{item.symbol == "" ? item.value : item.symbol},</h2>
                                                </>
                                            }
                                            <h2>{item.type}</h2>
                                        </div>
                                        < div className='portfolio-item-body' >
                                            <p>Invested In</p>
                                            <p>{item.price.fromPrice.date}</p>
                                            <p>{getCurrencySymbol(item.invested_currency)} {parseFloat(fromPrice)}</p>
                                            <p>Invested Till </p>
                                            <p>{item.price.toPrice.date}</p>
                                            <p>{getCurrencySymbol(item.invested_currency)} {parseFloat(toPrice)}</p>
                                            <p>Difference </p>
                                            <div className='portfolio-item-total'>
                                                <p>{getCurrencySymbol(item.invested_currency)} {parseFloat(diffPrice).toFixed(2)}</p>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            }

                        </div>
                    </>
                }
            </div >
        </AssetTab >
    )
}
