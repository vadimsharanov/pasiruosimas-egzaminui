import { useState } from "react";

function PaspirtukasNew({paspirtukasAdd}) {
    const [registrationCode, SetRegistrationCode] = useState("");
    const [isBusy, SetIsBusy] = useState("");
    
    const doneButton = () => {
        let data = {
            registrationCode: registrationCode,
            isBusy:isBusy
        }
        paspirtukasAdd(data)
    }

    const inputHandler = (event, data) => {
        switch (data) {
            case "registrationCode":
                SetRegistrationCode(event.target.value)
                break;
            case "isBusy":
                SetIsBusy(event.target.value)
                break;
        
        }
    }
    return (
        <div className="paspirtukas-new">
            <span>registration code</span>
            <input onChange={(event)=> inputHandler(event,"registrationCode")} type="text" />
            <span>is_busy</span>
            <input onChange={(event)=> inputHandler(event,"isBusy")} type="text" />
            <button onClick={()=> doneButton()} >Go</button>
        </div>
    )
}

export default PaspirtukasNew