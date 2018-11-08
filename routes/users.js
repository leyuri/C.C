var express = require('express'),
    User = require('../models/user');
var router = express.Router();
//브라우저가 주소창에 적는 것은 무조건 get메소드 방식이다. 

function needAuth(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      req.flash('danger', 'Please signin first.');
      res.redirect('/signin');
    }
}

/* 회원가입이 유효한지 */
function validateForm(form, options) {
  var name = form.name || "";
  var email = form.email || "";
  name = name.trim();
  //trim()은 문자열 앞과 뒤 공백을 제거하는 함수
  email = email.trim();

  if (!name) {
    return 'Name is required.';
    //이름을 입력하지 않은 경우
  }

  if (!email) {
    return 'Email is required.';
  }

  if (!form.password && options.needPassword) {
    return 'Password is required.';
  }

  if (form.password !== form.password_confirmation) {
    return 'Passsword do not match.';
  }

  if (form.password.length < 6) {
    return 'Password must be at least 6 characters.';
    //적어도 여섯자리
  }

  return null;
}

/* GET users listing. */
router.get('/', needAuth, (req, res, next) => {
  //하나의 라우터 안에 function을 두개 달아놓은 것임
  //미들웨어를 2개 달아놓은 것이다. 
  // => 은 function을 짧게 적어놓은 것이다. 
  User.find({}, function(err, users) {
    //몽고디비에서 find모두 찾기 모드 찾는 것이므로 .. 그 다음은 콜백함수로 받아친다.
    if (err) {
      return next(err);
      //next는 마찬가지로 콜백이므로 첫번째 인자는 err이다. 
      //남은 미들웨어는 다 스킵하고 에러 페이지로 보여주는 것이다. 
    }
    //비동기이므로 
    res.render('users/index', {users: users});
    //users에는 {_id:xxx},{_id:xxx},{_id:xxx},..가 들어있을 것이다.
  }); // TODO: pagination?
});

//user생성
router.get('/new', (req, res, next) => {
  res.render('users/new', {messages: req.flash()});
  //views/users/new.pug파일을 보여줌
});

router.get('/:id/edit', needAuth, (req, res, next) => {
  //userid에 해당하는 edit를 보여줌
  User.findById(req.params.id, function(err, user) {
    //그러긴 위해서 db에서 id의 값을 가져와야 한다.
    if (err) {
      return next(err);
    }
    res.render('users/edit', {user: user});
  });
});

/*user정보 수정*/ 
router.put('/:id', needAuth, (req, res, next) => {
  var err = validateForm(req.body);
  if (err) {
    req.flash('danger', err);
    return res.redirect('back');
  }

  User.findById({_id: req.params.id}, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('danger', 'Not exist user.');
      return res.redirect('back');
    }

    if (user.password !== req.body.current_password) {
      req.flash('danger', 'Password is incorrect');
      return res.redirect('back');
    }

    user.name = req.body.name;
    user.email = req.body.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    user.save(function(err) {
      if (err) {
        return next(err);
      }
      req.flash('success', 'Updated successfully.');
      res.redirect('/users');
    });
  });
});

/*user를 삭제*/ 
router.delete('/:id', needAuth, (req, res, next) => {
  User.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Deleted Successfully.');
    res.redirect('/users');
  });
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, function(err, user) {

    //더 쉽게 id를 가져오는.....

    if (err) {
      return next(err);
    }
    res.render('users/show', {user: user});
    //렌더를 해주면 된다. 
  });
});

//이런 곳에 console을 쳐서 확인해보자

router.post('/', (req, res, next) => {
  var err = validateForm(req.body, {needPassword: true});
  if (err) {
    req.flash('danger', err);
    return res.redirect('back');
  }
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      return next(err);
    }
    if (user) {
      req.flash('danger', 'Email address already exists.');
      return res.redirect('back');
    }
    var newUser = new User({
      name: req.body.name,
      email: req.body.email,
    });
    newUser.password = req.body.password;

    newUser.save(function(err) {
      if (err) {
        return next(err);
      } else {
        req.flash('success', 'Registered successfully. Please sign in.');
        res.redirect('/');
      }
    });
  });
});

module.exports = router;
