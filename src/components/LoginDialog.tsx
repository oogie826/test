import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import jwtDecode from 'jwt-decode'

import { isEmpty } from '../../utils/utils.ts'
import { setCookie, getCookie } from '../../utils/browserUtils.ts'
import { userStateAtom } from '../recoils/global.ts'
import UserApi from '../../api/UserApi'

import '../styles/LoginDialog.scss'
import loginTitle from '../styles/assets/login_title.svg'

interface LoginDialogProps {
    closeDialog: () => void,
    isLoginDialogOpen: isLoginObjProps,
    setIsLoginDialogOpen: () => void
}

interface isLoginObjProps {
    [key: string]: boolean
}

export default function LoginDialog({
    closeDialog,
    isLoginDialogOpen,
    setIsLoginDialogOpen }: LoginDialogProps) {

    const [loginVals, setLoginVals] = useState({
        username: '',
        password: ''
    });

    const { isComponentVisible, isStyleVisible } = isLoginDialogOpen
    const [toggle, setToggle] = useState({comp: true, style: true});
    const [userState, setUserState] = useRecoilState(userStateAtom);

    useEffect(() => {
        console.log(loginVals)
    }, [loginVals])

    useEffect(() => {
        console.log(isLoginDialogOpen)
    })

    const hasEmptyValues = (data) => {
        for (let value of Object.values(data)) {
            if (isEmpty(value)) return true;
        }
        return false;
    }

    const callLoginApi = async () => {
        if (!hasEmptyValues(loginVals)) {
            closeDialog();
            await UserApi.login(loginVals).then(res => {
                if (res.status === 200) {
                    setCookie('access_token', res.data.access_token);
                    setUserState(jwtDecode(res.data.access_token));
                }
            });
        }
        return;
    }

    const callSignUpApi = async () => {
        if (!hasEmptyValues(loginVals)) {
            await UserApi.signUp(loginVals).then(res => console.log(res));
            setUserState(jwtDecode(getCookie('access_token')));
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
        setToggle({comp: toggle.comp, style: !toggle.style});
        setTimeout(() => {
            for (let values of Object.values(inputVals)) {
                values.value = '';
            }
            setToggle({comp: !toggle.comp, style: !toggle.style});
        }, 500);
    }

    return (
        <div className='login__dialog_background'>
            <div className={`login__dialog ${isStyleVisible ? 'toast' : 'untoast'}`}>
                <div className='left__block'>
                    <h1>환영합니다!</h1>
                    <img src={loginTitle} width={200} height={200}/>
                </div>

                <div className='right__block'>
                    <div className='close__btn__wrapper'>
                        <div className={`back__btn ${toggle.comp ? 'hide' : 'show'}`} onClick={toggleSingUpLogin}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className='close__btn' onClick={closeDialog}>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    {toggle.comp ?
                        <LoginSignupForm
                            onChange={onChangeHandler}
                            onClick={callLoginApi}
                            className={`login__dialog_form-wrapper ${toggle.style ? 'show' : 'hide'}`}
                            title='로그인'
                        />
                        :
                        <LoginSignupForm
                            onChange={onChangeHandler}
                            onClick={callSignUpApi}
                            className={`login__dialog_form-wrapper ${toggle.style ? 'hide' : 'show'} `}
                            title='회원가입'
                        />
                    }
                    <div className='login__dialog_footer'>
                        <span className='login__dialog_signup-btn btn' onClick={toggleSingUpLogin}>
                            {toggle.comp ? '회원가입' : '로그인'}
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