import axios from "axios";
import { useEffect, useState } from "react";
import PaspirtukasNew from "./PaspirtukasNew";
import PaspirtukasOne from "./PaspirtukasOne";
import Sorting from "./Sorting";
import Statistika from "./Statistika";

function Paspirtukai() {
  const [paspirtukai, setPaspirtukai] = useState([]);
  const [postuKeitimoLaikas, setPostuKeitimoLaikas] = useState(Date.now());
  const [count, setCount] = useState(0);
  const [totalRide, setTotalRide] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3002/paspirtukai")
      .then(function (response) {
        // handle success4
        console.log(response.data);
        setPaspirtukai(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [postuKeitimoLaikas]);

  useEffect(() => {
    paspirtukuCount();
    paspirtukaiRida();
  }, []);

  const paspirtukasAdd = (data) => {
    axios
      .post("http://localhost:3002/paspirtukai", data)
      .then(function (response) {
        setPostuKeitimoLaikas(Date.now());
        paspirtukuCount();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const paspirtukasRemove = (id) => {
    axios
      .delete("http://localhost:3002/paspirtukai/" + id)
      .then(function (response) {
        setPostuKeitimoLaikas(Date.now());
        paspirtukuCount();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const paspirtukasEdit = (data, id) => {
    axios
      .put("http://localhost:3002/paspirtukai/" + id, data)
      .then(function (response) {
        setPostuKeitimoLaikas(Date.now());
        paspirtukaiRida();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const paspirtukuCount = () => {
    axios
      .get("http://localhost:3002/paspirtukai/count/")
      .then(function (response) {
        setPostuKeitimoLaikas(Date.now());
        console.log(response.data);
        setCount(response.data[0].paspirtukuSkaicius);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const paspirtukaiRida = () => {
    axios
      .get("http://localhost:3002/paspirtukai/totalRide/")
      .then(function (response) {
        setPostuKeitimoLaikas(Date.now());
        console.log(response.data);
        setTotalRide(response.data[0].rideSum);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  console.log(totalRide);

  const getId = (id) => {
    paspirtukasRemove(id);
  };

  const crud = {
    add: paspirtukasAdd,
    remove: paspirtukasRemove,
  };

  const sortByRide = () => {
      let paspirtukasCopy = paspirtukai.slice()
      paspirtukasCopy = paspirtukasCopy.sort((a,b)=> b.total_ride_kilometres - a.total_ride_kilometres)
      setPaspirtukai(paspirtukasCopy)
  }

  const sortByData = () => {
      let paspirtukasCopy = paspirtukai.slice()
      paspirtukasCopy = paspirtukasCopy.sort((a,b)=> new Date(b.last_use_time) - new Date(a.last_use_time))
        console.log(paspirtukasCopy);
  }


  return (
      <div>
    <div className="container" >
        <div className="row" >
            <div className="col-12 col-lg-8 col-xl-6">
      <Sorting ride={sortByRide} date={sortByData} ></Sorting>
            </div>
      </div>
      </div>
      
      <Statistika count={count} totalRide={totalRide}></Statistika>
      <PaspirtukasNew paspirtukasAdd={crud.add}></PaspirtukasNew>
      <div className="paspirtukai-container">
        {paspirtukai.map((item) => (
          <PaspirtukasOne
            getId={getId}
            key={item.id}
            data={item}
            index={paspirtukai.indexOf(item) + 1}
            paspirtukasEdit={paspirtukasEdit}
          ></PaspirtukasOne>
        ))}
      </div>
      </div>
    
  );
}

export default Paspirtukai;
