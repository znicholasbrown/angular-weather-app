weather.directive('weatherCurrent', function() { 
  return { 
    restrict: 'EA', 
    scope: { 
      info: '=info' 
    }, 
    templateUrl: 'js/directives/weather-current.html' 
  }; 
});
  