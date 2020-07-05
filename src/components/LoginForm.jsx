import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function LoginForm() {

    const [data, setData] = useState([])

    useEffect(() => {
        console.log(data)
    })

    const post_cfg = {
        url: 'http://localhost:9000/api/check',
        data: data,

        
    }

    const onSubmit = async () => {
        await axios.post(post_cfg.url, post_cfg.data)
    }

    const onChangeHandler = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        console.log(name, value)
        setData({...data, [name]: value})
    }

    return (
        <form id='login_form'>
            <fieldset className='login_fieldset'>
                <input id='user_id' name='user_id' onChange={onChangeHandler} type='text' placeholder='Username' />
                <div className='empty_div_show' name='empty_id'>Enter the Username</div>
                <input id='user_pw' name='user_pw' onChange={onChangeHandler} type='password' placeholder='Password'/>
                <div className='empty_div_show' name='empty_pw'>Enter the Password</div>
                <button type='button' name='login_submit_btn' onClick={onSubmit}>Confirm</button>
            </fieldset>
        </form>
    )
}