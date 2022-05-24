const city = document.querySelector('.city');
const cidade = document.querySelector('.form-control');
const date = document.querySelector('.date');
const temp_number = document.querySelector('.temp div');
const temp_unit = document.querySelector ('.temp span')
const clima_desc = document.querySelector('.desc');
const ventos = document.querySelector('.vento div');
const vento_unit = document.querySelector (".vento span");
const humidity = document.querySelector('.humidity div');
const humidity_unit = document.querySelector (".humidity span");
const precip = document.querySelector('.precip div');
const precip_unit = document.querySelector (".precip span");
const icones_img = document.querySelector('.icones');
const diaSemana = document.querySelector('.dayweek');
// ----------------- definições de variaveis, ultilizando querySelector = Retorna o primeiro elemento dentro do documento (usando ordenação em profundidade, pré-ordenada e transversal dos nós do documento) que corresponde ao grupo especificado de seletores.
// element = document.querySelector(selectors);


function Clima() { //Função fetch, buscar dados na api
  fetch("https://weatherdbi.herokuapp.com/data/weather/" + cidade.value)
  .then(response => {
    console.log(response);
    if (response.status == "400") {
        throw new Error(`Erro https: status ${response.status}- Rejected characters in query "${cidade.value}"`);
    }
    return response.json();
})
.catch(error => {
    alert(error.message)
})
.then(response => {
    mostraResultado(response)  
});
}

function mostraResultado(clima) { //Função para mostrar os dados na tela
  console.log(clima);
  if (clima.status == "fail"){
    alert(clima.message + ": " + clima.query + " -  City does not exist" );
    return ;
  }

  city.innerText = clima.region;
  let now = new Date();
  date.innerText = dateBuilder(now);
  diaSemana.innerHTML = clima.currentConditions.dayhour;  
  clima_desc.innerHTML = clima.currentConditions.comment;
  temp_number.innerHTML = clima.currentConditions.temp.c;
  temp_unit.innerHTML = 'ºC';
  icones_img.innerHTML = `<img style="height: 35% ; width: 35%" src="${clima.currentConditions.iconURL}">`;
  ventos.innerHTML = "Wind: " + clima.currentConditions.wind.km;
  vento_unit.innerHTML = "km/h";
  humidity.innerHTML = "Humidity: " + clima.currentConditions.humidity;
  precip.innerHTML = "Precipitation: " + clima.currentConditions.precip;
}

function dateBuilder(d) { //função para obter data, usa algumas funções do proprio JS para obter a data (achei a função pronta na net)
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let day = days[d.getDay()]; //getDay: 0-6
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${date} de ${month} - ${year}`;
}
 
