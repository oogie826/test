import React, {useEffect, useState} from 'react'
import TestApi from '../../api/TestApi'
export default function ImportTestData() {

    const [val, setVal] = useState('');

    const sendTestData = () => {
        TestApi.InputTestData({val: val}).then(res => console.table(res));
    }

    const onChangeHandler = (ev) => {
        const {value} = ev.target;
        setVal(value);
        console.log(val)
    }

    return (
        <>
            <input type='text' id='name' name='name' onChange={onChangeHandler}/>
            <input type='text' id='address' name='address' onChange={onChangeHandler}/>
            <button onClick={sendTestData}>Confirm</button>
        </>
    )
}