import React from 'react'
import MyUtils from '../../utils/MyUtils.js'

export default function Kindergarden({loading, kinderGarden}) {
    
    const list = MyUtils.isEmpty(kinderGarden) ? '' : kinderGarden.map((val, idx) =>
    <div key={idx}>{val.name} {val.comment} {val.teachers} {val.program} {val.overall} </div>
    );

    return(
        <div>
            {loading ? 'loading' : list}
        </div>
    )
}