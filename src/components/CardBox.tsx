import React from 'react'

import '../styles/CardBox.scss'

interface CardBoxProps {
    children: any
    title: string,
    footer: string | HTMLElement,
}

export default function CardBox({
    children,
    title,
    footer
}: CardBoxProps) {

    return (
        <div className={`cardbox__container`}>
            <div className={`cardbox__wrapper`}>
                <div className={`cardbox__header`}>
                    <h2 className='cardbox__title'>{title}</h2>
                </div>
                <div className={`cardbox__content`}>
                    {children}
                </div>
                <div className={`cardbox__footer`}>
                    <div className='btn__wrapper'>
                        <div className='btn cardbox__btn'>
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}