import React, { useEffect, useState } from 'react'
import querystring from 'querystring'

import UserApi from '../../../api/UserApi'

interface KinderMainProps {
    kindergartenName: string,
}

export default function KinderMain({
    kindergartenName,
}: KinderMainProps) {

    const [kinderInfoList, setKinderInfoList] = useState([]);

    useEffect(() => {
        let isMounted = true;
        if (kinderInfoList.length > 0) {
            callApiGetKinderInfo().then(res => {
                if (isMounted) {
                    setKinderInfoList(res.data)
                }
            })
        }

        return () => { isMounted = false; }
    })

    async function callApiGetKinderInfo() {
        return await UserApi.GetKindergartenInfo();
    }

    const pathname = Object.keys(querystring.parse(document.location.pathname));



    const renderDailyWorkoutList = () => {
        return;
    }

    return (
        <>
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
        </>
    )

}