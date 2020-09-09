import React from 'react'
import { useRecoilState } from 'recoil'
import { Link } from 'react-router-dom'

import { isLoginAtom, loginDialogAtom } from '../recoils/global.ts'

import SVG from '../components/SVG.tsx'

import '../styles/Navs.scss'

export default function Navs() {

    const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
    const [loginDialogState, setLoginDialogState] = useRecoilState(loginDialogAtom);

    const openDialog = () => setLoginDialogState(true);

    return (
        <nav className='nav__main top'>
            <div className='nav__wrapper'>
                <h1 className='nav__title'><a href='/'>Kinder Guard</a></h1>
                <div className='nav__links'>
                    <Link className='nav__link' to='/search'>
                        <SVG className='svg__icon' name='search_icon' width={20} height={20} color='#000000' />
                    </Link>
                    <button className='btn' onClick={openDialog}>로그인</button>
                </div>
            </div>
        </nav>
    )
}