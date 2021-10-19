import { useState } from "react"
import Redagavimas from "./Redagavimas"



function PaspirtukasOne({data,getId}) {

    const [openEdit, setOpenEdit] = useState(0)

    const setOpen = () => {
        setOpenEdit(data.id)
    }

    return (
        <div className="paspirtukai-container" >
            {openEdit ===0? null : <div><Redagavimas></Redagavimas></div> }
            <h3><button onClick={()=> getId(data.id)} >delete</button></h3>
            <h3><button onClick={setOpen} >update</button></h3>
            <h3>{data.id}</h3>
            <h3>{data.is_busy === 1? "busy" : "free"}</h3>
            <h3>{data.last_use_time === "0000-00-00" ? "Nenaudotas" : data.last_use_time}</h3>
            <h3>{data.registration_code}</h3>
            <h3>{data.total_ride_kilometres}</h3>
        </div>
    )
}

export default PaspirtukasOne