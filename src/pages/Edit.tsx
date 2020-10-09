import React, { useEffect, useState } from 'react'
import UserApi from '../../api/UserApi';

const initForm = {
    username: '',
    child_name: '',
    place_name: ''
};

export default function Edit() {

    const [editForm, setEditForm] = useState(initForm);

    const inputHandler = (ev) => {
        ev.preventDefault();
        const {id, value} = ev.target;
        setEditForm({...editForm, [id]: value});
        return;
    };

    useEffect(() => {
        console.log(editForm)
    }, [editForm]);

    const callApiEditProfile = async () => {
        await UserApi.enrollUserChild(editForm).then(res => console.log(res));
        return;
    };

    return (
        <>
            <div>
                <input type="text" onChange={inputHandler} id='username' name='username' />
                <input type="text" onChange={inputHandler} id='place_name' name='place_name' />
                <input type="text" onChange={inputHandler} id='child_name' name='child_name' />
                <button onClick={callApiEditProfile}>Confirm</button>
            </div>
        </>
    );
}