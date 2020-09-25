import React, { FunctionComponent } from 'react'

interface ReadOnlyInputProps{
    className: string,
    id: string,
    value: string,
    type: string,
    labelTitle: string,
}

const ReadOnlyInput: FunctionComponent<ReadOnlyInputProps> = ({
    className, id, value, type, labelTitle
}) => {

    return (
        <>
            <label 
                className={`${className ? className : null}`} 
                htmlFor={id}>
                    {labelTitle}
            </label>
                <input 
                    className={`${className ? className : null}`} 
                    id={id} 
                    value={value} 
                    type={type ? type : 'text'}
                    disabled={true}
                    readOnly={true}
                />
        </>
    )
}

export default ReadOnlyInput;