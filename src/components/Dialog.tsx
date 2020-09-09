import React from 'react'

import '../styles/Dialog.scss'

interface Dialog {
    closeDialog: () => void,
    dialogHeader: string,
    dialogBody: HTMLElement
}

export default function Dialog({
    closeDialog,
    dialogHeader,
    dialogBody
}) {

    return (
        <div className='dialog__background'>
            <dialog className='dialog'>
                <div className='dialog__header'>
                    <div className='dialog__close--btn' onClick={closeDialog}>
                        <div className='dialog__cross--line'></div>
                        <div className='dialog__cross--line'></div>
                    </div>
                    {dialogHeader}
                </div>
                {dialogBody}
            </dialog>
        </div>
    )
}