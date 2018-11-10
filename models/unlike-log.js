//싫어요
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  competition: { type: Schema.Types.ObjectId, ref: 'Event' },
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});
var UnLikeLog = mongoose.model('UnLikeLog', schema);

module.exports = UnLikeLog;