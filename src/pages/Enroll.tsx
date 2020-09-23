import React, { useEffect, useState } from 'react'

import SearchInput from '../components/SearchInput.tsx';

export default function Enroll() {

    const [keyword, setKeyword] = useState('');
    const [datalist, setDatalist] = useState([]);
    const [values, setValues] = useState({
        place_name: '',
        address_name: '',
        reg_number: ''
    });

    useEffect(() => {

    }, [values]);

    function searchPlace(keyword) {
        const ps = new globalThis.kakao.maps.services.Places();
        ps.keywordSearch(keyword, placesSearchCB);

        function placesSearchCB(data, status, pagination) {
            if (status === globalThis.kakao.maps.services.Status.OK) {
                const paginationIndex = document.getElementById('page');
                setDatalist(data);

                while (paginationIndex?.hasChildNodes()) {
                    paginationIndex.removeChild(paginationIndex.lastChild);
                }

                for (let i = 1; i <= pagination.last; i += 1) {
                    const index = document.createElement('a');
                    index.innerHTML = String(i);
                    if (i === pagination.current) {
                        index.classList.add('on');
                    }
                    else {
                        index.classList.remove('on');
                        index?.onclick = ((i) => {
                            return () => pagination.gotoPage(i);
                        })(i);
                    }
                    paginationIndex?.appendChild(index);
                }
            }
        }
        return;
    }

    const callApiEnrollRegisterationNumber = () => {
        // TODO: 사업자 번호를 통한 사업자 확인하는 API
    };

    const searchKeyword = (ev) => setKeyword(ev.target.value);
    const search = (ev) => {
        if (ev.key === 'Enter' || ev.button === 0) {
            searchPlace(keyword)
        }
    };
    
    const enrollKinder = (placeName: string, addressName: string) => {
        setValues({...values, place_name: placeName, address_name: addressName});
    };

    const renderPlaceNameList = () => {
        return datalist.map((el, idx) =>
            <li
                key={idx}
                className='result-box__list'
                onClick={() => enrollKinder(el.place_name, el.address_name)}
            >
                {el.place_name}
                {el.address_name}
            </li>);
    };

    return (
        <div>
            <div>
                <form>
                    <label htmlFor="place_name">이름</label>
                    <input id='place_name' type="text" value={values.place_name} readOnly disabled />
                    <label htmlFor="address_name">주소</label>
                    <input id='address_name' type="text" value={values.address_name} readOnly disabled />
                    <label htmlFor="reg_number">사업자등록번호</label>
                    <input id='reg_number' type="text" />
                    <button className='btn'>등록</button>
                </form>
            </div>
            <SearchInput onChange={searchKeyword} searchEvent={search}/>
            <div id='list'>
                {renderPlaceNameList()}
            </div>
            <div id='page'></div>
        </div>
    )
}