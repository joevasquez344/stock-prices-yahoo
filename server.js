const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const yahooStockPrices = require("yahoo-stock-prices");

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.send("Test Route");
});

app.get("/prices", (req, res) => {
  yahooStockPrices.getHistoricalPrices(
    3,
    2,
    2016,
    3,
    9,
    2016,
    "JNJ",
    "1d",
    function (err, prices) {
      console.log(prices);
      res.render("chart", { prices });
    }
  );
});

app.get("/price", (req, res) => {
  yahooStockPrices.getCurrentPrice("AAPL", function (err, price) {
    console.log(price);
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
