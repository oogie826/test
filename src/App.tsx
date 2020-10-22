import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Redirect, Route, Switch } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

// custom
import { userStateAtom, loginDialogAtom } from './recoils/global.ts'
import * as browserUtils from '../utils/browserUtils.ts'
import * as utils from '../utils/utils.ts'

// pages
import Introduction from './pages/Introduction.tsx'
import Search from './pages/Search.tsx'
import Navs from './components/Navs.tsx'
import LoginDialog from './components/LoginDialog.tsx'
import KinderMain from './pages/kinder_pages/KinderMain.tsx'
import Profile from './pages/Profile.tsx'
import Footer from './components/Footer.tsx'
import PermitRoute from './components/RestrictedRoute.tsx'

// styles
import './styles/App.scss'
import './styles/Common.scss'

const KAKAO_JS_KEY = process.env.REACT_APP_KAKAO_JS_KEY;

function initApp() {
    browserUtils.consoleLog('App Init', {fontWeight: 'bold'});
    document.title = 'Kinder Guard';
    const kakaoSDK = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&libraries=services`;
    if (!document.getElementById('kakao-sdk')) {
        (() => {
            const script = document.createElement('script');
            script.id = 'kakao-sdk'
            script.src = kakaoSDK;
            script.async = true;
            document.body.append(script)
        })()
    }
}


export default function App() {

    useEffect(() => {
        initApp();
    }, [])

    const [isLoginDialogOpen, setIsLoginDialogOpen] = useRecoilState(loginDialogAtom);
    const [userState, setUserState] = useRecoilState(userStateAtom);

    const closeDialog = () => {
        setIsLoginDialogOpen({isComponentVisible: true, isStyleVisible: false});
        setTimeout(() => {
            setIsLoginDialogOpen({isComponentVisible: false, isStyleVisible: false});
        }, 500);
    };

    const logout = () => {
        setUserState({});
        browserUtils.deleteCookie('access_token');
        globalThis.location.replace('/');
    };

    useEffect(() => {
        browserUtils.scrollNavigation('nav__main');
    }, [])

    useEffect(() => {
        if (isLoginDialogOpen.isComponentVisible) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
    }, [isLoginDialogOpen])

    useEffect(() => {
        const token = browserUtils.getCookie('access_token');
        if (token) {
            if (utils.isEmpty(Object.values(userState).filter(el => el !== ''))) {
                if (new Date(jwtDecode(token).exp * 1000) < new Date()) {
                    alert('세션이 만료되었습니다.')
                    logout();
                }
                setUserState(jwtDecode(token))
            }
        }
    }, []);

    // TODO: Login 시에만 접근 가능하도록 라우팅
    return (
        <>
            <Navs logout={logout}/>
            <div className='root__main'>
                <Switch>
                    <Route exact path='/' component={() => <Introduction />} />
                    <Route path='/search' component={() => <Search />} />
                    <Route path='/@:place_name' component={() => <KinderMain />} />
                    <PermitRoute 
                        path='/profile' 
                        component={Profile} 
                        fallback={Introduction}
                        isAllow={userState => userState.username ? true : false}
                    />
                    <Redirect to='/' />
                </Switch>
            </div>
            { isLoginDialogOpen.isComponentVisible ? 
                <LoginDialog 
                    closeDialog={closeDialog} 
                    isLoginDialogOpen={isLoginDialogOpen} 
                    setIsLoginDialogOpen={setIsLoginDialogOpen}
                /> 
                : 
                null
            }
            {/* <Footer /> */}
        </>
    )
}