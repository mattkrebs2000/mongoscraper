// require('dotenv').config();

// var express = require("express");
// var logger = require("morgan");

// var mongoose = require("mongoose");
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/oddsscraper",{ useUnifiedTopology: true, useNewUrlParser: true });



// //scraping tools

// var axios = require("axios");
// var cheerio = require("cheerio");

// //Requiring all models

// var db = require("./models");

// const Port = process.env.PORT || 3000;

// var app = express();

// app.use(logger("dev"));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// //make a "public" a static folder





// //this is also the HTML route for the file index.html
// app.use(express.static("public"));









// // var url = "mongodb://localhost/mongoscraperproject";


// //This is showing up and seems to be working. See app.js Line 20.

// app.get("/scrape", function (req, res) {

  
//     var array = []
//     axios.get("https://www.vegasinsider.com/nfl/odds/futures/").then(function
//         (response) {
//         var $ = cheerio.load(response.data);
//         var teamResults = [];
//         var oddsResults = [];
//         var teamandodds = [];

//         $("td.font-bold").each(function (j, element) {

//             var team = $(element).text();
//             teamResults.push({
//                 team: team
//             });

//         });

//         $("td.last").each(function (i, elements) {
//             var odds = $(elements).text();
//             oddsResults.push({
//                 odds: odds
//             });

//             // db.odds.create(oddsResults[i])
//             //     .then(function (dbodds) {
//             //         console.log(dbodds);
//             //     })
//             //     .catch(function (err) {
//             //         console.log(err);
//             //     });

//         });


//         for (k = 0; k < 32; k++) {
//             var result = {};
//             teamandodds.push(teamResults[k].team +
//                 ": " + oddsResults[k].odds)

//             //    console.log(teamandodds);

//             result.team = teamResults[k].team;
//             result.odds = oddsResults[k].odds;
//             array.push(result)

//         }
//         db.odds.remove(function (err, obj) {
//             if (err) throw err;
//             console.log(obj.result.n + " document(s) deleted");
//         });

//         console.log(array)
//         db.odds.create(array)
//             .then(function (dbodds) {
//                 console.log("hello  ...");
//                 res.send(dbodds);
//             })
//             .catch(function (err) {
//                 console.log(err);
//             });

//     });

// });


// //This is showing up and seems to be working on load. See app.js on load function.  app.js Line 4 

//     app.get("/saved", function (req, res) {

//         db.saved.find({})
//             .then(function (dbSaved) {
//                 res.json(dbSaved);
//                 console.log("anyone?" + dbSaved)
//                 console.log(dbSaved[0].team)

//             })
//             .catch(function (err) {

//                 res.json(err);
//             });
//     });

   

// //This is working at app.js Line 29. 

// app.get("/odds", function (req, res) {

//     db.odds.find({})

//         .then(function (dbodds) {
//             console.log("hey hey hey", dbodds[0])
//             res.json(dbodds);

//         })
//         .catch(function (err) {
//             res.json(err);
//         });
// });





// var newSavedArray =[];

// //This works and coincides with app.js line 55. But does not refresh automatically. 

// app.get("/odds/:id", function (req, res) {
//     console.log(req.params.id)
//     db.odds.findOne({ _id: req.params.id })



//         // .populate("note")
//         .then(function (dbodds) {
//             var newSaved ={}
//             newSaved.team=dbodds.team
//             newSaved.odds=dbodds.odds
            
//             console.log("here is a new one"+ newSaved)
//             newSavedArray.push(newSaved)

//             //was 
//             //db.saved.create(JSON.stringify(newSaved))
           
//             db.saved.create(newSavedArray)
//                 .then(function (result) {
//                     console.log("hello  ...");
//                     res.send(result + "this is the result");
//                     res.json(newSaved);
                  
//                 })
//                 .catch(function (err) {
//                     console.log(err);
//                 });


//             res.json(dbodds);
            
//         })
//         .catch(function (err) {

//             res.json(err);
//         })
// });


// //This works and coincides with app.js line 74. But does not refresh automatically. 

// app.get("/saved/:id", function (req, res) {
//     console.log(req.params.id)
//     db.saved.findOne({ _id: req.params.id })

//         .then(function (dbodds) {
//             var newSaved = {}
//             newSaved.team = dbodds.team
//             newSaved.odds = dbodds.odds

//             console.log(newSaved)
//             newSavedArray.push(newSaved)

//             //was 
//             //db.saved.create(JSON.stringify(newSaved))

//             db.saved.deleteOne(newSavedArray[0])
//                 .then(function (result) {
//                     console.log("hello  ...");
//                     res.send(result + "this is the result");
//                     res.json(newSaved);

//                 })
//                 .catch(function (err) {
//                     console.log(err);
//                 });


//             res.json(dbodds);
//         })
//         .catch(function (err) {

//             res.json(err);
//         })
// });



// // app.post("/odds/:id", function (req, res) {

// //     db.note.create(req.body)
// //         .then(function (dbnote) {

// //             return db.odds.findOneAndUpdate({ _id: req.params.id }, { note: dbodds._id }, { new: true });
// //         })
// //         .then(function (dbodds) {
// //             res.json(dbodds);
// //         })
// //         .catch(function (err) {
// //             res.json(err);
// //         });
// // });



// app.listen(Port, function () {
//     console.log("App running on port " + Port);
// })

require('dotenv').config();

var express = require("express");
var logger = require("morgan");

var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/oddsscraper",{ useUnifiedTopology: true, useNewUrlParser: true });



//scraping tools

var axios = require("axios");
var cheerio = require("cheerio");

//Requiring all models

var db = require("./models");

const Port = process.env.PORT || 3000;

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//make a "public" a static folder





//this is also the HTML route for the file index.html
app.use(express.static("public"));







mongoose.connect("mongodb://localhost/oddsscraper", { useUnifiedTopology: true, useNewUrlParser: true });

var url = "mongodb://localhost/oddsscraper";


//This is showing up and seems to be working. See app.js Line 20.

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


//This is showing up and seems to be working on load. See app.js on load function.  app.js Line 4 

app.get("/saved", function (req, res) {

    db.saved.find({})
        .then(function (dbSaved) {
            res.json(dbSaved);
            console.log("anyone?" + dbSaved)
            console.log(dbSaved[0].team)

        })
        .catch(function (err) {

            res.json(err);
        });
});



//This is working at app.js Line 29. 

app.get("/odds", function (req, res) {

    db.odds.find({})

        .then(function (dbodds) {
            console.log("hey hey hey", dbodds[0])
            res.json(dbodds);

        })
        .catch(function (err) {
            res.json(err);
        });
});





var newSavedArray = [];

//This works and coincides with app.js line 55. But does not refresh automatically. 

app.get("/odds/:id", function (req, res) {
    console.log(req.params.id)
    db.odds.findOne({ _id: req.params.id })



        // .populate("note")
        .then(function (dbodds) {
            var newSaved = {}
            newSaved.team = dbodds.team
            newSaved.odds = dbodds.odds

            console.log("here is a new one" + newSaved)
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


//This works and coincides with app.js line 74. But does not refresh automatically. 

app.get("/saved/:id", function (req, res) {
    console.log(req.params.id)
    db.saved.findOne({ _id: req.params.id })

        .then(function (dbodds) {
            var newSaved = {}
            newSaved.team = dbodds.team
            newSaved.odds = dbodds.odds

            console.log(newSaved)
            newSavedArray.push(newSaved)

            //was 
            //db.saved.create(JSON.stringify(newSaved))

            db.saved.deleteOne(newSavedArray[0])
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
