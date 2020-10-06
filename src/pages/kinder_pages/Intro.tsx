import React, { useState } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { userStateAtom } from '../../recoils/global.ts'


function edit(id) {
    return (
        <>
            <input type='text' id={id} name={id} />
            <button>수정완료</button>
        </>
    )
}

export default function Intro({ state }) {

    const userState = useRecoilValue(userStateAtom);
    const [flag, setFlag] = useState(false);
    console.log(state)

    const renderIntro = () => {

    };

    return (
        <div>
            {userState.auth === 'guest' ? (flag ? <div onClick={() => setFlag(false)}>수정완료</div> : <div onClick={() => setFlag(true)}>수정하기</div>) : null}
            <h1>유치원 소개</h1>
            {flag ? edit('kinder') : <div>소개내용</div>}
            <h1>선생님 소개</h1>
            {flag ? edit('teacher') : <div>소개내용</div>}
        </div>
    )
}