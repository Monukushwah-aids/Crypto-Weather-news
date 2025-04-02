import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
//import "./InfoBox.css";
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
export default function InfoBox({info}){
  const INIT_URL = 
    "https://images.unsplash.com/photo-1722858344552-7acf888a7046?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGR1c3R5JTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D"
    const HOT_URL = 
    "https://images.unsplash.com/photo-1581129724980-2ab2153c3d8d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90JTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D";
    const COLD_URL = 
    "https://plus.unsplash.com/premium_photo-1670604649107-a0171e5f1bd0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29sZCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D";
    const RAIN_URL =
     "https://media.istockphoto.com/id/498063665/photo/rainy-landscape.webp?a=1&b=1&s=612x612&w=0&k=20&c=hOE6L7f7OoSKUW1Q4tR27GoEkOU_ywKJGCvSO77SeZg=";

    return (
     <div className="Infobox p-5" >
     <div className='cardContainer'>
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            sx={{ height: 140 }}
            image={
                info.humidity > 80 ? 
                RAIN_URL : 
                info.temp >15 ?
                 HOT_URL :
                  COLD_URL
                }
            title="green iguana"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {info.city}{
                info.humidity > 80 ? 
                <ThunderstormIcon/> : 
                info.temp >15 ?
                <WbSunnyIcon/>:
                <AcUnitIcon/>
                }
            </Typography>
            <Typography variant="body2" color="text.secondary" component={"span"} >
            <p>temperature = {info.temp}&deg;C</p>
            <p>temperature_min = {info.temp_min}&deg;C</p>
            <p>temperature_max = {info.temp_max}&deg;C</p>
            <p>Humidity= {info.humidity}&deg;C</p>
            <p>the weather description <i>{info.weather}</i> & feels Like= {info.feelsLike}&deg;C</p>
            </Typography>
        </CardContent>
        
        </Card>
        </div>
     </div>
    )
}