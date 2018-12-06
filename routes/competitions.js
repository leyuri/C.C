const express = require('express');
const Competition = require('../models/competition');
const Answer = require('../models/answer'); 
const User = require('../models/user');
const catchErrors = require('../lib/async-error');
// const Favorite = require('../models/favorite');

const router = express.Router();

// 동일한 코드가 users.js에도 있습니다. 이것은 나중에 수정합시다.
function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', 'Please signin first.');
    res.redirect('/signin');
  }
}

/* GET competitions listing. */
router.get('/', catchErrors(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;



  var query = {};
  const term = req.query.term;
  if (term) {
    query = {$or: [
      {title: {'$regex': term, '$options': 'i'}},
      {content: {'$regex': term, '$options': 'i'}},
      {field: {'$regex': term, '$options': 'i'}},
      {sponsor: {'$regex': term, '$options': 'i'}},
      {award: {'$regex': term, '$options': 'i'}},
      {participant: {'$regex': term, '$options': 'i'}},
      {status: {'$regex': term, '$options': 'i'}},
      {location: {'$regex': term, '$options': 'i'}},
      {tags: {'$regex': term, '$options': 'i'}}
    ]};
  }
  const competitions = await Competition.paginate(query, {
    sort: {createdAt: -1}, 
    populate: 'author', 
    page: page, limit: limit
  });
  res.render('competitions/index', {competitions: competitions, term: term, query: req.query});
}));

router.get('/new', needAuth, (req, res, next) => {
  res.render('competitions/new', {competition: {}});
});

//공모전 관리
router.get('/manage', needAuth, catchErrors(async (req, res, next) => {
  const competitions = await Competition.find({});
  res.render('competitions/manage', {competitions: competitions});
  // res.redirect('competitions/manage');
}));


////////////////////////////////////////////////////////////
//공모전 보관함
router.get('/:id/favorite', needAuth, (req, res, next) => {
  const competition = Competition.findById(req.params.id, function(err, competition) {
    const user = User.findById(req.user.id, function(err, user) {
      user.favorite.push(competition._id);
      user.save(function(err) {
        req.flash('success', 'Successfully Add My ');
        res.redirect('back');
      });
    });
  });
});

// button.a.btn.btn-outline-success(href=href=`/competitions/${competition._id}/favorite`)
// i.fas.fa-heart
// | &nbsp; favorite


// button.a.btn.btn-outline-success(href=`/competitions/${competition._id}/favorite`)
// i.fas.fa-heart
// | &nbsp; favorite


// router.delete('/:id', needAuth, catchErrors(async (req, res, next) => {
//   await Competition.findOneAndRemove({_id: req.params.id});
//   req.flash('success', 'Successfully deleted');
//   res.redirect('/competitions');
// }));

// router.get('/:id/edit', needAuth, catchErrors(async (req, res, next) => {
//   const competition = await Competition.findById(req.params.id);
//   res.render('competitions/edit', {competition: competition});
// }));

// a.btn.btn-outline-danger.need-confirm-btn(href=`/competitions/${competition.id}?_method=delete`) Delete


// router.delete('/:id', needAuth, catchErrors(async (req, res, next) => {
//   await Competition.findOneAndRemove({_id: req.params.id});
//   req.flash('success', 'Successfully deleted');
//   res.redirect('/competitions');
// }));

// router.get('/manage', needAuth, (req, res, next) => {
//   res.render('competitions/manage', {competition: {}});
// });
///////////////////////////////////////////////////////////


router.get('/:id/edit', needAuth, catchErrors(async (req, res, next) => {
  const competition = await Competition.findById(req.params.id);
  res.render('competitions/edit', {competition: competition});
}));




router.get('/:id', catchErrors(async (req, res, next) => {
  const competition = await Competition.findById(req.params.id).populate('author');
  const answers = await Answer.find({competition: competition.id}).populate('author');
  competition.numReads++;    // TODO: 동일한 사람이 본 경우에 Read가 증가하지 않도록???

  await competition.save();
  res.render('competitions/show', {competition: competition, answers: answers});
}));

router.put('/:id', catchErrors(async (req, res, next) => {
  const competition = await Competition.findById(req.params.id);

  if (!competition) {
    req.flash('danger', 'Not exist competition');
    return res.redirect('back');
  }
  competition.title = req.body.title;
  competition.content = req.body.content;
  competition.tags = req.body.tags.split(" ").map(e => e.trim());

  await competition.save();
  req.flash('success', 'Successfully updated');
  res.redirect('/competitions');
}));

router.delete('/:id', needAuth, catchErrors(async (req, res, next) => {
  await Competition.findOneAndRemove({_id: req.params.id});
  req.flash('success', 'Successfully deleted');
  res.redirect('/competitions/manage');
}));

router.post('/', needAuth, catchErrors(async (req, res, next) => {
  const user = req.user;
  var competition = new Competition({
    title: req.body.title,
    author: user._id,
    content: req.body.content,
    field: req.body.field,
    status: req.body.status,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    sponsor: req.body.sponsor,

    location: req.body.location,
    location_map: req.body.location_map,
    location_latLng: req.body.location_latLng,
    lat: req.body.lat,
    lng: req.body.lng,


    award: req.body.award,
    image: req.body.image,
    participant:req.body.participant,
    homepage: req.body.homepage,
    person: req.body.person,
    contact:req.body.contact,


    tags: req.body.tags.split(" ").map(e => e.trim()),
  });
  await competition.save();
  req.flash('success', 'Successfully posted');
  res.redirect('/competitions');
}));

 //create Compeition edit
 router.post('/:id', catchErrors(async (req, res, next) => {
  const competition = await Competition.findById(req.params.id);

  if (!competition) {
    req.flash('danger', 'Not exist competition');
    return res.redirect('back');
  }
  competition.title = req.body.title;
  competition.content = req.body.content;
  competition.field=req.body.field;
  competition.status=req.body.status;
  competition.startTime=req.body.startTime;
  competition.endTime=req.body.endTime;
  competition.sponsor=req.body.sponsor;

  competition.location=req.body.location;

  competition.location_latLng=req.body.location_latLng;
  competition.lat=req.body.lat;
  competition.lng=req.body.lng;
  competition.location_map=req.body.location_map;

  competition.award=req.body.award;
  competition.image=req.body.image;
  competition.participant=req.body.participant;
  competition.homepage=req.body.homepage;
  competition.person=req.body.person;
  competition.contact=req.body.contact;

  competition.tags = req.body.tags.split(" ").map(e => e.trim());
  await competition.save();
  req.flash('success', 'Successfully updated');
  res.redirect('/competitions');
}));


router.post('/:id/answers', needAuth, catchErrors(async (req, res, next) => {
  const user = req.user;
  const competition = await Competition.findById(req.params.id);

  if (!competition) {
    req.flash('danger', 'Not exist competition');
    return res.redirect('back');
  }

  var answer = new Answer({
    author: user._id,
    competition: competition._id,
    content: req.body.content
  });
  await answer.save();
  competition.numAnswers++;
  await competition.save();

  req.flash('success', 'Successfully answered');
  res.redirect(`/competitions/${req.params.id}`);
}));



module.exports = router;
