const express = require('express');
const Competition = require('../../models/competition'); 
const Answer = require('../../models/answer'); 
const Favorite = require('../../models/favorite');
const LikeLog = require('../../models/like-log'); 
const UnLikeLog = require('../../models/unlike-log'); 
const Report = require('../../models/report'); 
const catchErrors = require('../../lib/async-error');
const router = express.Router();

router.use(catchErrors(async (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next({status: 401, msg: 'Unauthorized'});
    //로그인이 되지 않을 경우 401에러가 남
  }
}));

router.use('/competitions', require('../competitions'));


// favorite for Competition
router.post('/competitions/:id/favorite', catchErrors(async (req, res, next) => {
  const competition = await Competition.findById(req.params.id);
  if (!competition) {
    return next({status: 404, msg: 'Not exist competition'});
  }
  var favorite = await Favorite.findOne({author: req.user._id, competition: competition._id});
  if (!favorite) {
    // competition.numLikes++;
    await Promise.all([
      competition.save(),
      Favorite.create({author: req.user._id, competition: competition._id})
    ]);
  }
  return res.json(competition);
}));


// Like for Competition
router.post('/competitions/:id/like', catchErrors(async (req, res, next) => {
  const competition = await Competition.findById(req.params.id);
  if (!competition) {
    return next({status: 404, msg: 'Not exist competition'});
  }
  var likeLog = await LikeLog.findOne({author: req.user._id, competition: competition._id});
  if (!likeLog) {
    competition.numLikes++;
    await Promise.all([
      competition.save(),
      LikeLog.create({author: req.user._id, competition: competition._id})
    ]);
  }
  return res.json(competition);
}));

// unLike for Competition
router.post('/competitions/:id/unlike', catchErrors(async (req, res, next) => {
  const competition = await Competition.findById(req.params.id);
  if (!competition) {
    return next({status: 404, msg: 'Not exist competition'});
  }
  var unlikeLog = await UnLikeLog.findOne({author: req.user._id, competition: competition._id});
  if (!unlikeLog) {
    competition.numunLikes++;
    await Promise.all([
      competition.save(),
      UnLikeLog.create({author: req.user._id, competition: competition._id})
    ]);
  }
  return res.json(competition);
}));


// Like for Answer
router.post('/answers/:id/like', catchErrors(async (req, res, next) => {
  const answer = await Answer.findById(req.params.id);  //db에서 object로 받아옴
  answer.numLikes++;
  await answer.save();  //num을 증가시키고 저장
  return res.json(answer);  //객체 자체를 json object로 저장한다. 
}));

router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: err.status,
    msg: err.msg || err
  });
});

// UnLike for Answer
router.post('/answers/:id/unlike', catchErrors(async (req, res, next) => {
  const answer = await Answer.findById(req.params.id);  //db에서 object로 받아옴
  answer.numunLikes++;
  await answer.save();  //num을 증가시키고 저장
  return res.json(answer);  //객체 자체를 json object로 저장한다. 
}));

router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: err.status,
    msg: err.msg || err
  });
});





module.exports = router;



