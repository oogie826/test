import React, { useEffect, useState } from 'react'
import Navs from './components/Navs.jsx'
import SideBar from './components/SideBar.jsx';

import myutil from './mylib/MyUtils'
import './styles/App.scss'


export default function App() {
    const [data, setData] = useState([]);

    async function callAPI() {
        const res = await fetch('http://localhost:9000/api');
        console.log(res)
        res.json().then(res => setData([{ name: res.name, age: res.age }]))
    }

    const show = data.map((v, i) =>
        <div key={i}>{v.name}</div>
    )

    return (
        <div className='app-container'>
            <button onClick={callAPI}>call</button>
            {myutil.isEmpty(data) ? 'blank' : show}
            <section className='nav-container'>
                <Navs />
            </section>
            <aside className='side-bar'>
                <SideBar />
            </aside>
        </div>
    )
}