bigDataApp.service('raceService', function ($http) {
  function responseData(response) {
    return response.data;
  }

  this.getTrackIdsWeatherCount = function (weather, options) {
    options = options || {};
    return $http.get('/api/race/tracks/weather-count/' + weather, options).then(responseData);
  };

  this.getTopTenRacers = function () {
    return $http.get('/api/race/racers/top-ten').then(responseData);
  };

  this.countRacesPerMonth = function () {
    return $http.get('/api/race/count-per-month').then(responseData);
  };

  this.getTopTenTotalMoneyRacers = function () {
    return $http.get('/api/race/top-ten-earning-racers').then(responseData);
  };
});
