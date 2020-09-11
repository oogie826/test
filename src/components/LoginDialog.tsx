import React from 'react'

import '../styles/Dialog.scss'
import '../styles/LoginDialog.scss'

export default function LoginDialog({ closeDialog, loginDialogState }) {

    return (
        <div className={`${loginDialogState ? 'dialog__background' : ''}`}>
            <div className={`login__dialog ${loginDialogState ? 'toast' : 'untoast'}`}>
                <div className='left__block'>

                </div>
                <div className='right__block'>
                    <div className='close__btn__wrapper'>
                        <div className='close__btn' onClick={closeDialog}>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className='login__box'>
                        <h3>로그인</h3>
                        <span>이메일로 로그인 하기</span>
                        <input type="text" />
                        <button>로그인</button>
                    </div>
                </div>
            </div>
        </div>
    )
}