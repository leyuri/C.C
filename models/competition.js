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
  startTime: {type: String, trim: true, required: false},
  endTime: {type: String, trim: true, required: false},
  sponsor: {type: String, trim: true, required: false},
  award: {type: String, trim: true, required: false},
  image: { data: Buffer, contentType: String,required: false},
  participant: {type: String, trim: true, required: false},
  homepage: {type: String, trim: true, required: false},
  person: {type: String, trim: true, required: false},
  contact: {type: String, trim: true, required: false},
  locatinon: {type: String, trim: true, required: false},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});
schema.plugin(mongoosePaginate);
var Competition = mongoose.model('Competition', schema);

module.exports = Competition;


// .form-group
//   label(for="homepage") 홈페이지
//   input.form-control(type="text", name="homepage", placeholder="homepage url?", value=competition.homepage)
// .form-group
//   label(for="person") 담당자
//   input.form-control(type="text", name="person", placeholder="What's your person?", value=competition.person)
// .form-group
//   label(for="contact") 연락처
//   input.form-control(type="text", name="contact", placeholder="What's your contact?", value=competition.title)

