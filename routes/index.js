var cool = require('cool-ascii-faces');
var express = require('express'),
User = require('../models/user');
const competition = require('../models/competition');
const catchErrors = require('../lib/async-error');
const router = express.Router();
const PORT = process.env.PORT || 5000

function needAuth(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      req.flash('danger', 'Please signin first.');
      res.redirect('/signin');
    }
}

router.get('/', catchErrors(async (req, res, next) => {  //await를 사용하기 위해서 "async"
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;



  var query = {};
  const term = req.query.term;
  if (term) {
    query = {$or: [
      {title: {'$regex': term, '$options': 'i'}},
      {content: {'$regex': term, '$options': 'i'}},
      {location: {'$regex': term, '$options': 'i'}},
      {field: {'$regex': term, '$options': 'i'}},
      {status: {'$regex': term, '$options': 'i'}},
      {sponsor: {'$regex': term, '$options': 'i'}},
      {award: {'$regex': term, '$options': 'i'}},
      {participant: {'$regex': term, '$options': 'i'}},
      {tags: {'$regex': term, '$options': 'i'}}
    ]};
  }
  const competitions = await competition.paginate(query, {   //여기서 await.
    sort: {createdAt: -1},
    populate: 'author',
    page: page, limit: limit
  });
  //console.log(competitions)
  res.render('index', {competitions: competitions, term: term});
}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/signin', function(req, res, next) {
  res.render('signin');
});


router.get('/signout', function (req, res){

  req.session.destroy(function (err) {
    res.redirect('/');
  });
});

module.exports = router;


