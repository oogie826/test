import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { userStateAtom } from '../recoils/global.ts'
import CardBox from '../components/CardBox.tsx'

export default function Profile() {

    const [userState, setUserState] = useRecoilState(userStateAtom);

    const renderUserInfo = () => {
        if (userState) {
            return (
                <>
                    <div>{userState.username}</div>
                    <div>{userState.auth}</div>
                </>
            )
        }
        return;
    }

    // TODO: 등록된 유치원 주소 가져오기 API

    return (
        <>
        <div className='profile__container'>
            <div className='profile__wrapper'>
                <CardBox title={'내 정보'} footerTitle={'수정'}>
                    <p>go</p>
                </CardBox>
            </div>
            {renderUserInfo()}
            {/* TODO: KinderMain 연결 */}
            <Link to='/test-kinder'>유치원 바로가기</Link>
        </div>
        </>
    )
}