import React from 'react'

import '../styles/Dialog.scss'

export default function LoginDialog({ closeDialog }) {

    const renderDialogHeader = () => {

    }

    const renderLoginDialogBody = () => {
        return (
            <div>
                <div className=''></div>
                <div className=''>
                    <h1>로그인</h1>
                    
                </div>
            </div>
        )
    }

    return (
        <div className='dialog__background'>
            <dialog className='dialog'>
                {renderLoginDialogBody}
            </dialog>
        </div>
    )
}