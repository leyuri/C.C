const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const Favorite = require('../models/favorite');
const Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String, required: true, trim: true},
  email: {type: String, required: true, index: true, unique: true, trim: true},
  password: {type: String},
  address: {type: String},
  sex: {type: String},
  birthday: {type: String},
  facebook: {id: String, token: String, photo: String},
  kakaotalk: {id: String, token: String, photo: String},
  google: {id: String, token: String, photo: String},
  favorite: [{type: Schema.Types.ObjectId, ref: 'Competition'}],
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

schema.methods.generateHash = function(password) {
  return bcrypt.hash(password, 10); // return Promise
};

schema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password); // return Promise
};

var User = mongoose.model('User', schema);

module.exports = User;
