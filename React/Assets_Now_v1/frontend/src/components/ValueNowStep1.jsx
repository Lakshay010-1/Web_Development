import React from 'react'
import Loader from './Loader'
import Option from './Option'
import Form from "./Form"
import Input from "./Input"

export default function ValueNowStep1(props) {
    function handleSymbolChange(symbol) {
        props.setSearchAssetHis({ type: "setSymbol", payload: symbol });
    }
    function handleCurrencyOptionChange(option) {
        props.setSearchAssetHis({ type: "setCurrencyOption", payload: option });
    }
    function handleAmountChange(amount) {
        props.setSearchAssetHis({ type: "setAmount", payload: amount });
    }
    return (
        <>
            <div>
                <label>Invested in:</label>
                <Form submitBtnText="Proceed" currenciesList={props.currenciesList} keepInSearchBox={true} handleSearchAssetHisType={props.handleSearchAssetHisType} setSearchAssetValue={props.setSearchAssetValue} placeholder="Search Stocks, Forex, Crypto or Commodity" />
            </div>
            {((["Crypto", "Stock"].includes(props.selectedSearchAssetHisType)) && props.selectedSearchAssetHisType != "") &&
                (<>
                    {props.searchResultStatus == "loading" ?
                        <Loader message={props.selectedSearchAssetHisType == "Stock" ? "stocks" : "crypto currencies"} />
                        :
                        <div>
                            {props.selectedAssetSearchResult.length > 0 ?
                                <>
                                    <label>Select:</label>
                                    <Option list={props.selectedAssetSearchResult} typeTitle={props.selectedSearchAssetHisType} selectedOption={props.selectedSearchAssetHisSymbol} handleChange={handleSymbolChange} />
                                </>
                                :
                                <div>Search Result Not Found</div>}
                        </div>
                    }
                </>
                )
            }
            {
                (props.selectedSearchAssetHisSymbol != "" || ["Commodity", "Currency"].includes(props.selectedSearchAssetHisType)) &&
                <div>
                    <label>Amount:</label>
                    <div id="currency-to-amount">
                        <Option typeTitle="Currency*" selectedOption={"INR"} handleChange={handleCurrencyOptionChange} list={props.currenciesList} lockStatus={true} />
                        <Input type="number" placeholder="Amount" value={props.selectedInvestedAmount} handleChange={handleAmountChange} />
                    </div>
                </div>
            }
        </>
    )
}
