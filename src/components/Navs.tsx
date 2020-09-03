import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/Navs.scss'

export default function Navs() {
    return (
        <nav className='main-nav'>
            <h1 className='nav-title'>Kinder Guards</h1>
            <div className='nav-links'>
                <Link className='nav-link-to' to='/search'>검색</Link>
                <Link className='nav-link-to' to='/login'>로그인</Link>
            </div>
        </nav>
    )
}