var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;

var schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  competition: { type: Schema.Types.ObjectId, ref: 'Competition' },
  content: {type: String, trim: true, required: true},
  numLikes: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});
schema.plugin(mongoosePaginate);  //페이지로 쭉 보여주는 기능을 갖고 있다. 
var Answer = mongoose.model('Answer', schema);

module.exports = Answer;
