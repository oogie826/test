import React, { useEffect, useState } from 'react'

export default function Kindergarden({kinderGarden, title}) {

    const kg_list = kinderGarden.map((val, idx) => 
        <div key={idx}>{val[idx]}</div>
    )

    return(
        <div>
            {kg_list}
            {title}
        </div>
    )
}