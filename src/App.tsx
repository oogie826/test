import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'

import Navs from './components/Navs.tsx'
import About from './pages/About.tsx'
import Main from './pages/Main.tsx'

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
            <section className='main-section'>
                <Switch>
                    <Route exact path='/' render={renderIndex}/>
                </Switch>
            </section>
        </>
    )
}