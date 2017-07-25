weather.directive('weatherForecast', function() { 
  return { 
    restrict: 'EA', 
    scope: { 
      info: '=info' 
    }, 
    templateUrl: 'js/directives/weather-forecast.html' 
  }; 
});