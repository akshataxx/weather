
import React, {useState} from 'react';
import axios from'axios';
import './App.css';
import './assets/sunset.jpg';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [cityImage, setCityImage] = useState(require("./assets/sunset.jpg").default);


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=70c239d17904f676d67a81814478e43b`
  const unsplashUrl = `https://api.unsplash.com/search/photos?query=${location}&client_id=wsE_cdLarWpcjr4PYyS69Wsse6V4hNW8VYyHuXqGscw`
  
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        fetchCityImage();
        console.log(response.data)
      })
      setLocation('')
    }
  }

  const fetchCityImage = async (city) => {

    const response = await axios.get(unsplashUrl);
    const imageUrl = response.data.results[0].urls.regular;
    setCityImage({
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    });
    if (imageUrl) {
      setCityImage(imageUrl);
    } else {
      setCityImage(require("./assets/sunset.jpg").default);
    }
  };
 
  return (
    <div className = "app" style ={{backgroundImage: `url(${cityImage})`}}>
      <div className = "search">
        <input 
        value = {location} 
        onChange = {(event) => setLocation(event.target.value)} 
        onKeyPress = {searchLocation}  
        placeholder = "Search Location" 
        type = "text"
        />
    
    </div>
    <div className="container" >
      <div className="overlay"></div>
      <div className="weather-info">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like&nbsp; </p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p> &nbsp;&nbsp;Humidity&nbsp;&nbsp; </p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p> &nbsp;&nbsp;Wind Speed</p>
            </div>
          </div>
        }
        </div>
    </div>
    </div>
  );
}


export default App;
