const API_KEY="700e7f2833f5750201136e56a8d9fc34"

const city="brahmapur"
const getUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`


async function getWeather(){
    const response= await fetch(getUrl)
    const data= await response.json()
    console.log(data)
    
}
getWeather()
function getCurrLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    else{
        console.log("Not Supported")
    }
}
function showPosition(position){
    let lat=position.coords.latitude
    let lon=position.coords.longitude
    console.log(lat,lon)
}