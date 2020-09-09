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
import Dialog from './components/Dialog.tsx'

// styles
import './styles/App.scss'
import './styles/Commons.scss'

function initApp() {
    document.title = 'Kinder Guard';
}

export default function App() {

    initApp();

    const [loginDialogState, setLoginDialogState] = useRecoilState(loginDialogAtom);
    const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);

    const closeDialog = () => setLoginDialogState(false);

    useEffect(() => {
        browserUtils.scrollNavigation();
    }, [])

    useEffect(() => {
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
            <div className='toast'>
                {loginDialogState ? <Dialog closeDialog={closeDialog} dialogHeader='header' dialogBody={<div>good</div>} /> : ''}
            </div>
        </>
    )
}