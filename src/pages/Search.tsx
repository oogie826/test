import React, {useEffect, useRef, useState} from 'react'
import SVG from '../components/SVG.tsx'

import '../styles/Search.scss'

export default function Search() {

    const ref = useRef<HTMLInputElement>(null);
    const [isFocus, setIsFocus] = useState(false);

    const getFocus = (ev) => {
        ref.current?.focus()
    }

    return (
        <section className='search-section'>
            <div className={`search-box ${isFocus ? 'focused' : 'unfocused'}`} onClick={getFocus}>
                <SVG className='svg-icon' name='search_icon' width={30} height={30} />
                <input ref={ref} className='search-input' type='text' 
                    onFocus={() => setIsFocus(true)} 
                    onBlur={() => setIsFocus(false)} 
                    placeholder='검색어를 입력하세요'/>
            </div>
        </section>
    )
}