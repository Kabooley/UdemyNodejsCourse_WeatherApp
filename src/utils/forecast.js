const request = require("request");

const forecast = (latitude, longitude, callback) => {
  console.log(latitude);
  console.log(longitude);
  const url =
    "http://api.weatherstack.com/current?access_key=57163040d5b1955c5c7b05a3176cb6f8&query=" +
    latitude +
    "," +
    longitude;

  console.log(url);

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, response.body);
    }
  });
};

module.exports = forecast;
