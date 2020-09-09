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
                    <div onClick={closeDialog}>Close</div>
                    <div className='ld-header'>
                        <h3>로그인</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}