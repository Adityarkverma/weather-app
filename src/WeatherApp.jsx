import { useState } from 'react';
import SearchBox from './SearchsBox';
import InfoBox from './InfoBox';

export default function WeatherApp(){
    const [weatherInfo, setWeatherInfo ] = useState(null)

    let updateInfo = (result) =>{
        setWeatherInfo(result);
    }
    return(
        <div style={{textAlign:"Center"}}>
            <h1>Weather App</h1>
            <SearchBox updateInfo ={updateInfo} />
            {weatherInfo && <InfoBox info={weatherInfo} />}
        </div>
    )
}