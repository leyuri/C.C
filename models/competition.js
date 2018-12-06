const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  title: {type: String, trim: true, required: true},
  content: {type: String, trim: true, required: true},
  tags: [String],
  numLikes: {type: Number, default: 0},
  numAnswers: {type: Number, default: 0},
  numReads: {type: Number, default: 0},
  field: {type: String, trim: true, required: false},
  status: {type: String, trim: true, required: false},
  startTime: {type: String, trim: true, required: false},
  endTime: {type: String, trim: true, required: false},
  sponsor: {type: String, trim: true, required: false},
  award: {type: String, trim: true, required: false},
  participant: {type: String, trim: true, required: false},
  image: { data: Buffer, contentType: String,required: false},
  
  homepage: {type: String, trim: true, required: false},
  person: {type: String, trim: true, required: false},
  contact: {type: String, trim: true, required: false},
  location: {type: String, trim: true, required: false},
  // location_map: {type: String, trim: true, required: false},
  // // location_latLng:  {type: String, trim: true, required: false},
  recommend: [{type: Schema.Types.ObjectId, ref: 'Competition'}],
  createdAt: {type: Date, default: Date.now},
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});
schema.plugin(mongoosePaginate);
var Competition = mongoose.model('Competition', schema);

module.exports = Competition;


