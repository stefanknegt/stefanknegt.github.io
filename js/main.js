$('ul.nav').find('a').click(function(){
  var $href = $(this).attr('href');
  var $anchor = $('#'+$href).offset();
  $('body').animate({ scrollTop: $anchor.top });
  return false;
})

$('#announcement1').on('click',function() {

  // Debug
  var test = $('#agent1').text();
  console.log("De waarde is ", test);

  if($('#agent1').text() == 'Test') {
    $('#agent1').html('Hoi');
  } else {
    $('#agent1').html('Test');
  }

});

$('#announcement2').on('click',function() {
  $('#agent2').html('test2');
});

$('#announcement3').on('click',function() {
  $('#agent3').html('test3');
});
