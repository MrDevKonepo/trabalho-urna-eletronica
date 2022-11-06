// Arquivo principal que controla o html

import React, {useState, useEffect} from "react"
import './App.css';
import Axios from "axios";
import Card from "./components/cards/card";


function App() {
  const [values, setValues] = useState();
  const [listVotos, setListVotos] = useState();

  const handleChangeValues = (value) => {
    setValues(prevValue => ({
      ...prevValue,
      [value.target.name]: value.target.value, // [value.target.name]: value.target.value,
    }));
  };

  const handleClickButton = () => {
      Axios.post("http://localhost:3001/register", {
      eleitor: values.eleitor,
      senador: values.senador,
      presidente: values.presidente
    }).then((response) => {
      console.log(response)
      setListVotos([
        ...listVotos,
        {
          eleitor: values.eleitor,
          senador: values.senador,
          presidente: values.presidente,
        }
      ])
    }) 
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListVotos(response.data)
    })
  }, [])

  return (
    <div className="app--container">
      <div className="register--container">
        <h1 className="register--tittle">Urna Eletrônica</h1>
        <input type="text" name="eleitor" placeholder="Eleitor" className="register--input" onChange={handleChangeValues}></input>
        <input type="text" name="senador" placeholder="Senador" className="register--input" onChange={handleChangeValues}></input>
        <input type="text" name="presidente" placeholder="Presidente" className="register--input" onChange={handleChangeValues}></input>
        <button className='register--button' onClick={() => handleClickButton()}>Votar</button>
      </div>
      {typeof listVotos !== "undefined" && listVotos.map((value) => {
        return <Card key={value.idvoto} listCard={listVotos} setListCard={setListVotos} idvoto={value.idvoto} eleitor={value.eleitor} senador={value.senador} presidente={value.presidente}/>
      })}
    </div>
  );
}

export default App;
