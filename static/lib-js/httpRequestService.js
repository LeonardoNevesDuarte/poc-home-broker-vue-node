
//##########################################################
//########   HTTP Service - Create HTTP Object   ###########
//##########################################################
function gblCreateHTTPObj() {
	var varObj = null;
	try {
		varObj = new ActiveXObject("Microsoft.XMLHTTP");
		//console.log("Atribuindo ActiveXObject - Microsoft.XMLHTTP");
	} catch(e) {
		try {
			varObj = new ActiveXObject("Msxml2.XMLHTTP");
			//console.log("Atribuindo ActiveXObject - Msxml2.XMLHTTP");
		} catch(ex) {
			try {
				varObj = new XMLHttpRequest();
				//console.log("Atribuindo XMLHttpRequest");
			} catch(exc) {
				varObj = null;
			}	
		}
	}
	return varObj;
}
//#####################################################################
//########   HTTP Service - Send Request as JSON with POST  ###########
//#####################################################################
function gblDoHTTPRequest(obj, objName, objParams, url, objInfoPanel, callbackFunction) {

    obj.onreadystatechange = function() {
        if(obj.readyState == 1) {
            //console.log(objName+": Em execucao");
        	if(objInfoPanel != null) {
        		glbShowHideDiv(objInfoPanel, 1);
        	}
        }
        if(obj.readyState == 4 ) {
            if(obj.responseText) {
                //console.log(objName+": Execucao da chamada remota executada com sucesso");
                if (callbackFunction != null) {
                    callbackFunction(obj.responseText);
				} else {
					//console.log(obj.responseText);
					return(obj.responseText);
				}
				if(objInfoPanel != null) {
					glbShowHideDiv(objInfoPanel, 0);
				}
            } else {
                //console.log(objName+": Erro na execucao");
            	if(objInfoPanel != null) {
            		glbShowHideDiv(objInfoPanel, 0);
				}		
            }
        }
    }

    //Open HTTP object
    obj.open("POST", url, true);

	var params = "{ ";
	var paramsSep = "";
    var existParamBody = false;

	for(var i = 0; i < objParams.length; i++) {

        if (objParams[i]["param_type"] != null && objParams[i]["param_type"] != '' && objParams[i]["param_type"] == "header") {
            //Parameters on Header
            obj.setRequestHeader(objParams[i]["param_name"], objParams[i]["param_value"]);
        } else {
            //Parameters on Body
            params = params + paramsSep + '"' + objParams[i]["param_name"] + '"' + ':' + '"' + objParams[i]["param_value"] + '"';
            paramsSep = ",";
            existParamBody = true;
        }
	}
    params = params + " }"
	i = null;
	paramsSep = null;
    existParamBody = null;

    //obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    obj.setRequestHeader("Content-type", "application/json");
    obj.send(params);
    params = null;
}