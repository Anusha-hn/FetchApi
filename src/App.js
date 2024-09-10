
import React, { useState, useEffect } from 'react';
import './index.css'

function App() {
  const [characterData, setCharacterData] = useState([]);
  const [filmsData, setFilmsData] = useState([]);
  const [vehiclesData, setVehiclesData] = useState([]);

  useEffect(() => {
    const fetchCharacter = async () => {
      const response = await fetch('https://swapi.py4e.com/api/people/');
      console.log("response", response);
      const data = await response.json();
      console.log(data, "Data")
      const characterPromises = data.results.map(async (character) => {
        const response = await fetch(character.url);
            console.log("Response2", response)
        return await response.json();
      });
      return Promise.all(characterPromises).then((characterData) => {
        setCharacterData(characterData);
      });
    };
    const fetchFilms = async () => {
      const response = await fetch('https://swapi.py4e.com/api/films/');
      const data = await response.json();
      setFilmsData(data.results);
    };
    const fetchVehicles = async () => {
      const response = await fetch('https://swapi.py4e.com/api/vehicles/');
      const data = await response.json();
      setVehiclesData(data.results);
    };
    Promise.all([fetchCharacter(), fetchFilms(), fetchVehicles()]).then(() => {
      console.log('All data has been fetched');
    });
  }, []);

  return (
    <div>
      <h1>Characters</h1>
      <table style={{width:'100%'}}>
        <thead>
          <tr>
            <th>Character Name</th>
            <th>Films</th>
            <th>Vehicles</th>
          </tr>
        </thead>
        <tbody>
          {characterData.map((character, index) => (
            <tr key={index}>
              <td>{character.name}</td>
              <td>
                {filmsData.map((film, filmIndex) => (
                  <p key={filmIndex}>{film.title}</p>
                ))}
              </td>
              <td>
                {vehiclesData.map((vehicle, vehicleIndex) => (
                  <p key={vehicleIndex}>{vehicle.name}</p>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
