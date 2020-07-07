import React, { useEffect, useState } from 'react'
import Navs from './components/Navs.jsx'
import SideBar from './components/SideBar.jsx';

import myutils from './mylib/MyUtils'
import './styles/App.scss'


export default function App() {
    return (
        <div className='app-container'>
            <section className='nav-container'>
                <Navs myutils={myutils} />
            </section>
        </div>
    )
}