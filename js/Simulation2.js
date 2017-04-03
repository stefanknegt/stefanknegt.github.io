$('ul.nav').find('a').click(function(){
  var $href = $(this).attr('href');
  var $anchor = $('#'+$href).offset();
  $('body').animate({ scrollTop: $anchor.top });
  return false;
})

generalknowledge = [];
beliefsusan = [];
beliefRobot = [[]];
beliefRobot = [];
dangerNormal = [[]];
dangerLost = [[]];
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
        newLabel.appendChild(document.createTextNode("\u00A0Infra-red\u00A0"));

        newForm.appendChild(newInput);
        newForm.appendChild(newLabel);

        newInput = document.createElement('input');
        newInput.type = 'checkbox';
        newInput.id = count + 'gr-danger';
        newLabel = document.createElement('label');
        newLabel.for = 'gr-danger';
        newLabel.appendChild(document.createTextNode("\u00A0Gamma radiation\u00A0"));

        newForm.appendChild(newInput);
        newForm.appendChild(newLabel);

        newInput = document.createElement('input');
        newInput.type = 'checkbox';
        newInput.id = count + 'el-danger';
        newLabel = document.createElement('label');
        newLabel.for = 'el-danger';
        newLabel.appendChild(document.createTextNode("\u00A0Electricity "));

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
        newDiv4.id = "agent" + count + "2";

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
function checkImplications2(array, danger, dangerNormal, dangerLost, count) {
  var changed = 1;

  while(changed == 1) {
    changed = 0;

    //Robots
    for(var i = 0; i < count; i++){
        if(array.includes("gr") && danger[i].includes("gr") && !beliefRobot[i].includes("dr")) {
          beliefRobot[i].push("dr");
          beliefRobot[i].push("grdr");
          changed = 1;
        }
        if(array.includes("gr") && !danger[i].includes("gr") && !beliefRobot[i].includes("gr")) {
          beliefRobot[i].push("gr");
          changed = 1;
        }
        if(array.includes("ir") && danger[i].includes("ir") && !beliefRobot[i].includes("dr")) {
          beliefRobot[i].push("dr");
          beliefRobot[i].push("irdr");
          changed = 1;
        }
        if(array.includes("ir") && !danger[i].includes("ir") && !beliefRobot[i].includes("ir")) {
          beliefRobot[i].push("ir");
          changed = 1;
        }
        if(array.includes("el") && danger[i].includes("el") && !beliefRobot[i].includes("dr")) {
          beliefRobot[i].push("dr");
          beliefRobot[i].push("eldr");
          changed = 1;
        }
        if(array.includes("el") && !danger[i].includes("el") && !beliefRobot[i].includes("el")) {
          beliefRobot[i].push("el");
          changed = 1;
        }
        if(array.includes("hd") && !beliefRobot[i].includes("dr") && !array.includes("dr") && !beliefRobot[i].includes("na") ) {
          beliefRobot[i].push("na");
          changed = 1;
        }
        if(beliefRobot[i].includes("na") && (i == 0) && !beliefRobot[i].includes("la") ) {
          beliefRobot[i].push("la");
          changed = 1;
        }
    }

    //Susan
    if(array.includes("hd") && changed == 0){
        var possibleLost = 0;
        for(var i = 0; i < count; i++){
            //Check if a robot acts even though, according to the general knowledge and what they were told, the situation is dangerous for robots
            if(checkOverlap(array, dangerNormal[i]) && beliefRobot[i].includes("na") && !beliefsusan.includes("IDDR")){
                beliefsusan.push("IDDR");
            }
            //Check if a robot does not act even though, according to the general knowledge and what they were told, the situation is not dangerous for robots but a human is in danger
            if(!checkOverlap(array, dangerNormal[i]) && !beliefRobot[i].includes("na") && array.includes("hd") && !beliefsusan.includes("IDSA")){
                beliefsusan.push("IDSA");
            }
            //Check if robot i could potentially be the lost robot based on their lack of action
            if(checkOverlap(array, dangerLost[i]) && !beliefRobot[i].includes("na")){
                possibleLost++;
            }
            //Check if robot i could potentially be the lost robot based on their action
            if(!checkOverlap(array, dangerLost[i]) && beliefRobot[i].includes("na")){
                possibleLost++;
            }
        }
        //There is only one robot that could be the lost robot
        if(possibleLost == 1){
            beliefsusan.push("IDEL");
        }
    }
  }
};

// Print all the formulas for the agents and the general knowledge
function generateModel2(array,agent) {
  var output = [];
  if(agent != 'generalknowledge') {
    for (var i = 0; i < array.length; i++) {
      if(array[i] == "grdr") {
        output.push('<span>' + 'I believe that gamma radiation is present and that this is dangerous.' + '</span><br>');
      }

      if(array[i] == "irdr") {
        output.push('<span>' + 'I believe that infrared radiation is present and that this is dangerous.' + '</span><br>');
      }

      if(array[i] == "eldr") {
        output.push('<span>' + 'I believe that electricity is present and that this is dangerous.' + '</span><br>');
      }

      if(array[i] == "ir" && !array.includes("irdr")) {
        output.push('<span>' + 'I believe that infrared radiation is present, but this is not dangerous.' + '</span><br>');
      }

      if(array[i] == "gr" && !array.includes("grdr")) {
        output.push('<span>' + 'I believe that gamma radiation is present, but this is not dangerous.' + '</span><br>');
      }

      if(array[i] == "el" && !array.includes("eldr")) {
        output.push('<span>' + 'I believe that electricity is present, but this is not dangerous.' + '</span><br>');
      }

      if(array[i] == "na" && !array.includes("la")) {
        output.push('<span>' + 'So I will act.' + '</span><br>');
      }

      if(array[i] == "la") {
        output.push('<span>' + 'So the others will act, and I will act.' + '</span><br>');
      }

      if(array[i] == "IDDR") {
        output.push('<span>' + 'The lost robot moved, even though normal robots would not have moved given the information it has.' + '</span>');
        alert("Well done, Susan has identified the lost robot.")
      }

      if(array[i] == "IDSA") {
        output.push('<span>' + 'The lost robot did not move, even though normal robots would have moved given the information it has.' + '</span>');
        alert("Well done, Susan has identified the lost robot.")
      }

      if(array[i] == "IDEL") {
        output.push('<span>' + 'There is only one robot that acts how the lost robot would act given the information it has.' + '</span>');
        alert("Well done, Susan has identified the lost robot.")
      }
    }
    $('#'+agent+'2').html(output.join(" "));
  }
  if(agent == 'generalknowledge') {
    if(array.includes("ir")) {
      output.push('<span>' + 'There is infrared radiation present.' + '</span><br>');
    }
    if(array.includes("gr")) {
      output.push('<span>' + 'There is gamma radiation present.' + '</span><br>');
    }
    if(array.includes("el")) {
      output.push('<span>' + 'There is electricity present.' + '</span><br>');
    }
    if(array.includes("hd")) {
      output.push('<span>' + 'There is a human in danger.' + '</span><br>');
    }
    $('#'+agent+'2').html(output.join(" "));
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

  if (selected == 'eleGr'){
      if(lost){
        if(danger.includes("el") && !danger.includes("gr")){
            danger.push("gr");
        }
      }
  }

  if (selected == 'safe'){
      if(lost){
        danger = [];
      }
  }
}

$('#generatemodel2').on('click',function() {
  // Remove all the beliefs
  beliefsusan = [];
  beliefRobot = new Array();
  dangerNormal = [];
  dangerLost = [];
  danger = [[]];
  for(var i = 0; i < count; i++){
      beliefRobot.push([]);
  }

  // Check what is set to be true by the user
  if($('#gr-true2').is(':checked')) {
    generalknowledge.push("gr");
  } else {
    var index = generalknowledge.indexOf("gr");
    if(index > -1 ) {
      generalknowledge.splice(index,1);
    }
  }
  if($('#ir-true2').is(':checked')) {
    generalknowledge.push("ir");
  } else {
    var index = generalknowledge.indexOf("ir");
    if(index > -1 ) {
      generalknowledge.splice(index,1);
    }
  }
  if($('#el-true2').is(':checked')) {
    generalknowledge.push("el");
  } else {
    var index = generalknowledge.indexOf("el");
    if(index > -1 ) {
      generalknowledge.splice(index,1);
    }
  }
  if($('#hd-true2').is(':checked')) {
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

  // Let robots make inferences from what they know to be dangerous, if there are more potential dangers
  // Also allow Susan to make inferences of what each robot knows to be dangerous, assuming they are all normal robots or all lost robots
    if(!$('#comm-true2').is(':checked')){
      for(var i = 0; i < count; i++){
        if(i == 0){
            dangerNormal[i] = danger[i].slice();
            evaluateScenario(dangerNormal[i], 0);
            evaluateScenario(danger[i], 1);
            dangerLost[i] = danger[i].slice();
        } else{
            dangerLost[i] = danger[i].slice();
            evaluateScenario(dangerLost[i], 1);
            evaluateScenario(danger[i], 0);
            dangerNormal[i] = danger[i].slice();
        }
      }
    }

  // Let robots share their rules and what they know to be dangerous if communication is checked
  if($('#comm-true2').is(':checked')) {
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
        dangerNormal[i] = danger[i].slice();
        dangerLost[i] = danger[i].slice();
    }
  }

  // Check implications of the given knowledge
  checkImplications2(generalknowledge, danger, dangerNormal, dangerLost, count);

  //Generate the models based on the current knowledge
  generateModel2(generalknowledge,'generalknowledge');
  for (var i = 0; i < count; i++){
    generateModel2(beliefRobot[i],'agent'+ (i+1));
  }

  generateModel2(beliefsusan,'susan');
});
