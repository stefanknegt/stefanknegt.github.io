$('ul.nav').find('a').click(function(){
  var $href = $(this).attr('href');
  var $anchor = $('#'+$href).offset();
  $('body').animate({ scrollTop: $anchor.top });
  return false;
})

// Set sliders to the values corresponding to the experiments in the LLR
function experiment1() {
  document.getElementById("comm-true").checked = true;
  document.getElementById("gr-false").checked = true;
  document.getElementById("ir-false").checked = true;
  document.getElementById("hd-true").checked = true;
}
function experiment2() {
  document.getElementById("comm-true").checked = true;
  document.getElementById("gr-true").checked = true;
  document.getElementById("ir-false").checked = true;
  document.getElementById("hd-true").checked = true;
}
function experiment3() {
  document.getElementById("comm-false").checked = true;
  document.getElementById("gr-false").checked = true;
  document.getElementById("ir-true").checked = true;
  document.getElementById("hd-true").checked = true;
}

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
    if(array.includes("dr") && !beliefnormal.includes("dr")) {
      beliefnormal.push("dr");
      changed = 1;
    }

    if(array.includes("gr") && !beliefnormal.includes("dr")) {
      beliefnormal.push("dr");
      beliefnormal.push("gr");
      changed = 1;
    }
    if(array.includes("ir") && !beliefnormal.includes("ir")){
      if(!($('#comm-true').is(':checked'))) {
        beliefnormal.push("dr");
      }
      beliefnormal.push("ir");
      changed = 1;
    }
    if(array.includes("hd") && !beliefnormal.includes("dr") && !array.includes("dr") && !beliefnormal.includes("na") ) {
      beliefnormal.push("na");
      changed = 1;
    }
    if(array.includes("hd") && beliefnormal.includes("dr") && array.includes("dr") && !beliefnormal.includes("na") && ($('#comm-false').is(':checked'))) {
      beliefnormal.push("na");
      changed = 1;
    }

    //Lost Robot
    if(array.includes("dr") && !belieflost.includes("dr")) {
      belieflost.push("dr");
      changed = 1;
    }
    if(array.includes("gr") && !belieflost.includes("dr")) {
      belieflost.push("dr");
      belieflost.push("gr");
      changed = 1;
    }

    if(array.includes("ir") && !belieflost.includes("ir")) {
      belieflost.push("ir");
      changed = 1;
    }

    if(array.includes("hd") && !belieflost.includes("dr") && !belieflost.includes("na")) {
      belieflost.push("na");
      changed = 1;
    }

    if(array.includes("ir") && array.includes("hd") &&  !belieflost.includes("na") && !belieflost.includes("dr")) {
      belieflost.push("na");
      changed = 1;
    }

    if(belieflost.includes("na") && !belieflost.includes("la")) {
      belieflost.push("la");
      changed = 1;
    }

    //Susan
    if(belieflost.includes("la") && !beliefnormal.includes("na") && !beliefsusan.includes("ID")) {
      beliefsusan.push("ID");
      changed = 1;
    }

  }
};

// Print all the formulas for the agents and the general knowledge
function generateModel(array,agent) {
  var output = [];
  if(agent != 'generalknowledge') {
    
      if(!array.includes("hd")) {
        output.push('<span>' + 'I do not believe that a human is in danger so I will not act.' + '</span><br>');
      }   
    
      if(array.includes("gr") && array.includes("dr")) {
        output.push('<span>' + 'I believe that gamma radiation is present and that this is dangerous.' + '</span><br>');
      }

      if(array.includes("ir") && ($('#comm-true').is(':checked')) && agent == 'agent2') {
        output.push('<span>' + 'I believe that infrared radiation is present, but the lost robot said that this is not dangerous.' + '</span><br>');
      }

      if(array.includes("ir") && !($('#comm-true').is(':checked')) && agent == 'agent2') {
        output.push('<span>' + 'I believe that infrared radiation is present and that this is dangerous.' + '</span><br>');
      }
      
      if(array.includes("ir") && agent == 'agent1') {
        output.push('<span>' + 'I believe that infrared radiation is present, but this is not dangerous.' + '</span><br>');
      }
      
      if(agent == "agent1" && belieflost.includes("na")) {
        output.push('<span>' + 'I believe the other robots will try to save the human so will try to save the human as well to not get discovered.' + '</span><br>');
      } 
    
      if(array.includes("na") && agent == "agent2") {
        output.push('<span>' + 'so I will try to save the human.' + '</span><br>');
      }
    
      if(!array.includes("na") && ($('#comm-true').is(':checked')) && agent == "agent2") {
        output.push('<span>' + 'One robot told me that the radiation will kill me, meaning that I cannot save humans in the future anymore so I will not try to save the human.' + '</span><br>');
      }

      if(array.includes("ID")) {
        output.push('<span>' + 'The two types of robot both acted in a different way so I have identified the lost robot.' + '</span>');
        alert("Well done, Susan has identified the lost robot.")
      }

      if(!array.includes("ID")) {
        output.push('<span>' + 'The two types of robot acted in an identical way so I can not identify the lost robot.' + '</span>');
      }

      $('#'+agent).html(output.join(" "));
  }
  if(agent == 'generalknowledge') {
    if(array.includes("ir")) {
      output.push('<span>' + 'There is infrared radiation present' + '</span><br>');
    }
    if(array.includes("gr")) {
      output.push('<span>' + 'There is gamma radiation present' + '</span><br>');
    }
    if(array.includes("hd")) {
      output.push('<span>' + 'There is a human in danger.' + '</span><br>');
    }
    $('#'+agent).html(output.join(" "));
  }
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

  //Generate accompanying Kripke model
  generateKripke (generalknowledge);
});
