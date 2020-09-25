import React, { useEffect, useState } from 'react'

import { consoleLog } from '../../utils/browserUtils.ts';
import KinderGartenApi from '../../api/KinderGartenApi'

import SearchInput from '../components/SearchInput.tsx';
import ReadOnlyInput from '../components/Input.tsx';

import '../styles/Enroll.scss';

const initForm = {
    place_name: '',
    address_name: '',
    reg_number: ''
};

export default function Enroll() {

    const [keyword, setKeyword] = useState('');
    const [datalist, setDatalist] = useState([]);
    const [values, setValues] = useState(initForm);

    useEffect(() => {
        consoleLog(Object.values(values));
    }, [values]);

    function searchPlace(keyword) {
        const ps = new globalThis.kakao.maps.services.Places();
        ps.keywordSearch(keyword, placesSearchCB);

        function placesSearchCB(data, status, pagination) {
            if (status === globalThis.kakao.maps.services.Status.OK) {
                const paginationIndex = document.getElementsByClassName('pagination__wrapper')[0];
                setDatalist(data);

                while (paginationIndex?.hasChildNodes()) {
                    paginationIndex.removeChild(paginationIndex.lastChild);
                }

                for (let i = 1; i <= pagination.last; i += 1) {
                    const index = document.createElement('a');
                    index.innerHTML = String(i);
                    index.classList.add('pagination__nums');
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

    const callApiEnrollKindergarten = () => {
        KinderGartenApi.postEnrollKindergarten(values).then(res => console.log(res))
    };

    const searchKeyword = (ev) => setKeyword(ev.target.value);
    const search = (ev) => {
        if (ev.key === 'Enter' || ev.button === 0) {
            searchPlace(keyword)
        }
    };
    const deleteFormValues = () => {
        setValues(initForm);
    };

    const enrollKinder = (placeName: string, addressName: string) => {
        setValues({ ...values, place_name: placeName, address_name: addressName });
    };

    const renderPlaceNameList = () => {
        return datalist.map((el, idx) =>
            <li
                key={idx}
                className='list__item'
                onClick={() => enrollKinder(el.place_name, el.address_name)}
            >
                <span>{el.place_name}</span>
                <span>{el.address_name}</span>
            </li>);
    };

    return (
        <div>
            <div className='enroll__inputs_wrapper'>
                <ReadOnlyInput id='place_name' labelTitle='이름' value={values.place_name} readOnly={true} disabled={true} />
                <ReadOnlyInput id='address_name' labelTitle='주소' value={values.address_name} readOnly={true} disabled={true} />
                <ReadOnlyInput id='reg_number' labelTitle='사업자등록번호' readOnly={false} disabled={false} />
                <div className='enroll__btns_wrapper'>
                    <button className='btn' onClick={callApiEnrollKindergarten}>등록</button>
                    <button className='btn' onClick={deleteFormValues}>초기화</button>
                </div>
            </div>
            <SearchInput onChange={searchKeyword} searchEvent={search} />
            <ul id='list' className='list__container'>
                {renderPlaceNameList()}
            </ul>
            <div className='pagination__wrapper'></div>
        </div>
    )
}