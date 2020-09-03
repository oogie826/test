import React from 'react'

import '../styles/Login.scss'

export default function Login() {

    const onChangeHandler = (ev) => {
        ev.preventDefault()
        const { id, value } = ev.target
        console.log(id, value)
    }

    return (
        <div className='login-form'>
            <fieldset className='login_fieldset'>
                <input id='user_id' name='user_id' onChange={onChangeHandler} type='text' placeholder='Username' />
                <div className='empty_div_show' id='empty_id'>Enter the Username</div>
                <input id='user_pw' name='user_pw' onChange={onChangeHandler} type='password' placeholder='Password' />
                <div className='empty_div_show' id='empty_pw'>Enter the Password</div>
                <button type='button' id='login_submit_btn'>Confirm</button>
            </fieldset>
        </div>
    )
}