var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

//scraping tools

var axios = require("axios");
var cheerio = require("cheerio");

//Requiring all models

var db = require("./models");

var Port = 3000;

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//make a "public" a static folder
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/articles", { useUnifiedTopology: true, useNewUrlParser: true });

app.get("/scrape", function (req, res) {

    axios.get("https://www.vegasinsider.com/nfl/odds/futures/").then(function
        (response) {
        var $ = cheerio.load(response.data);
        var teamResults = [];
        var oddsResults = [];
        var teamandodds = [];

        $("td.font-bold").each(function (j, element) {

            var team = $(element).text();
            teamResults.push({
                team: team
            });
        });

        $("td.last").each(function (i, elements) {
            var odds = $(elements).text();
            oddsResults.push({
                odds: odds
            });
        });

        for (k = 0; k < 32; k++) {
            
       teamandodds.push(teamResults[k].team+
        ": "+ oddsResults[k].odds)
        }
       console.log(teamandodds);
    });

});

app.get("/odds", function (req, res) {

    db.odds.find({})
        .then(function (dbodds) {
            res.json(dbodds);

        })
        .catch(function(err) {
            res.json(err);
        });
});

app.listen(Port, function () {
    console.log("App running on port " + Port);
})
