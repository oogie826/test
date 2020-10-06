import React from 'react'
import { useHistory } from 'react-router-dom'
import { hash } from '../../../utils/utils.ts'

import '../../styles/SideNav.scss'

export default function SideNav() {

    const history = useHistory();
    const pathState = history.location.state;
    console.log(history)

    const linkTo = (placeName, addressName, path?) => {
        history.push(`/@${(placeName).replace(/\s/g, '')}${hash(addressName)}${path ? '/'+path : ''}`, { place_name: placeName, address_name: addressName });
        return;
    };

    return (
        <div className='side-nav-container'>
            <ul>
                <li onClick={() => linkTo(pathState.place_name, pathState.address_name)}>메인화면</li>
                <li onClick={() => linkTo(pathState.place_name, pathState.address_name, 'intro')}>유치원 소개</li>
                <li onClick={() => linkTo(pathState.place_name, pathState.address_name, 'activity')}>유치원 활동</li>
                <li onClick={() => linkTo(pathState.place_name, pathState.address_name, 'notification')}>소식 알림</li>
                <li onClick={() => linkTo(pathState.place_name, pathState.address_name, 'meal')}>주간 급식</li>
            </ul>
        </div>
    );
}