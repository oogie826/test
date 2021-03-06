import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import querystring from 'querystring'

import SearchInput from '../components/SearchInput.tsx'

import { hash } from '../../utils/utils.ts'

import '../styles/Search.scss'


export default function Search() {

    const history = useHistory();
    const [query, setQuery] = useState('');
    const [datalist, setDatalist] = useState([]);

    function createKakaoMap(query: string) {
        const mapContainer = document.getElementById('map') // 지도를 표시할 div 
        const mapOption = {
            center: new globalThis.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };
        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        const map = new globalThis.kakao.maps.Map(mapContainer, mapOption);
        searchKakaoMap(query, map);
        return;
    }

    function searchKakaoMap(query, map) {
        // 장소 검색 객체를 생성합니다
        let ps = new globalThis.kakao.maps.services.Places();
        let infowindow = new globalThis.kakao.maps.InfoWindow({ zIndex: 1 });

        // 키워드로 장소를 검색합니다
        ps.keywordSearch(query, placesSearchCB);

        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        function placesSearchCB(data, status, pagination) {
            if (status === globalThis.kakao.maps.services.Status.OK) {
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다

                //TODO: Unmounted warning
                setDatalist(data);
                displayPagination(pagination);
                let bounds = new globalThis.kakao.maps.LatLngBounds();

                for (let i = 0; i < data.length; i++) {
                    displayMarker(data[i]);
                    bounds.extend(new globalThis.kakao.maps.LatLng(data[i].y, data[i].x));
                }

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                map.setBounds(bounds);
            }
        }

        // 지도에 마커를 표시하는 함수입니다
        function displayMarker(place) {
            // 마커를 생성하고 지도에 표시합니다
            let marker = new globalThis.kakao.maps.Marker({
                map: map,
                position: new globalThis.kakao.maps.LatLng(place.y, place.x)
            });

            // 마커에 클릭이벤트를 등록합니다
            globalThis.kakao.maps.event.addListener(marker, 'click', function () {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map, marker);
            });
        }

        function displayPagination(pagination) {
            let paginationEl = document.getElementById('pagination'),
                fragment = document.createDocumentFragment(),
                i;
            
            // 기존에 추가된 페이지번호를 삭제합니다
            while (paginationEl?.hasChildNodes()) {
                paginationEl.removeChild(paginationEl.lastChild);
            }

            for (i = 1; i <= pagination.last; i++) {
                let el = document.createElement('a');
                el.href = "#";
                el.innerHTML = i;
                el.classList.add('pagination__nums');

                if (i === pagination.current) {
                    el.classList.add('on');
                }
                else {
                    el.classList.remove('on');
                    el.onclick = (function (i) {
                        return function () {
                            pagination.gotoPage(i);
                        }
                    })(i);
                }

                fragment.appendChild(el);
            }
            paginationEl?.appendChild(fragment);
        }
    }


    // TODO: Have to do fix unmounted update warning
    useEffect(() => {
        const qs = Object.values(querystring.parse(document.location.search.slice(1))).join('');
        console.log(qs);
        console.log(query)
        if (!query && qs) createKakaoMap(qs);
    }, [])

    const searchQuery = (ev) => setQuery(ev.target.value);
    const searchPush = (ev) => {
        if (ev.key === 'Enter' || ev.button === 0) {
            createKakaoMap(query);
            history.push(`/search?q=${query}`);
        }
        return;
    };

    const linkTo = (placeName, addressName) => {
        history.push(`/@${(placeName).replace(/\s/g, '')}${hash(addressName)}`, { place_name: placeName, address_name: addressName });
        return;
    };

    const renderPlaceNameList = () => {
        return datalist.map((el, idx) =>
            <li
                key={idx}
                className='list__item'
                onClick={() => linkTo(el.place_name, el.address_name)} >
                <span>{el.place_name}</span>
                <span>{el.address_name}</span>
            </li>);
    };

    return (
        <section className='search__section'>
            <SearchInput searchEvent={searchPush} onChange={searchQuery} placeholder='검색어를 입력하세요'/>
            <div className='result__container'>
                <div id="map" style={{ width: '768px', height: '400px' }}></div>
                <ul className='list__container'>
                    {renderPlaceNameList()}
                </ul>
                <div id="pagination"></div>
            </div>
        </section>
    )
}