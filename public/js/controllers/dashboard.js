bigDataApp.controller('dashboardController', function ($scope) {
  function createPieChart(data, labels, context) {
    new Chart(context, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Weather probability',
          data: data,
          backgroundColor: [
            '#001524',
            '#000406',
            '#002642',
            '#134074',
            '#8DA9C4',
            '#EEF4ED',
          ],
          borderColor: [
            '#001524',
            '#000406',
            '#002642',
            '#134074',
            '#8DA9C4',
            '#EEF4ED',
          ],
          borderWidth: 1,
        }],
      },
    });
  }

  var weatherContext = document.getElementById('racesCancelled');

  var labels = ['Thunder', 'Rainy', 'Sunny'];
  var data = [0.5, 0.2, 0.3];

  createPieChart(data, labels, weatherContext);
});
