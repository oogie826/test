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
        id: '',
        pwd: ''
    });
    const [isVisible, setIsVisible] = useState(true);
    const [cssVisible, setCssVisible] = useState(true);

    useEffect(() => {
        console.log(loginVals)
    }, [loginVals])

    // TODO: have to server connection
    const callLoginApi = () => {
        if (!isEmpty(loginVals.id) && !isEmpty(loginVals.pwd)) {
            const response = UserApi.Login(loginVals);
            console.log(response);
        }
        return;
    }

    const callSignUpApi = () => {
        if (!isEmpty(loginVals.id) && !isEmpty(loginVals.pwd)) {
            const response = UserApi.SignUp(loginVals);
            console.log(response);
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

    const toSignup = () => {
        setCssVisible(false)
        setTimeout(() => {
            setIsVisible(false)
        }, 500);
    };

    const toLogin = () => {
        setCssVisible(true)
        setTimeout(() => {
            setIsVisible(true)
        }, 500);
    };

    return (
        <div className='login__dialog_background'>
            <div className={`login__dialog ${isLoginDialogOpen.renderCss ? 'toast' : 'untoast'}`}>
                <div className='left__block'>
                    <h1>환영합니다!</h1>
                </div>

                <div className='right__block'>
                    <div className='close__btn__wrapper'>
                        <div className={`back__btn ${isVisible ? 'hide' : 'show'}`} onClick={toLogin}>
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
                            id='id'
                            pwd='pwd'
                            title='로그인'
                        />
                        :
                        <LoginSignupForm
                            onChange={onChangeHandler}
                            onClick={callSignUpApi}
                            className={`login__dialog_form-wrapper ${cssVisible ? 'hide' : 'show'} `}
                            id='id'
                            pwd='pwd'
                            title='회원가입'
                        />
                    }
                    <div className='login__dialog_footer'>
                        <span className='login__dialog_signup-btn btn' onClick={toSignup}>회원가입하기</span>
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
    id,
    pwd,
    title,
}) {

    return (
        <>
            <div className={className}>
                <h3>{title}</h3>
                <input className='login__dialog_input' onChange={onChange} id={id} name={id} type="text" placeholder='YOUR@EMAIL.COM' />
                <input className='login__dialog_input' onChange={onChange} id={pwd} name={pwd} type="password" placeholder='PASSWORD' />
                <button className='btn' onClick={onClick}>{title}</button>
            </div>
        </>
    )
}