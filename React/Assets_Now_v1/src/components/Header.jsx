import React from 'react'
import ThemeBtn from './ThemeBtn'
import Form from './Form'

export default function Header(props) {
    return (
        <header>
            <a id='main-logo' href="#top">
                <img className="app-logo" src="images/budget.png" alt="logo" />
                <h1 id="header-title">Assets Now</h1>
            </a>
            <Form placeholder="Search for stocks, crypto, forex & more" currenciesList={props.currenciesList} setSearchAssetType={props.setSearchAssetType} setSearchAssetValue={props.setSearchAssetValue} loadingCurrencyListStatus={props.loadingCurrencyListStatus} />
            <ThemeBtn />
        </header>
    )
}
