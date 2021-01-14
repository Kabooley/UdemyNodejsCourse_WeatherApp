const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Teddy",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Teddy",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Teddy",
  });
});

// /weather?adress=で入力されたアドレスをqueryから取得する
// (npm package: requestを使うらしい)geocode.jsにアドレスを渡す
// geocodeからforecast
// 実際の転機を取得して表示する
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  // error時、geocodeDataはundefinedになる
  geocode(
    req.query.address,
    // デフォルト引数を用意しておくことで
    // 無効なHTTPエンドポイントに
    // 対してクラッシュを起こさないで済む
    (geocodeError, { latitude, longitude, location = "Tokyo" } = {}) => {
      if (geocodeError) {
        res.send({
          error: geocodeError,
        });
      }
      forecast(latitude, longitude, (forecastError, forecastData) => {
        if (forecastError) {
          res.send({
            error: forecastError,
          });
        }

        const { location, current } = forecastData;

        // 一旦使用しない
        // res.render("forecast", {
        //   title: "Forecast",
        //   name: "Teddy",
        //   locationName: location.name,
        //   country: location.country,
        //   weatherDiscription: current.weather_descriptions[0],
        //   weatherIcon: current.weather_icons[0],
        //   temperature: current.temperature,
        //   precip: current.precip,
        //   feelslike: current.feelslike,
        // });

        res.send({
          title: "Forecast",
          name: "Teddy",
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Teddy",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Teddy",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
