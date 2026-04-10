import React, { useState } from 'react'
import AssetTab from './AssetTab'
import NewsPage from './NewsPage';
import Loader from "./Loader"

export default function News(props) {
    const [currentNewsPage, setNewsPage] = useState(1);
    const newsItemPerPage = 15;
    const totalPages = Math.ceil(props.newsList.length / newsItemPerPage);

    return <AssetTab title="Finance News" openedTab={props.openedTab === props.id} handleClick={props.handleOpenedTab} id={props.id}>
        <div id="finance-news" >
            {props.loadingNewsStatus
                ?
                <Loader message="News" />
                :
                <>
                    <NewsPage newsList={props.newsList} newsItemPerPage={newsItemPerPage} currentNewsPage={currentNewsPage} />
                    <div id="page-navigator">
                        {Array.from({ length: totalPages }, (_, idx) => idx + 1)
                            .map(num =>
                                <div className={"news-page-num " + (num == currentNewsPage && "selected-news-page-num")} onClick={() => setNewsPage(parseInt(num))} key={num + "news-page-num"}>{num}</div>
                            )
                        }
                    </div>
                </>
            }
        </div>
    </AssetTab>
}