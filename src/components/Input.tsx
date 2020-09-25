import React, { FunctionComponent, useRef } from 'react'

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

    const ref = useRef();

    return (
        <div className={`input__container ${className ? className : null}`}>
            <label 
                className={`input__label ${className ? className : null}`} 
                htmlFor={id}>
                    {labelTitle}
            </label>
            <div className={`input__wrapper ${disabled ? 'disabled' : null}`}>
                <input 
                    className={`input ${disabled ? 'disabled' : null}`} 
                    id={id} 
                    value={value}
                    type={type ? type : 'text'}
                    disabled={disabled}
                    readOnly={readOnly}
                />
            </div>
        </div>
    )
}

export default Input;