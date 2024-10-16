const userTab = document.querySelector("[userTab]")
const serachTab = document.querySelector("[serachTab]")
const submitBtn = document.querySelector("[submitBtn]")
const searchInput = document.querySelector("[searchInput]")
const formSubmit = document.querySelector(".formSubmit")
const grantAccessBtn = document.querySelector("[grantAccessBtn]")
const weatherInfo = document.querySelector(".weatherInfo")
const grantAccessContainer = document.querySelector(".grantAccessContainer")
const loadingBar = document.querySelector(".loadingBar")

const API_KEY = "700e7f2833f5750201136e56a8d9fc34"

let currTab = userTab;
currTab.classList.add("currTab")

getCurrLocation()
function swithTab(clickedTab) {
    if (currTab !== clickedTab) {
        currTab.classList.remove("currTab")
        currTab = clickedTab
        currTab.classList.add("currTab")

        if (formSubmit.classList.contains("active")) {
            formSubmit.classList.remove("active")
            weatherInfo.classList.remove("active")
            getCurrLocation()
        }
        else {
            formSubmit.classList.add("active")
            weatherInfo.classList.remove("active")
            grantAccessContainer.classList.remove("active")

        }
    }

}


userTab.addEventListener("click", function () {
    swithTab(userTab)
})


serachTab.addEventListener("click", function () {
    swithTab(serachTab)
})


grantAccessBtn.addEventListener("click", function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    else {
        console.log("Geolocation is not supported by this browser.")
    }
    
})
function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    }

    sessionStorage.setItem("coordinatesValues",JSON.stringify(userCoordinates))
    getWeather(userCoordinates)
}


submitBtn.addEventListener("click", async function (e) {
    e.preventDefault()
    loadingBar.classList.add("active")
    let city = searchInput.value
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        const data = await response.json()
        weatherInfo.classList.add("active")
        loadingBar.classList.remove("active")
        fillWeatherDetails(data)
    }
    catch(err){
        console.log(err)
    }

})


function fillWeatherDetails(data){
    const cityName = document.querySelector("[city]")
    const nationFlag = document.querySelector("[nationFlag]")
    const weatherCondition = document.querySelector("[weatherCondition]")
    const weatherImg = document.querySelector("[weatherImg]")
    const temp = document.querySelector("[temp]")
    const windSpeedCalculation = document.querySelector("[windSpeedCalculation]")
    const humidityPercentage = document.querySelector("[humidityPercentage]")
    const cloudPercentage = document.querySelector("[cloudPercentage]")
    
    console.log(data)
    cityName.innerHTML = data?.name
    nationFlag.src = `https://flagcdn.com/144x108/${data?.sys?.country?.toLowerCase()}.png`;
    weatherCondition.innerHTML = data?.weather?.[0]?.main
    weatherImg.src = `https://api.openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;    
    temp.innerText = data?.main?.temp+" °C"
    windSpeedCalculation.innerText  = data?.wind?.speed+ " m/s"
    humidityPercentage.innerText  = data?.main?.humidity+ " %"
    cloudPercentage.innerText  = data?.clouds?.all+ " %"
}


async function getWeather(coordinates){
    loadingBar.classList.add("active")
    grantAccessContainer.classList.remove("active")
    const { lat, lon } = coordinates
   try{
       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
       const data = await response.json()
       loadingBar.classList.remove("active")
       weatherInfo.classList.add('active')
       fillWeatherDetails(data)
   }
   catch(err){
    console.log(err)
   }
}


async function getCurrLocation(){
    const localCoordinates = sessionStorage.getItem("coordinatesValues")
    if (localCoordinates) {
        const coordinates=await JSON.parse(localCoordinates)
        getWeather(coordinates)
    }
    else {
        grantAccessContainer.classList.add("active")
    }
}
