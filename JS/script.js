//import apiKey from "config.js";

const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".input-txt"),
inputField = inputPart.querySelector("input");
locationBtn = inputPart.querySelector("button");
weatherIcon = document.querySelector(".meteo-part img");
arrowBack = wrapper.querySelector("header i");

let api;


const apiKey = '42d544e680c341efc1045561c86fac01';

inputField.addEventListener("keyup", e =>{
    /* Si on appuis sur le bouton entrer et que la valeur n'est pas vide */
    if(e.key == "Enter" && inputField.value != "")
    {
        requestApi(inputField.value);
    }
});


locationBtn.addEventListener("click", () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSucess, onError);

    }else{
        alert("Ton navigateur ne supporte pas l'api geolocalisation");
    }
});

function onSucess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    fetchData();

}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
    
}

function requestApi(ville){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&appid=${apiKey}`;
    fetchData();

    /*infoTxt.innerText = "Obtenir les details de la meteo....";
    infoTxt.classList.add("pending");

    fetch(api).then(response => response.json()).then(result => meteoDetails(result));*/

}

function fetchData(){
    //document.getElementById("infoTxt").innerText ="Obtenir les details de la meteo...";     

    /*infoTxt.innerText = "<p> Entrer une ville existante </p> ";
    infoTxt.classList.add("pending");*/

    fetch(api).then(response => response.json()).then(result => meteoDetails(result));
}


function meteoDetails(info){
    //infoTxt.classList.replace("pending", "error");
    if(info.code == "404"){
        infoTxt.innerText = `${inputField.value} ville non existante`;
        //infoTxt.classList.replace("pending", "error");
    }else{
        //infoTxt.classList.remove("pending", "error");

        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        //on utilise l'icon meterologique en fonction de id que l api nous donne

        if(id == 800){
            weatherIcon.src = "Weather Icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            weatherIcon.src = "Weather Icons/storm.svg";
        }else if(id >= 600 && id <= 632){
            weatherIcon.src = "Weather Icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            weatherIcon.src = "Weather Icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            weatherIcon.src = "Weather Icons/cloud.svg";
        }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
            weatherIcon.src = "Weather Icons/rain.svg";
        }
        
        wrapper.querySelector(".temperature .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".meteo").innerText = description;
        wrapper.querySelector(".localisation span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temperature .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;



        wrapper.classList.add("active");
        //console.log(info);
        
    }
}

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
})


 











