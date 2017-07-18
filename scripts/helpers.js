'use strict'

exports.parseSerializedForecastArray = function (string) {
  const paramsMatch = string.match('{.*}');
  const params = paramsMatch ? paramsMatch[0].split(';') : [];

  const forecasts = [];
  const probabilities = [];
  for (let i = 0; i < params.length; i++) {
    const param = params[i];
    if (param.indexOf('s:') !== -1) {
      const paramLength = parseInt(param.match('[0-9]{1,2}'), 10);
      const weather = param.match(`".{${paramLength}}"`)[0].substring(1, paramLength + 1);
      forecasts.push(weather);
    } else if (param.indexOf('i:') !== -1) {
      let probability = param.match('[0-9]{1,3}');
      probability = probability.length ? parseInt(probability[0], 10) : null;
      if (probability.toString()) {
        probabilities.push(probability);
      }
    }
  }

  if (forecasts.length !== probabilities.length) {
    return null;
  }

  const forecastObjects = [];
  for (let i = 0; i < forecasts.length; i++) {
    const forecast = forecasts[i];
    const probability = probabilities[i] / 100;
    forecastObjects[i] = {
      forecast,
      probability,
    };
  }

  return forecastObjects;
};
