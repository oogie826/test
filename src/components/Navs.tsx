import React from 'react'
import { useRecoilState } from 'recoil'
import { Link } from 'react-router-dom'

import { loginDialogAtom } from '../recoils/global.ts'

import SVG from '../components/SVG.tsx'

import '../styles/Navs.scss'

export default function Navs() {

    const [loginDialogState, setLoginDialogState] = useRecoilState(loginDialogAtom);

    const openDialog = () => setLoginDialogState({renderComp: true, renderCss: true});

    return (
        <nav className='nav__main top'>
            <div className='nav__wrapper'>
                <h1 className='nav__title'><a href='/'>Kinder Guard</a></h1>
                <div className='nav__links'>
                    <Link className='nav__link' to='/search'>
                        <SVG className='svg__icon' name='search_icon' width={25} height={25} color='#000000' />
                    </Link>
                    <Link className='nav__link' to='/profile'>
                        <SVG className='svg__icon' name='login_icon' width={27} height={27} viewBox='0 0 50 50' color='#000000' />
                    </Link>
                    <button className='login-btn btn' onClick={openDialog}>로그인</button>
                </div>
            </div>
        </nav>
    )
}