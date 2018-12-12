//신고
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User'},
  competition: { type: Schema.Types.ObjectId, ref: 'Competition'},
  // answer: { type: Schema.Types.ObjectId, ref: 'Answer'},
  reason: {type: String, trim: true, required: true},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});
// schema.plugin(mongoosePaginate);
var Report = mongoose.model('Report', schema);

module.exports = Report;

