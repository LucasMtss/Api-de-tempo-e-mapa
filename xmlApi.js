apiKey = "0e534d9ef449a0660cbde3daf8afefeb";

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
  const loading = document.querySelector("#loading")
  loading.style.display = 'inline-block'
  button.style.display = 'none'
  const cityName = document.querySelector("#inputCityName");

  req.onloadend = function () {
    resp = req.responseXML;

    writeWeatherInformations(resp);
  };

  req.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&mode=xml`
  );
  req.send(null);
};

const createElement = (type, content) => {
  const element = document.createElement(type);
  element.innerHTML = content;
  return element;
};

const writeWeatherInformations = (xml) => {
  const loading = document.querySelector("#loading")
  loading.style.display = 'none'
  button.style.display = 'block'
  const container = document.querySelector("#informations");
  container.innerHTML = "";

  container.appendChild(
    createElement(
      "p",
      `Temperatura atual: <strong>${(xml.getElementsByTagName('temperature')[0].getAttribute('value') - 273.15).toFixed(
        2
      )}°C</strong>`
    )
  );
  container.appendChild(
    createElement(
      "p",
      `Temperatura mínima: <strong>${(xml.getElementsByTagName('temperature')[0].getAttribute('min') - 273.15).toFixed(
        2
      )}°C</strong>`
    )
  );
  container.appendChild(
    createElement(
      "p",
      `Temperatura máxima: <strong>${(xml.getElementsByTagName('temperature')[0].getAttribute('max') - 273.15).toFixed(
        2
      )}°C</strong>`
    )
  );

  const linkIcon = `http://openweathermap.org/img/wn/${xml.getElementsByTagName('weather')[0].getAttribute('icon') }.png`;

  const image = document.createElement("img");
  image.src = linkIcon;
  image.style.width = '70px'
  image.style.height = '70px'

  container.appendChild(image);

  const divMap = document.querySelector("#map");
  divMap.style.width = "500px";
  divMap.style.height = "500px";
  divMap.style.display = 'block'

  city = xml.getElementsByTagName('city')[0]
  coord = city.getElementsByTagName('coord')[0]
  map.setView([coord.getAttribute('lat'), coord.getAttribute('lon')], 14);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
};
