window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let iconApi = document.querySelector('.icon');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=08bfbbb0c32105a13648319d36145f24`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(result => {
                    console.log(result);

                    let temp = result.main.temp;
                    //const { temperature, summary } = data.currently;
                    //Set DOM Elements from the API

                    //Convert Kelvin to Farenheit
                    //F = 9/5(K - 273) + 32
                    temp = (9 / 5) * (temp - 273) + 32;
                    temp = Math.round(temp);

                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = result.weather[0].description;
                    locationTimezone.textContent = result.name;

                    //FORMULA to CELSIUS
                    let celsius = (temp - 32) * (5 / 9);
                    // let celsius = temp - 273.15;


                    //Set the ICON
                    const wIcon = result.weather[0].icon;
                    iconApi.innerHTML = `<img src="icons/${wIcon}.png">`;
                    //iconApi = `http://openweathermap.org/img/wn/10d@4x.png`;

                    //Change F to C
                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.round(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = Math.round(temp);
                        }
                    })


                });
        });


    } else {
        h1.textContent = "Hey this is not working!"
    }


});

