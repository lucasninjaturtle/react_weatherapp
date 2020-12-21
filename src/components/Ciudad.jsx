import React from "react";
import Card from '../components/Cards.jsx';
import './Ciudad.css';


export default function Ciudad({city, match}) {
console.log(match);
    return (
        
        <div class='ciudad' className="ciudad">
                <div>
                    <h2>{city.name}</h2>
                    <div className="info">
                        <div>Temperature: {city.temp} ºC</div>
                        <div>Weather: {city.weather}</div>
                        <div>Wind Speed: {city.wind} km/h</div>
                        <div>Clouds: {city.clouds}</div>
                        <div>Latitud: {city.latitud}º</div>
                        <div>Longitud: {city.longitud}º</div>
                    </div>
            </div>
        </div>
        
    )
    
}

