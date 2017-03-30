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

function generateKripke(array, agent){
    var output = [];
    for(var i = 0; i < array.length; i++){
        output.push('<span>' + JSON.stringify(array[i]) + '</span><br>');
    }
    $('#KripkeModel' + agent).html(output.join(" "));
}

$('#generateKripkeModel').on('click',function() {
    var possibilities = new Array();
    var normalPos = new Array();
    var lostPos = new Array();
    var susanPos = new Array();
    var globalPos = new Array();
    
    possibilities.push({});
    generatePossibilities(possibilities);
    
    normalPossibilities(possibilities, normalPos, possibilities.length);
    lostPossibilities(possibilities, lostPos, possibilities.length);
    susanPossibilities(possibilities, susanPos, possibilities.length);
    globalPossibilities(possibilities, normalPos, lostPos, susanPos, globalPos, possibilities.length);
    
    generateKripke(normalPos, 'Normal');
    generateKripke(lostPos, 'Lost');
    generateKripke(susanPos, 'Susan');
    generateKripke(globalPos, 'General');
});