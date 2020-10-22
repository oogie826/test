import React, { useEffect, useState } from 'react'
import UserApi from '../../api/UserApi';
import TextField from '@material-ui/core/TextField';

const initForm = {
    username: '',
    child_name: '',
    place_name: ''
};

import '../styles/Edit.scss'

export default function Edit() {

    const [editForm, setEditForm] = useState(initForm);

    const inputHandler = (ev) => {
        ev.preventDefault();
        const { id, value } = ev.target;
        setEditForm({ ...editForm, [id]: value });
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
            <div className='edit-container'>
                <TextField onChange={inputHandler} id="username" name="username" label="Username" />
                <TextField onChange={inputHandler} id="place_name" name="place_name" label="Place Name" />
                <TextField onChange={inputHandler} id="child_name" name="child_name" label="Child Name" />
                <button className='confirm-btn' onClick={callApiEditProfile}>Confirm</button>
            </div>
        </>
    );
}