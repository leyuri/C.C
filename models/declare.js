//신고
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

var schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User'},
  competition: { type: Schema.Types.ObjectId, ref: 'Competition'},
  answer: { type: Schema.Types.ObjectId, ref: 'Answer.content'},
  declare_reason: {type: String, trim: true}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});
var Declare = mongoose.model('Declare', schema);

module.exports = Declare;
