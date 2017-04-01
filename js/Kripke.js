 var possibilities = new Array();
 var normalPos = new Array();
 var lostPos = new Array();
 var susanPos = new Array();
 var globalPos = new Array();

 var worldsNormal = new Array();
 var worldsLost = new Array();
 var worldsSusan = new Array();
 
 var domain = new Array();

function generatePossibilities(possibilities){
    var world = 0;
    for(var gr = 0; gr <= 1; gr++){
        for(var ir = 0; ir <= 1; ir++){
            for(var dr = 0; dr <= 1; dr++){                
                for(var na = 0; na <= 1; na++){                    
                    for(var la = 0; la <= 1; la++){                        
                        for(var hd = 0; hd <= 1; hd++){
                            possibilities[world]['gr'] = gr;
                            possibilities[world]['ir'] = ir;
                            possibilities[world]['dr'] = dr;
                            possibilities[world]['na'] = na;
                            possibilities[world]['la'] = la;
                            possibilities[world]['hd'] = hd;
                            world++;
                            possibilities.push({});
                        }
                    }
                }
            }
        }
    }
}

function normalPossibilities(possibilities, normalPos, max){
    var dict = {};
    for(var i = 0; i < max; i++){
        
        //If and only if there is either gamma or infra-red, there is danger
        if(((possibilities[i]['gr'] == 1 || possibilities[i]['ir'] == 1) && possibilities[i]['dr'] == 1) || (possibilities[i]['gr'] == 0 && possibilities[i]['ir'] == 0 && possibilities[i]['dr'] == 0)){
            
            //Do not act if there is danger, but do act if there is not
            if((possibilities[i]['dr'] == 1 && possibilities[i]['na'] == 0) || possibilities[i]['dr'] == 0){
                
                //Do not act if no one is in danger, but act if there is and there is no danger to the robot
                if((possibilities[i]['hd'] == 1 && possibilities[i]['na'] == 1) || (possibilities[i]['dr']==1) || (possibilities[i]['hd'] == 0 && possibilities[i]['na'] == 0)){
                    
                    //The lost robot will also act, if the normal robot acts
                    if((possibilities[i]['la'] == 1 && possibilities[i]['na'] == 1) || (possibilities[i]['la'] == 0 && possibilities[i]['na'] == 0)){                        
                        dict = JSON.parse(JSON.stringify(possibilities[i])); //deep copy dictionary
                        normalPos.push(dict);
                    }
                }
            }                
        }
    }
}

function lostPossibilities(possibilities, normalPos, max){
    var dict = {};
    for(var i = 0; i < max; i++){
        
        //If and only if there is gamma radiation, there is danger
        if((possibilities[i]['gr'] == 1 && possibilities[i]['dr'] == 1) || (possibilities[i]['gr'] == 0 && possibilities[i]['dr'] == 0)){
            
            //Do not act if there is danger, but do act if there is not
            if((possibilities[i]['dr'] == 1 && possibilities[i]['na'] == 0) || possibilities[i]['dr'] == 0){
                
                //Do not act if no one is in danger, but act if there is and there is no danger to the robot
                if((possibilities[i]['hd'] == 1 && possibilities[i]['na'] == 1) || (possibilities[i]['dr']==1) || (possibilities[i]['hd'] == 0 && possibilities[i]['na'] == 0)){
                    
                    //The lost robot will also act, if the normal robot acts
                    if((possibilities[i]['la'] == 1 && possibilities[i]['na'] == 1) || (possibilities[i]['la'] == 0 && possibilities[i]['na'] == 0)){                        
                        dict = JSON.parse(JSON.stringify(possibilities[i])); //deep copy dictionary
                        normalPos.push(dict);
                    }
                }
            }                
        }
    }
}

function susanPossibilities(possibilities, susanPos, max){
    var dict = {};
    for(var i = 0; i < max; i++){
        
        //If and only if there is gamma radiation, there is danger
        if((possibilities[i]['gr'] == 1 && possibilities[i]['dr'] == 1) || (possibilities[i]['gr'] == 0 && possibilities[i]['dr'] == 0)){
            
            //The lost robot and the normal robots will not act if it is actually dangerous
            if((possibilities[i]['dr'] == 1 && possibilities[i]['na'] == 0 && possibilities[i]['la'] == 0) || possibilities[i]['dr'] == 0){
                
                //The lost robot will only act when someone is in danger, and only when the situation is not dangerous
                if((possibilities[i]['hd'] == 1 && possibilities[i]['la'] == 1) || (possibilities[i]['dr']==1) || (possibilities[i]['hd'] == 0 && possibilities[i]['la'] == 0)){
                    
                    //The normal robot will only act when someone is in danger, and only when the situation is not dangerous
                    if((possibilities[i]['hd'] == 1 && possibilities[i]['na'] == 1) || (possibilities[i]['ir'] == 1) || possibilities[i]['dr'] || (possibilities[i]['hd'] == 0 && possibilities[i]['na'] == 0)){ 

                        //The normal robot will also not act if there is infra-red, as this is percieved as dangerous
                        if((possibilities[i]['ir'] == 1 && possibilities[i]['na'] == 0) || possibilities[i]['ir'] == 0){
                            dict = JSON.parse(JSON.stringify(possibilities[i])); //deep copy dictionary
                            susanPos.push(dict);
                        }
                    }
                }
            }                
        }
    }
}

//Checks if dict matches one of the dictionaries in array
function included(dict, array){
    var arrayValues = new Array();
    var match = true;
    var dictValues = Object.values(dict);
    
    if(dictValues.length == 0){
        return false;
    }
    
    for(var i = 0; i < array.length; i++){
        arrayValues = Object.values(array[i]);
        for(var j = 0; j < dictValues.length; j++){
            if(dictValues[j] !== arrayValues[j]){
                match = false;
                break;
            }
        }
        if(match){
            return true;
        }
        match = true;
    }
    return false;
}

function globalPossibilities(possibilities, normal, lost, susan, total, max){
    var dict = {};
    for(var i = 0; i < max; i++){
        if(included(possibilities[i], normal) || included(possibilities[i], lost) || included(possibilities[i], susan)){
            dict = JSON.parse(JSON.stringify(possibilities[i])); //deep copy dictionary
            total.push(dict);
        }
    }
}

function canvas_arrow(context, fromx, fromy, tox, toy){
    var headlen = 10;	// length of head in pixels
    var dx = tox-fromx;
    var dy = toy-fromy;
    var angle = Math.atan2(dy,dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
    context.moveTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
}

function generateDomain(globalPos){
    var i = 0;
    var x = 205;
    var y = 40;
    var height = 600;
    var width = 600;
    var part = globalPos.length/4;
    
    while(i < part){
        world = {'world': i, 'x': x, 'y': y};
        domain.push(world);
        x += width/globalPos.length;
        y += height/globalPos.length;
        i++;
    }    
    while(i < part*2){
        world = {'world': i, 'x': x, 'y': y};
        domain.push(world);
        x -= width/globalPos.length;
        y += height/globalPos.length;
        i++;
    }
    while(i < part*3){
        world = {'world': i, 'x': x, 'y': y};
        domain.push(world);
        x -= width/globalPos.length;
        y -= height/globalPos.length;
        i++;
    }
    while(i < globalPos.length){
        world = {'world': i, 'x': x, 'y': y};
        domain.push(world);
        x += width/globalPos.length;
        y -= height/globalPos.length;
        i++;
    }
}
    
function drawKripke(globalPos, array, agent, color, domain){
    var i = 0;
    var c = document.getElementById("KripkeModel" + agent);
    var ctx = c.getContext("2d");
    
    ctx.clearRect(0,0,400,400)
    
    for(i = 0; i <globalPos.length; i++){
        if(i < globalPos.length/2)  ctx.fillText("World" + (domain[i].world+1), domain[i].x, domain[i].y);
        if(i >= globalPos.length/2) ctx.fillText("World" + (domain[i].world+1), domain[i].x-40, domain[i].y);
        ctx.fillRect(domain[i].x - 4, domain[i].y - 4, 8, 8);
    }  
    
    for(i = 0; i <domain.length; i++){
        for(var j = 0; j < array.length; j++){
            ctx.beginPath();
            ctx.strokeStyle = color;
            canvas_arrow(ctx, domain[i].x, domain[i].y, domain[array[j]].x, domain[array[j]].y);
            ctx.stroke();
        }
    }
}

function drawOverview(array){
    var coords = new Array();
    var c = document.getElementById("KripkeModelGeneral");
    var ctx = c.getContext("2d");
    var height = 350/(array.length+1);
    var property;
    
    ctx.clearRect(0,0,350,350);
    
    columnNames = ['','gr','ir','dr','hd','na','la'];
    for(var i = 0; i < 7; i++){
        ctx.font = "20px Arial";
        ctx.fillText(columnNames[i], (50*i+10), (height-10));
        for(var j = 0; j <= array.length; j++){
            ctx.rect(50*i, height*j, 50, height);
            if(i == 0){
                if(j > 0){
                    ctx.font = "10px Arial";
                    ctx.fillText('world' + j, (50*i+10), (height*j +20));
                }
            } else{
                if(j > 0){
                    ctx.font = "10px Arial";
                    property = columnNames[i];
                    if(array[j-1][property] == 0){
                        ctx.fillStyle='red';
                        ctx.fillRect(50*i, height*j, 50,50);
                        ctx.fillStyle = 'white';
                        ctx.fillText('False', (50*i+10), (height*j + 20));
                    } else{
                        ctx.fillStyle='green';
                        ctx.fillRect(50*i, height*j, 50,50);
                        ctx.fillStyle = 'white';
                        ctx.fillText('True', (50*i+10), (height*j + 20));
                    }
                    ctx.fillStyle='black';
                }
                
            }
        }
        ctx.stroke();
    }
}

function announcement(announced, value){
    worldsNormal = new Array();
    worldsLost = new Array();
    worldsSusan = new Array();
    
    for(var i = 0; i < globalPos.length; i++){
        if(globalPos[i][announced] == value){
            globalPos.splice(i, 1);
            domain.splice(i, 1);
            i--;
        }
    }
    
    for(var i = 0; i < globalPos.length; i++){
        if(included(globalPos[i], normalPos)) worldsNormal.push(i);
        if(included(globalPos[i], lostPos)) worldsLost.push(i);
        if(included(globalPos[i], susanPos)) worldsSusan.push(i);
    }
    
    drawKripke(globalPos, worldsNormal, 'Normal', 'green', domain);
    drawKripke(globalPos, worldsLost, 'Lost', 'red', domain);
    drawKripke(globalPos, worldsSusan, 'Susan', 'blue', domain);
}

function announceGr(value = 0){
    announcement('gr', value);
    if(value){
		document.getElementById("announceGr").className = "btn btn-primary btn-block disabled";
		document.getElementById("announceNegGr").className = "btn btn-success btn-block active";
	}else{
		document.getElementById("announceNegGr").className = "btn btn-primary btn-block disabled";
		document.getElementById("announceGr").className = "btn btn-success btn-block active";
	}
}

function announceIr(value = 0){
    announcement('ir', value);
    if(value){
		document.getElementById("announceIr").className = "btn btn-primary btn-block disabled";
		document.getElementById("announceNegIr").className = "btn btn-success btn-block active";
	}else{
		document.getElementById("announceNegIr").className = "btn btn-primary btn-block disabled";
		document.getElementById("announceIr").className = "btn btn-success btn-block active";
	}
}

function announceDr(value = 0){
    announcement('dr', value);
    if(value){
		document.getElementById("announceDr").className = "btn btn-primary btn-block disabled";
		document.getElementById("announceNegDr").className = "btn btn-success btn-block active";
	}else{
		document.getElementById("announceNegDr").className = "btn btn-primary btn-block disabled";
		document.getElementById("announceDr").className = "btn btn-success btn-block active";
	}
}

function announceHd(value = 0){
    announcement('hd', value);
    if(value){
		document.getElementById("announceHd").className = "btn btn-primary btn-block disabled";
		document.getElementById("announceNegHd").className = "btn btn-success btn-block active";
	}else{
		document.getElementById("announceNegHd").className = "btn btn-primary btn-block disabled";
		document.getElementById("announceHd").className = "btn btn-success btn-block active";
	}
}

function announceNa(value = 0){
    announcement('na', value);
    if(value){
		document.getElementById("announceNa").className = "btn btn-primary btn-block disabled";
		document.getElementById("announceNegNa").className = "btn btn-success btn-block active";
	}else{
		document.getElementById("announceNegNa").className = "btn btn-primary btn-block disabled";
		document.getElementById("announceNa").className = "btn btn-success btn-block active";
	}
}

function announceLa(value = 0){
    announcement('la', value);
    if(value){
		document.getElementById("announceLa").className = "btn btn-primary btn-block disabled";
		document.getElementById("announceNegLa").className = "btn btn-success btn-block active";
	}else{
		document.getElementById("announceNegLa").className = "btn btn-primary btn-block disabled";
		document.getElementById("announceLa").className = "btn btn-success btn-block active";
	}
}

$('#generateKripkeModel').on('click',function() {
    possibilities = new Array();
    normalPos = new Array();
    lostPos = new Array();
    susanPos = new Array();
    globalPos = new Array();
    
    worldsNormal = new Array();
    worldsLost = new Array();
    worldsSusan = new Array();
    
    domain = new Array();
    
    possibilities.push({});
    generatePossibilities(possibilities);
    
    normalPossibilities(possibilities, normalPos, possibilities.length);
    lostPossibilities(possibilities, lostPos, possibilities.length);
    susanPossibilities(possibilities, susanPos, possibilities.length);
    globalPossibilities(possibilities, normalPos, lostPos, susanPos, globalPos, possibilities.length);
    
    for(var i = 0; i < globalPos.length; i++){
        if(included(globalPos[i], normalPos)) worldsNormal.push(i);
        if(included(globalPos[i], lostPos)) worldsLost.push(i);
        if(included(globalPos[i], susanPos)) worldsSusan.push(i);
    }
    
    generateDomain(globalPos);
    
    drawKripke(globalPos, worldsNormal, 'Normal', 'green', domain);
    drawKripke(globalPos, worldsLost, 'Lost', 'red', domain);
    drawKripke(globalPos, worldsSusan, 'Susan', 'blue', domain);
    
    drawOverview(globalPos);
    
    document.getElementById("announceGr").className = "btn btn-primary btn-block";
    document.getElementById("announceIr").className = "btn btn-primary btn-block";
    document.getElementById("announceDr").className = "btn btn-primary btn-block";
    document.getElementById("announceHd").className = "btn btn-primary btn-block";
    document.getElementById("announceNa").className = "btn btn-primary btn-block";
    document.getElementById("announceLa").className = "btn btn-primary btn-block";
    
    document.getElementById("announceNegGr").className = "btn btn-primary btn-block";
    document.getElementById("announceNegIr").className = "btn btn-primary btn-block";
    document.getElementById("announceNegDr").className = "btn btn-primary btn-block";
    document.getElementById("announceNegHd").className = "btn btn-primary btn-block";
    document.getElementById("announceNegLa").className = "btn btn-primary btn-block";
    document.getElementById("announceNegNa").className = "btn btn-primary btn-block";
});
