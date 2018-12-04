$(function() {

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
          location = '/';
        }
        console.log(data, status);
      }
      // ,
      // complete: function(data) {
      //   $el.removeClass('loading');
      // }
    });
  });



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
}); 




// $(function() {
//   $('.competition-like-btn').click(function(e) {
//     var $el = $(e.currentTarget);
//     if ($el.hasClass('loading')) return;
//     $el.addClass('loading');
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
//         console.log(data, status);
//       },
//       complete: function(data) {
//         $el.removeClass('loading');
//       }
//     });
//   });

//   $('.answer-like-btn').click(function(e) {
//     var $el = $(e.currentTarget);
//     if ($el.hasClass('disabled')) return;
//     $.ajax({
//       url: '/api/answers/' + $el.data('id') + '/like',
//       method: 'POST',
//       dataType: 'json',
//       success: function(data) {
//         $el.parents('.answer').find('.num-likes').text(data.);
//         $el.addClass('disabled');
//       },
//       error: function(data, status) {
//         if (data.status == 401) {
//           alert('Login required!');
//           location = '/signin';
//         }
//         console.log(data, status);
//       }
//     });
//   });

//   $('.answer-Unlike-btn').click(function(e) {
//     var $el = $(e.currentTarget);
//     if ($el.hasClass('disabled')) return;
//     $.ajax({
//       url: '/api/answers/' + $el.data('id') + '/unlike',
//       method: 'POST',
//       dataType: 'json',
//       success: function(data) {
//         $el.parents('.answer').find('.num-Unlikes').text(data.numUnLikes);
//         $el.addClass('disabled');
//       },
//       error: function(data, status) {
//         if (data.status == 401) {
//           alert('Login required!');
//           location = '/signin';
//         }
//         console.log(data, status);
//       }
//     });
//   });


// }); 
