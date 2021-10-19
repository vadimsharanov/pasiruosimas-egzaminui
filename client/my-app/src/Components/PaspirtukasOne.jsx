import { useEffect, useState } from "react";

function PaspirtukasOne({ data, getId, paspirtukasEdit }) {
  const [dateEdit, setDateEdit] = useState(data.last_use_time);
  const [totalRideKilometres, setTotalRideKilometres] = useState(
    data.total_ride_kilometres
  );
  const [isBusy, setIsBusy] = useState();

  useEffect(() => {
    isChecked();
    dateFormat(dateEdit)
    
  }, []);
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
      dateEdit: dateEdit,
      totalRideKilometres: parseInt(totalRideKilometres),
      isBusy: isBusy ? 1 : 0,
    };
    console.log(inputData);
    paspirtukasEdit(inputData, data.id);
  };

  return (
    <div className="paspirtukai-container">
      <h3>{data.id}</h3>
      <h3>{data.is_busy === 1 ? "busy" : "free"}</h3>

      <input
        type="checkbox"
        value="on"
        checked={isBusy}
        onChange={(event) => inputHandler(event, "isBusy")}
      />

      <h3>{data.last_use_time === "0000-00-00" ? "Nenaudotas" : dateEdit}</h3>
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
