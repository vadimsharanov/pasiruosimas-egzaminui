import { useState } from "react";

function PaspirtukasNew({paspirtukasAdd}) {
    const [registrationCode, SetRegistrationCode] = useState("");
    
    const doneButton = () => {
        let data = {
            registrationCode: registrationCode,
        }
        paspirtukasAdd(data)
    }

    const inputHandler = (event, data) => {
        switch (data) {
            case "registrationCode":
                SetRegistrationCode(event.target.value)
                break;
        
        }
    }
    return (
        <div className="paspirtukas-new-container">
            <div className="paspirtukas-new" >
            <span>registration code</span>
            <input onChange={(event)=> inputHandler(event,"registrationCode")} type="text" />
            <button onClick={()=> doneButton()} >Go</button>
            </div>
        </div>
    )
}

export default PaspirtukasNew