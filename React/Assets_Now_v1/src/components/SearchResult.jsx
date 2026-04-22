import React, { useEffect, useState, useRef } from 'react'
import AssetTab from './AssetTab.jsx'
import getCurrencySymbol from "../assets/getCurrencySymbol.js"
import SearchResultItem from './SearchResultItem.jsx';
import Loader from './Loader.jsx';

export default function SearchResult(props) {
    const [selectedSearchItemSymbol, setSelectedSearchItemSymbol] = useState({});
    const [selectedSearchItemResult, setSelectedSearchItemResult] = useState({});
    const [currentResultWindowStatus, setToggleResultWindowStatus] = useState(false);
    const [assetResultBorderColour, setAssetResultBorderColour] = useState("black")
    const [loadingSearchResultItem, setLoadingSearchResultItem] = useState(false);
    const APILINK = import.meta.env.VITE_API_LINK;
    const prevTitleRef = useRef("");


    function createWatchlistID(to_currency, value = props.searchAssetValue, type = props.searchAssetType, symbol = selectedSearchItemSymbol) {
        let id = `${type}/`;
        if (type == "Currency") {
            id += `${value}/${to_currency}`;
        } else {
            id += (type == "Commodity") ? value : symbol.symbol;
        }
        return id;
    }

    function addToWatchListFn(newItemId, to = {}) {
        return <>
            <button onClick={props.setWatchlistList((prev) => {
                const exists = prev.some(item => item.id === newItemId);
                if (exists) {
                    return prev;
                }
                return [...prev, {
                    name: selectedSearchItemResult?.data?.name,
                    ...to,
                    id: newItemId,
                    type: props.searchAssetType,
                    value: props.searchAssetValue,
                    symbol: selectedSearchItemSymbol?.symbol,
                    curPrice: selectedSearchItemResult?.data?.curPrice || props?.data?.price?.curPrice || props?.data?.conversion_rates[to?.to],
                }];
            })}>Add To Watchlist</button>
        </>
    }

    // Border Colour
    useEffect(() => {
        const type = props.searchAssetType;
        if (type == "Commodity") {
            const exists = props?.data?.price?.curPrice;
            const diff = exists ? (props.data.price.curPrice - props.data.price.prePrice) : 0;
            setAssetResultBorderColour(exists && (diff > 0) ? "var(--up-2)" : diff == 0 ? "var(--blue-2)" : "var(--down-2)");
        } else if (type == "Stock" || type == "Crypto") {
            setAssetResultBorderColour((selectedSearchItemResult?.data?.diffPrice) ? selectedSearchItemResult.data.diffPrice > 0 ? "var(--up-2)" : selectedSearchItemResult.data.diffPrice == 0 ? "var(--blue-2)" : "var(--down-2)" : "var(--blue-2)");
        } else {
            return;
        }
    }, [selectedSearchItemResult, props.searchAssetType, props.data]
    );

    // Reset State
    useEffect(() => {
        async function resetState() {
            setSelectedSearchItemResult({});
            setSelectedSearchItemSymbol({});
        }
        resetState();
    }, [props.searchAssetValue, props.searchAssetType]);

    // Fetch Search Result Item
    useEffect(() => {
        if (!selectedSearchItemSymbol?.symbol) {
            return;
        }
        const controller = new AbortController();
        async function fetchData() {
            try {
                setLoadingSearchResultItem(true);
                const lowerCaseType = props.searchAssetType.toLowerCase();
                const response = await fetch(`${APILINK}/api/get/${lowerCaseType}?${lowerCaseType}=${selectedSearchItemSymbol.symbol}`, { signal: controller.signal });
                let data = await response.json();
                if (!response.ok) {
                    throw new Error(`External API Failed to fetch item data`);
                }
                if (Object.keys(data).length > 0 && selectedSearchItemSymbol?.name) {
                    const curINR = parseFloat(data.data.curPrice) * props.usdToINR;
                    const preINR = parseFloat(data.data.prePrice) * props.usdToINR;
                    data.data.name = selectedSearchItemSymbol.name;
                    data.data.curPrice = curINR;
                    data.data.prePrice = preINR;
                    data.data.diffPrice = curINR - preINR;
                    data.data.perDiff = (curINR - preINR) * 100 / preINR;
                }
                setLoadingSearchResultItem(false);
                setSelectedSearchItemResult(data);
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error(err);
                }
            }
        }
        fetchData();
        return () => controller.abort();
    }, [APILINK, selectedSearchItemSymbol, props.searchAssetType, props.usdToINR])

    // Toggle Search Result Item Window Status
    useEffect(() => {
        async function setStatus() {
            setToggleResultWindowStatus(Object.keys(selectedSearchItemResult).length > 0);
        }
        setStatus();
    }, [selectedSearchItemResult]);

    // Escape keydown event listener
    useEffect(() => {
        function onEscEvent(e) {
            if (e.code === "Escape") {
                setToggleResultWindowStatus(prev => !prev);
            }
        }
        if (currentResultWindowStatus) {
            document.addEventListener("keydown", onEscEvent)
        }
        return () => { document.removeEventListener("keydown", onEscEvent) };
    }, [currentResultWindowStatus]);

    // Update Docuemnt Title
    useEffect(() => {
        if (!currentResultWindowStatus) {
            return;
        }
        prevTitleRef.current = props.docTitle;
        props.setDocTitle({ type: "setTitle", payload: `${selectedSearchItemSymbol?.symbol ? selectedSearchItemSymbol.symbol : props.searchAssetValue} | ${prevTitleRef.current}` });
        return () => {
            props.setDocTitle({ type: "setTitle", payload: prevTitleRef.current });
        }
    }, [currentResultWindowStatus, selectedSearchItemSymbol]);


    return (
        Object.keys(props.data).length > 0
        &&
        <AssetTab className="search-result" title="Search Result" openedTab={props.openedTab === props.id} handleClick={props.handleOpenedTab} id={props.id}>
            {currentResultWindowStatus
                &&
                <SearchResultItem loadingSearchResultItem={loadingSearchResultItem} setToggleResultWindowStatus={setToggleResultWindowStatus} searchAssetType={props.searchAssetType} selectedSearchItemResult={selectedSearchItemResult} addToWatchListFn={addToWatchListFn} createWatchlistID={createWatchlistID} assetResultBorderColour={assetResultBorderColour} />
            }

            {
                props.loadingSearchResult=="loading"
                    ?
                    <Loader message={props.searchAssetType == "Stock" ? "Stocks" : props.searchAssetType == "Crypto" ? "Crypto Currencies" : "Result"} />
                    :
                    <div id="search-result-items" style={{ gridTemplateColumns: props.searchAssetType == "Currency" && "repeat(3,1fr)" || (props.searchAssetType == "Commodity") && "1fr", height: props.searchAssetType == "Currency" && "100vh" }}>
                        {(props.searchAssetType == "Currency" && props.data.conversion_rates) && Object.keys(props.data.conversion_rates).sort((a, b) => a - b).map((currency, idx) => {
                            return <div key={currency + idx} className='currency-item'>
                                <div>
                                    <p >{props.searchAssetValue} - {currency}</p>
                                    <p className='currency-item-from-to'>{getCurrencySymbol(props.searchAssetValue)} 1  {getCurrencySymbol(props.searchAssetValue) == "" && props.searchAssetValue} = {getCurrencySymbol(currency)} {props.data.conversion_rates[currency]} {getCurrencySymbol(currency) == "" && currency} </p>
                                </div>
                                <button className='add-to-list-btn' onClick={() => addToWatchListFn(createWatchlistID(currency), { to: currency })} >Add to Watchlist</button>
                            </div>
                        })}
                        {
                            (props.searchAssetType == "Stock" && Array.isArray(props.data)) && props.data.map((stock, idx) => {
                                return <div key={stock.symbol + idx + stock.country} className='stock-item' onClick={() => { return setSelectedSearchItemSymbol({ name: stock.instrument_name, symbol: stock.symbol }) }}>
                                    <h1 className='stock-item-name'>{stock.instrument_name}</h1>
                                    <span className='stock-item-symbol'>{stock.symbol}
                                    </span>
                                    <span className='stock-item-type'>{stock.instrument_type}</span>
                                </div>
                            })
                        }
                        {
                            (props.searchAssetType == "Commodity") && (props?.data?.price ?
                                <div className='commodity-item' style={{ border: "solid 0.5rem " + assetResultBorderColour }}>
                                    <h2 className="commodity-name">{props.searchAssetValue} [  {(props.searchAssetValue == "Gold" ? "24k " : "") + props.searchAssetValue} (99.9% pure)  price per troy ounce(31.1035 grams) ]</h2>
                                    <div className='commodity-item-details'>
                                        <div>
                                            <span>Current Price</span>
                                            <span>:</span>
                                            <span>{getCurrencySymbol("INR")} {parseFloat(props.data.price.curPrice).toFixed(2)}</span>
                                            <span>Previous Closed Price</span>
                                            <span>:</span>
                                            <span> {getCurrencySymbol("INR")} {parseFloat(props.data.price.prePrice).toFixed(2)}</span>
                                        </div>
                                        <div>
                                            <span>Price Difference</span>
                                            <span>:</span>
                                            <span> {getCurrencySymbol("INR")} {parseFloat(props.data.price.curPrice - props.data.price.prePrice).toFixed(2)}</span>
                                            <span>Percentage Difference</span>
                                            <span>:</span>
                                            <span>{parseFloat((props.data.price.curPrice - props.data.price.prePrice) * 100 / props.data.price.prePrice).toFixed(3)}%</span>
                                        </div>
                                    </div>
                                    <button className='add-to-list-btn' onClick={() => addToWatchListFn(createWatchlistID())} >Add to Watchlist</button>
                                </div >
                                :
                                <div className='temp-unavail'>Service is temporarily unavailable. Please try again in a while (API LIMIT REACHED)</div>)
                        }
                        {
                            (props.searchAssetType == "Crypto" && Array.isArray(props.data)) && props.data.map((crypto, idx) => {
                                return <div key={crypto.symbol + idx} className='crypto-item' onClick={() => { return setSelectedSearchItemSymbol({ symbol: crypto.api_symbol }) }}>
                                    <div className='crypto-item-content'>
                                        <img src={crypto.large}></img>
                                        <div>
                                            <h1>{crypto.name}</h1>
                                            <p>{crypto.symbol}</p>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div >
            }
        </AssetTab >
    )
}