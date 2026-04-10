import React, { useState, useEffect, useRef } from 'react'
import AssetTab from './AssetTab'
import Date from './Date'
import Input from "./Input"
import Form from "./Form"
import Option from "./Option"
import HorizontalLinearStepper from './HorizontalLinearStepper'
import getCurrencySymbol from '../assets/getCurrencySymbol'
import Loader from './Loader'

export default function AssetValueNow(props) {
    const prevTitleRef = useRef("");
    const steps = ['Select Invested asset and amount', 'Select Duration', 'Investment Result'];
    const [activeStep, setActiveStep] = React.useState(0);
    const [selectedSearchAssetHisType, setSearchAssetHisType] = useState("");
    const [selectedSearchAssetHisValue, setSearchAssetHisValue] = useState("");
    const [selectedAssetSearchResult, setAssetSearchResult] = useState([]);
    const [selectedSearchAssetHisSymbol, setSearchAssetHisSymbol] = useState("");
    const [selectedInvestedCurrencyOption, setInvestedCurrencyOption] = useState("");
    const [selectedInvestedAmount, setInvestedAmount] = useState("");
    const [selectedAssetHistoricalResult, setSelectedAssetHistoricalResult] = useState({});
    const [nextStatus, setNextStatus] = useState(false);
    const [durationDate, setDurationDate] = useState({});
    const [resultDiffPercentage, setResultDiffPercentage] = useState(0);
    const [loadingSearchResult, setLoadingSearchResult] = useState(true);
    const [loadingHisResult, setLoadingHisResult] = useState(true);

    // Set Result Percentage
    useEffect(() => {
        async function setPercentage() {
            const data = selectedAssetHistoricalResult.data;
            setResultDiffPercentage(((data?.toPrice.price - data?.fromPrice.price) * 100 / data?.fromPrice.price).toFixed(2));
        }
        setPercentage();
    }, [selectedAssetHistoricalResult]);

    // Fetch search items
    useEffect(() => {
        if (!(["Crypto", "Stock"].includes(selectedSearchAssetHisType)) && !selectedSearchAssetHisType && !selectedSearchAssetHisValue) {
            return;
        }
        const lowercaseType = selectedSearchAssetHisType.toLowerCase();
        async function fetchData() {
            setLoadingSearchResult(true);
            const response = await fetch(`/api/search/${lowercaseType}?${lowercaseType}=${selectedSearchAssetHisValue}`);
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
            setLoadingSearchResult(false);
            setAssetSearchResult(modData);
        }
        fetchData();
    }, [selectedSearchAssetHisType, selectedSearchAssetHisValue]);

    // Fetch Historical Result
    useEffect(() => {
        if (activeStep !== 2 || !selectedSearchAssetHisType || !selectedSearchAssetHisValue || !durationDate?.from || !durationDate?.to) {
            return;
        }
        const uppercaseValue = selectedSearchAssetHisValue.toUpperCase();
        const { from, to } = durationDate;
        let url;
        switch (selectedSearchAssetHisType) {
            case "Commodity":
                url = `/api/history/commodity?commodity=${uppercaseValue}&from=${from}&to=${to}`;
                break;
            case "Currency":
                url = `/api/history/currency?from_cur=${selectedSearchAssetHisValue}&to_cur=${selectedInvestedCurrencyOption}&from=${from}&to=${to}`;
                break;
            case "Stock":
                url = `/api/history/stock?stock=${selectedSearchAssetHisSymbol}&from=${from}&to=${to}`;
                break;
            case "Crypto":
                url = `/api/history/crypto?crypto=${selectedSearchAssetHisSymbol}&from=${from}&to=${to}`;
                break;
            default:
                return;
        }
        async function fetchData() {
            try {
                setLoadingHisResult(true);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("External API failed");
                }
                let data = await response.json();

                if (!data.data?.apiLimit && selectedSearchAssetHisType != "Currency") {
                    data.data.fromPrice.price = parseFloat(data.data.fromPrice.price) * props.usdToINR;
                    data.data.toPrice.price = parseFloat(data.data.toPrice.price) * props.usdToINR;
                }
                setLoadingHisResult(false);
                setSelectedAssetHistoricalResult(data);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        }
        fetchData();
    }, [activeStep, durationDate, selectedSearchAssetHisType, props.usdToINR, selectedSearchAssetHisValue, selectedInvestedCurrencyOption, selectedSearchAssetHisSymbol]);

    // Set Steps
    useEffect(() => {
        async function handleNextStatus() {
            if (activeStep == 0) {
                setNextStatus(selectedInvestedAmount && selectedInvestedCurrencyOption);
            } else if (activeStep == 1) {
                setNextStatus(durationDate.from && durationDate.to && durationDate.from < durationDate.to)
            }
        }
        handleNextStatus();
    }, [selectedInvestedAmount, selectedInvestedCurrencyOption, activeStep, durationDate])

    // Update Docuemnt Title
    useEffect(() => {
        if (activeStep != 1) {
            return;
        }
        props.setDocTitle(prev => {
            prevTitleRef.current = prev;
            return `${selectedSearchAssetHisSymbol ? selectedSearchAssetHisSymbol : (selectedSearchAssetHisValue + (selectedSearchAssetHisType == "Currency" && "-" + selectedInvestedCurrencyOption))} | ${prev}`;
        });
        return () => {
            props.setDocTitle(prevTitleRef.current);
        }
    }, [activeStep, selectedSearchAssetHisSymbol, selectedSearchAssetHisValue, selectedSearchAssetHisType, selectedInvestedCurrencyOption]);

    function handleSearchAssetHisType(value) {
        setSearchAssetHisType(value);
        setSearchAssetHisSymbol("");
        setInvestedCurrencyOption("");
        setInvestedAmount("");
    }

    function handleDurationDate(source, date) {
        const newDate = {
            ...durationDate,
            [source]: date
        }
        setDurationDate(newDate);
    }

    function handleReset() {
        setSearchAssetHisType("");
        setSearchAssetHisValue("");
        setAssetSearchResult([]);
        setSearchAssetHisSymbol("");
        setInvestedCurrencyOption("");
        setInvestedAmount("");
        setDurationDate({});
        setActiveStep(0);
    }

    function createPortfolioID(type = selectedSearchAssetHisType, value = selectedSearchAssetHisValue, symbol = selectedSearchAssetHisSymbol, investedInCurrencyOption = selectedInvestedCurrencyOption, date = selectedAssetHistoricalResult.data) {
        let id;
        if (type == "Currency") {
            id = `${value}/${investedInCurrencyOption}`;
        } else {
            id = (type == "Commodity") ? value : symbol;
        }
        id = id + `?from=${date.fromPrice.date}&to=${date.toPrice.date}`
        return id;
    }

    return (
        <AssetTab className="asset-value-now" title="Assets Value Now" openedTab={props.openedTab === props.id} handleClick={props.handleOpenedTab} id={props.id} >
            <div id="asset-value-now">
                {activeStep == 0 &&
                    <>
                        <div>
                            <label>Invested in:</label>
                            <Form submitBtnText="Proceed" currenciesList={props.currenciesList} keepInSearchBox={true} setSearchAssetType={handleSearchAssetHisType} setSearchAssetValue={setSearchAssetHisValue} placeholder="Search Stocks, Forex, Crypto or Commodity" />
                        </div>
                        {((["Crypto", "Stock"].includes(selectedSearchAssetHisType)) && selectedSearchAssetHisType != "") &&
                            (<>
                                {loadingSearchResult ?
                                    <Loader message={selectedSearchAssetHisType == "Stock" ? "stocks" : "crypto currencies"} />
                                    :
                                    <div>
                                        {selectedAssetSearchResult.length > 0 ?
                                            <>
                                                <label>Select:</label>
                                                <Option list={selectedAssetSearchResult} typeTitle={selectedSearchAssetHisType} selectedOption={selectedSearchAssetHisSymbol} handleChange={setSearchAssetHisSymbol} />
                                            </>
                                            :
                                            <div>Search Result Not Found</div>}
                                    </div>
                                }
                            </>
                            )
                        }
                        {
                            (selectedSearchAssetHisSymbol != "" || ["Commodity", "Currency"].includes(selectedSearchAssetHisType)) &&
                            <div>
                                <label>Amount:</label>
                                <div id="currency-to-amount">
                                    <Option typeTitle="Currency*" selectedOption={"INR"} handleChange={setInvestedCurrencyOption} list={props.currenciesList} lockStatus={true} />
                                    <Input type="number" placeholder="Amount" value={selectedInvestedAmount} handleChange={setInvestedAmount} />
                                </div>
                            </div>
                        }
                    </>
                }
                {activeStep == 1 && <>
                    <Date label="From:" value={durationDate.from} handleChange={handleDurationDate} source="from" />
                    <Date label="To:" value={durationDate.to} handleChange={handleDurationDate} source="to" />
                    {durationDate.from >= durationDate.to && <div>The start date must be before the end date</div>}
                </>
                }
                {activeStep == 2 && <div className='asset-dates'>
                    {loadingHisResult ?
                        <Loader message="historical data" />
                        :
                        selectedAssetHistoricalResult?.data ?
                            (
                                selectedAssetHistoricalResult.data.apiLimit ?
                                    (<p>
                                        Sevices Temperary Unavailable
                                    </p>)
                                    :
                                    (
                                        <div id="asset-value-now-item">
                                            <h2>{
                                                selectedSearchAssetHisType == "Currency" ?
                                                    selectedSearchAssetHisValue + "/" + selectedInvestedCurrencyOption
                                                    :
                                                    selectedSearchAssetHisType == "Commodity" ?
                                                        selectedSearchAssetHisValue
                                                        :
                                                        selectedSearchAssetHisSymbol
                                            }</h2>
                                            <div id="asset-value-now-item-details">
                                                <p>Requested Date</p>
                                                <p>Resolved Date</p>
                                                <p>Price</p>
                                                <p>Investment Value</p>
                                                <p>{durationDate.from}</p>
                                                <p>{selectedAssetHistoricalResult.data.fromPrice.date}</p>
                                                <p>{getCurrencySymbol(selectedInvestedCurrencyOption)} {parseFloat(selectedAssetHistoricalResult.data.fromPrice.price).toFixed(2)}</p>
                                                <p>{getCurrencySymbol(selectedInvestedCurrencyOption)} {parseFloat(selectedInvestedAmount).toFixed(2)}</p>
                                                <p>{durationDate.to}</p>
                                                <p>{selectedAssetHistoricalResult.data.toPrice.date}</p>
                                                <p>{getCurrencySymbol(selectedInvestedCurrencyOption)} {parseFloat(selectedAssetHistoricalResult.data.toPrice.price).toFixed(2)}</p>
                                                <p>{getCurrencySymbol(selectedInvestedCurrencyOption)} {(Number(selectedInvestedAmount) * (1 + Number(resultDiffPercentage) / 100)).toFixed(2)} ({resultDiffPercentage > 0 ? "+" : resultDiffPercentage == 0 ? "" : "-"}{resultDiffPercentage}%)</p>
                                            </div>
                                            <div id="asset-value-now-item-total">
                                                <p>Total</p>
                                                <p id="asset-value-now-item-total-details">
                                                    {getCurrencySymbol(selectedInvestedCurrencyOption)} {((Number(selectedInvestedAmount) * (1 + Number(resultDiffPercentage) / 100)).toFixed(2) - Number(selectedInvestedAmount)).toFixed(2)} ({resultDiffPercentage > 0 ? "Profit" : resultDiffPercentage == 0 ? "No Growth" : "Loss"} )
                                                    <br />
                                                    <span></span>
                                                </p>
                                            </div>
                                            {(durationDate.from != selectedAssetHistoricalResult.data.fromPrice.date || durationDate.to != selectedAssetHistoricalResult.data.toPrice.date) && <p>
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
                                                    symbol: selectedSearchAssetHisSymbol,
                                                    type: selectedSearchAssetHisType,
                                                    invested_amount: selectedInvestedAmount,
                                                    durationDate,
                                                    invested_currency: selectedInvestedCurrencyOption,
                                                    value: selectedSearchAssetHisValue,
                                                    price: {
                                                        toPrice: {
                                                            date: selectedAssetHistoricalResult.data.toPrice.date,
                                                            price: (Number(selectedInvestedAmount) * (1 + Number(resultDiffPercentage) / 100)).toFixed(2)
                                                        },
                                                        fromPrice: {
                                                            date: selectedAssetHistoricalResult.data.fromPrice.date,
                                                            price: parseFloat(selectedInvestedAmount).toFixed(2)
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
                }
                <HorizontalLinearStepper steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} nextStatus={nextStatus} handleReset={handleReset} />
            </div >
        </AssetTab >
    )
}