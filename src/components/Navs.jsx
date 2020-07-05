import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Evaluation from './Evaluation.jsx'

import '../styles/Navs.scss'
import MyUtils from '../mylib/MyUtils.js'
import Kindergarden from './Kindergarden.jsx'
import LoginForm from './LoginForm.jsx'


function Navs() {

    const [kinderGarden, setKinderGarden] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        callKinderGardenList()
        console.log(kinderGarden)
    }, [])

    async function callKinderGardenList() {
        setLoading(true)
        const list = await fetch('http://localhost:9000/api/kinlist')
        list.json().then(res => setKinderGarden(res))
        setLoading(false)
    }

    function check() {
        console.log(kinderGarden)
    }

    return (
        <Router>
            <nav className='main-nav'>
                <Link className='link-to' to='/login'>TO Login</Link>
                <Link className='link-to' to='/eval'>TO EVAL</Link>
                <Link className='link-to' to='/kinders' onClick={callKinderGardenList}>TO SHOW</Link>
            </nav>
            <Switch>
                <Route exact path='/login' component={LoginForm}/>
                <Route exact path='/eval' component={Evaluation} />
                <Route exact path='/kinders' component={() => <Kindergarden loading={loading} kinderGarden={kinderGarden} />} />
            </Switch>
        </Router>
    )
}

export default Navs