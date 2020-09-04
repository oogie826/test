import React from 'react'
import { Link } from 'react-router-dom'
import SVG from '../components/SVG.tsx'

import '../styles/Navs.scss'

export default function Navs() {
    return (
        <nav className='main-nav'>
            <h1 className='nav-title'><a href='/'>Kinder Guards</a></h1>
            <div className='nav-links'>
                <Link className='nav-link-to' to='/search'>
                    <SVG className='svg-icon' name='search_icon' width={20} height={20} color='#000000'/>
                </Link>
                <Link className='nav-link-to' to='/login'>로그인</Link>
            </div>
        </nav>
    )
}