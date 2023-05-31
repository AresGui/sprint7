import { useEffect, useState } from 'react';
import './App.css';
import { Panell, Opcion, Label } from './styled';
import InputButton from './components/InputButton'
import { useLocalStorage } from './useLocalStorage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import WelcomePage from './components/WelcomePage';
import NavBar from './components/NavBar';

function App() {
  //array de objetos con todos los servicios ofrecidos  
  const services = [
    { id: 1, title: "Una página web (500 €)", price: 500 },
    { id: 2, title: "Una consultoría SEO (300 €)", price: 300 },
    { id: 3, title: "Una campaña de Google Ads (200 €)", price: 200 }
  ]

  const [selectedServices, setSelectedServices] = useLocalStorage("selectedServices", []);
  const [totalPrice, setTotalPrice] = useLocalStorage("totalPrice", 0);
  const [isFirstServiceSelected, setIsFirstServiceSelected] = useLocalStorage("isFirstServiceSelected", false);
  const [storedInput, setStoredInput] = useLocalStorage("input", { paginas: 0, idiomas: 0 });
  const [input, setInput] = useState(storedInput);

  useEffect(() => {
    setInput(storedInput);
  }, [storedInput]);


  const handleNumberChange = (name, value) => {
    const parsedValue = value === "" ? 0 : parseInt(value);
    const updatedInput = {
      ...input,
      [name]: parsedValue
    };
    setInput(updatedInput);
    setStoredInput(updatedInput);
  };


  const handleChange = (event) => {
    const serviceId = parseInt(event.target.id);

    if (event.target.checked) {

      setSelectedServices([...selectedServices, serviceId]);
      setTotalPrice(totalPrice + parseInt(event.target.value));
      handleFirstService(serviceId);
    } else {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId));
      setTotalPrice(totalPrice - parseInt(event.target.value));

      if (serviceId === 1) {
        setInput(prevInput => ({
          ...prevInput,
          paginas: 0,
          idiomas: 0
        }));
        setIsFirstServiceSelected(false);
      }
    }
  };

  const handleFirstService = (serviceId) => {
    if (serviceId === 1) {
      setIsFirstServiceSelected(true);
    } else {
      setIsFirstServiceSelected(false);
    }
  };



  useEffect(() => {
    const calculatedPrice = input.paginas * input.idiomas * 30;
    setTotalPrice(services.reduce((sum, service) => {
      if (selectedServices.includes(service.id)) {
        return sum + service.price;
      }
      return sum;
    }, calculatedPrice));
  }, [input.paginas, input.idiomas, selectedServices]);


  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path='/welcome'>
          <WelcomePage></WelcomePage>
        </Route>
        <Route exact path='/main'>
          <div className='main-page'>
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
                        <InputButton
                          initialValue={0}
                          onChange={(value) => handleNumberChange("paginas", value)}
                          name="paginas"
                        />
                      </Opcion>
                      <Opcion>
                        <Label>Número de idiomas</Label>
                        <InputButton
                          initialValue={0}
                          onChange={(value) => handleNumberChange("idiomas", value)}
                          name="idiomas"
                        />
                      </Opcion>
                    </Panell>
                  )}
                </li>
              )}
            </ul>
            <p>Precio: {totalPrice} €</p>
          </div>
        </Route>
      </Switch>
    </Router >
  );
}


export default App;

