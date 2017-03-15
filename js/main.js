$('ul.nav').find('a').click(function(){
  var $href = $(this).attr('href');
  var $anchor = $('#'+$href).offset();
  $('body').animate({ scrollTop: $anchor.top });
  return false;
})

generalknowledge = [];
beliefsusan = [];
beliefnormal = [];
belieflost = [];

// Given the current knowledge, determine the implications
function checkImplications(array) {
  var changed = 1;

  while(changed == 1) {

    if(array.includes("gr")) {
      beliefnormal.push("dr")
    } else if(array.includes("ir") && !array.includes("gr")) {
      alert("there is only dangerous radiation for normal robots present");
    }
      changed = 0;
    }
};

// Print all the formulas for the agents and the general knowledge
function generateModel(array,agent) {
  var output = [];
  for (var i = 0; i < array.length; i++) {
    output.push('<span>' + array[i] + '</span>');
  }
  $('#'+agent).html(output.join(" "));
};

$('#generatemodel').on('click',function() {
  // Check what is set to be true by the user
  if($('#gr-true').is(':checked')) {
    generalknowledge.push("gr");
  } else {
    var index = generalknowledge.indexOf("gr");
    if(index > -1 ) {
      generalknowledge.splice(index,1);
    }
  }
  if($('#ir-true').is(':checked')) {
    generalknowledge.push("ir");
  } else {
    var index = generalknowledge.indexOf("ir");
    if(index > -1 ) {
      generalknowledge.splice(index,1);
    }
  }
  if($('#dr-true').is(':checked')) {
    generalknowledge.push("dr");
  } else {
    var index = generalknowledge.indexOf("dr");
    if(index > -1 ) {
      generalknowledge.splice(index,1);
    }
  }
  if($('#hd-true').is(':checked')) {
    generalknowledge.push("hd");
  } else {
    var index = generalknowledge.indexOf("hd");
    if(index > -1 ) {
      generalknowledge.splice(index,1);
    }
  }

  // Remove all duplicates from the array
  var uniquegeneralknowledge = []
  $.each(generalknowledge, function(i, el){
    if($.inArray(el, uniquegeneralknowledge) === -1) uniquegeneralknowledge.push(el);
  });
  generalknowledge = uniquegeneralknowledge;

  // Debug
  console.log(generalknowledge);

  // Check implications of the given knowledge
  checkImplications(generalknowledge);
  generateModel(generalknowledge,'generalknowledge');
  generateModel(belieflost,'agent1');
  generateModel(beliefnormal,'agent2');
  generateModel(beliefsusan,'agent3');
});
