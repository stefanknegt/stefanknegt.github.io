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
    changed = 0;

    //Normal Robot
    if(array.includes("gr") && !beliefnormal.includes("dr")) {
      beliefnormal.push("dr")
      changed = 1;
    }
    if(array.includes("ir") && !beliefnormal.includes("dr")) {
      beliefnormal.push("dr")
      changed = 1;
    }
    if(array.includes("hd") && !beliefnormal.includes("dr") && !array.includes("dr") && !beliefnormal.includes("na") ) {
      beliefnormal.push("na")
      changed = 1;
    }

    //Lost Robot
    if(array.includes("gr") && !belieflost.includes("dr")) {
      belieflost.push("dr")
      changed = 1;
    }
    if(array.includes("hd") && !belieflost.includes("dr") && !belieflost.includes("na")) {
      belieflost.push("na");
      changed = 1;
    }
    if(belieflost.includes("na") && !belieflost.includes("la")) {
      belieflost.push("la")
      changed = 1;
    }

    //Susan


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
  // Remove all the beliefs
  beliefsusan = [];
  beliefnormal = [];
  belieflost = [];

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

  // Check implications of the given knowledge
  checkImplications(generalknowledge);

  //Generate the models based on the current knowledge
  generateModel(generalknowledge,'generalknowledge');
  generateModel(belieflost,'agent1');
  generateModel(beliefnormal,'agent2');
  generateModel(beliefsusan,'agent3');
});
