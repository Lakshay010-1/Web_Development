import React from 'react'
import styles from './styles/Map.module.css'
import PageNav from '../components/PageNav'
import Sidebar from '../components/Sidebar'
import MapView from '../components/MapView'

export default function Map() {
    return (
        <div className='container'>
            <div className={styles.mapLayout}>
                <PageNav />
                <section>
                    <Sidebar />
                    <MapView />
                </section>
            </div>
        </div>
    )
}
