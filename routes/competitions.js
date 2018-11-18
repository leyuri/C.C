const express = require('express');
const Competition = require('../models/competition');
const Answer = require('../models/answer'); 
const catchErrors = require('../lib/async-error');

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
      {content: {'$regex': term, '$options': 'i'}}
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
  res.redirect('/competitions');
}));


  // author: { type: Schema.Types.ObjectId, ref: 'User' },
  // title: {type: String, trim: true, required: true},
  // content: {type: String, trim: true, required: true},
  // tags: [String],
  // numLikes: {type: Number, default: 0},
  // numAnswers: {type: Number, default: 0},
  // numReads: {type: Number, default: 0},
  // field: {type: String, trim: true, required: false},
  // startTime: {type: String, trim: true, required: false},
  // endTime: {type: String, trim: true, required: false},
  // sponsor: {type: String, trim: true, required: false},
  // award: {type: String, trim: true, required: false},
  // image: { data: Buffer, contentType: String,required: false},
  // createdAt: {type: Date, default: Date.now}
  // participant: {type: String, trim: true, required: true},
  // image: { data: Buffer, contentType: String },
  // homepage: {type: String, trim: true, required: true},
  // person: {type: String, trim: true, required: true},
  // contact: {type: String, trim: true, required: true},
  //create Compeition
router.post('/', needAuth, catchErrors(async (req, res, next) => {
  const user = req.user;
  var competition = new Competition({
    title: req.body.title,
    author: user._id,
    content: req.body.content,
    field: req.body.field,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    sponsor: req.body.sponsor,
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
  competition.startTime=req.body.startTime;
  competition.endTime=req.body.endTime;
  competition.sponsor=req.body.sponsor;
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
