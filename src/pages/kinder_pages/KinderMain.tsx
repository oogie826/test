import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import qs from 'qs';
import { useRecoilValue, useRecoilState } from 'recoil'
import { userStateAtom } from '../../recoils/global.ts'
import Rate from 'rc-rate'
import 'rc-rate/assets/index.css';
import UserApi from '../../../api/UserApi'
import KinderGartenApi from '../../../api/KinderGartenApi'

import SideNav from './SideNav.tsx'

import '../../styles/KinderMain.scss'

interface KinderMainProps {
    kindergartenName: string,
}

export default function KinderMain({
    kindergartenName,
}: KinderMainProps) {

    const history = useHistory();

    const userState = useRecoilValue(userStateAtom)

    const pathname = Object.keys(qs.parse(document.location.pathname));
    const [kinderInfoList, setKinderInfoList] = useState([]);
    const [review, setReview] = useState({
        place_name: history.location.state.place_name,
        address_name: history.location.state.address_name,
        comment: '',
        rating: 1,
        username: userState.username
    });

    const [loadedReviews, setLoadedReviews] = useState([]);

    useEffect(() => {
        console.log(kinderInfoList)
        let isMounted = true;
        if (!(kinderInfoList.length > 0 && isMounted)) {
            callApiKindergartenInfo().then(res => {
                if (isMounted) {
                    setKinderInfoList(res.data)
                    console.log(res)
                }
            })
        }
        return () => { isMounted = false; }
    }, [])

    useEffect(() => {
        if (kinderInfoList) {
            addReviews()
        }
    }, [kinderInfoList])

    const callApiKindergartenInfo = async () => {
        const params = {
            place_name: history.location.state.place_name,
            address_name: history.location.state.address_name
        };
        const response =  await KinderGartenApi.getKindergartenInfo(qs.stringify(params));
        setKinderInfoList(response.data);
        return response;
    };

    const enrollReview = async () => {
        await KinderGartenApi.postKindergartenReview(review).then(res => console.log(res));
    };

    const addReviews = () => {
        const arr =  kinderInfoList.reviews;
        setLoadedReviews(arr);
    };

    const renderReviews = () => {
        return loadedReviews.map((el, idx) => 
            <div key={idx}>
                <span>평점: {el.rating}</span>
                <span>리뷰: {el.comment}</span>
            </div>
        )
    }

    return (
        <div className='kinder-main__container'>
            <SideNav />
            <div>
                <h1>{history.location.state.place_name}</h1>
                <p>{history.location.state.address_name}</p>
                <div>
                    <h2>한 줄 평가</h2>
                    <p>인증된 사용자만 평가할 수 있어요</p>
                    <div>
                        <Rate defaultValue={1} onChange={(value) => setReview({...review, rating: value})}/>
                        <input className='review-input' type='text' onChange={(ev) => setReview({...review, comment: ev.target.value})} />
                        <button onClick={enrollReview}>등록</button>
                    </div>
                </div>
                <div className='reviews-container'>
                    <div className='review-item'>리뷰</div>
                    {loadedReviews ? renderReviews() : null}
                </div>
            </div>
        </div>
    )
}