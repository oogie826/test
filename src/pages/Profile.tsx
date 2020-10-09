import React, { useEffect, useState } from 'react'
import { Link, Switch, Route, useHistory } from 'react-router-dom'
import { useRecoilValue, useRecoilState } from 'recoil'
import * as qs from 'qs'

import { userStateAtom } from '../recoils/global.ts'
import KinderGartenApi from '../../api/KinderGartenApi'
import { hash } from '../../utils/utils.ts'

import CardBox from '../components/CardBox.tsx'
import Enroll from './Enroll.tsx'
import Edit from './Edit.tsx'
import DescriptionList from '../components/DescriptionList.tsx'

import '../styles/Profile.scss'

export default function Profile() {

    const history = useHistory();
    const userState: Obj = useRecoilValue(userStateAtom);
    const [kinder, setKinder] = useState([]);

    const defaultDescription = {
        pKinderDesc: (<span>우리아이가 등록된 유치원 정보를 확인할 수 있어요.<br />지금 바로 등록해보세요!<br /></span>),
        tKinderDesc: (<span>유치원을 등록해서 원생 관리 및 학부모 소통을 이용할 수 있어요.</span>)
    };

    // TODO: 등록 된 유치원인지 확인하기
    useEffect(() => {
        let isMounted = true;
        if (!(kinder.length > 0)) {
            if (isMounted) {
                callApiKindergartenInfo();
            }
        }

        return () => { isMounted = false; }
    })

    const callApiKindergartenInfo = async () => {
        const params = {
            username: userState.username
        };
        const response = await KinderGartenApi.getKindergartenInfoByUsername(qs.stringify(params));
        setKinder(response.data);
    };

    const linkTo = (placeName, addressName) => {
        history.push(`/@${(placeName).replace(/\s/g, '')}${hash(addressName)}`, { place_name: placeName, address_name: addressName });
        return;
    };

    const renderUserInfo = () => {
        if (userState) {
            return (
                <>
                    <DescriptionList title='아이디'>
                        {userState.username}
                    </DescriptionList>
                    <DescriptionList title='권한'>
                        {userState.auth}
                    </DescriptionList>
                    <DescriptionList title='자녀'>
                        {userState.child_name}
                    </DescriptionList>
                    <DescriptionList title='등록 유치원'>
                        {userState.place_name}
                    </DescriptionList>
                </>
            )
        }
        return;
    };

    const renderKindergartenInfo = () => {
        const { pKinderDesc, tKinderDesc } = defaultDescription;
        if (kinder) {
            return kinder.map((el, idx) =>
                <div className='item' key={idx} onClick={() => linkTo(el.place_name, el.address_name)}>
                    {el.place_name}
                </div>
            )
        }
        else {
            return userState.auth === 'parent' ? pKinderDesc : tKinderDesc;
        }
    };

    const renderProfileMain = () => {
        return (
            <>
                <div className='column'>
                    <CardBox title={'내 정보'} footer={<Link to='/profile/edit'>수정하기</Link>}>
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
                    <Route path='/profile/edit' component={Edit} />
                </Switch>
            </div>
        </>
    )
}