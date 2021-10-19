import axios from "axios";
import { useEffect, useState } from "react";
import PaspirtukasNew from "./PaspirtukasNew";
import PaspirtukasOne from "./PaspirtukasOne";

function Paspirtukai() {
  const [paspirtukai, setPaspirtukai] = useState([]);
  const [postuKeitimoLaikas, setPostuKeitimoLaikas] = useState(Date.now());

  useEffect(() => {
    axios
      .get("http://localhost:3002/paspirtukai")
      .then(function (response) {
        // handle success
        setPaspirtukai(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [postuKeitimoLaikas]);

  const paspirtukasAdd = (data) => {
    axios
      .post("http://localhost:3002/paspirtukai", data)
      .then(function (response) {
        setPostuKeitimoLaikas(Date.now());
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
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const paspirtukasEdit = (data,id) => {
    axios
    .put("http://localhost:3002/paspirtukai/" + id, data)
    .then(function (response) {
      setPostuKeitimoLaikas(Date.now());
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  const getId = (id) => {
    paspirtukasRemove(id);
  };

  const crud = {
    add: paspirtukasAdd,
    remove: paspirtukasRemove,
  };

  console.log(paspirtukai);
  return (
    <div>
      <PaspirtukasNew paspirtukasAdd={crud.add}></PaspirtukasNew>
      {paspirtukai.map((item) => (
        <PaspirtukasOne
          getId={getId}
          key={item.id}
          data={item}
          paspirtukasEdit={paspirtukasEdit}
        ></PaspirtukasOne>
      ))}
    </div>
  );
}

export default Paspirtukai;
