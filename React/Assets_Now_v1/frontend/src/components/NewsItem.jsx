import React from 'react'

export default function NewsItem(props) {
    const { headline, image, id, source, summary, url } = props.item;
    return (
        <a className="news-item" target='_blank' href={url}>
            <div className="news-item-content">
                <img src={image} alt={id} />
                <div className='news-desc'>
                    <h1>{headline}</h1>
                    <p >{summary}</p>
                    <p className='news-source'>{source}</p>
                </div>
            </div>
        </a>
    )
}
