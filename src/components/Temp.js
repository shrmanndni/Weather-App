 //https://api.openweathermap.org/data/2.5/weather?q=Kurukshetra&appid=1414cf97876ade72f54ecce1cea209f9
 import React,{useState,useEffect,useCallback}from 'react'
 import "./style.css"
 import WeatherCard from './WeatherCard';
 
const Temp = () => {
  const [searchValue, setSearchValue] = useState("pune");
  const [tempInfo, setTempInfo] = useState({});

    const getWeatherInfo = useCallback(async () => {
        try {
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=1414cf97876ade72f54ecce1cea209f9`
    
          let res = await fetch(url);
          let data = await res.json();
    
          const { temp, humidity, pressure } = data.main;
          const { main: weathermood } = data.weather[0];
          const { name } = data;
          const { speed } = data.wind;
          const { country, sunset } = data.sys;
    
          const myNewWeatherInfo = {
            temp,
            humidity,
            pressure,
            weathermood,
            name,
            speed,
            country,
            sunset,
          };
    
          setTempInfo(myNewWeatherInfo);
        } catch (error) {
          console.log(error);
        }
      }, [searchValue]);
      useEffect(()=>{
    getWeatherInfo();
  }, [getWeatherInfo]);

  return (
    <>
     
        <div className="search" style={{bottom:"50px"}}>
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      

      {/* our temp card  */}
      <WeatherCard {...tempInfo}/>
    </>
  );
};

export default Temp;