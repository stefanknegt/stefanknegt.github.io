$('ul.nav').find('a').click(function(){
  var $href = $(this).attr('href');
  var $anchor = $('#'+$href).offset();
  $('body').animate({ scrollTop: $anchor.top });
  return false;
})

generalknowledge = [];
beliefsusan = [];
beliefnormal = [[]];
belieflost = [];
dangerKnown = [[]];
danger = [[]];

count = 2;
max = 5;
min = 2;

function generateRobot(){
    if (count < max)
    {
        count++;

        //Add extra field to list dangers;
        var newForm;
        var newInput;
        var newLabel;
        var newDiv1;
        var newDiv2;
        var newDiv3;
        var newDiv4;
        var newImg;

        newForm = document.createElement('form');
        newDiv1 = document.createElement('div');
        newDiv2 = document.createElement('div');
        newForm.className = "form";
        newDiv1.className ="col-xs-6 col-sm-6 col-md-12";
        newDiv1.id ="robot" + count;
        newDiv2.className ="switch-title";
        newDiv2.innerHTML = 'Robot ' + (count);
        newForm.appendChild(newDiv2);

        newInput = document.createElement('input');
        newInput.type = 'checkbox';
        newInput.id = count + 'ir-danger';
        newLabel = document.createElement('label');
        newLabel.for = 'ir-danger';
        newLabel.appendChild(document.createTextNode("Infra-red"));

        newForm.appendChild(newInput);
        newForm.appendChild(newLabel);

        newInput = document.createElement('input');
        newInput.type = 'checkbox';
        newInput.id = count + 'gr-danger';
        newLabel = document.createElement('label');
        newLabel.for = 'gr-danger';
        newLabel.appendChild(document.createTextNode("Gamma radiation"));

        newForm.appendChild(newInput);
        newForm.appendChild(newLabel);

        newInput = document.createElement('input');
        newInput.type = 'checkbox';
        newInput.id = count + 'el-danger';
        newLabel = document.createElement('label');
        newLabel.for = 'el-danger';
        newLabel.appendChild(document.createTextNode("Electricity"));

        newForm.appendChild(newInput);
        newForm.appendChild(newLabel);

        newDiv1.appendChild(newForm);
        document.getElementById("robots").appendChild(newDiv1);

        //Add extra picture + information container with new robot's beliefs
        newDiv3 = document.createElement('div');
        newDiv4 = document.createElement('div');
        newImg = document.createElement('img');

        newDiv3.className = "col-xs-6 col-sm-6 col-md-3";
        newDiv3.id = "image"+count;
        newDiv4.className = "agent";
        newDiv4.id = "agent" + count;

        newDiv3.innerHTML = "Normal Robot";

        newImg.src = "otherRobots.png";
        newImg.width = 200;
        newImg.height = 200;

        newDiv3.appendChild(newImg);
        newDiv3.appendChild(newDiv4);

        document.getElementById("info").appendChild(newDiv3);
    }

    if(count > min && !document.getElementById("removerobotbutton")){
        var removeButton = document.createElement("button");
        removeButton.id = "removerobotbutton";
        removeButton.onclick = removeRobot;
        removeButton.innerHTML = "Remove robot";
        document.getElementById("removerobot").appendChild(removeButton);
    }
    
    if(count == max){
        document.getElementById("generaterobot").removeChild(document.getElementById("generaterobotbutton"));
    }
}

function removeRobot(){
    if(count > min){
        document.getElementById("robots").removeChild(document.getElementById("robot" + count));
        document.getElementById("info").removeChild(document.getElementById("image"+count));
        count--;
    }
    if(!document.getElementById("generaterobotbutton")){
        var generateButton = document.createElement("button");
        generateButton.id = "generaterobotbutton";
        generateButton.onclick = generateRobot;
        generateButton.innerHTML = "Generate new robot";
        document.getElementById("generaterobot").appendChild(generateButton);
    }
    if(count == min){
        document.getElementById("removerobot").removeChild(document.getElementById("removerobotbutton"));
    }
}

//Determine if any of the elements of array1 occurs in array2
function checkOverlap(array1, array2){
    for(var i = 0; i < array1.length; i++){
        if(array2.includes(array1[i])){
            return true;
        }
    }
    return false;
}

// Given the current knowledge, determine the implications
function checkImplications(array, danger, dangerKnown) {
  var changed = 1;

  while(changed == 1) {
    changed = 0;

    //Normal Robot
    for(var i = 1; i < count; i++){
        if(array.includes("gr") && danger[i].includes("gr") && !beliefnormal[i-1].includes("dr")) {
          beliefnormal[i-1].push("dr")
          changed = 1;
        }
        if(array.includes("ir") && danger[i].includes("ir") && !beliefnormal[i-1].includes("dr")) {
          beliefnormal[i-1].push("dr")
          changed = 1;
        }
        if(array.includes("el") && danger[i].includes("el") && !beliefnormal[i-1].includes("dr")) {
          beliefnormal[i-1].push("dr")
          changed = 1;
        }
        if(array.includes("ox") && danger[i].includes("ox") && !beliefnormal[i-1].includes("dr")) {
          beliefnormal[i-1].push("dr")
          changed = 1;
        }
        if(array.includes("ma") && danger[i].includes("ma") && !beliefnormal[i-1].includes("dr")) {
          beliefnormal[i-1].push("dr")
          changed = 1;
        }
        if(array.includes("hd") && !beliefnormal[i-1].includes("dr") && !array.includes("dr") && !beliefnormal[i-1].includes("na") ) {
          beliefnormal[i-1].push("na")
          changed = 1;
        }
    }

    //Lost Robot
    if(array.includes("gr") && danger[0].includes("gr") &&  !belieflost.includes("dr")) {
      belieflost.push("dr")
      changed = 1;
    }
    if(array.includes("ir") && danger[0].includes("ir") && !belieflost.includes("dr")) {
      belieflost.push("dr")
      changed = 1;
    }
    if(array.includes("el") && danger[0].includes("el") &&  !belieflost.includes("dr")) {
      belieflost.push("dr")
      changed = 1;
    }
    if(array.includes("ox") && danger[0].includes("ox") &&  !belieflost.includes("dr")) {
      belieflost.push("dr")
      changed = 1;
    }
    if(array.includes("ma") && danger[0].includes("ma") &&  !belieflost.includes("dr")) {
      belieflost.push("dr")
      changed = 1;
    }
    if(array.includes("hd") && !belieflost.includes("dr") && !belieflost.includes("na")) {
      belieflost.push("na");
      changed = 1;
    }

    if(array.includes("ir") && array.includes("hd") &&  !belieflost.includes("na") && !belieflost.includes("dr")) {
      belieflost.push("na");
    }

    if(belieflost.includes("na") && !belieflost.includes("la")) {
      belieflost.push("la");
      changed = 1;
    }

    //Susan
    if(array.includes("hd") && changed == 0){
        for(var i = 0; i < count; i++){
            if(i == 0){
                //Check if a robot acts even though, according to the general knowledge and what they were told, the situation is dangerous for robots
                if(checkOverlap(array, dangerKnown[i]) && belieflost.includes("na") && !beliefsusan.includes("I have identified the lost robot")){
                    beliefsusan.push("I have identified the lost robot");
                }
                //Check if a robot does not act even though, according to the general knowledge and what they were told, the situation is not dangerous for robots but a human is in danger
                if(!checkOverlap(array, dangerKnown[i]) && !belieflost.includes("na") && !array.includes("hd") && !beliefsusan.includes("I have identified the lost robot")){
                    beliefsusan.push("I have identified the lost robot");
                }
            } else{
                //Check if a robot acts even though, according to the general knowledge and what they were told, the situation is dangerous for robots
                if(checkOverlap(array, dangerKnown[i]) && beliefnormal[i-1].includes("na") && !beliefsusan.includes("I have identified the lost robot")){
                    beliefsusan.push("I have identified the lost robot");
                }
                //Check if a robot does not act even though, according to the general knowledge and what they were told, the situation is not dangerous for robots but a human is in danger
                if(!checkOverlap(array, dangerKnown[i]) && !beliefnormal[i-1].includes("na") && !array.includes("hd") && !beliefsusan.includes("I have identified the lost robot")){
                    beliefsusan.push("I have identified the lost robot");
                }
            }
                
        }
    }
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

function retrieveDanger(dangerous, agent) {
    if($('#'+agent+'gr-danger').is(':checked')) {
        dangerous.push("gr");
    } else {
        var index = dangerous.indexOf("gr");
        if(index > -1 ) {
            dangerous.splice(index,1);
        }
    }
    if($('#'+agent+'ir-danger').is(':checked')) {
        dangerous.push("ir");
    } else {
        var index = dangerous.indexOf("ir");
        if(index > -1 ) {
            dangerous.splice(index,1);
        }
    }
    if($('#'+agent+'el-danger').is(':checked')) {
        dangerous.push("el");
    } else {
        var index = dangerous.indexOf("el");
        if(index > -1 ) {
            dangerous.splice(index,1);
        }
    }
    if($('#'+agent+'ox-danger').is(':checked')) {
        dangerous.push("ox");
    } else {
        var index = dangerous.indexOf("ox");
        if(index > -1 ) {
            dangerous.splice(index,1);
        }
    }
    if($('#'+agent+'ma-danger').is(':checked')) {
        dangerous.push("ma");
    } else {
        var index = dangerous.indexOf("ma");
        if(index > -1 ) {
            dangerous.splice(index,1);
        }
    }
    var uniquedangerous = []
    $.each(dangerous, function(i, el){
        if($.inArray(el, uniquedangerous) === -1) uniquedangerous.push(el);
    });
    dangerous = uniquedangerous;
}

function evaluateScenario(danger, lost){

  var e = document.getElementById("scenario");
  var selected = e.options[e.selectedIndex].value;

  if (selected == 'difRad'){
      if(lost == 0){
          if(danger.includes("ir") && !danger.includes("gr")){
              danger.push("gr");
          }
          if(!danger.includes("ir") && danger.includes("gr")){
              danger.push("ir");
          }
      }
  }

  if (selected == 'eleMag'){
      if(lost){
        if(danger.includes("ma") && !danger.includes("el")){
            danger.push("el");
        }
      }
  }

  if (selected == 'safe'){
      if(lost){
        danger = [];
      }
  }
}

$('#generatemodel').on('click',function() {
  // Remove all the beliefs
  beliefsusan = [];
  beliefnormal = new Array();
  belieflost = [];
  dangerKnown = [];
  danger = [[]];
  for(var i = 0; i < (count-1); i++){
      beliefnormal.push([]);
  }

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
  if($('#el-true').is(':checked')) {
    generalknowledge.push("el");
  } else {
    var index = generalknowledge.indexOf("el");
    if(index > -1 ) {
      generalknowledge.splice(index,1);
    }
  }
  if($('#ox-true').is(':checked')) {
    generalknowledge.push("ox");
  } else {
    var index = generalknowledge.indexOf("ox");
    if(index > -1 ) {
      generalknowledge.splice(index,1);
    }
  }
  if($('#ma-true').is(':checked')) {
    generalknowledge.push("ma");
  } else {
    var index = generalknowledge.indexOf("ma");
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

  // Check what each robot should see as dangerous
  for(var i = 0; i < count; i++){
    danger[i] = [];
    retrieveDanger(danger[i], i+1);
  }

  dangerKnown[0] = danger[0].slice();
  
  // Let robots make inferences from what they know to be dangerous, if there are more potential dangers
  // Also allow Susan to make inferences of what each robot knows to be dangerous, assuming they are all normal robots
  for(var i = 0; i < count; i++){
    if(i == 0){
        evaluateScenario(danger[i], 1);
        evaluateScenario(dangerKnown[i], 0);
    } else{
        evaluateScenario(danger[i], 0);
        dangerKnown[i] = danger[i].slice();
    }
    console.log(i + danger[i]);
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

  // Check implications of the given knowledge
  checkImplications(generalknowledge, danger, dangerKnown, count);

  //Generate the models based on the current knowledge
  generateModel(generalknowledge,'generalknowledge');
  generateModel(belieflost,'agent1');
  
  for (var i = 0; i < (count-1); i++){
    generateModel(beliefnormal[i],'agent'+(i+2));
  }

  generateModel(beliefsusan,'susan');

  //Generate accompanying Kripke model
  generateKripke (generalknowledge);
});
