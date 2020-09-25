import React, { FunctionComponent } from 'react'

import '../styles/Input.scss'

interface ReadOnlyInputProps{
    className: string,
    id: string,
    value: string,
    type: string,
    labelTitle: string,
    readOnly: boolean
    disabled: boolean
}

const Input: FunctionComponent<ReadOnlyInputProps> = ({
    className, id, value, type, labelTitle, readOnly, disabled
}) => {

    return (
        <div className={`input__wrapper ${className ? className : null}`}>
            <label 
                className={`input__label ${className ? className : null}`} 
                htmlFor={id}>
                    {labelTitle}
            </label>
                <input 
                    className={`input ${className ? className : null}`} 
                    id={id} 
                    value={value}
                    type={type ? type : 'text'}
                    disabled={disabled}
                    readOnly={readOnly}
                />
        </div>
    )
}

export default Input;