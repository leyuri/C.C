# Competition-collection

공모전 모음 사이트 https://floating-brook-81932.herokuapp.com/

### development environment

- pug + scss + bootstrap4 + jQuery + ajax
- node.js + express.js
- mongoDB

### Implementation function
#### 1.사용자
- [X] 회원가입, 로그인
- [X] 사용자는 본인이 공모전 정보를 등록할 수 있다
- [X] 관리자는 관리 페이지에서 사용자 목록을 관리(조회,삭제,수정)할 수 있다.
- [X] 회원 탈퇴: 탈퇴 시 회원의 개인 정보는 삭제하고 로그인 할 수 없도록 처리함.
- [X] 비밀번호 암호화
- [X] (option) Facebook/Google/카카오톡 로그인
- [X] (option) 비밀번호 수정, 회원 정보 수정
- [ ] (option) 여러 명의 관리자 계정을 만들 수 있다.

#### 2.공모전 정보 등록/관리
- [X] 기본정보: 이름, 주최사, 분야, 응시대상, 접수기간, 공모요강, 담당자, 연락처
- [X] 기타정보: 참고 사이트를 참조하여 다양한 추가 정보를 적절한 UI를 통해 입력받는다.
- [X] 등록자는 공모전 정보를 수정/삭제할 수 있다.
- [X] (option) 신고기능: 적절하지 못한 공모전 정보/공모전 댓글에 대한 신고를 할 수 있고, 관리자는 신고 내역을 확인/관리할 수 있다.
- [X] (option) reCAPTCHA를 사용하여 스팸을 막는다. (https://www.google.com/recaptcha/intro/v3beta.html)
- [ ] (option) 공모전 포스터를 이미지, pdf 등을 등록할 수 있다.
- [X] (option) 상세 설명을 WYSIWYG에디터를 이용하여 입력받는다. (TinyMCE, summernote 등 활용 가능 https://github.com/cheeaun/mooeditable/wiki/Javascript-WYSIWYG-editors)
- [ ] (option) 공모전/이벤트 장소를 맵을 이용하여 입력받을 수 있다.
- [ ] (option) 공모전의 분야, 응시대상 등의 옵션을 관리자가 설정할 수 있다.
- [ ] (option) 공모전 정보 승인 프로세스 추가: 등록된 정보는 관리자의 승인 이후에 공개된다.

#### 3.공모전 조회
- [X] 공모전의 목록을 조회할 수 있다.
- [X] 공모전의 상세 정보를 조회할 수 있다.
- [X] (option) 댓글 기능: 사용자는 공모전에 대한 댓글을 남길 수 있다.
- [X] (option) 추천배너: 추천 공모전 정보를 사용자에게 보여준다.
- [X] (option) 분야별/상태(접수중/마감임박/마감 등)별 공모전 목록을 조회할 수 있다.
- [X] (option) 검색: 키워드를 통해 공모전을 검색할 수 있다.
- [X] (option) 추천 기능: 공모전 정보, 댓글 등에 추천(좋아요/싫어요)을 할 수 있다.
- [X] (option) Favorite 기능: 공모전 정보를 Favorite에 추가. 자신의 Favorite 목록 확인 가능
- [X] (option) 공유기능: 공모전 정보를 페이스북, 트위터 등으로 공유할 수 있다.

#### 4.기타
- [X] 반드시 nodejs, expressjs, mongodb를 사용해야 한다.
- [X] 모든 최신 브라우져(Safari, Chrome, Firefox 등)에서 무리 없이 사용할 수 있어야 한다.
- [X] 과제의 결과물을 웹에서 확인 가능해야 한다. (AWS, Heroku 등을 통해 deploy해야 함)
- [X] (option) Responsive Design: 모바일 환경에서도 서비스를 확인가능하도록 만든다.
- [X] (option) Ajax 기술, 혹은 WebSocket 기술을 활용

### Screenshots

<img width="1133" alt="Screen Shot 2019-11-16 at 7 21 47 PM" src="https://user-images.githubusercontent.com/33794732/68991929-b0faab80-08a7-11ea-9d47-7a27f4225a96.png">
<img width="1140" alt="Screen Shot 2019-11-16 at 7 22 01 PM" src="https://user-images.githubusercontent.com/33794732/68991930-b0faab80-08a7-11ea-9420-a9ae816a3102.png">
<img width="1137" alt="Screen Shot 2019-11-16 at 7 22 13 PM" src="https://user-images.githubusercontent.com/33794732/68991931-b0faab80-08a7-11ea-97bd-40d07d84d7ba.png">
<img width="1137" alt="Screen Shot 2019-11-16 at 7 22 39 PM" src="https://user-images.githubusercontent.com/33794732/68991932-b1934200-08a7-11ea-92cd-7555d1077641.png">
<img width="1121" alt="Screen Shot 2019-11-16 at 7 23 03 PM" src="https://user-images.githubusercontent.com/33794732/68991933-b1934200-08a7-11ea-9f6a-7b84d69298a9.png">
