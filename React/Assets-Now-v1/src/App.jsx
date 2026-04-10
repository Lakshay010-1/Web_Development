import React, { useEffect, useState } from 'react'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Portfolio from './components/Portfolio.jsx'
import News from './components/News.jsx'
import AssetValueNow from './components/AssetValueNow.jsx'
import Watchlist from './components/Watchlist.jsx'
import TrendingItems from './components/TrendingItems.jsx'
import SearchResult from './components/SearchResult.jsx'
import ids from './assets/IDs.js'

export default function App() {
  const defaultTitle = "Assets Now";
  const [docTitle, setDocTitle] = useState(defaultTitle);
  const [openedTab, setOpenedTab] = useState(-1);
  const [portfolioList, setPortfolioList] = useState([]);
  const [watchlistList, setWatchlistList] = useState([]);
  const [currenciesList, setCurrenciesList] = useState([]);
  const [usdToINR, setUsdToINR] = useState(0);
  const [newsList, setNewsList] = useState([]);
  const [barItemsList, setBarItemList] = useState([]);
  const [searchAssetType, setSearchAssetType] = useState("");
  const [searchAssetValue, setSearchAssetValue] = useState("");
  const [searchAssetResult, setSearchAssetResult] = useState([]);
  const [loadingNewsStatus, setLoadingNewsStatus] = useState(true);
  const [loadingCurrencyListStatus, setLoadingCurrencyListStatus] = useState(true);
  const [loadingSearchResult, setLoadingSearchResult] = useState(true);

  // Update Document Title
  useEffect(() => {
    document.title = docTitle;
  }, [docTitle]);

  // Set Document Title State
  useEffect(() => {
    async function setTitle() {
      let updatedTitle = "";
      switch (openedTab) {
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
      setDocTitle(updatedTitle);
    }
    setTitle();
  }, [openedTab]);

  function handleOpenedTab(id) {
    const updatedOpenedTab = openedTab == id ? "" : id;
    setOpenedTab(updatedOpenedTab);
  }

  // Stock/Crypto item/symbol search results and Currency/Commodity item/symbol information
  useEffect(() => {

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
      const url = searchAssetAPIURL(searchAssetType, searchAssetValue);
      try {
        setLoadingSearchResult(true);
        const response = await fetch(url);
        let data = await response.json();
        if (searchAssetType == "Commodity" && data?.data?.curPriceUSD) {
          data = {
            "price": {
              "curPrice": parseFloat(data.data.curPriceUSD.price) * usdToINR,
              "prePrice": parseFloat(data.data.prePriceUSD.price) * usdToINR
            }
          }
        } else if (searchAssetType == "Stock") {
          const map = new Map();
          data.forEach(item => map.set(item.symbol, item));
          const modData = [];
          map.forEach((value, key) => modData.push(value));
          modData.sort((a, b) => a.instrument_name.localeCompare(b.instrument_name));
          data = modData;
        }
        setLoadingSearchResult(false);
        setSearchAssetResult(data);
        setOpenedTab(prev => prev == ids[0] ? prev : ids[0]);
      } catch (err) {
        console.error("Error fetching asset search results/information. ", err)
      }
    }
    fetchData();
  }, [searchAssetType, searchAssetValue, usdToINR]);

  // Trending Stocks and Cryptos
  useEffect(() => {
    async function fetchData() {
      let storedData = localStorage.getItem("data");
      storedData = storedData ? JSON.parse(storedData) : {};
      if (!storedData.trending) {
        storedData.trending = {};
      }
      if (!storedData.trending.stocks) {
        try {
          const response = await fetch('/api/trending/stocks');
          let data = await response.json();
          storedData.trending.stocks = data;
          localStorage.setItem("data", JSON.stringify(storedData));
        } catch (err) {
          console.error("Failed to fetch trending stock list.", err);
        }
      }
      if (!storedData.trending.crypto) {
        try {
          const response = await fetch('/api/trending/crypto');
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
      setBarItemList([...storedData.trending.stocks, ...storedData.trending.crypto]);
    }
    fetchData();
  }, [usdToINR]);

  // Currency List
  useEffect(() => {
    async function fetchCurrencyList() {
      let storedData = localStorage.getItem("data");
      storedData = storedData ? JSON.parse(storedData) : {};
      if (!storedData.currencyList || !storedData.currencyList.conversion_rates) {
        try {
          setLoadingCurrencyListStatus(true);
          const response = await fetch('/api/exchange/currency?currency=USD');
          const data = await response.json();
          storedData.currencyList = data;
          localStorage.setItem("data", JSON.stringify(storedData));
          setLoadingCurrencyListStatus(false);
        } catch (err) {
          console.error("Failed to fetch currency list", err);
        }
      } else {
        setLoadingCurrencyListStatus(false);
      }
      setUsdToINR(storedData.currencyList.conversion_rates.INR);
      let currencies = Object.keys(storedData.currencyList.conversion_rates).sort();
      setCurrenciesList(currencies);
    }
    fetchCurrencyList();
  }, []);

  // News
  useEffect(() => {
    async function fetchNews() {
      let storedNews = localStorage.getItem("data");
      storedNews = storedNews ? JSON.parse(storedNews) : {};
      if (!storedNews?.news || storedNews.news?.error) {
        try {
          setLoadingNewsStatus(true);
          const response = await fetch('/api/news');
          let data = await response.json();
          const dataPart1 = data.filter(newsItem => newsItem.source != "Reuters");
          const dataPart2 = data.filter(newsItem => newsItem.source == "Reuters")
          data = [...dataPart1, ...dataPart2];
          storedNews.news = data;
          localStorage.setItem("data", JSON.stringify(storedNews));
          setLoadingNewsStatus(false);
        } catch (err) {
          console.error("Failed to fetch news list", err);
        }
      } else {
        setLoadingNewsStatus(false);
      }
      setNewsList(storedNews.news);
    }
    fetchNews();
  }, []);

  return (
    <>
      <div id="top"></div>
      <div id='container'>
        <Header currenciesList={currenciesList} setSearchAssetType={setSearchAssetType} setSearchAssetValue={setSearchAssetValue} loadingCurrencyListStatus={loadingCurrencyListStatus} />
        <div id="content-container">
          <TrendingItems barItemsList={barItemsList} />
          <div id="content">
            <SearchResult loadingSearchResult={loadingSearchResult} setDocTitle={setDocTitle} searchAssetType={searchAssetType} setWatchlistList={setWatchlistList} data={searchAssetResult} searchAssetValue={searchAssetValue} usdToINR={usdToINR} openedTab={openedTab} handleOpenedTab={handleOpenedTab} id={ids[0]} />
            <AssetValueNow setDocTitle={setDocTitle} currenciesList={currenciesList} setPortfolioList={setPortfolioList} usdToINR={usdToINR} openedTab={openedTab} handleOpenedTab={handleOpenedTab} id={ids[1]} />
            <Portfolio portfolioList={portfolioList} openedTab={openedTab} handleOpenedTab={handleOpenedTab} id={ids[2]} />
            <Watchlist watchlistList={watchlistList} openedTab={openedTab} handleOpenedTab={handleOpenedTab} id={ids[3]} />
            <News newsList={newsList} loadingNewsStatus={loadingNewsStatus} openedTab={openedTab} handleOpenedTab={handleOpenedTab} id={ids[4]} />
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}
