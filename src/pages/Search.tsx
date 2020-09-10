import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import SVG from '../components/SVG.tsx'
import querystring from 'querystring'

import '../styles/Search.scss'

function createKakaoMap(query) {
    const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new globalThis.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    const map = new globalThis.kakao.maps.Map(mapContainer, mapOption);
    searchKakaoMap(query, map);
}

function searchKakaoMap(query, map) {
    // 장소 검색 객체를 생성합니다
    var ps = new globalThis.kakao.maps.services.Places();
    var infowindow = new globalThis.kakao.maps.InfoWindow({zIndex:1});

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(query, placesSearchCB);

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
        if (status === globalThis.kakao.maps.services.Status.OK) {

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            var bounds = new globalThis.kakao.maps.LatLngBounds();

            for (var i = 0; i < data.length; i++) {
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
        var marker = new globalThis.kakao.maps.Marker({
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
}

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
        if (ev.key === 'Enter') {
            histroy.push(`/search?q=${query}`);
            createKakaoMap(query);
        }
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
            </div>
            <div id="map" style={{ width: '500px', height: '400px' }}></div>
        </section>
    )
}