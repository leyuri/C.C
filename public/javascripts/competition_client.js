$(function() {
  //공모전 보관함
  // $('tbody > tr').click(function() {
  //   var id = $(this).attr('class');
  //   $(this).siblings('.'+id).toggle();
  // });

  $('.competition-favorite-btn').click(function(e) {
    var $el = $(e.currentTarget);
    $.ajax({
      url: '/api/competitions/' + $el.data('id') + '/favorite',
      method: 'POST',
      dataType: 'json',
      success: function(data) {
      },
      error: function(data, status) {
        if (data.status == 401) {
          alert('Login required!');
          location = '/signin';
        }
        console.log(data, status);
      },
      complete: function(data) {
      }
    });
  });



  //공모전 좋아요
  $('.competition-like-btn').click(function(e) {
    var $el = $(e.currentTarget);
    if ($el.hasClass('loading')) return;
    $el.addClass('loading');
    $.ajax({
      url: '/api/competitions/' + $el.data('id') + '/like',
      method: 'POST',
      dataType: 'json',
      success: function(data) {
        $('.competition .num-likes').text(data.numLikes);
        $('.competition-like-btn').hide();
      },
      error: function(data, status) {
        if (data.status == 401) {
          alert('Login required!');
          location = '/signin';
        }
        console.log(data, status);
      },
      complete: function(data) {
        $el.removeClass('loading');
      }
    });
  });

  //공모전 싫어요
  $('.competition-unlike-btn').click(function(e) {
    var $el = $(e.currentTarget);
    if ($el.hasClass('loading')) return;
    $el.addClass('loading');
    $.ajax({
      url: '/api/competitions/' + $el.data('id') + '/unlike',
      method: 'POST',
      dataType: 'json',
      success: function(data) {
        $('.competition .num-unlikes').text(data.numunLikes);
        $('.competition-unlike-btn').hide();
      },
      error: function(data, status) {
        if (data.status == 401) {
          alert('Login required!');
          location = '/signin';
        }
        console.log(data, status);
      },
      complete: function(data) {
        $el.removeClass('loading');
      }
    });
  });

  //공모전 댓글 좋아요
  $('.answer-like-btn').click(function(e) {
    var $el = $(e.currentTarget);
    if ($el.hasClass('disabled')) return;
    $.ajax({
      url: '/api/answers/' + $el.data('id') + '/like',
      method: 'POST',
      dataType: 'json',
      success: function(data) {
        $el.parents('.answer').find('.num-likes').text(data.numLikes);
        $el.addClass('disabled'); //두번 누르지 못하도록 하였음
      },
      error: function(data, status) {
        if (data.status == 401) {
          alert('Login required!');
          location = '/signin';
        }
        console.log(data, status);
      }
    });
  });

  //공모전 댓글 싫어요
  $('.answer-unlike-btn').click(function(e) {
    var $el = $(e.currentTarget);
    if ($el.hasClass('disabled')) return;
    $.ajax({
      url: '/api/answers/' + $el.data('id') + '/unlike',
      method: 'POST',
      dataType: 'json',
      success: function(data) {
        $el.parents('.answer').find('.num-unlikes').text(data.numunLikes);
        $el.addClass('disabled'); //두번 누르지 못하도록 하였음
      },
      error: function(data, status) {
        if (data.status == 401) {
          alert('Login required!');
          location = '/signin';
        }
        console.log(data, status);
      }
    });
  });
}); 



