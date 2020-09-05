import React from 'react'

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
        <dialog className='dialog'>
            <form className='dialog__header'>
                <div className='dialog__close--btn' onClick={closeDialog}>
                    <div className='dialog__cross--line'></div>
                    <div className='dialog__cross--line'></div>
                </div>
                {dialogHeader}
            </form>
            {dialogBody}
        </dialog>
    )
}