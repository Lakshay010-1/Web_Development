import React, { useEffect, useState } from 'react'
import AssetTab from './AssetTab';
import getCurrencySymbol from '../assets/getCurrencySymbol.js';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function Portfolio(props) {
    const [portfolioValueDiff, setPortfolioValueDiff] = useState(0);
    const [totalInvested, setTotalInvested] = useState(0);
    const [totalInvestedValueNow, setInvestedValueNow] = useState(0);
    const [statusColor, setStatusColor] = useState("black");


    async function deleteListItem(id) {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/api/list/p/${id}`, {
            method: "DELETE"
        });
        if (response.ok) {
            props.setPortfolioList(prev => {
                return prev.filter(item => item?.id !== id);
            });
        }
    }


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
                const fromPrice = Number(item?.price?.fromPrice?.price), toPrice = Number(item?.price?.toPrice?.price);
                const diffPrice = toPrice - fromPrice;
                fromPriceTotal += fromPrice;
                toPriceTotal += toPrice;
                diffPriceTotal += diffPrice;
            });
            setTotalInvested(Number(fromPriceTotal));
            setInvestedValueNow(Number(toPriceTotal));
            setPortfolioValueDiff(Number(diffPriceTotal));
        }
        setStatus();
    }, [props.portfolioList])

    return (
        <AssetTab className="portfolio" title="Portfolio" itemsCount={props.portfolioList.length} openedTab={props.openedTab === props.id} handleClick={props.handleOpenedTab} id={props.id}>
            <div id="portfolio-list" style={{ padding: `${props.portfolioList.length === 0 ? "1rem" : "0"}` }}>
                {props.portfolioList.length <= 0 ?
                    "You haven’t added anything yet"
                    :
                    <>
                        <div id="portfolio-items-total">
                            <p>Invested</p>
                            <div>
                                <h4>{getCurrencySymbol("INR")}</h4>
                                <h4> {totalInvested.toFixed(2)}</h4>
                            </div>
                            <p style={{ color: statusColor }}>{portfolioValueDiff > 0 ? "Profit" : portfolioValueDiff == 0 ? "Zero Growth" : "Loss"}</p>
                            <div>
                                <h4 style={{ color: statusColor }}>{getCurrencySymbol("INR")}</h4>
                                <h4 style={{ color: statusColor }}>{portfolioValueDiff.toFixed(2)} </h4>
                            </div>
                            <p>Investment Value Now</p>
                            <div>
                                <h4>{getCurrencySymbol("INR")}</h4>
                                <h4> {totalInvestedValueNow.toFixed(2)}</h4>
                            </div>
                        </div>
                        <div id="portfolio-items">
                            {props.portfolioList.sort((a, b) => a.type - b.type).map(item => {
                                const fromPrice = item?.price?.fromPrice?.price, toPrice = item?.price?.toPrice?.price;
                                const diffPrice = toPrice - fromPrice;
                                return (
                                    <div key={item?.id} style={{ padding: "1rem", border: "solid 0.2rem " + (diffPrice > 0 ? "var(--up-2)" : diffPrice == 0 ? "var(--draw-2)" : "var(--down-2)") }} className='portfolio-item' >
                                        <div className='portfolio-item-top'>
                                            {item?.type == "Currency" ?
                                                <div className='portfolio-item-top-currency'>
                                                    <h2>{item?.value}</h2> <h2>/</h2>
                                                    <h2>{item?.invested_currency}</h2>
                                                    <h2>,</h2>
                                                </div>
                                                :
                                                <>
                                                    <h2>{item?.symbol == "" ? item?.value : item?.symbol},</h2>
                                                </>
                                            }
                                            <h2>{item?.type}</h2>
                                        </div>
                                        <div className='portfolio-item-body' >
                                            <p>Invested In</p>
                                            <p>{new Date(item?.price?.fromPrice?.date).toLocaleDateString("en-GB")}</p>
                                            <p>{getCurrencySymbol(item?.invested_currency)} {parseFloat(fromPrice)}</p>
                                            <p>Invested Till </p>
                                            <p>{new Date(item?.price?.toPrice?.date).toLocaleDateString("en-GB")}</p>
                                            <p>{getCurrencySymbol(item?.invested_currency)} {parseFloat(toPrice)}</p>
                                            <p>Difference </p>
                                            <div className='portfolio-item-total'>
                                                <p>{getCurrencySymbol(item?.invested_currency)} {parseFloat(diffPrice).toFixed(2)}</p>

                                            </div>
                                        </div>
                                        <div onClick={() => deleteListItem(item?.id)} className='list-delete-btn'><HighlightOffIcon sx={{ fontSize: 35, color: "black" }} /></div>
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
