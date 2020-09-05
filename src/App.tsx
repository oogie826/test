import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Route, Switch } from 'react-router-dom'

// custom
import { isLoginAtom, loginDialogAtom } from './recoils/global.ts'
import * as browserUtils from '../utils/browserUtils.ts'

// pages
import Navs from './components/Navs.tsx'
import About from './pages/About.tsx'
import Main from './pages/Main.tsx'
import Search from './pages/Search.tsx'
import Dialog from './components/Dialog.tsx'

// styles
import './styles/App.scss'
import './styles/Commons.scss'
import './styles/Dialog.scss'

function renderIndex() {
    return (
        <>
            <Main />
            <About />
        </>
    )
}

export default function App() {

    document.title = 'Kinder Guards';

    const [loginDialogState, setLoginDialogState] = useRecoilState(loginDialogAtom);
    const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);

    const closeDialog = () => setLoginDialogState(false);

    useEffect(() => {
        browserUtils.scrollNavigation();
    }, [])

    useEffect(() => {
        if (loginDialogState) {
            browserUtils.createDialogBackground()
            document.body.style.overflow = 'hidden';
        }
        else {
            browserUtils.removeElementsByClassName('dialog__background')
            document.body.style.overflow = 'auto';
        }
    }, [loginDialogState])

    return (
        <>
            <Navs />
            <div className='root__panel'>
                {loginDialogState ? <Dialog closeDialog={closeDialog} dialogHeader='header' dialogBody={<div>good</div>} /> : ''}
                <Switch>
                    <Route exact path='/' render={renderIndex} />
                    <Route path='/search' component={() => <Search />} />
                </Switch>
            </div>
        </>
    )
}