import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import "./InfoBox.css"
import Typography from '@mui/material/Typography';
import SunnyIcon from '@mui/icons-material/Sunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';

export default function InfoBox({info}){
    let init_url = "https://images.unsplash.com/photo-1639026463663-1a1292f5e753?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
    let h_url = "https://images.unsplash.com/uploads/14121010130570e22bcdf/e1730efe?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
    let haze= "https://plus.unsplash.com/premium_photo-1676404983628-52d779339c06?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2080"
    let c_url = "https://images.unsplash.com/photo-1603726574752-a85dc808deab?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070"
    let r_url = "https://images.unsplash.com/photo-1519692933481-e162a57d6721?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
    let cloud = "https://images.unsplash.com/photo-1481450083889-69bee7cb4de8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNsb3VkeSUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=1000"

    function getWeatherImage(info) {
        
        const desc = info.weather.toLowerCase();
        if (info.temp < 15) return c_url;
        if(info.temp > 32) return h_url;
        if (desc.includes("rain")) return r_url;
        if (desc.includes("cloud")) return cloud;
        if (desc.includes("haze")) return haze;
        if (desc.includes("clear")) return init_url;
        return init_url;
    }

    function getWeatherIcon(info) {
        const desc = info.weather.toLowerCase();
        if (desc.includes("rain")) return <ThunderstormIcon/> ;
        if (desc.includes("cloud")) return <CloudQueueIcon></CloudQueueIcon>;
        if (desc.includes("haze")) return <CloudQueueIcon></CloudQueueIcon>
        if (info.temp < 15) return <AcUnitIcon></AcUnitIcon>
        if (desc.includes("clear")) return  <CloudQueueIcon></CloudQueueIcon>
        return <SunnyIcon></SunnyIcon>
    }


    return(
        <div className="InfoBox">
            <div className="container">

            
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={getWeatherImage(info)} 

                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {info.city }&nbsp;{getWeatherIcon(info)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
                        <p>Temprature = {info.temp}&deg;C</p>
                        <p>Humidity = {info.humidity}</p>
                        <p>Min Temp = {info.tempMin}&deg;C</p>
                        <p>Max Temp = {info.tempMax}&deg;C</p>
                        <p>Weather can be described as <i>{info.weather}</i>  and feels like {info.tempMax}&deg;C</p>
                        </Typography>
                    </CardContent>
                    
                </Card>
            </div>
        </div>
    )
}