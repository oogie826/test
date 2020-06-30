import React, {useEffect, useState} from 'react'    
import myutil from './mylib/MyUtils'

export default function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log(data)
    }, [data])

    async function callAPI() {
        const res = await fetch('http://localhost:9000/api');
        console.log(res)
        res.json().then(res => setData([{name:res.name, age:res.age}]))
    }

    const show = data.map((v,i) => 
        <div key={i}>{v.name}</div>
    )

    return(
        <div>
            <button onClick={callAPI}>call</button>
            {myutil.isEmpty(data) ? 'blank' : show}
        </div>
    )
}