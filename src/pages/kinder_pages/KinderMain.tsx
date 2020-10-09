import React, { useEffect, useState } from 'react'
import { useHistory, Route, Switch } from 'react-router-dom'
import qs from 'qs';
import { useRecoilValue, useRecoilState } from 'recoil'
import { userStateAtom } from '../../recoils/global.ts'
import { hash } from '../../../utils/utils.ts'

// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Rate from 'rc-rate'
import 'rc-rate/assets/index.css';

import UserApi from '../../../api/UserApi'
import KinderGartenApi from '../../../api/KinderGartenApi'

import SideNav from './SideNav.tsx'
import Intro from './Intro.tsx';

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
    }}));
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
    // Materail-UI
    const classes = useStyles();

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
        if (!(kinderInfoList.length > 0) && isMounted) {
            if (isMounted) {
                callApiKindergartenInfo().then(res => {
                    setKinderInfoList(res.data)
                    console.log(res)
                })
            }
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
        globalThis.location.reload();
    };

    const addReviews = () => {
        const arr = kinderInfoList.reviews;
        setLoadedReviews(arr);
    };

    const renderReviews = () => {
        return loadedReviews.map((el, idx) =>
            <div key={idx} className='kinder-review-wrapper'>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Rate disabled={true} defaultValue={el.rating} />
                        <Typography className={classes.heading}>{el.username}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {el.comment}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    }

    return (
        <div className='kinder-main-container'>
            <SideNav />
            <Switch>
                <Route exact path={thisPath} render={() =>
                    <div className='kinder-main'>
                        <div className='kinder-main-wrapper'>
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
                                    <TextField
                                        label="Multiline"
                                        multiline
                                        rows={4}
                                        onChange={(ev) => setReview({ ...review, comment: ev.target.value })}
                                        variant="outlined"
                                    />
                                    <Button onClick={enrollReview} variant="contained">등록</Button>
                                </div>
                            </div>
                            <div className='kinder-review-container'>
                                <div className='kinder-review-title'>리뷰</div>
                                {loadedReviews ? renderReviews() : null}
                            </div>
                        </div>
                    </div>} />
                <Route exact path={`${thisPath}/intro`} component={() => <Intro state={kinderInfoList} />} />
            </Switch>
        </div>
    )
}