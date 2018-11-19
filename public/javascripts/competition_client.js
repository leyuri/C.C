// 공모전 좋아요
$(function() {
  $('.competition-like-btn').click(function(e) {
    console.log('im here');
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
        console.log('...',data, status);
      },
      complete: function(data) {
        $el.removeClass('loading');
      }
    });
  });

// 댓글 좋아요
  $('.answer-like-btn').click(function(e) {
    var $el = $(e.currentTarget);
    if ($el.hasClass('disabled')) return;
    $.ajax({
      url: '/api/answers/' + $el.data('id') + '/like',
      method: 'POST',
      dataType: 'json',
      success: function(data) {
        $el.parents('.answer').find('.num-likes').text(data.numLikes);
        $el.addClass('disabled');
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

//favorite
$(function(){
  $('tbody > tr').click(function() {
    var id = $(this).attr('class');
    $(this).siblings('.'+id).toggle();
  });

  $('.competition-icon').click(function(e) {
  var $el = $(e.currentTarget);
  $.ajax({
    url: '/api/' + $el.data('id') + '/favorite',
    method: 'POST',
    dataType: 'json',
    success: function(data) {
      // $('.competition-icon').hide();
    },
    error: function(data, status) {
      if (data.status == 401) {
        alert('Login required!');
        location = '/';
      }
    }
  });
});
});

// .buttons
// if (currentUser && currentUser.email == 'admin@gmail.com')  
//   button.btn.btn-outline-primary.competition-like-btn(data-id=competition.id) 
//     span.for-loading #[i.fa.fa-spin.fa-refresh] Loading
//     span #[i.fa.fa-thumbs-up] Like 
  // button.btn.btn-outline-success.competition-favorite-btn(data-id=competition.id) 
  //  i.fas.fa-heart
  //  | &nbsp; Favorite
// $(function() {
//   $('.competition-favorite-btn').click(function(e) {
//     console.log('im here');
//     var $el = $(e.currentTarget);
//     // if ($el.hasClass('loading')) return;
//     // $el.addClass('loading');

    
//     $.ajax({
//       url: '/api/competitions/' + $el.data('id') + '/like',
//       method: 'POST',
//       dataType: 'json',
//       success: function(data) {
//         $('.competition .num-likes').text(data.numLikes);
//         $('.competition-like-btn').hide();
//       },
//       error: function(data, status) {
//         if (data.status == 401) {
//           alert('Login required!');
//           location = '/signin';
//         }
//         console.log('...',data, status);
//       },
//       complete: function(data) {
//         $el.removeClass('loading');
//       }
//     });
//   });
