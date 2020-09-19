import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Link } from 'react-router-dom'
import { userStateAtom, loginDialogAtom } from '../recoils/global.ts'

import SVG from '../components/SVG.tsx'
import { deleteCookie } from '../../utils/browserUtils.ts'
import { isEmpty } from '../../utils/utils.ts'

import '../styles/Navs.scss'

export default function Navs() {

    const [loginDialogState, setLoginDialogState] = useRecoilState(loginDialogAtom);
    const [userState, setUserState] = useRecoilState(userStateAtom);

    const [profileNavState, setProfileNavState] = useState({
        isComponentVisible: false,
        isStyleVisible: false,
    });

    const openDialog = () => setLoginDialogState({isComponentVisible: true, isStyleVisible: true});

    const openProfileNav = () => {

        setProfileNavState({isComponentVisible: true, isStyleVisible: true});
    }

    const closeProfileNav = () => {

        setProfileNavState({isComponentVisible: false, isStyleVisible: false});
    }

    const logout = () => {
        setUserState({});
        deleteCookie('access_token');
        globalThis.location.replace('/');
    };

    useEffect(() => {
        console.log(userState)
    })

    return (
        <nav className='nav__main top'>
            <div className='nav__wrapper'>
                <h1 className='nav__title'><a href='/'>Kinder Guard</a></h1>
                <div className='nav__links'>
                    <Link className='nav__link' to='/search'>
                        <SVG className='svg__icon' name='search_icon' width={27} height={27} color='#000000' />
                    </Link>
                    {/* <Link className='nav__link' to='/profile'>
                        <SVG className='svg__icon' name='login_icon' width={27} height={27} viewBox='0 0 50 50' color='#000000' />
                    </Link> */}
                    {userState.username ? 
                        (<a onClick={openProfileNav}><SVG className='svg__icon' name='user_icon' width={28} height={28} viewBox='0 0 478 478' /></a>)
                        : 
                        <button className='login-btn btn' onClick={openDialog}>로그인</button>
                    }
                    {profileNavState.isComponentVisible ? <ProfileNav logout={logout} /> : null}
                </div>
            </div>
        </nav>
    )
}

function ProfileNav({logout}) {
    return (
        <div className='profile__div_nav'>
            <div className='profile__div_nav-wrapper'>
                <div>
                    <button onClick={logout}>로그아웃</button>
                </div>
                <div>
                    <Link className='nav__link' to='/profile'>
                        프로필로 이동하기
                    </Link>
                </div>
            </div>
        </div>
    )
}