import React from 'react'
import NewsItem from './NewsItem';

export default function NewsPage(props) {
    const pageItems = props.newsList.slice(props.newsItemPerPage * (props.currentNewsPage - 1), Math.min(props.newsItemPerPage * props.currentNewsPage, props.newsList.length))
    return (
        <div className='news-page'>
            {
                pageItems.map(newsOb => <NewsItem key={newsOb.id} item={newsOb} />)
            }
        </div>
    )
}