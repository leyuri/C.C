var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var session = require('express-session');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var mongoose   = require('mongoose');
var passport = require('passport');

var index = require('./routes/index');
var users = require('./routes/users');
var competitions = require('./routes/competitions');

var passportConfig = require('./lib/passport-config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

// Pug의 local에 moment라이브러리와 querystring 라이브러리를 사용할 수 있도록.
app.locals.moment = require('moment');
//이미 모듈을 받아서 참조를 해놨다. 따라서 pug안에서 참조하여 사용할 수 있다. 
app.locals.querystring = require('querystring');

//=======================================================
// mongodb connect
//=======================================================
mongoose.Promise = global.Promise; // ES6 Native Promise를 mongoose에서 사용한다.

//production인 경우에는 mlab을, 그렇지 않은 경우에는 local mongodb사용
const connStr = (process.env.NODE_ENV == 'production')?
  'mongodb://yuri:dldbfl1123@ds137601.mlab.com:37601/cc':
  'mongodb://localhost/mjdb1';
// 아래는 mLab을 사용하는 경우의 예: 본인의 접속 String으로 바꾸세요.
//mLab은 몽고DB 데이터베이스를 호스팅하는 매니지드 클라우드 데이터베이스 서비스이다. mLab은 아마존, 구글, 마이크로소프트 애저 등의 클라우드 제공자에서 실행되며 PaaS 제공자들과 파트너십을 맺고 있다.
// const connStr = 'mongodb://dbuser1:mju12345@ds113825.mlab.com:13825/sampledb1';
mongoose.connect(connStr, {useMongoClient: true });
mongoose.connection.on('error', console.error);

// Favicon은 웹사이트의 대표 아이콘입니다. Favicon을 만들어서 /public에 둡시다.
// https://www.favicon-generator.org/ 여기서 만들어볼 수 있어요.
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));  //아이콘 파일이다.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// _method를 통해서 method를 변경할 수 있도록 함. PUT이나 DELETE를 사용할 수 있도록.
// html은 기본적으로 get post 등등이 있음, delete나 patch는 사용하지 못함

app.use(methodOverride('_method', {methods: ['POST', 'GET']}));

// sass, scss를 사용할 수 있도록
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  debug: true,
  sourceMap: true
}));

// session을 사용할 수 있도록.
// 접속한 사람들을 계속 체크해준다.
// 왭서버 입장에서는 같은 사람이 들어온건지, 두 사람이 들어온 건지 모른다. 
// 이것들을 추적하기 위하여 쿠키나 세션 모듈을 추가함
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'long-long-long-secret-string-1313513tefgwdsvbjkvasd'
}));

app.use(flash()); // flash message를 사용할 수 있도록
//로그인 시 뜨는 창 ex)로그인 해주셔서 감사합니다.

// public 디렉토리에 있는 내용은 static하게 service하도록.
app.use(express.static(path.join(__dirname, 'public')));

//=======================================================
// Passport 초기화
//=======================================================
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);




// pug의 local에 현재 사용자 정보와 flash 메시지를 전달하자.
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;  // passport는 req.user로 user정보 전달
  res.locals.flashMessages = req.flash();
  next();
});

// Route
app.use('/', index);
app.use('/users', users);
app.use('/competitions', competitions);
require('./routes/auth')(app, passport);
//api
app.use('/api', require('./routes/api'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
