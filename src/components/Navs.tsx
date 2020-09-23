import React, { useEffect, useState, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { Link } from 'react-router-dom'
import { userStateAtom, loginDialogAtom } from '../recoils/global.ts'

import SVG from '../components/SVG.tsx'
import { deleteCookie } from '../../utils/browserUtils.ts'
import { isEmpty } from '../../utils/utils.ts'

import '../styles/Navs.scss'
import '../styles/ProfileNav.scss'

function useOutsideClick(ref, callback) {
    useEffect(() => {
        function clickOutside(ev) {
            if (ref.current && !ref.current.contains(ev.target)) {
                callback();
            }
        }
        document.addEventListener('click', clickOutside);

        return () => {
            document.removeEventListener('click', clickOutside);
        };
    }, [ref])
}

export default function Navs() {

    const [loginDialogState, setLoginDialogState] = useRecoilState(loginDialogAtom);
    const [userState, setUserState] = useRecoilState(userStateAtom);

    const [profileNavState, setProfileNavState] = useState({
        isComponentVisible: false,
        isStyleVisible: false,
    });

    const openDialog = () => setLoginDialogState({ isComponentVisible: true, isStyleVisible: true });

    const openProfileNav = () => {
        setProfileNavState({ isComponentVisible: true, isStyleVisible: true });
        setTimeout(() => {
            document.getElementById('profile-nav__container')?.focus();
        }, 0);
        return;
    }

    const closeProfileNav = () => {
        setProfileNavState({ isComponentVisible: false, isStyleVisible: false });
        return;
    }

    const logout = () => {
        setUserState({});
        deleteCookie('access_token');
        globalThis.location.replace('/');
    };

    return (
        <nav className='nav__main top'>
            <div className='nav__wrapper'>
                <h1 className='nav__title'><a tabIndex={1} href='/'>Kinder Guard</a></h1>
                <div className='nav__links'>
                    <Link className='nav__link' to='/search'>
                        <SVG className='svg__icon' name='search_icon' width={27} height={27} color='#000000' />
                    </Link>
                    {userState.username ?
                        <a className={`nav__link ${profileNavState.isComponentVisible ? 'activate' : 'deactivate'}`} onClick={openProfileNav}><SVG className='svg__icon' name='user_icon' width={28} height={28} viewBox='0 0 478 478' /></a>
                        :
                        <button className='login-btn btn' onClick={openDialog}>로그인</button>
                    }
                    {profileNavState.isComponentVisible ? <ProfileNav closeProfileNav={closeProfileNav} logout={logout} /> : null}
                </div>
            </div>
        </nav>
    )
}

function ProfileNav({ logout, closeProfileNav }) {

    const ref = useRef(null);
    useOutsideClick(ref, closeProfileNav);

    return (
        <div tabIndex={2} ref={ref} id='profile-nav__container' className='profile-nav__container'>
            <div className='profile-nav__wrapper'>
                <div>
                    <div>
                        <button onClick={logout}>로그아웃</button>
                    </div>
                </div>
                <div>
                    <div>
                        <Link className='profile-nav__link' to='/profile'>
                            프로필로 이동하기
                    </Link>
                        <Link className='profile-nav__link' to='/'>
                            유치원 이동하기
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}