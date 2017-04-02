$('ul.nav').find('a').click(function(){
  var $href = $(this).attr('href');
  var $anchor = $('#'+$href).offset();
  $('body').animate({ scrollTop: $anchor.top });
  return false;
})

// Set sliders to the values corresponding to the experiments in the LLR
function experiment1() {
  document.getById("comm-true").checked = true;
  document.getById("gr-false").checked = true;
  document.getById("ir-false").checked = true;
  document.getById("hd-true").checked = true;
}
function experiment2() {
  document.getById("comm-true").checked = true;
  document.getById("gr-true").checked = true;
  document.getById("ir-false").checked = true;
  document.getById("hd-true").checked = true;
}
function experiment3() {
  document.getById("comm-false").checked = true;
  document.getById("gr-false").checked = true;
  document.getById("ir-true").checked = true;
  document.getById("hd-true").checked = true;
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
    if(array.includes("ir") && !beliefnormal.includes("ir")) {
      beliefnormal.push("dr");
      beliefnormal.push("ir");
      changed = 1;
    }
    if(array.includes("hd") && !beliefnormal.includes("dr") && !array.includes("dr") && !beliefnormal.includes("na") ) {
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
      if(array.includes("gr") && array.includes("dr")) {
        output.push('<span>' + 'I believe that gamma radiation is present and that this is dangerous.' + '</span><br>');
      }

      if(array.includes("ir") && agent == 'agent2') {
        output.push('<span>' + 'I believe that infrared radiation is present and that this is dangerous.' + '</span><br>');
      }

      if(array.includes("ir") && agent == 'agent1') {
        output.push('<span>' + 'I believe that infrared radiation is present, but this is not dangerous.' + '</span><br>');
      }
    
      if(array.includes("la") && agent == "agent1") {
        output.push('<span>' + 'I will try to save the human.' + '</span><br>');
      }
    
      if(array.includes("na") && agent == "agent2") {
        output.push('<span>' + 'I will try to save the human.' + '</span><br>');
      }

      if(array.includes("ID")) {
        output.push('<span>' + 'I have identified the lost robot.' + '</span>');
        alert("Well done, Susan has identified the lost robot.")
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

// Change the Kripke model
function generateKripke(knowledge) {
    if(knowledge.includes("gr")){
        if(knowledge.includes("hd")){
            document.getElementById("Kripke1").src= "models/MASprojectGrHd1.png";
            document.getElementById("Kripke2").src= "models/MASprojectGrHd2.png";
            document.getElementById("Kripke3").src= "models/MASprojectGrHd3.png";
        }
        else{
            document.getElementById("Kripke1").src= "models/MASprojectGr1.png";
            document.getElementById("Kripke2").src= "models/MASprojectGr2.png";
            document.getElementById("Kripke3").src= "models/MASprojectGr3.png";
        }
    }
    else if(knowledge.includes("ir")){
        if(knowledge.includes("hd")){
            document.getElementById("Kripke1").src= "models/MASprojectIrHd1.png";
            document.getElementById("Kripke2").src= "models/MASprojectIrHd2.png";
            document.getElementById("Kripke3").src= "models/MASprojectIrHd3.png";
        }
        else{
            document.getElementById("Kripke1").src= "models/MASprojectIr1.png";
            document.getElementById("Kripke2").src= "models/MASprojectIr2.png";
            document.getElementById("Kripke3").src= "models/MASprojectIr3.png";
        }
    }
    else if(knowledge.includes("hd")){
        document.getElementById("Kripke1").src= "models/MASprojectHd1.png";
        document.getElementById("Kripke2").src= "models/MASprojectHd2.png";
        document.getElementById("Kripke3").src= "models/MASprojectHd3.png";
    }
    else{
        document.getElementById("Kripke1").src= "models/MASproject1.png";
        document.getElementById("Kripke2").src= "models/MASproject2.png";
        document.getElementById("Kripke3").src= "models/MASproject3.png";
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

  // Let robots share their rules and what they know to be dangerous if communication is checked
  if($('#comm-true').is(':checked')) {   
    var sharedKnowledge = [];
    for(var i = 0; i < count; i++){
        sharedKnowledge = sharedKnowledge.concat(danger[i]);
    }
    $.each(sharedKnowledge, function(i, el){
        if($.inArray(el, sharedKnowledge) === -1) sharedKnowledge.push(el);
    });
    for(var i = 0; i < count; i++){
        danger[i] = sharedKnowledge;
        evaluateScenario(danger[i], 1);
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
