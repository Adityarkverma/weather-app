import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from "@mui/icons-material/MyLocation";
import "./SearchBox.css"
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';



export default function SearchBox({updateInfo}){
    let [city,setCity] = useState("");
    let [loading , setLoading] = useState(false)
    let [error, setError] = useState(false);
    let [errMsg, setErrMsg] = useState("");
   
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const key = import.meta.env.VITE_WEATHER_API_KEY;


    let getWeatherInfo = async() =>{
        setLoading(true);
        try{
            
            let res = await fetch(`${url}?q=${city}&appid=${key}&units=metric`);
            let jsonRes = await res.json();
            let result = {
                city:city,
                temp: jsonRes.main.temp,
                tempMin: jsonRes.main.temp_min,
                tempMax: jsonRes.main.temp_max,
                humidity : jsonRes.main.humidity,
                feelsLike: jsonRes.main.feels_like,
                weather : jsonRes.weather[0].description
            }
            console.log(result);
            return result;
        }catch(err){
            throw err
        }
    }

    const getWeatherByLoc =  () =>{
        updateInfo("")
        setError(false)
        setLoading(true)
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                async(position) =>{
                    const {latitude , longitude} = position.coords;
                    try{
                        let res = await fetch(`${url}?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`);
                        let jsonRes = await res.json();
                        let result = {
                            city:jsonRes.name,
                            temp: jsonRes.main.temp,
                            tempMin: jsonRes.main.temp_min,
                            tempMax: jsonRes.main.temp_max,
                            humidity : jsonRes.main.humidity,
                            feelsLike: jsonRes.main.feels_like,
                            weather : jsonRes.weather[0].description
                        }
                        console.log(result);
                        updateInfo(result);
                        setLoading(false)
                    }catch(err){
                        setError(true);
                        setLoading(false);
                        setErrMsg("Unable to fetch location Wather");
                    }
                },
                () =>{
                    setError(true);
                    setLoading(false)
                    setErrMsg("Location permission denied!o")
                }

            )
        }else{
            setError(true);
            setLoading(false)
            setErrMsg("Geolocation not supported by your browser!");
        }
         

    }

    let handleChange = (event)=>{
        setCity(event.target.value)
    }

    let handleSubmit = async (event) =>{
        event.preventDefault();
        console.log(city);
        setCity("");
        updateInfo("")
        setError(false)
        setLoading(false)
        try{

            
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo)
            setLoading(false)
        }catch(err){
            setError(true)
            setLoading(false)
            setErrMsg("No such City Found!")
            
        }
    }
    return(
        <div className='SearchBox'>
            
            <form  onSubmit={handleSubmit}>
                <TextField id="city" label="City-Name" variant="outlined" required value={city} onChange={handleChange} />
                <br /><br />
                <Button variant="contained" startIcon={<SearchIcon />} type='Submit'>
                    Search
                </Button>
                &nbsp;&nbsp;
                <Button
                variant="outlined"
                startIcon={<MyLocationIcon />}
                
                onClick={getWeatherByLoc}
                >
                Use My Location
                </Button>
                {
                   error &&   
                   <div className='errDiv'>
                        <Alert severity="error" className='error'>
                            {errMsg}
                        </Alert>
                    </div>
                }
                {
                   loading &&   
                   <div className='errDiv'>
                         {/* <h2>Fetching Weather...</h2> */}
                        
                        <CircularProgress></CircularProgress>
                    </div>
                }
            </form>
        </div>
    )

    
}

