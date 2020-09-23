import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import querystring from 'querystring'

import UserApi from '../../../api/UserApi'
import KinderGartenApi from '../../../api/KinderGartenApi'

import '../../styles/KinderMain.scss'

interface KinderMainProps {
    kindergartenName: string,
}

export default function KinderMain({
    kindergartenName,
}: KinderMainProps) {

    const history = useHistory();

    console.log(history)
    const pathname = Object.keys(querystring.parse(document.location.pathname));
    const [kinderInfoList, setKinderInfoList] = useState([]);

    useEffect(() => {
        console.log(kinderInfoList)
        let isMounted = true;
        if (!(kinderInfoList.length > 0 && isMounted)) {
            callApiKindergartenInfo().then(res => {
                if (isMounted) {
                    console.log(res)
                    //setKinderInfoList(res.data)
                }
            })
        }

        return () => { isMounted = false; }
    }, [])

    const callApiKindergartenInfo = async () => {
        const data = {
            kindergarten_name: history.location.state.place_name,
            address_name: history.location.state.address_name
        };
        return await KinderGartenApi.getKindergartenInfo(data);
    };

    return (
        <div className='kinder-main__container'>
            {pathname}
            <div>{kindergartenName ? kindergartenName : 'dev'}</div>
            <div>
                <h1>오늘 학원 일과</h1>
                <div>리스트</div>
            </div>
            <div>
                <h1>주간 급식</h1>
            </div>
            <div>
                <a>아이 발달 과정 평가 현황</a>
            </div>
        </div>
    )

}