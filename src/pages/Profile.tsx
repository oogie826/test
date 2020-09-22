import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { userStateAtom } from '../recoils/global.ts'
import CardBox from '../components/CardBox.tsx'

import '../styles/Profile.scss'

export default function Profile() {

    const [userState, setUserState] = useRecoilState(userStateAtom);

    const renderUserInfo = () => {
        if (userState) {
            return (
                <>
                    <dl className='data-sheet'>
                        <dt>아이디</dt>
                        <dd>{userState.username}</dd>
                        <dt>소속</dt>
                        <dd>{userState.auth}</dd>
                    </dl>
                </>
            )
        }
        return;
    }

    // TODO: 등록된 유치원 주소 가져오기 API

    return (
        <>
            <div className='profile__container'>
                    <div className='column'>
                        <CardBox title={'내 정보'} footer={'수정'}>
                            {renderUserInfo()}
                        </CardBox>
                    </div>
                    <div className='column'>
                        <CardBox title={'유치원 정보'} footer={<Link to='/test-kinder'>바로가기</Link>}>
                            우리아이가 등록된 유치원 정보를 확인할 수 있어요.<br />
                            지금 바로 등록해보세요!<br />
                        </CardBox>
                    </div>
            </div>
        </>
    )
}