import React, { useEffect, useState, useReducer } from 'react'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Portfolio from './components/Portfolio.jsx'
import News from './components/News.jsx'
import AssetValueNow from './components/AssetValueNow.jsx'
import Watchlist from './components/Watchlist.jsx'
import TrendingItems from './components/TrendingItems.jsx'
import SearchResult from './components/SearchResult.jsx'
import ids from './assets/IDs.js'

function assetReducer(state, action) {
  let newState = {};
  switch (action.type) {
    case "setStatus":
      newState = { status: action.payload };
      break;
    case "setData":
      newState = { data: action.payload };
      break;
    default:
      return new Error("Input 'type' not specified");
  }
  return { ...state, ...newState };
}

function tabReducer(state, action) {
  let newState = {};
  let getTitle = (openedTabID, defaultTitle) => {
    let updatedTitle = "";
    switch (openedTabID) {
      case ids[0]:
        updatedTitle = "Search Result";
        break;
      case ids[1]:
        updatedTitle = "Value Now";
        break;
      case ids[2]:
        updatedTitle = "Portfolio";
        break;
      case ids[3]:
        updatedTitle = "WatchList";
        break;
      case ids[4]:
        updatedTitle = "Finance News";
        break;
      default:
        updatedTitle = defaultTitle;
    }
    updatedTitle = updatedTitle + (updatedTitle == defaultTitle ? "" : ` | ${defaultTitle}`);
    return updatedTitle;
  };
  switch (action.type) {
    case "setTab":
      newState = { openedTabID: state.openedTabID == action.payload ? "" : action.payload };
      newState.title = getTitle(newState.openedTabID, state.defaultTitle);
      break;
    case "keepTab":
      newState = { openedTabID: action.payload };
      newState.title = getTitle(newState.openedTabID, state.defaultTitle);
      break;
    case "setTitle":
      newState = { title: action.payload }
      break;
    default:
      return new Error("Input 'type' not specified");
  }
  document.title = newState.title;
  return { ...state, ...newState }
}

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
    default:
      return new Error("Input 'type' not specified");
  }
  return { ...state, ...newState };
}

export default function App() {
  const defaultTitle = "Assets Now";
  const APILINK = import.meta.env.VITE_API_LINK;
  const searchResultInitialState = { type: "", value: "", data: "", status: "" };
  const assetInitialState = { data: [], status: "" };
  const [newsState, newsDispatch] = useReducer(assetReducer, assetInitialState);
  const [tabState, tabDispatch] = useReducer(tabReducer, { defaultTitle: defaultTitle, title: defaultTitle, openedTabID: "" });
  const [currenciesListState, currenciesListDispatch] = useReducer(assetReducer, assetInitialState);
  const [trendingItemsState, trendingItemsDispatch] = useReducer(assetReducer, assetInitialState);
  const [portfolioList, setPortfolioList] = useState([]);
  const [watchlistList, setWatchlistList] = useState([]);
  const [usdToINR, setUsdToINR] = useState(0);
  const [assetSearchResultState, assetSearchResultDispatch] = useReducer(searchResultReducer, searchResultInitialState);

  // Stock/Crypto item/symbol search results and Currency/Commodity item/symbol information
  useEffect(() => {
    if (!assetSearchResultState.type || !assetSearchResultState.value) {
      return;
    }
    const searchAssetAPIURL = (type, value) => {
      let url;
      const upperCaseVal = value.toUpperCase();
      switch (type) {
        case "Currency":
          url = `/api/exchange/currency?currency=${value}`
          break;
        case "Commodity":
          url = `/api/get/commodity?commodity=${upperCaseVal}`
          break;
        case "Stock":
          url = `/api/search/stock?stock=${value}`
          break;
        case "Crypto":
          url = `/api/search/crypto?crypto=${value}`
          break;
        default:
          url = "";
      }
      return url;
    };

    async function fetchData() {
      const url = searchAssetAPIURL(assetSearchResultState.type, assetSearchResultState.value);
      try {
        assetSearchResultDispatch({ type: "setStatus", payload: "loading" });
        const response = await fetch(`${APILINK}${url}`);
        let data = await response.json();
        if (assetSearchResultState.type == "Commodity" && data?.data?.curPriceUSD) {
          data = {
            "price": {
              "curPrice": parseFloat(data.data.curPriceUSD.price) * usdToINR,
              "prePrice": parseFloat(data.data.prePriceUSD.price) * usdToINR
            }
          }
        } else if (assetSearchResultState.type == "Stock") {
          const map = new Map();
          data.forEach(item => map.set(item.symbol, item));
          const modData = [];
          map.forEach((value, key) => modData.push(value));
          modData.sort((a, b) => a.instrument_name.localeCompare(b.instrument_name));
          data = modData;
        }
        assetSearchResultDispatch({ type: "setStatus", payload: "fetched" });
        assetSearchResultDispatch({ type: "setData", payload: data });
        tabDispatch({ type: "keepTab", payload: ids[0] });
      } catch (err) {
        console.error("Error fetching asset search results/information. ", err)
      }
    }
    fetchData();
  }, [APILINK, assetSearchResultState.type, assetSearchResultState.value, usdToINR]);

  // Trending Stocks and Cryptos
  useEffect(() => {
    async function fetchData() {
      let storedData = localStorage.getItem("data");
      storedData = storedData ? JSON.parse(storedData) : {};
      trendingItemsDispatch({ type: "setStatus", payload: "loading" });
      if (!storedData.trending) {
        storedData.trending = {};
      }
      if (!storedData.trending.stocks) {
        try {
          const response = await fetch(`${APILINK}/api/trending/stocks`);
          let data = await response.json();
          storedData.trending.stocks = data;
          localStorage.setItem("data", JSON.stringify(storedData));
        } catch (err) {
          console.error("Failed to fetch trending stock list.", err);
        }
      }
      if (!storedData.trending.crypto) {
        try {
          const response = await fetch(`${APILINK}/api/trending/crypto`);
          let data = await response.json();
          data = data.map(item => {
            return {
              name: item.name,
              curPrice: (parseFloat(item.curPriceUSD) * usdToINR).toFixed(2),
              prePrice: ((item.curPriceUSD / (1 + parseFloat(item.changePerUSD) / 100)) * usdToINR).toFixed(2)
            }
          });
          storedData.trending.crypto = data;
          localStorage.setItem("data", JSON.stringify(storedData));
        } catch (err) {
          console.error("Failed to fetch trending crypto list.", err);
        }
      }
      trendingItemsDispatch({ type: "setStatus", payload: "fetched" });
      trendingItemsDispatch({ type: "setData", payload: [...storedData.trending.stocks, ...storedData.trending.crypto] });
    }
    fetchData();
  }, [APILINK, usdToINR]);

  // Currency List
  useEffect(() => {
    async function fetchCurrencyList() {
      let storedData = localStorage.getItem("data");
      storedData = storedData ? JSON.parse(storedData) : {};
      if (!storedData.currencyList || !storedData.currencyList.conversion_rates) {
        try {
          currenciesListDispatch({ type: "setStatus", status: "loading" });
          const response = await fetch(`${APILINK}/api/exchange/currency?currency=USD`);
          const data = await response.json();
          storedData.currencyList = data;
          localStorage.setItem("data", JSON.stringify(storedData));
        } catch (err) {
          console.error("Failed to fetch currency list", err);
        }
      }
      currenciesListDispatch({ type: "setStatus", status: "fetched" });
      setUsdToINR(storedData.currencyList.conversion_rates.INR);
      let currencies = Object.keys(storedData.currencyList.conversion_rates).sort();
      currenciesListDispatch({ type: "setData", payload: currencies });
    }
    fetchCurrencyList();
  }, [APILINK]);

  // News
  useEffect(() => {
    async function fetchNews() {
      let storedNews = localStorage.getItem("data");
      storedNews = storedNews ? JSON.parse(storedNews) : {};
      if (!storedNews?.news || storedNews.news?.error) {
        try {
          newsDispatch({ type: "setStatus", payload: "loading" });
          const response = await fetch(`${APILINK}/api/news`);
          let data = await response.json();
          const dataPart1 = data.filter(newsItem => newsItem.source != "Reuters");
          const dataPart2 = data.filter(newsItem => newsItem.source == "Reuters")
          data = [...dataPart1, ...dataPart2];
          storedNews.news = data;
          localStorage.setItem("data", JSON.stringify(storedNews));
        } catch (err) {
          console.error("Failed to fetch news list", err);
        }
      }
      newsDispatch({ type: "setStatus", payload: "fetched" });
      newsDispatch({ type: "setData", payload: storedNews.news });
    }
    fetchNews();
  }, [APILINK]);

  return (
    <>
      <div id="top"></div>
      <div id='container'>
        <Header currenciesList={currenciesListState.data} setSearchAssetType={assetSearchResultDispatch} setSearchAssetValue={assetSearchResultDispatch} loadingCurrencyListStatus={currenciesListState.status} />
        <div id="content-container">
          <TrendingItems trendingItems={trendingItemsState} />
          <div id="content">
            <SearchResult loadingSearchResult={assetSearchResultState.status} docTitle={tabState.title} setDocTitle={tabDispatch} searchAssetType={assetSearchResultState.type} setWatchlistList={setWatchlistList} data={assetSearchResultState.data} searchAssetValue={assetSearchResultState.value} usdToINR={usdToINR} openedTab={tabState.openedTabID} handleOpenedTab={tabDispatch} id={ids[0]} />
            <AssetValueNow docTitle={tabState.title} setDocTitle={tabDispatch} currenciesList={currenciesListState.data} setPortfolioList={setPortfolioList} usdToINR={usdToINR} openedTab={tabState.openedTabID} handleOpenedTab={tabDispatch} id={ids[1]} />
            <Portfolio portfolioList={portfolioList} openedTab={tabState.openedTabID} handleOpenedTab={tabDispatch} id={ids[2]} />
            <Watchlist watchlistList={watchlistList} openedTab={tabState.openedTabID} handleOpenedTab={tabDispatch} id={ids[3]} />
            <News news={newsState} openedTab={tabState.openedTabID} handleOpenedTab={tabDispatch} id={ids[4]} />
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}
