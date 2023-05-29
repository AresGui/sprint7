import { useState } from 'react';
import './App.css';
import { Panell, Opcion, Label } from './styled';
import InputButton from './components/InputButton'


function App() {

  const services = [
    { id: 1, title: "Una página web (500 €)", price: 500 },
    { id: 2, title: "Una consultoría SEO (300 €)", price: 300 },
    { id: 3, title: "Una campaña de Google Ads (200 €)", price: 200 }
  ]

  const [selectedServices, setSelectedServices] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const [isFirstServiceSelected, setIsFirstServiceSelected] = useState(false);

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

  const handleFirstService = (serviceId) => {
    if (serviceId === 1) {
      setIsFirstServiceSelected(true);
    } else {
      setIsFirstServiceSelected(false);
    }
  };

  //////////////////////

  const [input, setInput] = useState({
    paginas: "",
    idiomas: ""
  })

  const handleNumberChange = (value) => {


    const { name, value } = InputButton;



    setInput({
      ...input,
      [name]: value
    });
  };



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
              <Panell>
                <Opcion>
                  <Label>Número de páginas</Label>
                  <InputButton initialValue={0} onChange={handleNumberChange} name="paginas" value={value} />
                  {/* <button onClick={handleFirstIncrement}>+</button>
                  <input type="text" onChange={handleInputChange} value={input.paginas} name="paginas" />
                  <button onClick={handleFirstDecrement}>-</button> */}
                </Opcion>
                <Opcion>
                  <Label>Número de idiomas</Label>
                  <InputButton initialValue={0} onChange={handleNumberChange} name="idiomas" value={value} />
                  {/* <button onClick={handleSecondIncrement}>+</button>
                  <input type="text" onChange={handleInputChange} value={input.idiomas} name="idiomas" />
                  <button onClick={handleSecondDecrement}>-</button> */}
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

