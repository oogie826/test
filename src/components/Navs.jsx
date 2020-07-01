import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Evaluation from './Evaluation.jsx'

import '../styles/Navs.scss'
import MyUtils from '../mylib/MyUtils.js'


function Navs() {

    const [kinderGarden, setKinderGarden] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        callKinderGardenList()
        console.log(kinderGarden)
    }, [])

    async function callKinderGardenList() {
        setLoading(true)
        const list = await fetch('http://localhost:9000/api/kindergardens')
        list.json().then(res => setKinderGarden(res))
        setLoading(false)
    }

    function check() {
        console.log(kinderGarden)
    }

    const KinderPage = () => {

        const list = MyUtils.isEmpty(kinderGarden) ? '' : kinderGarden.map((val, idx) =>
            <div key={idx}>{val.name} {val.comment} {val.teachers} {val.program} {val.overall} </div>
        );


        return (
            <div>
                {loading ? 'load' : list}
            </div>
        )
    }

    return (
        <Router>
            <nav className='main-nav'>
                <Link className='link-to' to='/navs'>TO NAVS</Link>
                <Link className='link-to' to='/eval'>TO EVAL</Link>
                <Link className='link-to' to='/kinders' onClick={check}>TO SHOW</Link>
            </nav>
            <Switch>
                <Route exact path='/navs' />
                <Route exact path='/eval' component={Evaluation} />
                <Route exact path='/kinders' component={KinderPage} />
            </Switch>
        </Router>
    )
}

export default Navs