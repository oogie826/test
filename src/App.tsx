import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'

import Navs from './components/Navs.tsx'
import About from './pages/About.tsx'
import Main from './pages/Main.tsx'
import Search from './pages/Search.tsx'

import './styles/App.scss'

function renderIndex() {
    return (
        <>
            <Main/>
            <About />
        </>
    )
}

export default function App() {
    document.title = 'Kinder Guards';

    return (
        <>
            <Navs />
            <div className='root-panel'>
                <Switch>
                    <Route exact path='/' render={renderIndex}/>
                    <Route path='/search' component={() => <Search />}/>
                </Switch>
            </div>
        </>
    )
}