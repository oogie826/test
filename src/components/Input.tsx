import React, { FunctionComponent } from 'react'

import '../styles/Input.scss'

interface ReadOnlyInputProps{
    className: string,
    id: string,
    value: string,
    type: string,
    labelTitle: string,
    defaultValue: string,
    readOnly: boolean
}

const Input: FunctionComponent<ReadOnlyInputProps> = ({
    className, id, value, type, labelTitle, readOnly,defaultValue
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
                    defaultValue={defaultValue}
                    type={type ? type : 'text'}
                    disabled={readOnly ? true : false}
                    readOnly={readOnly ? true : false}
                />
        </div>
    )
}

export default Input;