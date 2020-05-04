var mongoose = require("mongoose")


var Schema = mongoose.Schema;


var noteSchema = new Schema({
    title: String,
    body: String,
    id:String,
    team: String,
    odds: String
});

var note = mongoose.model("note", noteSchema);

module.exports = note; 