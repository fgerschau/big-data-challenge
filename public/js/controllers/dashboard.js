bigDataApp.controller('dashboardController', function ($scope, raceService) {
  $scope.weatherChartData = [];
  $scope.topTenRacers = [];
  $scope.thunderyTracks = [];

  var CHART_COLORS = [
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
  ];

  function createPieChart(data, labels, context, text) {
    new Chart(context, {
      type: 'pie',
      options: {
        title: {
          display: true,
          text: text,
        }
      },
      data: {
        labels: labels,
        datasets: [{
          label: 'Weather probability',
          data: data,
          backgroundColor: CHART_COLORS,
          borderColor: CHART_COLORS,
          borderWidth: 1,
        }],
      },
    });
  }

  function createBarChart(data, labels, context, text) {
    new Chart(context, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: text,
          data: data,
          backgroundColor: CHART_COLORS,
          borderColor: CHART_COLORS,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });
  }

  function mapMonth(month) {
    var MONTHMAP = {
      1: 'Januar',
      2: 'Februar',
      3: 'März',
      4: 'April',
      5: 'Mai',
      6: 'Juni',
      7: 'Juli',
      8: 'August',
      9: 'September',
      10: 'Oktober',
      11: 'November',
      12: 'Dezember',
    };

    return MONTHMAP[month] || 'Nicht zugeordnet';
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

    createPieChart(chartData, labels, weatherContext, 'Vergleich Sonniges Wetter Rennbahnen in %');
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

  raceService.countRacesPerMonth().then(function (data) {
    $scope.racesCount = data;
    data = data.sort(function (a, b) {
      return a._id > b._id;
    });

    var chartData = data.map(function (item) {
      return (item.races * 100).toFixed(2);
    });

    var labels = data.map(function (item) {
      return mapMonth(item._id);
    });

    var monthContext = document.getElementById('monthRaceChart');
    createBarChart(chartData, labels, monthContext, '# Rennen');
  });

  raceService.getTopTenTotalMoneyRacers().then(function (data) {
    for (var i = 0; i < data.length; i++) {
      data[i].totalMoneyWon = data[i].totalMoneyWon.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') + '€';
    }
    $scope.topTenEarningRacers = data;
  });
});
