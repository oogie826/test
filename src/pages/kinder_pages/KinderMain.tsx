import React, { useEffect, useState } from 'react'
import { useHistory, Route, Switch } from 'react-router-dom'
import qs from 'qs';
import { useRecoilValue, useRecoilState } from 'recoil'
import { userStateAtom } from '../../recoils/global.ts'
import { hash } from '../../../utils/utils.ts'

import Rate from 'rc-rate'
import 'rc-rate/assets/index.css';

import UserApi from '../../../api/UserApi'
import KinderGartenApi from '../../../api/KinderGartenApi'

import SideNav from './SideNav.tsx'
import Intro from './Intro.tsx';

import '../../styles/KinderMain.scss'

interface KinderMainProps {
    kindergartenName: string,
}

function renderMap(title, address) {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new globalThis.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };
    if (!mapContainer) return;

    // 지도를 생성합니다    
    var map = new globalThis.kakao.maps.Map(mapContainer, mapOption);

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new globalThis.kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(address, function (result, status) {

        // 정상적으로 검색이 완료됐으면 
        if (status === globalThis.kakao.maps.services.Status.OK) {

            var coords = new globalThis.kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new globalThis.kakao.maps.Marker({
                map: map,
                position: coords
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new globalThis.kakao.maps.InfoWindow({
                content: title
            });
            infowindow.open(map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
        }
    });
}

export default function KinderMain({
    kindergartenName,
}: KinderMainProps) {

    const history = useHistory();
    const thisPath = `/@${(history.location.state.place_name).replace(/\s/g, '')}${hash(history.location.state.address_name)}`;
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
        renderMap(history.location.state.place_name, history.location.state.address_name)
    })

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
        const response = await KinderGartenApi.getKindergartenInfo(qs.stringify(params));
        setKinderInfoList(response.data);
        return response;
    };

    const enrollReview = async () => {
        await KinderGartenApi.postKindergartenReview(review).then(res => console.log(res));
    };

    const addReviews = () => {
        const arr = kinderInfoList.reviews;
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
            <Switch>
                <Route exact path={thisPath} render={() =>
                    <div>
                        <div>
                            <h1>{history.location.state.place_name}</h1>
                            <p>{history.location.state.address_name}</p>
                            <div id='map' style={{ height: '300px', width: '450px' }}></div>
                        </div>
                        <div>
                            <h2>한 줄 평가</h2>
                            <p>인증된 사용자만 평가할 수 있어요</p>
                            <div>
                                <Rate defaultValue={1} onChange={(value) => setReview({ ...review, rating: value })} />
                                <input className='review-input' type='text' onChange={(ev) => setReview({ ...review, comment: ev.target.value })} />
                                <button onClick={enrollReview}>등록</button>
                            </div>
                        </div>
                        <div className='reviews-container'>
                            <div className='review-item'>리뷰</div>
                            {loadedReviews ? renderReviews() : null}
                        </div>
                    </div>} />
                <Route exact path={`${thisPath}/intro`} component={() => <Intro state={kinderInfoList} />} />
            </Switch>
        </div>
    )
}