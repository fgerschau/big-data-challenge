bigDataApp.controller('dashboardController', function ($scope, raceService) {
  $scope.weatherChartData = [];
  $scope.topTenRacers = [];
  $scope.thunderyTracks = [];

  function createPieChart(data, labels, context) {
    new Chart(context, {
      type: 'pie',
      options: {
        title: {
          display: true,
          text: 'Vergleich Sonniges Wetter Rennbahnen in %',
        }
      },
      data: {
        labels: labels,
        datasets: [{
          label: 'Weather probability',
          data: data,
          backgroundColor: [
            '#41337A',
            '#E8871E',
            '#EF5D60',
            '#3E4E50',
            '#000406',
            '#002642',
            '#134074',
            '#8DA9C4',
            '#EEF4ED',
            '#A10702',
            '#001524',
            '#C3615E',
          ],
          borderColor: [
            '#41337A',
            '#E8871E',
            '#EF5D60',
            '#3E4E50',
            '#000406',
            '#002642',
            '#134074',
            '#8DA9C4',
            '#EEF4ED',
            '#A10702',
            '#001524',
            '#C3615E',

          ],
          borderWidth: 1,
        }],
      },
    });
  }

  var weatherContext = document.getElementById('weatherPie');

  raceService.getTrackIdsWeatherCount('sunny').then(function (data) {
    var labels = data.map(function (item) {
      return item.trackId;
    });

    var sum = 0;
    for (var i = 0; i < data.length; i++) {
      sum += data[i].weatherCount;
    }

    var chartData = data.map(function (item) {
      var percentage = item.weatherCount / sum * 100;
      return percentage.toFixed(0)
    });

    createPieChart(chartData, labels, weatherContext);
    $scope.weatherChartData = data; // for placeholder directive
  });

  raceService.getTopTenRacers().then(function (racers) {
    $scope.topTenRacers = racers;
  });

  var optionsThunderCount = {
    sort: true,
  };

  raceService.getTrackIdsWeatherCount('thundery', optionsThunderCount).then(function (data) {
    $scope.thunderyTracks = data.slice(0, 3);
  });
});
