import React, { useEffect, useState } from 'react'
import { useHistory, } from 'react-router-dom'
import qs from 'qs';
import { useRecoilValue } from 'recoil'
import { userStateAtom } from '../../recoils/global.ts'
import { hash } from '../../../utils/utils.ts'

// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Rate from 'rc-rate'
import 'rc-rate/assets/index.css';

import KinderGartenApi from '../../../api/KinderGartenApi'

import '../../styles/KinderMain.scss'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    }
}));
interface KinderMainProps {
    kindergartenName: string,
}

function renderMap(title, address) {
    const mapContainer = document.getElementById('map'),
        mapOption = {
            center: new globalThis.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };
    if (!mapContainer) return;
    const map = new globalThis.kakao.maps.Map(mapContainer, mapOption);
    const geocoder = new globalThis.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, function (result, status) {
        if (status === globalThis.kakao.maps.services.Status.OK) {
            const coords = new globalThis.kakao.maps.LatLng(result[0].y, result[0].x);
            const marker = new globalThis.kakao.maps.Marker({
                map: map,
                position: coords
            });
            const infowindow = new globalThis.kakao.maps.InfoWindow({
                content: title
            });
            infowindow.open(map, marker);
            map.setCenter(coords);
        }
    });
}

export default function KinderMain({
    kindergartenName,
}: KinderMainProps) {

    const classes = useStyles();
    const history = useHistory<any>();
    const thisPath = `/@${(history.location.state.place_name).replace(/\s/g, '')}${hash(history.location.state.address_name)}`;
    const userState = useRecoilValue<Record<string, any>>(userStateAtom)

    const [kinderInfoList, setKinderInfoList] = useState([]);
    const [review, setReview] = useState({
        place_name: history.location.state.place_name,
        address_name: history.location.state.address_name,
        comment: '',
        rating: 1,
        username: userState.username
    });

    const [loadedReviews, setLoadedReviews] = useState([]);
    const [govInfos, setGovInfos] = useState();

    useEffect(() => {
        let isMounted = true;
        console.log('call')
        renderMap(history.location.state.place_name, history.location.state.address_name);
        callApiKindergartenInfo().then(res => {
            if (isMounted) {
                console.log(res)
                setKinderInfoList(res.data)
                setGovInfos(res.data.gov_info)
                setLoadedReviews(res.data.kinder_info.reviews)
            }
        });
        return () => { isMounted = false }
    }, []);

    const callApiKindergartenInfo = async () => {
        const params = {
            place_name: history.location.state.place_name,
            address_name: history.location.state.address_name,
            sido: toFullSidoName((history.location.state.address_name).split(' ')[0])
        };
        return await KinderGartenApi.getKindergartenInfo(qs.stringify(params));
    };

    const enrollReview = async () => {
        await KinderGartenApi.postKindergartenReview(review).then(res => console.log(res));
        globalThis.location.reload();
    };

    const renderReviews = () => {
        return loadedReviews.map((el, idx) =>
            <ListItem key={idx}>
                <ListItemText primary={el.username} secondary={el.comment} />
                <Rate style={{ fontSize: '10px' }} defaultValue={el.rating} disabled />
            </ListItem>
        )
    };

    const renderGovInfo = () => {
        return (
            <div>
                우편번호: {govInfos['우편번호']}
                현원: {govInfos['현원']}
                전화번호: {govInfos['전화번호']}
                놀이터수: {govInfos['놀이터수']}
                보육실수: {govInfos['보육실수']}
                보육실면적: {govInfos['보육실면적']}
                어린이집유형: {govInfos['어린이집유형']}
                통학차량운영여부: {govInfos['통학차량운영여부']}
                운영현황: {govInfos['운영현황']}
                보육교직원수: {govInfos['보육교직원수']}
            </div>
        )
    }

    return (
        <div className='kinder-main-container'>
            <div className='kinder-main'>
                <div className='kinder-main-wrapper'>
                    <div>
                        <h1>{history.location.state.place_name}</h1>
                        <p>{history.location.state.address_name}</p>
                        <div id='map' style={{ height: '300px', width: '450px' }}></div>
                    </div>
                    {govInfos ? renderGovInfo() : null}
                    <div>
                        <h2>리뷰</h2>
                        <div className='review-input'>
                            <div className='review-input-container'>
                                <TextField
                                    style={{ width: '720px' }}
                                    label="Comment"
                                    multiline
                                    rows={2}
                                    onChange={(ev) => setReview({ ...review, comment: ev.target.value })}
                                />
                                <div className='side-btn-wrapper'>
                                    <Rate defaultValue={1} onChange={(value) => setReview({ ...review, rating: value })} />
                                    <Button onClick={enrollReview} variant="contained">등록</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='kinder-review-container'>
                        <List>
                            {loadedReviews ? renderReviews() : null}
                        </List>
                    </div>
                </div>
            </div>
        </div>
    )
}

function toFullSidoName(sido: string) {
    const fullSido = {
        '서울': '서울특별시',
        '경기': '경기도',
        '부산': '부산광역시',
        '인천': '인천광역시',
        '강원': '강원도',
        '충북': '충청북도',
        '충남': '충청남도',
        '경북': '경상북도',
        '경남': '경상남도',
        '대구': '대구광역시',
        '대전': '대전광역시',
        '전북': ' 전라북도',
        '전남': '전라남도',
        '광주': '광주광역시',
        '울산': '울산광역시',
        '제주특별자치도': '제주도',
        '세종특별자치시': '세종특별시',
    };
    return fullSido[sido];
}