import React, { useEffect, useState, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { Link } from 'react-router-dom'
import { userStateAtom, loginDialogAtom } from '../recoils/global.ts'

import SVG from '../components/SVG.tsx'

//Material-UI
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

import '../styles/Navs.scss'
import '../styles/ProfileNav.scss'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

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

export default function Navs({ logout }) {

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
                <List component="nav" aria-label="secondary mailbox folders">
                    <ListItem button onClick={logout}>
                        <ListItemText primary="로그아웃" />
                    </ListItem>
                    <ListItemLink href="/profile">
                        <ListItemText primary="내 정보" />
                    </ListItemLink>
                </List>
            </div>
        </div>
    )
}