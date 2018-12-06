const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  competition: { type: Schema.Types.ObjectId, ref: 'Competition' },
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});
var Favorite = mongoose.model('Favorite', schema);

module.exports = Favorite;

//넘버 오르는 사람,,,,,,,,라우터 ++를 없앰,,,,,db를 어떻게 설계
//favorite라는 컬렉션을 하나 만듬, 이런 문서 안에다 기록해놓으면된다. 
//save해야 한다. 

/*
Favorite.find({user})

저장하고 보여주는 로직? 

User 테이블에 favorite를 추가하고
이것의 [docs]로 만들면 할 수 있다. 
user에
favorites에 default에 0을 넣어놨다가,,,
몽고 디비에서 하는 방식이다.
둘다 가능한 것이다. 
question에 answer을 추가한 것과 똑같은 것이라고 볼 수 있다. 
*/