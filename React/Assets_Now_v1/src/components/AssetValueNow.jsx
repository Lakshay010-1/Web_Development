import React, { useState, useEffect, useRef, useReducer } from 'react'
import AssetTab from './AssetTab'
import HorizontalLinearStepper from './HorizontalLinearStepper'
import ValueNowStep1 from './ValueNowStep1'
import ValueNowStep2 from './ValueNowStep2'
import ValueNowStep3 from './ValueNowStep3'

const assetHistResultInitialState = { symbol: "", to: "", from: "", amount: "", currencyOption: "", data: "", status: "", dataDiffPer: "" };

function searchResultReducer(state, action) {
    let newState = {};

    switch (action.type) {
        case "setData":
            newState = { data: action.payload };
            break;
        case "setStatus":
            newState = { status: action.payload };
            break;
        case "setType":
            newState = { type: action.payload };
            break;
        case "setValue":
            newState = { value: action.payload };
            break;
        case "reset":
            newState = { type: "", value: "", data: "", status: "" };
            break;
        default:
            return new Error("Input 'type' not specified");
    }
    return { ...state, ...newState };
}

function assetHisResultReducer(state, action) {
    let newState = {};
    switch (action.type) {
        case "setSymbol":
            newState = { symbol: action.payload };
            break;
        case "setTo":
            newState = { to: action.payload };
            break;
        case "setFrom":
            newState = { from: action.payload };
            break;
        case "setAmount":
            newState = { amount: action.payload };
            break;
        case "setData":
            newState = { data: action.payload.data };
            newState.dataDiffPer = newState.data?.apiLimit !== "Consumed" ? undefined : ((newState.data?.toPrice?.price - newState.data?.fromPrice?.price) * 100 / newState.data?.fromPrice?.price).toFixed(2); break;
        case "setCurrencyOption":
            newState = { currencyOption: action.payload };
            break;
        case "setStatus":
            newState = { status: action.payload };
            break;
        case "reset":
            newState = assetHistResultInitialState;
            break;
        default:
            return new Error("Input 'type' not specified");
    }
    return { ...state, ...newState };
}



export default function AssetValueNow(props) {
    const prevTitleRef = useRef("");
    const steps = ['Select Invested asset and amount', 'Select Duration', 'Investment Result'];
    const searchResultInitialState = { type: "", value: "", data: "", status: "" };

    const [assetSearchResultState, assetSearchResultDispatch] = useReducer(searchResultReducer, searchResultInitialState);
    const [activeStep, setActiveStep] = React.useState(0);
    const [nextStatus, setNextStatus] = useState(false);
    const [assetHistResultState, assetHisResultDispatch] = useReducer(assetHisResultReducer, assetHistResultInitialState);

    const APILINK = import.meta.env.VITE_API_LINK;

    // Fetch search items
    useEffect(() => {
        if (!(["Crypto", "Stock"].includes(assetSearchResultState.type)) && !assetSearchResultState.type && !assetSearchResultState.value) {
            return;
        }
        const lowercaseType = assetSearchResultState.type.toLowerCase();
        async function fetchData() {
            assetSearchResultDispatch({ type: "setStatus", payload: "loading" });
            const response = await fetch(`${APILINK}/api/search/${lowercaseType}?${lowercaseType}=${assetSearchResultState.value}`);
            let data = await response.json();
            data = data.map(item => {
                return {
                    name: item?.name ? item.name : item.instrument_name,
                    symbol: item?.symbol ? item.symbol : item.api_symbol
                }
            });
            let map = new Map();
            data.forEach(item => map.set(item.symbol, item.name));
            const modData = [];
            map.forEach((value, key) => modData.push({ symbol: key, name: value }));
            modData.sort((a, b) => a.name.localeCompare(b.name));
            assetSearchResultDispatch({ type: "setStatus", payload: "fetched" });
            assetSearchResultDispatch({ type: "setData", payload: modData });
        }
        fetchData();
    }, [APILINK, assetSearchResultState.type, assetSearchResultState.value]);

    // Fetch Historical Result
    useEffect(() => {
        if (activeStep !== 2 || !assetSearchResultState.type || !assetSearchResultState.value || !assetHistResultState?.from || !assetHistResultState?.to) {
            return;
        }
        const uppercaseValue = assetSearchResultState.value.toUpperCase();
        const from = assetHistResultState.from;
        const to = assetHistResultState.to;
        let url;
        switch (assetSearchResultState.type) {
            case "Commodity":
                url = `/api/history/commodity?commodity=${uppercaseValue}&from=${from}&to=${to}`;
                break;
            case "Currency":
                url = `/api/history/currency?from_cur=${assetSearchResultState.value}&to_cur=${assetHistResultState.currencyOption}&from=${from}&to=${to}`;
                break;
            case "Stock":
                url = `/api/history/stock?stock=${assetHistResultState.symbol}&from=${from}&to=${to}`;
                break;
            case "Crypto":
                url = `/api/history/crypto?crypto=${assetHistResultState.symbol}&from=${from}&to=${to}`;
                break;
            default:
                return;
        }
        async function fetchData() {
            try {
                assetHisResultDispatch({ type: "setStatus", payload: "loading" });
                const response = await fetch(`${APILINK}${url}`);
                if (!response.ok) {
                    throw new Error("External API failed");
                }
                let data = await response.json();
                if (!data.data?.apiLimit && assetSearchResultState.type != "Currency") {
                    data.data.fromPrice.price = parseFloat(data.data.fromPrice.price) * props.usdToINR;
                    data.data.toPrice.price = parseFloat(data.data.toPrice.price) * props.usdToINR;
                }
                assetHisResultDispatch({ type: "setStatus", payload: "fetched" });
                assetHisResultDispatch({ type: "setData", payload: data });
            } catch (err) {
                console.error("Fetch error:", err);
            }
        }
        fetchData();
    }, [APILINK, activeStep, assetSearchResultState.type, props.usdToINR, assetSearchResultState.value, assetHistResultState.currencyOption, assetHistResultState.from, assetHistResultState.to, assetHistResultState.symbol]);

    // Set Steps
    useEffect(() => {
        async function handleNextStatus() {
            if (activeStep == 0) {
                setNextStatus((assetHistResultState.amount !== "" && assetHistResultState.currencyOption !== ""));
            } else if (activeStep == 1) {
                setNextStatus(assetHistResultState.from && assetHistResultState.to && (assetHistResultState.from < assetHistResultState.to))
            }
        }
        handleNextStatus();
    }, [activeStep, assetHistResultState.amount, assetHistResultState.currencyOption, assetHistResultState.from, assetHistResultState.to])

    // Update Docuemnt Title
    useEffect(() => {
        if (activeStep != 1) {
            return;
        }
        prevTitleRef.current = props.docTitle;
        props.setDocTitle({ type: "setTitle", payload: `${assetHistResultState.symbol ? assetHistResultState.symbol : (assetSearchResultState.value + (assetSearchResultState.type == "Currency" && "-" + assetHistResultState.currencyOption))} | ${prevTitleRef.current}` });
        return () => {
            props.setDocTitle({ type: "setTitle", payload: prevTitleRef.current });
        }
    }, [activeStep, assetSearchResultState.value, assetSearchResultState.type, assetHistResultState.currencyOption, assetHistResultState.symbol]);


    function handleSearchAssetHisType(value) {
        assetSearchResultDispatch({ type: "setType", payload: value });
        assetHisResultDispatch({ type: "reset" });
    }

    function handleReset() {
        assetSearchResultDispatch({ type: "reset" });
        assetHisResultDispatch({ type: "reset" });
        setActiveStep(0);
    }

    return (
        <AssetTab className="asset-value-now" title="Assets Value Now" openedTab={props.openedTab === props.id} handleClick={props.handleOpenedTab} id={props.id} >
            <div id="asset-value-now">
                {activeStep == 0 &&
                    <ValueNowStep1 selectedInvestedAmount={assetHistResultState.amount} setSearchAssetHis={assetHisResultDispatch} selectedSearchAssetHisSymbol={assetHistResultState.symbol} selectedAssetSearchResult={assetSearchResultState.data} searchResultStatus={assetSearchResultState.status} selectedSearchAssetHisType={assetSearchResultState.type} setSearchAssetValue={assetSearchResultDispatch} currenciesList={props.currenciesList} handleSearchAssetHisType={handleSearchAssetHisType} />
                }
                {activeStep == 1 &&
                    <ValueNowStep2 setDate={assetHisResultDispatch} from={assetHistResultState.from} to={assetHistResultState.to} />
                }
                {activeStep == 2 &&
                    <ValueNowStep3 selectedAssetHistoricalResult={assetHistResultState} selectedInvestedCurrencyOption={assetSearchResultState.currencyOption} selectedSearchAssetHisType={assetSearchResultState.type} selectedSearchAssetHisValue={assetSearchResultState.value} selectedSearchAssetHisSymbol={assetHistResultState.symbol} />
                }
                <HorizontalLinearStepper steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} nextStatus={nextStatus} handleReset={handleReset} />
            </div >
        </AssetTab >
    )
}