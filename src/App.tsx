import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Route, Switch } from 'react-router-dom'

// custom
import { isLoginAtom, loginDialogAtom } from './recoils/global.ts'
import * as browserUtils from '../utils/browserUtils.ts'

// pages
import Introduction from './pages/Introduction.tsx'
import Search from './pages/Search.tsx'
import Navs from './components/Navs.tsx'
import LoginDialog from './components/LoginDialog.tsx'

// styles
import './styles/App.scss'
import './styles/Commons.scss'

function initApp() {
    console.log('App Init');
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

    const [loginDialogState, setLoginDialogState] = useRecoilState(loginDialogAtom);
    const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);

    const closeDialog = () => setLoginDialogState(false);

    useEffect(() => {
        browserUtils.scrollNavigation();
    }, [])

    useEffect(() => {
        console.log(loginDialogState)
        if (loginDialogState) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
    }, [loginDialogState])

    return (
        <>
            <Navs />
            <div className='root__main'>
                <Switch>
                    <Route exact path='/' component={() => <Introduction />} />
                    <Route path='/search' component={() => <Search />} />
                </Switch>
            </div>
            { loginDialogState ? <LoginDialog closeDialog={closeDialog} loginDialogState={loginDialogState} /> : ''}
        </>
    )
}