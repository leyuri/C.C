var express = require('express'),
  User = require('../models/user');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  /* get방식으로 /에 들어올 경우? res대답해준다. index.pug파일을 */
});

router.get('/signin', function(req, res, next) {
  res.render('signin');
});

// 09-1. Session 참고: 세션을 이용한 로그인
// function을 겹겹이 즉 미들웨어를 2개 달아놓은 것
router.post('/signin', function(req, res, next) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      res.render('error', {message: "Error", error: err});
    } else if (!user || user.password !== req.body.password) {
      req.flash('danger', 'Invalid username or password.');
      res.redirect('back');
    } else {
      req.session.user = user;
      req.flash('success', 'Welcome!');
      res.redirect('/');
    }
  });
});

router.get('/signout', function(req, res, next) {
  delete req.session.user;
  req.flash('success', 'Successfully signed out.');
  res.redirect('/');
  /*URL 리다이렉션(URL redirection← URL 넘겨주기)은 이용 가능한 웹 페이지를 하나 이상의 URL 주소로 만들어주는 월드 와이드 웹 기법이다. 
  URL 포워딩(URL forwarding)이라고도 한다. 넘겨받은 URL을 웹 브라우저가 열려고 하면 다른 URL의 문서가 열리게 된다. */
});

module.exports = router;
