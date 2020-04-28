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





//this is also the HTML route for the file index.html
app.use(express.static("public"));







mongoose.connect("mongodb://localhost/mongoscraperproject", { useUnifiedTopology: true, useNewUrlParser: true });

var url = "mongodb://localhost/mongoscraperproject";

// looking for updateMany


app.get("/scrape", function (req, res) {

    mongoose.connect(url, function (err, db) {
        if (err) throw err;

        db.collection("odds").remove(function (err, obj) {
            if (err) throw err;
            console.log(obj.result.n + " document(s) deleted");
        });



    });
    var array = []
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

            // db.odds.create(oddsResults[i])
            //     .then(function (dbodds) {
            //         console.log(dbodds);
            //     })
            //     .catch(function (err) {
            //         console.log(err);
            //     });

        });


        for (k = 0; k < 32; k++) {
            var result = {};
            teamandodds.push(teamResults[k].team +
                ": " + oddsResults[k].odds)

            //    console.log(teamandodds);

            result.team = teamResults[k].team;
            result.odds = oddsResults[k].odds;
            array.push(result)

        }
        console.log(array)
        db.odds.create(array)
            .then(function (dbodds) {
                console.log("hello  ...");
                res.send(dbodds);
            })
            .catch(function (err) {
                console.log(err);
            });

    });

});


    // db.saved.create({ name: "saved odds" })
    //     .then(function (dbSaved) {

    //         console.log(dbSaved);
    //     })
    //     .catch(function (err) {
    //         console.log(err.message);

    //     });

//     app.post("/submit", function (req, res) {

// console.log("this has been hit ");
// console.log("this is what came back " + res.body + " ");

//         db.odds.create(req.body)

//             .then(function (dbodds) {

//                 return db.saved.create({}, {
//                     $push: {
//                         odds: dbodds.odds,
//                         team: dbodds.team
//                     }

//                 }, { new: true });
//             })
//             .then(function (dbSaved) {
//                 res.json(dbSaved);

//             })
//             .catch(function (err) {

//                 res.json(err);
//             });
//     });

    app.get("/saved", function (req, res) {

        db.saved.find({})
            .then(function (dbSaved) {
                res.json(dbSaved);
                console.log("anyone?" + dbSaved)
                console.log(dbSaved.team)

            })
            .catch(function (err) {

                res.json(err);
            });
    });

//     app.get("/populated", function(req,res){


//         db.saved.find({})

//         .populate("odds")
//         .then(function(dbSaved){
//             res.json(dbSaved);
//         })
//         .catch(function(err) {

// res.json(err);

//         });
//     });


   






app.get("/odds", function (req, res) {

    db.odds.find({})

        .then(function (dbodds) {
            console.log("hey", dbodds[0])
            res.json(dbodds);

        })
        .catch(function (err) {
            res.json(err);
        });
});

var newSavedArray =[];

app.get("/odds/:id", function (req, res) {
    console.log(req.params.id)
    db.odds.findOne({ _id: req.params.id })



        // .populate("note")
        .then(function (dbodds) {
            var newSaved ={}
            newSaved.team=dbodds.team
            newSaved.odds=dbodds.odds
            
            console.log("here is a new one"+ newSaved)
            newSavedArray.push(newSaved)

            //was 
            //db.saved.create(JSON.stringify(newSaved))
           
            db.saved.create(newSavedArray)
                .then(function (result) {
                    console.log("hello  ...");
                    res.send(result + "this is the result");
                    res.json(newSaved);
                  
                })
                .catch(function (err) {
                    console.log(err);
                });


            res.json(dbodds);
        })
        .catch(function (err) {

            res.json(err);
        })
});



app.get("/saved/:id", function (req, res) {
    console.log(req.params.id)
    db.odds.findOne({ _id: req.params.id })



        // .populate("note")
        .then(function (dbodds) {
            var newSaved = {}
            newSaved.team = dbodds.team
            newSaved.odds = dbodds.odds

            console.log(newSaved)
            newSavedArray.push(newSaved)

            //was 
            //db.saved.create(JSON.stringify(newSaved))

            db.saved.create(newSavedArray)
                .then(function (result) {
                    console.log("hello  ...");
                    res.send(result + "this is the result");
                    res.json(newSaved);

                })
                .catch(function (err) {
                    console.log(err);
                });


            res.json(dbodds);
        })
        .catch(function (err) {

            res.json(err);
        })
});



// app.post("/odds/:id", function (req, res) {

//     db.note.create(req.body)
//         .then(function (dbnote) {

//             return db.odds.findOneAndUpdate({ _id: req.params.id }, { note: dbodds._id }, { new: true });
//         })
//         .then(function (dbodds) {
//             res.json(dbodds);
//         })
//         .catch(function (err) {
//             res.json(err);
//         });
// });



app.listen(Port, function () {
    console.log("App running on port " + Port);
})

