import { useEffect, useState } from "react";

function PaspirtukasOne({ data, getId, paspirtukasEdit,index }) {
  const [dateEdit, setDateEdit] = useState(data.last_use_time);
  const [totalRideKilometres, setTotalRideKilometres] = useState(0);
  const [isBusy, setIsBusy] = useState();


  useEffect(() => {
    isChecked();
    dateFormat(dateEdit)
    
  }, [dateEdit]);
  const isChecked = () => {
    data.is_busy === 0 ? setIsBusy(false) : setIsBusy(true);
  };
  const dateFormat = (d) => {
      d = new Date(d)
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let day = d.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      setDateEdit(`${year}-${month}-${day}`)
    }
    
  const inputHandler = (event, data) => {
    switch (data) {
      case "date":
        setDateEdit(event.target.value);
        break;
      case "totalRideKilometres":
        setTotalRideKilometres(event.target.value);
        break;

      case "isBusy":
        setIsBusy(event.target.checked);
        break;
    }
  };

  const editPaspirtukas = () => {
    let inputData = {
      dateEdit: dateEdit === 'NaN-NaN-NaN'? "0000-00-00" : dateEdit ,
      totalRideKilometres: parseInt(totalRideKilometres) + data.total_ride_kilometres,
      isBusy: isBusy ? 1 : 0,
    };
    console.log(inputData);

    paspirtukasEdit(inputData, data.id);
  };
  console.log(dateEdit);
  

  return (
    <div className="paspirtukas-one">
      <h3>{index}</h3>
      <h3>{data.is_busy === 1 ? "busy" : "free"}</h3>

      <input
        type="checkbox"
        value="on"
        checked={isBusy}
        onChange={(event) => inputHandler(event, "isBusy")}
      />

      <h3>{dateEdit ===  'NaN-NaN-NaN' ? "Nenaudotas" : dateEdit}</h3>
      <input
        type="date"
        value={dateEdit}
        onChange={(event) => inputHandler(event, "date")}
      />
      <h3>{data.registration_code}</h3>
      <h3>{data.total_ride_kilometres}</h3>
      <input
        type="number"
        value={totalRideKilometres}
        onChange={(event) => inputHandler(event, "totalRideKilometres")}
      />
      <h3>
        <button onClick={() => getId(data.id)}>delete</button>
      </h3>
      <h3>
        <button onClick={editPaspirtukas}>update</button>
      </h3>
    </div>
  );
}

export default PaspirtukasOne;

// Sukurkite statistikos laukelius, kuriuose būtų atvaizduojamas paspirtukų kiekis ir bendras
// visų paspirtukų nuvažiuotas kilometrų kiekis (duomenys gaunami iš serverio duomenų
// bazės) Keičiantis duomenų bazės įrašams automatiškai turi keistis ir statistika.