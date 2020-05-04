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







// mongoose.connect("mongodb://localhost/oddsscraper", { useUnifiedTopology: true, useNewUrlParser: true });

var url = "mongodb://localhost/oddsscraper";
var urll = process.env.MONGODB_URI;

//This is showing up and seems to be working. See app.js Line 20.

app.get("/scrape", function (req, res) {

    mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/oddsscraper", function (err, db) {
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


//This Get route works (verified in the node console) AND is required in order for the "Saved" odds to show up --- connected to app.js line 6. 

app.get("/saved", function (req, res) {

    db.saved.find({})
        .then(function (dbSaved) {
            res.json(dbSaved);
            console.log("anyone?" + dbSaved);
            console.log(dbSaved[0].team);
            console.log("Check A ");

        })
        .catch(function (err) {

            res.json(err);
        });
        
});



//This is GET from SCRAPE working at app.js Line 53. 

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

//This GET AND SAVE works and coincides with app.js line 79. But does not refresh automatically. 

app.get("/odds/:id", function (req, res) {
    console.log(req.params.id)
    db.odds.findOne({ _id: req.params.id })



        // .populate("saved")
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
            location.reload();

        })
        .catch(function (err) {

          
        })
});




//THis GET AND DELETE route works and coincides with the function on app.js line 117. 

app.get("/deleteodds/:id", function (req, res) {
    console.log("this has been found" + req.params.id)
    db.saved.findOne({ _id: req.params.id })
    .then(function (savedss) {
      console.log("this is the item" + savedss);
    
      if (!savedss) {
        res.send(false);
        
      } else {
        db.saved
          .deleteOne(savedss)
          .then(function (data) {
           
          });
      }
    });

});





//This is the POST route for submitting notes. "/submit" is alluded to in the html of thae button. This works but only posts to one team. Doesn't post to different teams based on the button you click. I took out the HTML that corresponded to this post request

app.post("/submit", function (req,res) {

db.note.create(req.body)
.then(function(dbNote){
    console.log("Here is a NOTE" +dbNote)
    var title = dbNote.title;
    var body = dbNote.body; 

return db.saved.findOneAndUpdate(
  {_id:req.body.id},
  { $push: { notes: title, notes:body } },
  { new: true }
);
    })
    .then(function(dbSaved){
        console.log("Look here" + dbSaved);

        res.json(dbSaved);

    })
    .catch(function(err) {
    res.json(err);

    });
});

app.get("/notes", function(req,res){

console.log("excel" + res);
db.note.find({})
.then(function(dbnote){

    res.json(dbnote)

    .catch(function(err){

        res.json(err);
    });


});

})


// app.get("/makeanote/:team",function(req,res){
//    db.note.create(req.body)
//  console.log("Its here " + req.params.team + req.params.odds)
//     .then(function (note) {
//       console.log("this is the item" + note);
    
      
           
//           });
//         });
  





app.get("/saved/:id", function (req, res) {
    console.log(req.params.id)
    db.saved.findOne({ _id: req.params.id })

        .populate("note")


        .then(function (dbodds) {
            var newSaved = {}
            newSaved.team = dbodds.team
            newSaved.odds = dbodds.odds
            newSaved.note = dbodds.note

            console.log(newSaved)
            newSavedArray.push(newSaved)

           
            db.saved.create(JSON.stringify(newSaved))
        
            res.json(newSaved);
        })
        .catch(function (err) {

            res.json(err);
        })
});


// app.post("/saved/:id",function(req,res){

// db.note.create(req.body)
// .then(function(dbnote){

//     return db.note.findOneAndUpdate(
//       { _id: req.params.id },
//       { note: dbnote._id },
//       { new: true }
//     );



// })
// .then(function(dbsaved){

//     console.log("Is it alive " + dbsaved);

// })
// .catch(function(err){

//     res.json(err);
// });

// });




// app.get("/notes/:id", function (req, res) {
//   console.log(req.params.id);
//   db.note
//     .find({ _id: req.params.id })


//     .then(function (notes) {
//      console.log(notes)
//     })
//     .catch(function (err) {
//       res.json(err);
//     });
// });

//attributes to a specific team. 

// app.post("/submit", function(req,res){
 
//     // var thisId = $(this).attr("data-id");
// console.log("something" + req.body)

//     db.note.create(req.body)
//     .then(function(dbnote) {
//         console.log("this is somethign" + dbnote);

//         return db.saved.findOneAndUpdate(
//             {id: thisId},
//             {$push:{note:dbnote.body}},
//             {new:true}
//         );
        
//     })
//     .then(function(dbsaved){


//         res.json(dbsaved);
//          console.log("saved" + dbsaved);
      
//     })
//     .catch(function (err){

//     });
   
// });







app.listen(Port, function () {
  console.log("App running on port " + Port);
});