import React from 'react'
import AssetItem from './AssetItem.jsx'

export default function TrendingItems({ trendingItems }) {
    return (
        <div style={{ display: "block" }}>
            <div id="assets-bar" >
                {
                    trendingItems.status == "loading" ?
                        <p>Loading Trending Stocks and Cryptos...</p>
                        :
                        trendingItems.data.map((item, idx) => <AssetItem key={idx} item={item} />)
                }
            </div>
        </div>
    )
}