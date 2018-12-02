module.exports = (app, passport) => {
  app.get('/signin', (req, res, next) => {
    res.render('signin');
  });

  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect : '/competitions', // redirect to the secure profile section
    failureRedirect : '/signin', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  app.get('/auth/facebook',
    passport.authenticate('facebook', { scope : 'email' })
  );

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect : '/signin',
      failureFlash : true // allow flash messages
    }), (req, res, next) => {
      req.flash('success', 'Welcome!');
      res.redirect('/competitions');
    }
  );


  //  카카오 로그인
  app.get('/auth/kakao',
  passport.authenticate('kakao-login')
  );
  //카카오톡 콜백
  app.get('/auth/kakao/callback',
  passport.authenticate('kakao-login', {
    failureRedirect: '/',
    failureFlash: true
  }), (req, res, next) =>{
    req.flash('success', 'Welcome!');
    res.redirect('/competitions');
  }
  );

  //구글 로그인
  app.get('/auth/google',
  passport.authenticate('google', { 
    scope: ['https://www.googleapis.com/auth/plus.login'] 
  }));
 
  //구글 콜백
  app.get('/auth/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/auth/login' }),
  function(req, res) {
    res.redirect('/competitions');
  });


  app.get('/signout', (req, res) => {
    req.logout();
    req.flash('success', 'Successfully signed out');
    res.redirect('/');
  });


};
