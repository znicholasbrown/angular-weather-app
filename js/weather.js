var weather = angular.module("weather", ['ngSanitize']);

var dataCurrent, dataForecast = [], backgroundImage, creditLink, creditAuthor;

weather.factory('getData', ['$rootScope', function($rootScope) {
  
  return {
    
    getWeather: function () {
      function getCoords () {
        if (navigator.geolocation) { //gets the user's coordinates from the browser. 
          navigator.geolocation.getCurrentPosition(function (pos) {
            var lat = pos.coords.latitude,
                lon = pos.coords.longitude,
                forecastURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast/daily?lat=" + lat + "&lon=" + lon + "&APPID=22258f6d81e1d7c1558093d6b5a0be17&cnt=6",
                currentURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=22258f6d81e1d7c1558093d6b5a0be17";
            getCurrentData(currentURL);
            getForecastData(forecastURL);
          })
        };
      };
      
      function getCurrentData (currentURL) {
        $.getJSON(currentURL, function (data) {

          dataCurrent = {
            icon: getIcon(data["weather"][0]["id"]),
            temp: Math.floor(data["main"]["temp"] - 273.15) + "°C",
            cond: data["weather"][0]["main"],
            humidity: data["main"]["humidity"] + "%",
            sunrise: convertTime(data["sys"]["sunrise"]),
            sunset: convertTime(data["sys"]["sunset"]),
            location: data["name"]
          }
          getBackground(data["weather"][0]["id"]);
          
          $rootScope.$emit("current-received");
        });
        
      };
      function getForecastData (forecastURL) {
        $.getJSON(forecastURL, function (data) {
          for (var i = 1; i < 6; i++) {
            dataForecast.push({
            icon: getIcon(data["list"][i]["weather"][0]["id"]),
            temp: Math.floor(data["list"][i]["temp"]["day"] - 273) + "°C",
            cond: data["list"][i]["weather"][0]["main"],
            day: convertDay(data["list"][i]["dt"])
          });
          }
          
          $rootScope.$emit("forecast-received")
        });
      };
      
      function getBackground (status) {
        var time = new Date().getHours(), img, credit,
            images = ["images/ClearDay.jpg", "images/ClearNight.jpg", "images/Clouds.jpg", "images/Rain.jpg", "images/Snow.jpg", "images/Default.jpg"],
            photographers = [{link: "https://unsplash.com/@flenjoore", author: "Olu Eletu"}, {link: "https://unsplash.com/@ihor_malytskyi", author: "Ihor Malytskyi"}, {link: "https://unsplash.com/@samuelzeller", author: "Samuel Zeller"}, {link: "https://unsplash.com/@mariocalvo", author: "Mario Calvo"}, {link: "https://unsplash.com/@pitslamp", author: "Filip Bunkens"}, {link: "https://unsplash.com/@ayahya09", author: "Ali Yahya"}];
        
        
        
        switch (status) {
          case 800:
            if (time >= 5 && time <= 19){
              img = images[0];
              credit = photographers[0];
              break;
            } else {
              img = images[1];
              credit = photographers[1];
              break;
            };
          case 801:
          case 802:
          case 803:
          case 804:
            img = images[2];
            credit = photographers[2];
            break;
          case 600:
          case 601:
          case 602:
          case 611:
          case 612:
            img = images[4];
            credit = photographers[4];
            break;
          case 200:
          case 201:
          case 202:
          case 210:
          case 211:
          case 212:
          case 221:
          case 230:
          case 231:
          case 232:
          case 615:
          case 616:
          case 620:
          case 621:
          case 622:
          case 300:
          case 301:
          case 302:
          case 310:
          case 311:
          case 312:
          case 313:
          case 314:
          case 321:
          case 500:
          case 501:
          case 502:
          case 503:
          case 504:
          case 511:
          case 520:
          case 521:
          case 522:
          case 531:
            img = images[3];
            credit = photographers[3];
            break;
          case 906:
          case 900:
          case 781:
          case 741:
          default:
            img = images[5];
            credit = photographers[5];
            break;

        }
        
        backgroundImage = img;
        creditLink = credit.link;
        creditAuthor = credit.author;
        
        $rootScope.$emit("background-received");
      }
      function getIcon (status) {
        var time = new Date().getHours();

        switch (status) {
          case 800:
            if (time >= 5 && time <= 19){
              return '<i class="wi wi-day-sunny"></i>';
            } else {
              return '<i class="wi wi-night-clear"></i>';
            };
          case 801:
          case 802:
          case 803:
            if (time >= 5 && time <= 19){
              return '<i class="wi wi-day-cloudy"></i>';
            } else {
              return '<i class="wi wi-night-alt-cloudy"></i>';
            };
          case 804:
            return '<i class="wi wi-cloudy"></i>';
          case 600:
          case 601:
          case 602:
            return '<i class="wi wi-snow"></i>';
          case 611:
          case 612:
            return '<i class="wi wi-sleet"></i>';
          case 615:
          case 616:
          case 620:
          case 621:
          case 622:
            return '<i class="wi-rain-mix"></i>';
          case 300:
          case 301:
          case 302:
          case 310:
          case 311:
          case 312:
          case 313:
          case 314:
          case 321:
          case 500:
          case 501:
          case 502:
          case 503:
          case 504:
          case 511:
          case 520:
          case 521:
          case 522:
          case 531:
            return '<i class="wi wi-rain"></i>';
          case 200:
          case 201:
          case 202:
          case 210:
          case 211:
          case 212:
          case 221:
          case 230:
          case 231:
          case 232:
            return '<i class="wi wi-thunderstorm"></i>';
          case 906:
            return '<i class="wi wi-hail"></i>';
          case 900:
          case 781:
            return '<i class="wi wi-tornado"></i>';
          case 741:
            return '<i class="wi wi-fog"></i>';
          default:
            return '<i class="wi wi-thermometer"></i>';

        }
      };
      function convertTime (input) {
        var a = new Date(input * 1000),
            hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours(),
            min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(),
            time = hour + ':' + min;
        return time;
      }
      function convertDay (input) {
        var a = new Date(input * 1000);
        var weekday = new Array();
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
                        
        var day = weekday[a.getUTCDay()]
        return day;
      }
      getCoords();

    }
  }
  
  
}]);