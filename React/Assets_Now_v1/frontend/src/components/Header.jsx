import React, { useState } from 'react'
import ThemeBtn from './ThemeBtn'
import Form from './Form'
import Profile from './Profile'

export default function Header(props) {
    const [isDark, setTheme] = useState(false);
    return (
        <header>
            <a id='main-logo' href="#top">
                <img className="app-logo" src="images/budget.png" alt="logo" />
                <h1 id="header-title">Assets Now</h1>
            </a>
            <Form placeholder="Search for stocks, crypto, forex & more" currenciesList={props.currenciesList} setSearchAssetType={props.setSearchAssetType} setSearchAssetValue={props.setSearchAssetValue} loadingCurrencyListStatus={props.loadingCurrencyListStatus} />
            <div>
                <ThemeBtn isDark={isDark} setTheme={setTheme} />
                <Profile isDark={isDark} user={props.user} userDispatch={props.userDispatch} />
            </div>
        </header>
    )
}
