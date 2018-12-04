const express = require('express');
const User = require('../models/user');
const router = express.Router();
const Favorite = require('../models/favorite');
const catchErrors = require('../lib/async-error');

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', 'Please signin first.');
    res.redirect('/signin');
  }
}

function validateForm(form, options) {
  var name = form.name || "";
  var email = form.email || "";
  var address = form.address || "";
  var sex = form.sex || "";
  var birthday = form.birthday || "";

  name = name.trim();
  email = email.trim();
  address = address.trim();
  sex = sex.trim();
  birthday = birthday.trim();

  if (!name) {
    return 'Name is required.';
  }

  if (!email) {
    return 'Email is required.';
  }

  if (!address) {
    return 'address is required.';
  }

  if (!sex) {
    return 'sex is required.';
  }

  if (!birthday) {
    return 'birthday is required.';
  }

  if (!form.password && options.needPassword) {
    return 'Password is required.';
  }

  if (form.password !== form.password_confirmation) {
    return 'Passsword do not match.';
  }

  if (form.password.length < 6) {
    return 'Password must be at least 6 characters.';
  }

  return null;
}

/* GET users listing. */
router.get('/', needAuth, catchErrors(async (req, res, next) => {
  const users = await User.find({});
  res.render('users/index', {users: users});
}));

router.get('/new', (req, res, next) => {
  res.render('users/new', {messages: req.flash()});
});

router.get('/:id/edit', needAuth, catchErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.render('users/edit', {user: user});
}));

router.get('/:id/favorite', needAuth, catchErrors(async(req,res,next) => {
  const user = await User.findById(req.params.id);
  const favorite = await Favorite.find({author: user._id}).populate('competition');
  res.render('users/favorite', {favorite: favorite});
}));


// router.get('/:id/', needAuth, catchErrors(async(req,res,next) => {
//   const user = await User.findById(req.params.id);
//   const registered = await Favorite.find({author: user._id}).populate('competition');
//   res.render('users/registered', {favorite: favorite});
// }));


router.put('/:id', needAuth, catchErrors(async (req, res, next) => {
  const err = validateForm(req.body);
  if (err) {
    req.flash('danger', err);
    return res.redirect('back');
  }

  const user = await User.findById({_id: req.params.id});
  if (!user) {
    req.flash('danger', 'Not exist user.');
    return res.redirect('back');
  }

  if (!await user.validatePassword(req.body.current_password)) {
    req.flash('danger', 'Current password invalid.');
    return res.redirect('back');
  }

  user.name = req.body.name;
  user.email = req.body.email;
  user.address = req.body.address;
  user.sex = req.body.sex;
  user.birthday = req.body.birthday;
  if (req.body.password) {
    user.password = await user.generateHash(req.body.password);
  }
  await user.save();
  req.flash('success', 'Updated successfully.');
  res.redirect('/users');
}));

/*user를 삭제*/ 
router.delete('/:id', needAuth, catchErrors(async (req, res, next) => {
  const user = await User.findOneAndRemove({_id: req.params.id});
  req.flash('success', 'Deleted Successfully.');
  res.redirect('/users');
}));

router.get('/:id', catchErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.render('users/show', {user: user});
}));


router.get('/:id', (req, res, next) => {

  var users= User.findById(req.params.id, function(err, users) {
    var competition = Competition.find({}, function(err, competition) {
      var recommends = Competition.find({_id: competition.recommend}, function(err, recommends) {
        var competitions = Competition.find({author: users.id}, function(err, competitions) {
          var favorites = Competition.find({_id: users.favorite}, function(err, s) {
            res.render('users/show', {users: users, competitions: competitions, favorites: favorites, recommends: recommends
            });
          });
        });
      });
    });
  });
});

router.post('/', catchErrors(async (req, res, next) => {
  var err = validateForm(req.body, {needPassword: true});
  if (err) {
    req.flash('danger', err);
    return res.redirect('back');
  }
  var user = await User.findOne({email: req.body.email});
  console.log('USER???', user);
  if (user) {
    req.flash('danger', 'Email address already exists.');
    return res.redirect('back');
  }
  user = new User({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    sex: req.body.sex,
    birthday: req.body.birthday,
  });
  user.password = await user.generateHash(req.body.password);
  await user.save();
  req.flash('success', 'Registered successfully. Please sign in.');
  res.redirect('/');
}));

module.exports = router;
