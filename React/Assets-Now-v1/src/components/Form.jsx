import React, { useState } from 'react';
import searchAssets from '../../public/searchAssets.js';
import Option from './Option';
import Input from "./Input"
import commoditiesItems from "../../public/commodities.js"

export default function Form(props) {
    const [selectedTypeOption, setTypeOption] = useState("");
    const [selectedAssetValue, setAssetValue] = useState("");

    function handleTypeOption(type) {
        setTypeOption(type);
        setAssetValue("");
    }

    function onSubmit(event) {
        event.preventDefault();
        props.setSearchAssetType(selectedTypeOption);
        props.setSearchAssetValue(selectedAssetValue);
        !props.keepInSearchBox && setTypeOption("");
        !props.keepInSearchBox && setAssetValue("");
    }

    return (
        <form id="input-name" onSubmit={e => onSubmit(e)} >
            <Option list={searchAssets} typeTitle="Type*" selectedOption={selectedTypeOption} handleChange={handleTypeOption} required />
            {selectedTypeOption === "" && <Input className="asset-name" type="text" placeholder={props.placeholder} disableCon={selectedTypeOption == ""} />}
            {(selectedTypeOption === "Stock" || selectedTypeOption === "Crypto") &&
                <Input value={selectedAssetValue} handleChange={setAssetValue} className="asset-name" type="text" placeholder={props.placeholder} disableCon={selectedTypeOption == ""} />}
            {selectedTypeOption === "Currency" &&
                <div id="currency-options">
                    <Option list={props.currenciesList} typeTitle="Currency*" selectedOption={selectedAssetValue} handleChange={setAssetValue} loadingStatus={props.loadingCurrencyListStatus} loaderMSG="Currency Options" />
                </div>}
            {selectedTypeOption === "Commodity" && <Option list={commoditiesItems} typeTitle="Type*" selectedOption={selectedAssetValue} handleChange={setAssetValue} />}
            <button type='submit' className='asset-name-btn' disabled={(selectedTypeOption != "" && selectedAssetValue != "") ? "" : "disable"}>{(props?.submitBtnText) ? props.submitBtnText : "Search"}</button>
        </form>
    );
}