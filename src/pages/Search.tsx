import React, {useEffect, useRef, useState} from 'react'
import { useHistory } from 'react-router-dom'
import SVG from '../components/SVG.tsx'

import '../styles/Search.scss'

export default function Search() {

    const ref = useRef<HTMLInputElement>(null);
    const histroy = useHistory();
    const [isFocus, setIsFocus] = useState(false);
    const [query, setQuery] = useState('')

    const getFocus = () => ref.current?.focus();
    const searchQuery = (ev) => {
        setQuery(ev.target.value);
    }
    const searchPush = (ev) => {
        if (ev.key === 'Enter') histroy.push(`/search?q=${query}`);
    }

    return (
        <section className='search-section'>
            <div className={`search-box ${isFocus ? 'focused' : 'unfocused'}`} onClick={getFocus}>
                <SVG className='svg-icon' name='search_icon' width={30} height={30} />
                <input 
                    ref={ref} className='search-input' type='text' 
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={searchQuery}
                    onKeyPress={searchPush} 
                    placeholder='검색어를 입력하세요'
                />
            </div>
            <div className='result-box'>
                결과
            </div>
        </section>
    )
}