import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/LoginForm.scss'
import { BrowserRouter as Router, Route, Link, useHistory } from 'react-router-dom'

export default function LoginForm({myutils}) {

    const [userData, setUserData] = useState({})
    const [blank, setBlank] = useState({id: false, pw: false})

    useEffect(() => {
        console.log(userData)
        console.log(userData.user_id)
        console.log(blank)
    }, [blank])

    const sign_in_cfg = {
        url: 'http://localhost:9000/api/check',
        userData: userData,
    }

    const sign_up_cfg = {
        url: 'http://localhost:9000/api/signup'
    }

    const onSignIn = async () => {
        if (myutils.isEmpty(userData.id)) {
            setBlank({id: true, pw: false})
        }
        else if (myutils.isEmpty(userData.pw)) {
            setBlank({id: false, pw: true})
        }
        else if (myutils.isEmpty(userData.id) && myutils.isEmpty(userData.pw)) {
            setBlank({id: true, pw: true})
        }
        else {
            setBlank({id: false, pw: false})
            await axios.post(sign_in_cfg.url, sign_in_cfg.userData)
        }
    }

    const onSignUp = async (e) => {
        e.preventDefault()
        const dat = await axios.get(sign_up_cfg.url)
        console.log(dat.userData)
    }

    const onChangeHandler = (e) => {
        e.preventDefault()
        const {id, name, value} = e.target
        console.log(name, value)
        setUserData({...userData, [name]: value})
    }

    return (
        <form className='login-form'>
            <fieldset className='login-fieldset'>
            <div className='outline'>
                <input id='id' className='login-input' name='id' onChange={onChangeHandler} type='text' placeholder='Username' />
            </div>
                { blank.id ? <div className='err-empty-div' name='empty_id'>Enter the Username!</div> : '' }
            <div className='outline'>
                <input id='pw' className='login-input' name='pw' onChange={onChangeHandler} type='password' placeholder='Password'/>
            </div>
                { blank.pw ? <div className='err-empty-div' name='empty_pw'>Enter the Password!</div> : '' }
                <button className='signin-btn' type='button' name='sign_in_btn' onClick={onSignIn}>Sign in</button>
            </fieldset>
            <div>
                <span>Forgot you Username or Password?</span>
                <button className='signup-btn' type='button' name='sign_up_btn' onClick={onSignUp}>Sign Up</button>
            </div>
        </form>
    )
}