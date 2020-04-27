var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var oddsSchema = new Schema({

    team: {
        type: String,

        // required: true,
    },

    odds: {
        type: String,

        // required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"

    }
});

// oddsSchema.methods.newOdd = function () {

//     this.odds = oddsSchema.odds;
//     return this.odds; 
// }


var odds = mongoose.model("odds", oddsSchema);

module.exports = odds; 