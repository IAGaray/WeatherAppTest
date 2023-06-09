const result = document.querySelector('result');
const form = document.querySelector('.get-weather');
const nameCity= document.querySelector('#city');
const nameCountry= document.querySelector('#Country');


form.addEventListener('submit', (e) =>{
    e.preventDefault(); 
// cuando se usa este metodo se previene que se cargue el form al seleccionar algo
    
    if(nameCity.value === '' || nameCountry.value === ''){
        showError('Both fields are required')
        return;
    }

    callAPI(nameCity.value, nameCountry.value)
    // console.log(nameCity.value)
    // console.log(nameCountry.value)
})
function callAPI(city, country){
    const apiId= 'Ingresa tu API AQUI!!!'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`
    //https://api.openweathermap.org/data/2.5/weather?q=santiago,Chile&appid=API
fetch(url)
.then(data =>{
    return (data.json()
    )
})
.then(dataJSON => {
    if(dataJSON.cod === '404'){
        showError('City not found')
    }else{
        showError(dataJSON)
    }
    })
}
function showWeather(data){
    const{

    } = data
}




function showError(message){
    console.log(message)
const alert = document.createElement('p')
alert.classList.add('alert-message')
alert.innerHTML = message;

form.appendChild(alert)
setTimeout(() =>{
    alert.remove()
}, 3000)
}
