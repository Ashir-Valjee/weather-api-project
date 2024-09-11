console.log(`hello2`);
// ======================================
// Gathering and storing city name from form

const form = document.querySelector(`form`);

function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);
  // console.log(formData);

  const myObj = Object.fromEntries(formData);

  localStorage.setItem("formData", JSON.stringify(myObj));
  window.location.reload();
}

form.addEventListener(`submit`, handleSubmit);
const storedObject = JSON.parse(localStorage.getItem("formData"));
console.log("Retrieved Object:", storedObject);

// ====================================
myApiKey = `J5VKYG78WCJS2N69J733FX8NK`;
city = storedObject.city;
url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=current%2Cdays&key=J5VKYG78WCJS2N69J733FX8NK&contentType=json`;
async function getWeatherData() {
  const response = await fetch(url);
  console.log(response);
  const json = await response.json();

  const weatherInfo = json.days;
  console.log(weatherInfo);
  return weatherInfo;
}

// getWeatherData();

const pageHeaderContainer = document.getElementById(`page-header`);
const weatherInfoContainer = document.getElementById(
  `weather-description-container`
);

const pageHeader = document.createElement(`h1`);
pageHeader.textContent = `Weather in ${city}`;
pageHeaderContainer.appendChild(pageHeader);

const boxDivs = document.querySelectorAll(`.desc-box`);
// console.log(boxDivs.length);

function createParagraph(weatherInfo) {
  for (i = 0; i < boxDivs.length; i++) {
    const dateHeader = document.createElement(`h3`);
    const descriptionParagraph = document.createElement(`p`);
    const tempParagraph = document.createElement(`p`);
    const feelsLikeParagraph = document.createElement(`p`);
    const tempMaxParagraph = document.createElement(`p`);
    const tempMinParagraph = document.createElement(`p`);
    const sunsetParagraph = document.createElement(`p`);
    const sunriseParagraph = document.createElement(`p`);
    const uvindexParagraph = document.createElement(`p`);

    dateHeader.textContent = weatherInfo[i].datetime;
    descriptionParagraph.textContent = weatherInfo[i].description;
    tempParagraph.textContent = `Temperature: ${weatherInfo[i].temp} C`;
    feelsLikeParagraph.textContent = `Feels like: ${weatherInfo[i].feelslike} C`;
    tempMaxParagraph.textContent = `Max temperature: ${weatherInfo[i].tempmax} C`;
    tempMinParagraph.textContent = `Min temperature: ${weatherInfo[i].tempmin} C`;
    sunriseParagraph.textContent = `Sunrise: ${weatherInfo[i].sunrise}`;
    sunsetParagraph.textContent = `Sunset: ${weatherInfo[i].sunset}`;
    uvindexParagraph.textContent = `UV Index: ${weatherInfo[i].uvindex}`;

    boxDivs[i].appendChild(dateHeader);
    boxDivs[i].appendChild(descriptionParagraph);
    boxDivs[i].appendChild(tempParagraph);
    boxDivs[i].appendChild(feelsLikeParagraph);
    boxDivs[i].appendChild(tempMaxParagraph);
    boxDivs[i].appendChild(tempMinParagraph);
    boxDivs[i].appendChild(sunriseParagraph);
    boxDivs[i].appendChild(sunsetParagraph);
    boxDivs[i].appendChild(uvindexParagraph);
  }
}

async function getWeatherToThePage() {
  const weatherInfo = await getWeatherData();
  createParagraph(weatherInfo);
}

getWeatherToThePage();
