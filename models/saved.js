var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var savedSchema = new Schema({
  team: {
    type: String,
    unique: true,
  },
  odds: {
    type: String,
  },

  note: {
    type: Schema.Types.ObjectId,
    ref: "note",
  },
});

var saved = mongoose.model("saved", savedSchema);

module.exports = saved; 