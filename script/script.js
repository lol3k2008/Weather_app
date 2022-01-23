// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const humity = document.querySelector(`.humity p`);
const text = document.querySelector(`.text`);
const celsius = document.querySelector(`.celsius`);
const cityName = document.querySelector(`.cityName`);
const ico = document.querySelector(`.ico`);
const input = document.querySelector(`input`);
const btn = document.querySelector(`button`);
const warning = document.querySelector(`.warning`);

ico.setAttribute(`src`, `img/sun.svg` )

const link = `https://api.openweathermap.org/data/2.5/weather?q=`
let city;
let url;
const lang = `&lang=pl`
const key = `&appid=f2cd14ee1eebe5668e4726590f851271`;
const metrics = `&units=metric`

const getWeather = () =>{
       city = (!input.value) ? 'Polska': input.value; 
    url = link+city+lang+key+metrics;
    
    if(input.value != ``){
      input.value = ``;
      warning.textContent = ``;
    }

    // if(input.value == ``){warning.textContent = `Podaj nazwe miasta!`
    // console.log(`brak info`)};

    axios.get(url)
    .then(res => {
      humity.textContent = `${res.data.main.humidity}%` 
    const description = Object.assign ({}, ...res.data.weather);
    text.textContent = `${description.description}`
    const temp = Math.floor(res.data.main.temp)
    celsius.textContent =`${temp}℃`;
    cityName.textContent = res.data.name;

    if(description.id >= 200 & description.id <= 232){
      ico.setAttribute(`src`, `img/thunder.svg`)}
  
  else if(description.id >= 300 & description.id <= 321){
  ico.setAttribute(`src`, `img/Rain_Light.svg`)}
  
  else if(description.id >= 500 & description.id <= 531){
  ico.setAttribute(`src`, `img/Rain_Heavy.svg`)}

  else if(description.id >= 600 & description.id <= 622){
  ico.setAttribute(`src`, `img/Snow_2.svg`)}
  
  else if(description.id === 800){
    ico.setAttribute(`src`, `img/sun.svg`)}
    
    else if(description.id >= 801 & description.id <= 804){
      ico.setAttribute(`src`, `img/Cloud.svg`)}
      
      else if(description.id === 741){
        ico.setAttribute(`src`, `img/fog.svg`)}
        
 })   
 .catch(err => {
   warning.textContent = `Podaj prawidłowa nazwe miasta!`
 console.log(err)})
}

getWeather()

const keyDown = () =>{
    if(event.keyCode === 13) getWeather()
}


btn.addEventListener(`click`, getWeather);

input.addEventListener(`keydown`, keyDown);
