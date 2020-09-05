import React, { useEffect } from 'react'

import '../styles/About.scss'

export default function About() {
    
    return (
        <section className='about__section'>
            <article className='about__article'>
                <div className='about__desc'>
                    <h1>Kinder Guards는 무엇인가요?</h1>
                    <span>해 마다 증가하는 유치원 아동학대를 없애고자</span>
                    <span>학부모 참여형 서비스입니다.</span>
                    <span>학부모가 직접 평가하고 공유하며</span>
                    <span>누구나 원하는 유치원을 확인하고 아이들에게</span>
                    <span>좋은 환경인지 손쉽게 확인할 수 있습니다.</span>
                </div>
            </article>
        </section>
    )
}