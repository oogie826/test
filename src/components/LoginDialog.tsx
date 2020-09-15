import React, { useState, useEffect } from 'react'

import { isEmpty } from '../../utils/utils.ts'
import {} from '../recoils/global.ts'
import UserApi from '../../api/UserApi'

import '../styles/Dialog.scss'
import '../styles/LoginDialog.scss'

export default function LoginDialog({ closeDialog, loginDialogState }) {

    const [loginVals, setLoginVals] = useState({
        id: '',
        pwd: ''
    });

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
    }

    return (
        <div className={`${loginDialogState ? 'dialog__background' : ''}`}>
            <div className={`login__dialog ${loginDialogState ? 'toast' : 'untoast'}`}>
                <div className='left__block'>
                {/* 이미지 */}
                </div>

                <div className='right__block'>
                    <div className='close__btn__wrapper'>
                        <div className='close__btn' onClick={closeDialog}>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    {/* Login Box */}
                    <div className='login__box'>
                        <h3>로그인</h3>
                        <span>이메일로 로그인 하기</span>
                        <input onChange={onChangeHandler} id='id' name='id' type="text" />
                        <input onChange={onChangeHandler} id='pwd' name='pwd' type="password" />
                        <button onClick={callLoginApi}>로그인</button>
                    </div>
                    {/* SignUp Box */}
                    <div className='signup__box'>
                    <h3>회원가입</h3>
                        <span>회원가입</span>
                        <input onChange={onChangeHandler} id='id' name='id' type="text" />
                        <input onChange={onChangeHandler} id='pwd' name='pwd' type="password" />
                        <button onClick={callSignUpApi}>로그인</button>
                    </div>
                    <div>
                        <span>회원가입하기</span>
                    </div>
                </div>
            </div>
        </div>
    )
}