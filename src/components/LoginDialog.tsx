import React, { useState, useEffect } from 'react'

import { isEmpty } from '../../utils/utils.ts'
import { } from '../recoils/global.ts'
import UserApi from '../../api/UserApi'

import '../styles/LoginDialog.scss'

interface LoginDialogProps {
    closeDialog: () => void,
    isLoginDialogOpen: boolean
}

export default function LoginDialog({ 
    closeDialog, 
    isLoginDialogOpen }: LoginDialogProps) {

    const [loginVals, setLoginVals] = useState({
        username: '',
        password: ''
    });
    const [isVisible, setIsVisible] = useState(true);
    const [cssVisible, setCssVisible] = useState(true);

    useEffect(() => {
        console.log(loginVals)
    }, [loginVals])

    const hasEmptyValues = (data) => {
        for (let value of Object.values(data)) {
            if (isEmpty(value)) return true;
        }
        return false;
    }

    const callLoginApi = () => {
        if (!hasEmptyValues(loginVals)) {
            UserApi.login(loginVals).then(res => console.log(res));
        }
        return;
    }

    const callSignUpApi = () => {
        if (!hasEmptyValues(loginVals)) {
            UserApi.signUp(loginVals).then(res => console.log(res));
        }
        return;
    }

    // TODO: Reducer로 분리하기
    const onChangeHandler = (ev) => {
        const { name, value } = ev.target;
        setLoginVals({
            ...loginVals, [name]: value
        })
    };

    const toggleSingUpLogin = () => {
        const inputVals = document.getElementsByClassName('login__dialog_input');
        setCssVisible(!isVisible)
        setTimeout(() => {
            for (let values of Object.values(inputVals)) {
                values.value = '';
            }
            setIsVisible(!isVisible)
        }, 500);
    }

    return (
        <div className='login__dialog_background'>
            <div className={`login__dialog ${isLoginDialogOpen.renderCss ? 'toast' : 'untoast'}`}>
                <div className='left__block'>
                    <h1>환영합니다!</h1>
                </div>

                <div className='right__block'>
                    <div className='close__btn__wrapper'>
                        <div className={`back__btn ${isVisible ? 'hide' : 'show'}`} onClick={toggleSingUpLogin}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className='close__btn' onClick={closeDialog}>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    {isVisible ?
                        <LoginSignupForm
                            onChange={onChangeHandler}
                            onClick={callLoginApi}
                            className={`login__dialog_form-wrapper ${cssVisible ? 'show' : 'hide'}`}
                            title='로그인'
                        />
                        :
                        <LoginSignupForm
                            onChange={onChangeHandler}
                            onClick={callSignUpApi}
                            className={`login__dialog_form-wrapper ${cssVisible ? 'hide' : 'show'} `}
                            title='회원가입'
                        />
                    }
                    <div className='login__dialog_footer'>
                        <span className='login__dialog_signup-btn btn' onClick={toggleSingUpLogin}>
                            {isVisible ? '회원가입' : '로그인'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function LoginSignupForm({
    onChange,
    onClick,
    className,
    title,
}) {

    return (
        <>
            <div className={className}>
                <h3>{title}</h3>
                <input className='login__dialog_input' onChange={onChange} id='username' name='username' type="text" placeholder='Username' />
                <input className='login__dialog_input' onChange={onChange} id='password' name='password' type="password" placeholder='Password' />
                <button className='btn' onClick={onClick}>{title}</button>
            </div>
        </>
    )
}