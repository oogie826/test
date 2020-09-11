import React from 'react'
import querystring from 'querystring'

export default function SearchedPlace() {
    const pathname = Object.keys(querystring.parse(document.location.pathname));

    return (
        <>
        {pathname}
        </>
    )
}