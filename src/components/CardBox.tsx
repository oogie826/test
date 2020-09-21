import React from 'react'

import '../styles/CardBox.scss'

interface CardBoxProps {
    children: any
    title: string,
    footerTitle: string,
}

export default function CardBox({
    children,
    title,
    footerTitle
}: CardBoxProps) {

    return (
        <div className={`cardbox__container`}>
            <div className={`cardbox__wrapper`}>
                <div className={`cardbox__header`}>
                    <h1 className='cardbox__title'>{title}</h1>
                </div>
                <div className={`cardbox__content`}>
                    {children}
                </div>
                <div className={`cardbox__footer`}>
                    {footerTitle}
                </div>
            </div>
        </div>
    )
}