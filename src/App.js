import React, { useState, useEffect } from 'react';
import './App.css';
import { Panell, Opcion, Label } from './styled';


function App() {

  const services = [
    { id: 1, title: "Una página web (500 €)", price: 500 },
    { id: 2, title: "Una consultoría SEO (300 €)", price: 300 },
    { id: 3, title: "Una campaña de Google Ads (200 €)", price: 200 }
  ]

  const [selectedServices, setSelectedServices] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const handleChange = (event) => {
    const serviceId = parseInt(event.target.id);

    if (event.target.checked) {
      setSelectedServices([...selectedServices, serviceId]);
      setTotalPrice(totalPrice + parseInt(event.target.value));
      handleFirstService(serviceId);
    } else {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId));
      setTotalPrice(totalPrice - parseInt(event.target.value));
      setIsFirstServiceSelected(false);
    }
  }

  const [isFirstServiceSelected, setIsFirstServiceSelected] = useState(false);

  const handleFirstService = (serviceId) => {
    if (serviceId === 1) {
      setIsFirstServiceSelected(true);
    } else {
      setIsFirstServiceSelected(false);
    }
  };

  const [input, setInput] = useState({
    paginas: "",
    idiomas: ""
  })

  const handleInputChange = (event) => {

    /* setInput({
      ...input,
      [event.target.name]: parseInt(event.target.value)
    }) */

    const { name, value } = event.target;

    // Pasar input vacío a 0
    const parsedValue = value.trim() === "" ? 0 : parseInt(value);

    setInput({
      ...input,
      [name]: parsedValue
    });
  }

  useEffect(() => {
    const calculatedPrice = input.paginas * input.idiomas * 30;
    setTotalPrice(totalPrice + calculatedPrice);
  }, [input]);

  //Cada vez que se selecciona o deselecciona un servicio, se comprueba si el array selectedServices está vacío, sí es así, el precio pasa a 0
  useEffect(() => {
    if (selectedServices.length === 0) {
      setInput({
        paginas: "",
        idiomas: ""
      })
      setTotalPrice(0);
    }
  }, [selectedServices]);

  /* const sendData = (event) => {
    event.preventDefault();
  } */



  const handleFirstIncrement = () => {
    input.paginas += 1;
  }

  const handleFirstDecrement = () => {
    input.paginas -= 1;
  }



  const handleSecondIncrement = () => {
    input.idiomas += 1;
  }

  const handleSecondDecrement = () => {
    input.idiomas -= 1;
  }

  return (
    <div>
      <h1 className="header">¿Qué quieres hacer?</h1>
      <ul className="list">
        {services.map((service) =>
          <li key={service.id}>
            <label>
              <input type="checkbox" id={service.id} value={service.price} checked={selectedServices.includes(service.id)} onChange={(event) => {
                handleChange(event);
              }} />
              {service.title}
            </label>
            {service.id === 1 && isFirstServiceSelected && (
              <Panell /* onSubmit={sendData} */>
                <Opcion>
                  <Label>Número de páginas</Label>
                  <button onClick={handleFirstIncrement}>+</button>
                  <input type="text" onChange={handleInputChange} value={input.paginas} name="paginas" />
                  <button onClick={handleFirstDecrement}>-</button>
                </Opcion>
                <Opcion>
                  <Label>Número de idiomas</Label>
                  <button onClick={handleSecondIncrement}>+</button>
                  <input type="text" onChange={handleInputChange} value={input.idiomas} name="idiomas" />
                  <button onClick={handleSecondDecrement}>-</button>
                </Opcion>
              </Panell>
            )}
          </li>
        )}
      </ul>
      <p>Precio: {totalPrice} €</p>
    </div>
  );
}


export default App;

