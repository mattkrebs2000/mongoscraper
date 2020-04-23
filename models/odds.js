var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var oddsSchema = new Schema({

    team: {
        type: String,
        required: true,
        unique: true

    },

    odds: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"

    }
});

var odds = mongoose.model("odds", oddsSchema);

module.exports = odds; 