import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Route, Switch } from 'react-router-dom'
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

// styles
import './styles/App.scss'
import './styles/Commons.scss'

function initApp() {
    browserUtils.consoleLog('App Init', {fontWeight: 'bold'});
    const jsKey = 'ad98ca818bb064b0b2493181da6cae21'
    const kakaoSDK = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${jsKey}&libraries=services`;

    document.title = 'Kinder Guard';

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
    }

    useEffect(() => {
        browserUtils.scrollNavigation('nav__main');
    }, [])

    useEffect(() => {
        browserUtils.consoleLog(`isLoginDialogOpen: ${isLoginDialogOpen.isComponentVisible} ${isLoginDialogOpen.isStyleVisible}`);
        if (isLoginDialogOpen.isComponentVisible) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
    }, [isLoginDialogOpen])

    useEffect(() => {
        if (utils.isEmpty(Object.values(userState).filter(el => el !== ''))) {
            const token = browserUtils.getCookie('access_token');
            if (token) {
                setUserState(jwtDecode(token))
            }
        }
    }, [userState])

    // TODO: Login 시에만 접근 가능하도록 라우팅
    return (
        <>
            <Navs />
            <div className='root__main'>
                <Switch>
                    <Route exact path='/' component={() => <Introduction />} />
                    <Route path='/search' component={() => <Search />} />
                    <Route path='/@:place_name' component={() => <KinderMain />} />
                    <Route path='/profile' component={() => <Profile />} />
                    <Route path='/test' component={() => <ImportTestData />} />
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
            <Footer />
        </>
    )
}