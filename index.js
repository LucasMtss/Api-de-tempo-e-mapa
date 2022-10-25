apiKey = "0e534d9ef449a0660cbde3daf8afefeb";

// let req = new XMLHttpRequest()

var req = new XMLHttpRequest();

let map

map = L.map('map')


const button = document.querySelector("#search");

const input = document.querySelector("#inputCityName");

input.addEventListener("keypress",function(event) {
  if (event.keyCode === 13) {
      button.click();
  }
})

button.onclick = () => {
  const cityName = document.querySelector("#inputCityName");

  req.onloadend = function () {
    resp = req.responseText;

    respObj = JSON.parse(resp);

    writeWeatherInformations(respObj);
  };

  req.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}`
  );
  req.send(null);
};

const createElement = (type, content) => {
  const element = document.createElement(type);
  element.innerHTML = content;
  return element;
};

const writeWeatherInformations = (json) => {
  const container = document.querySelector("#informations");
  container.innerHTML = "";

  container.appendChild(
    createElement(
      "p",
      `Temperatura atual: <strong>${(json.main.temp - 273.15).toFixed(
        2
      )}°C</strong>`
    )
  );
  container.appendChild(
    createElement(
      "p",
      `Temperatura mínima: <strong>${(json.main.temp_min - 273.15).toFixed(
        2
      )}°C</strong>`
    )
  );
  container.appendChild(
    createElement(
      "p",
      `Temperatura máxima: <strong>${(json.main.temp_max - 273.15).toFixed(
        2
      )}°C</strong>`
    )
  );

  const linkIcon = `http://openweathermap.org/img/wn/${json.weather[0].icon}.png`;

  const image = document.createElement("img");
  image.src = linkIcon;
  image.style.width = '70px'
  image.style.height = '70px'

  container.appendChild(image);

  container.appendChild(
    createElement(
      "p",
      `Nascer do Sol: <strong>${new Date(
        json.sys.sunrise * 1000
      ).toLocaleString("pt-BR")}</strong>`
    )
  );
  container.appendChild(
    createElement(
      "p",
      `Pôr do Sol: <strong>${new Date(json.sys.sunset * 1000).toLocaleString(
        "pt-BR"
      )}</strong>`
    )
  );
  container.appendChild(
    createElement(
      "p",
      `Pressão atmosférica: <strong>${json.main.pressure} mb</strong>`
    )
  );

  const divMap = document.querySelector("#map");
  divMap.style.width = "500px";
  divMap.style.height = "500px";
  divMap.style.display = 'block'

  
  map.setView([json.coord.lat, json.coord.lon], 14);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
};
