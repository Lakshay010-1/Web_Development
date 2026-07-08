import React from "react"
import KeyboardDoubleArrowUpSharpIcon from '@mui/icons-material/KeyboardDoubleArrowUpSharp';
import KeyboardDoubleArrowDownSharpIcon from '@mui/icons-material/KeyboardDoubleArrowDownSharp';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import getCurrencySymbol from "../assets/getCurrencySymbol.js";


export default function AssetItem({ item }) {
    const curPrice = item.curPrice;
    const prePrice = item.prePrice;
    const changePercentage = (((curPrice - prePrice) * 100) / prePrice).toFixed(2);
    const diff = (curPrice - prePrice).toFixed(2);
    const isDraw = curPrice == prePrice;
    const isDown = prePrice > curPrice;
    return (
        <div className="asset-item" style={{ border: "solid 2px " + (isDraw ? "blue" : isDown ? "red" : "green") }}>
            <div id="asset-status">
                {(isDraw) ? <KeyboardDoubleArrowRightIcon /> : (isDown) ? <KeyboardDoubleArrowDownSharpIcon /> : <KeyboardDoubleArrowUpSharpIcon />}
            </div>
            <div className="asset-item-info">
                <div className="asset-title">
                    <p>{item.name}</p>
                    <p>{getCurrencySymbol("INR")} {(curPrice)}</p>
                </div>
                <div className="asset-price" style={{ color: isDraw ? "var(--draw)" : isDown ? "var(--down)" : "var(--up)" }}>
                    <p>{(changePercentage > 0 ? "+" : "") + changePercentage}%</p>
                    <p>{getCurrencySymbol("INR")} {diff}</p>
                </div>
            </div>
        </div>
    )
}
