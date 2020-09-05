import React from 'react'

import Dialog from '../components/Dialog.tsx'

import '../styles/Login.scss'

export default function Login() {

    const onChangeHandler = (ev) => {
        ev.preventDefault()
        const { id, value } = ev.target
        console.log(id, value)
    }

    return (
        <div className='login-form'>

        </div>
    )
}