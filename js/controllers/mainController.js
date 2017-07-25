weather.controller('mainController', ['$rootScope', '$scope', 'getData',
  function ($rootScope, $scope, getData) {
    getData.getWeather();

    $rootScope.$on("current-received", function  (){
      $scope.$apply(function () {
        $scope.current = dataCurrent;
      })     
    });
    $rootScope.$on("forecast-received", function  (){
      $scope.$apply(function () {
        $scope.forecast = dataForecast;
      })     
    });
    $rootScope.$on("background-received", function  (){
      $scope.$apply(function () {
        $scope.dynamicBackground = backgroundImage;
        $scope.creditLink = creditLink;
        $scope.creditAuthor = creditAuthor;
      })     
    });
  }]);
