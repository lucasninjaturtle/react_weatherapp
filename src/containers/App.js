import React, { useState } from 'react';
import background from "../img/logoHome.png";
import './App.css';
import Nav from '../components/Nav.jsx';
import Cards from '../components/Cards.jsx';
import { Route } from 'react-router-dom';
import About from "../components/About.jsx"
import Ciudad from "../components/Ciudad.jsx"

const apiKey = '4ae2636d8dfbdc3044bede63951a019b';

function App() {
  const [cities, setCities] = useState([]);
  function onClose(id) {
    setCities(oldCities => oldCities.filter(c => c.id != id));
  }
  function onSearch(ciudad) {
    //Llamado a la API del clima
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`)
      .then(r => r.json())
      .then((recurso) => {
        debugger
        if(recurso.main !== undefined){
          const ciudad = {
            min: Math.round(recurso.main.temp_min/10),
            max: Math.round(recurso.main.temp_max/10),
            img: recurso.weather[0].icon,
            id: recurso.id,
            wind: recurso.wind.speed,
            temp: Math.round(recurso.main.temp/10),
            name: recurso.name,
            weather: recurso.weather[0].main,
            clouds: recurso.clouds.all,
            latitud: recurso.coord.lat,
            longitud: recurso.coord.lon
          };
          setCities(oldCities => [...oldCities, ciudad]);
        } else {
          alert("Ciudad no encontrada");
        }
      });
  }
  function onFilter(ciudadId) {
    let ciudad = cities.filter(c => c.id === parseInt(ciudadId));
    if(ciudad.length > 0) {
        return ciudad[0];
    } else {
        return null;
    }
  }
  
  return (
<div className="App" style={{ backgroundImage: `url(${background})` }}>
    <Route path='/' render={() => <Nav onSearch={onSearch} />} />
    <Route path='/about' component={About} />

  <Route exact path='/' render={() => <Cards cities={cities} onClose={onClose} />} />

  <Route exact path='/ciudad/:ciudadId' render={({match}) => <Ciudad match={match} city={onFilter(match.params.ciudadId)} />}s/>

</div>

    // <div className="App">
    //   <Nav onSearch={onSearch}/>
    //   <div>
    //     <Cards
    //       cities={cities}
    //       onClose={onClose}
    //     />
    //   </div>
    //   <hr />
    // </div>
  );
}

export default App;
