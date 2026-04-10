import React from 'react'
import AssetItem from './AssetItem.jsx'

export default function TrendingItems({ barItemsList }) {
    return (
        <div style={{ display: "block" }}>
            <div id="assets-bar" >
                {barItemsList.map((item, idx) => <AssetItem key={idx} item={item} />)}
            </div>
        </div>
    )
}