import React from 'react'
import { Link } from 'react-router-dom'

export default function Profile() {

    // TODO: 등록된 유치원 주소 가져오기 API

    return (
        <>
            {/* TODO: 이 페이지에 회원 정보 노출 */}
            <div>회원정보</div>
            {/* TODO: KinderMain 연결 */}
            <Link to='/test-kinder'>유치원 바로가기</Link>
        </>
    )
}