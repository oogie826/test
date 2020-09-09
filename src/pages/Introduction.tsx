import React from 'react'

import '../styles/Introduction.scss'

export default function Introduction() {
    return (
        <main>
            <section className='intro__section intro__main'>
                <article className='intro__article'>
                    <div className='intro__desc'>
                        <h1>더 나은 유치원<br/>킨더가드</h1>
                    </div>
                </article>
            </section>
            <section className='intro__section'>
                <article className='intro__article'>
                    <div className='intro__desc'>
                        <h1>교사가 평가하는<br />아이의 하루</h1>
                        <span>우리아이가 유치원에서</span>
                        <span>하루를 어떻게 보내고 발달과정은 어떤지</span>
                        <span>교사가 직접 평가한 내용을 확인 할 수 있어요.</span>
                    </div>
                </article>
            </section>
            <section className='intro__section'>
                <article className='intro__article'>
                    <div className='intro__desc'>
                        <h1>학부모 참여형 서비스</h1>
                        <span>학부모가 직접 평가하고 공유하며</span>
                        <span>아이들에게 좋은 환경을 가진 유치원을</span>
                        <span>손쉽게 확인할 수 있어요.</span>
                    </div>
                </article>
            </section>
        </main>
    )
}