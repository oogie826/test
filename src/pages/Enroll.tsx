import React from 'react'

export default function Enroll() {

    const callProveKindergarten = () => {
        // TODO: 사업자 번호를 통한 사업자 확인하는 API
    };

    return (
        <div>
            <form>
            사업자등록번호
            <input type='text' />
            <button className='btn'>등록하기</button>
            </form>
        </div>
    )
}