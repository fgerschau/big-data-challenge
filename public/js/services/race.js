bigDataApp.service('raceService', function ($http) {
  function responseData(response) {
    return response.data;
  }

  this.getTrackIdsWeatherCount = function (weather) {
    return $http.get('/api/race/tracks/weather-count/' + weather).then(responseData);
  };

  this.getTopTenRacers = function () {
    return $http.get('/api/race/racers/top-ten').then(responseData);
  };
});
