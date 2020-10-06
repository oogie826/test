import React from 'react'

import '../../styles/SideNav.scss'

export default function SideNav() {
    return (
        <div className='side-nav-container'>
            <ul>
                <li onClick={() => alert('good')}>유치원 소개</li>
                <li onClick={() => alert('good')}>유치원 활동</li>
                <li onClick={() => alert('good')}>소식 알림</li>
                <li onClick={() => alert('good')}>주간 급식</li>
            </ul>
        </div>
    );
}