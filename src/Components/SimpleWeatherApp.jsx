import { useState, useRef } from 'react';
import './SimpleWeatherApp.css';

function SimpleWeatherApp() {
  const [searchValue, setSearchValue] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const searchRef = useRef(null);

  const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${apiKey}`;

  const getWeatherData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Hava məlumatları alınarkən səhv baş verdi:', error);
    }
  };

  const handleSearchChange = () => {
    setSearchValue(searchRef.current.value);
  };

  return (
    <div className="weather-app-container">
      <input type="text" placeholder='Buraya bölgəni yazın' className="weather-input" ref={searchRef} onChange={handleSearchChange} />
      <button className="weather-button" onClick={getWeatherData}>Hava məlumatlarını al</button>
      {weatherData && (
        <div className="weather-data">
          <p>Şəhər: {weatherData.name}</p>
          <p>Temperatur: {weatherData.main.temp}</p>
          <p>Açıqlama: {weatherData.weather[0].description}</p>
          <p>Nəmlik: {weatherData.main.humidity}</p>
          <img className="weather-icon" src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
        </div>
      )}
    </div>
  );
}

export default SimpleWeatherApp;
