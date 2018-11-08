var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String, required: true, trim: true},
  email: {type: String, required: true, index: true, unique: true, trim: true},
  //unique는 몽고디비가 알아서 처리해준다. 중복없이
  password: {type: String},
  createdAt: {type: Date, default: Date.now}
  //생성 날짜
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var User = mongoose.model('User', schema);

module.exports = User;
//모듈을 require하여서 변수를 받는데, 지금 User을 return하고 있는 것이다. 