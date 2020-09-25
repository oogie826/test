import React from 'react'
import { Link, Switch, Route, useHistory } from 'react-router-dom'
import { useRecoilValue, useRecoilState } from 'recoil'

import { userStateAtom } from '../recoils/global.ts'
import KinderGartenApi from '../../api/KinderGartenApi'

import CardBox from '../components/CardBox.tsx'
import Enroll from './Enroll.tsx'

import '../styles/Profile.scss'

export default function Profile() {

    const history = useHistory();
    const userState: Obj = useRecoilValue(userStateAtom);

    const defaultDescription = {
        pKinderDesc: (<span>우리아이가 등록된 유치원 정보를 확인할 수 있어요.<br />지금 바로 등록해보세요!<br /></span>),
        tKinderDesc: (<span>유치원을 등록해서 원생 관리 및 학부모 소통을 이용할 수 있어요.</span>)
    };

    // TODO: 등록 된 유치원인지 확인하기

    const callApiKindergartenInfo = async () => {
        await KinderGartenApi.getKindergartenInfo().then(res => console.log(res));
    };

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
    };

    const renderKindergartenInfo = () => {
        const { pKinderDesc, tKinderDesc } = defaultDescription;
        return userState.auth === 'parent' ? pKinderDesc : tKinderDesc;
    };

    const renderProfileMain = () => {
        return (
            <>
                <div className='column'>
                    <CardBox title={'내 정보'} footer={'수정'}>
                        {renderUserInfo()}
                    </CardBox>
                </div>
                <div className='column'>
                    <CardBox title={'유치원 정보'} footer={<Link to='/profile/enroll'>등록하기</Link>}>
                        {renderKindergartenInfo()}
                    </CardBox>
                </div>
            </>
        )
    }

    return (
        <>
            <div className='profile__container'>
                <Switch>
                    <Route exact path='/profile' render={() => renderProfileMain()} />
                    <Route path='/profile/enroll' component={Enroll} />
                </Switch>
            </div>
        </>
    )
}