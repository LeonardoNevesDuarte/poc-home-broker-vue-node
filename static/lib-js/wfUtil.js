/*!
 * Webfingers Util
 */
//Check if value is a valid email
function wfIsEmail(varData) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(varData);
}

//Check if key value is valid for alpha only fields
function gblIsAlphaKey(evt) {
    
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if ((charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90)) {
        return true;
    } else {
        evt.preventDefault();
        return false;
    }
}

//Check if key value is a valid number
function gblIsNumericKey(evt){
    
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode >= 48 && charCode <= 57) {
        return true;
    } else {
        evt.preventDefault();
        return false;
    }
}

function gblFocusCurrencyField(evt) {

}

//Check if key value is a valid number for currency
function gblIsCurrencyKey(evt) {

    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode >= 48 && charCode <= 57) {
        evt.preventDefault();
        return String.fromCharCode(charCode);
    } else {
        evt.preventDefault();
        return "";
    }
}

//Check if key value is a valid number
function gblIsAlphaNumericKey(evt) {

    var charCode = (evt.which) ? evt.which : event.keyCode
    if ((charCode >= 48 && charCode <= 57) || (charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90)) {
        return true;
    } else {
        evt.preventDefault();
        return false;
    }
}

//Check if key value is a valid inout
function gblIsTextKey(evt) {

    var charCode = (evt.which) ? evt.which : event.keyCode
    if ((charCode >= 40 && charCode <= 42) || (charCode >= 44 && charCode <= 57) || (charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90) || charCode == 32) {
        return true;
    } else {
        evt.preventDefault();
        return false;
    }
}

//Check if key value is a valid number
function gblIsAlphaNumericSymbolKey(evt) {

    //33 - !
    //35 - #
    //36 - $
    //42 - *
    //44 - ,
    //45 - -
    //46 - .
    //59 - ;
    //64 - @
    //95 - _

    var charCode = (evt.which) ? evt.which : event.keyCode
    if ((charCode >= 48 && charCode <= 57) || (charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90) || 
        charCode == 64 || charCode == 44 || charCode == 59 || charCode == 45 || charCode == 46 || charCode == 95 || charCode == 35 || 
        charCode == 36 || charCode == 42 || charCode == 33)  {
        return true;
    } else {
        evt.preventDefault();
        return false;
    }
}


//Check if key value is a valid number
function gblIsEmailKey(evt) {

    var charCode = (evt.which) ? evt.which : event.keyCode
    if ((charCode >= 48 && charCode <= 57) || (charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90) || charCode == 64 || charCode == 45 || charCode == 46 || charCode == 95) {
        return true;
    } else {
        evt.preventDefault();
        return false;
    }
}
//Check if key value is valid for float number
function wfIsFloatKey(evt){
    
	//44 = ,
	//46 = .
	var charCode = (evt.which) ? evt.which : event.keyCode
    		if (charCode > 31 && (charCode != 44 && (charCode < 48 || charCode > 57)))
        return false;
    return true;
}

function fadeIn(el, time) {
  el.style.opacity = 0;

  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / time;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
}

function funFade(el, type, time) {
	
	if(type == "IN") {
		el.style.opacity = 0;
	} else { // OUT
		el.style.opacity = 1;
	}
	
	var last = +new Date();
	var tick = function() {
	
		if(type == "IN") {
			el.style.display = '';
			el.style.opacity = +el.style.opacity + (new Date() - last) / time;
		    last = +new Date();
		
		    if (+el.style.opacity < 1) {
		    	  //console.log(el.style.opacity);
			      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
			}
		    
		} else if (type == "OUT") {
			
			el.style.opacity = +el.style.opacity - (new Date() - last) / time;
		    last = +new Date();
		
		    if (+el.style.opacity > 0) {
		    	  //console.log(el.style.opacity);
			      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
			} else {
				el.style.display = 'none';
			}
			
		}

	};
	
	tick();
}

function glbShowHideDiv(id, method) {

	//method 1 = show, 0 = hide
	obj = document.getElementById(id);

	if(obj != null) { 
		if (method == 1) {
			obj.style.display = 'inline';
		} else {
			obj.style.display = 'none';
		} 
	}	
	obj = null;
}

//Return a date in the DD/MM/YYYY format
function glbDateFormat(varDate, varInputFormat) {
    var result = varDate;
    switch (varInputFormat) {
        case "DMA":
            var aux = result.split('-');
            result = aux[2] + "/" + aux[1] + "/" + aux[0];
            aux = null;
            break;
    }

    return result;
}

//Return a date in the DD/MM/YYYY format
function gblCurrencyFormat(varValue, varCurCode) {

    var strCurrency = "";
    var strSinal = "";

    switch (varCurCode) {
        case "BRL":
            strCurrency = "R$ ";
            break;
        case "USD":
            strCurrency = "US$ ";
            break;
        case "EUR":
            strCurrency = "EUR ";
            break;
        default:
            strCurrency = "";
            break;
    }

    var vlAjustado = "";

    if (parseFloat(varValue) < 0) {
        strSinal = "-";
        vlAjustado = varValue.toString();
        vlAjustado = vlAjustado.replace("-", "");
    } else {
        vlAjustado = varValue.toString();
    }

    var ary = vlAjustado.split(',');
    vlAjustado = null;

    if (ary.length > 1) {
        ary[1] = (ary[1] + "00").substr(0, 2);
    } else {
        ary.push("00");
    }

    var aux = "";
    var count = 0;

    if (ary[0].length > 3) {
        count = 0;
        for (var i = (ary[0].length) - 1; i >= 0; i--) {
            if (count != 0 && (count % 3) == 0) {
                aux = "." + aux;
            }
            aux = ary[0][i] + aux;
            count++;
        }
        ary[0] = aux;
    }
    aux = null;
    count = null;

    return strSinal + strCurrency + ary[0] + "," + ary[1];

    strCurrency = null;
    ary = null;
}

//Get cookie by its name
function glbGetCookie(cname) {
	  var name = cname + "=";
	  var decodedCookie = decodeURIComponent(document.cookie);
	  var ca = decodedCookie.split(';');
	  for(var i = 0; i <ca.length; i++) {
	    var c = ca[i];
	    while (c.charAt(0) == ' ') {
	      c = c.substring(1);
	    }
	    if (c.indexOf(name) == 0) {
	      return c.substring(name.length, c.length);
	    }
	  }
	  return "";
}
//Set a cookie
function gblSetCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + "; path=/";
}

//Get custom parameters from custom classNames
//Used by form completion check (gblCheckFormForCompletion)
function gblGetCustomParameterFromClassSubClass(varFullClassName, varTargetClassName) {

    var posStartElementClass = varFullClassName.search(varTargetClassName);
    var posEndElementClass = varFullClassName.indexOf(' ', posStartElementClass);

    if (posEndElementClass > posStartElementClass) {
        var elementSubClassName = varFullClassName.substring(posStartElementClass, posEndElementClass);
    } else if (posEndElementClass < 0) {
        var elementSubClassName = varFullClassName.substring(posStartElementClass, varFullClassName.length);
    }

    var result = elementSubClassName.substring(varTargetClassName.length, elementSubClassName.length);
    posStartElementClass = null;
    posEndElementClass = null;
    elementSubClassName = null;

    return result;
}

//Check mandatory fields based on the dummy class 'clsMandatoryField'
//In case of a blank field, a tooltip is raised and then destroyed
//Check min length of fields based on clsMinLength and clsMinLength-X custom class
//Check value cross-reference of fields based on clsEquals and clsEquals-X custom class
function gblCheckFormForCompletion(varForm) {

    var formObj = document.getElementById(varForm);
    var lstMandatoryFields = formObj.getElementsByClassName("clsMandatoryField");
    var lstMinLengthFields = formObj.getElementsByClassName("clsMinLength");
    var lstEqualsFields = formObj.getElementsByClassName("clsEquals");
    var lstEmailFields = formObj.getElementsByClassName("clsEmail");
    var blnMandatoryOk = true;
    var blnLengthOk = true;
    var result = true;

    for (var i = 0; i < lstMandatoryFields.length; i++) {

        if (lstMandatoryFields[i].value == '') {
            lstMandatoryFields[i].title = "This is a mandatory field";
            $('#' + lstMandatoryFields[i].id).tooltip('show');
            gblDestroyTooltip('#' + lstMandatoryFields[i].id, 2000);
            result = false;
            blnMandatoryOk = false;
        } else {
            lstMandatoryFields[i].title = '';
        }
    }

    //Check of length and cross-reference must be done only if all mandatory fields are completed
    if (blnMandatoryOk) {

        for (var i = 0; i < lstMinLengthFields.length; i++) {

            var elementLength = gblGetCustomParameterFromClassSubClass(lstMinLengthFields[i].className, 'clsMinLength-');

            if (lstMinLengthFields[i].value.length < elementLength) {
                blnLengthOk = false;
                lstMinLengthFields[i].title = "This element must have at least "+ elementLength + " characters";
                $('#' + lstMinLengthFields[i].id).tooltip('show');
                gblDestroyTooltip('#' + lstMinLengthFields[i].id, 4000);
                result = false;
            } else {
                lstMinLengthFields[i].title = '';
            }
            elementLength = null;
        }
        i = null;

        if (blnLengthOk) {
            for (var i = 0; i < lstEqualsFields.length; i++) {

                var elementToCompare = gblGetCustomParameterFromClassSubClass(lstEqualsFields[i].className, 'clsEquals-');

                if (lstEqualsFields[i].value != document.getElementById(elementToCompare).value) {
                    lstEqualsFields[i].title = "This value must be equal to field " + lstEqualsFields[i].dataset.compare;
                    $('#' + lstEqualsFields[i].id).tooltip('show');
                    gblDestroyTooltip('#' + lstEqualsFields[i].id, 4000);
                    result = false;
                } else {
                    lstEqualsFields[i].title = '';
                }
                elementToCompare = null;
            }
            i = null;
        }
        if (result) {
            for (var i = 0; i < lstEmailFields.length; i++) {

                if (!wfIsEmail(lstEmailFields[i].value)) {
                    lstEmailFields[i].title = "E-mail address not valid";
                    $('#' + lstEmailFields[i].id).tooltip('show');
                    gblDestroyTooltip('#' + lstEmailFields[i].id, 2000);
                    result = false;
                } else {
                    lstEmailFields[i].title = '';
                }
            }
            i = null;
        }
    }

    lstMandatoryFields = null;
    lstMinLengthFields = null;
    lstEqualsFields = null;
    lstEmailFields = null;
    blnMandatoryOk = null;
    blnLengthOk = null;

    formObj = null;
    return result;
}

//Destroy a tooltip according to a timer
function gblDestroyTooltip(varElement, varTimeOut) {
    setTimeout(function () {
        $(varElement).tooltip('destroy');
    }, varTimeOut);
}

//Set message details and open custom message box
function gblSetAndOpenMessageBox(varParams) {
    document.getElementById("gblObjMessageBoxTitle").innerHTML = varParams[1];
    document.getElementById("gblObjMessageBoxMessage").innerHTML = varParams[2];

    if(varParams[0] == 'E') {
        document.getElementById("gblObjMessageBoxIcon").className = "glyphicon glyphicon-alert";
        document.getElementById("gblObjMessageBoxHeader").style.background = "rgba(201, 48,44, 0.8)";
        document.getElementById("gblObjMessageBoxIcon").style.color = "rgba(201, 48,44, 0.8)";
        document.getElementById("gblObjMessageBoxHeader").style.color = "#fff";
    } else if (varParams[0] == 'W') {
        document.getElementById("gblObjMessageBoxIcon").className = "glyphicon glyphicon-exclamation-sign";
        document.getElementById("gblObjMessageBoxHeader").style.background = "rgba(240, 173, 78, 0.8)";
        document.getElementById("gblObjMessageBoxIcon").style.color = "rgba(240, 173, 78, 0.8)";
        document.getElementById("gblObjMessageBoxHeader").style.color = "#fff";
    } if (varParams[0] == 'S') {
        document.getElementById("gblObjMessageBoxIcon").className = "glyphicon glyphicon-ok-sign";
        document.getElementById("gblObjMessageBoxHeader").style.background = "rgba(92, 184, 92, 0.8)";
        document.getElementById("gblObjMessageBoxIcon").style.color = "rgba(92, 184, 92, 0.8)";
        document.getElementById("gblObjMessageBoxHeader").style.color = "#fff";
    }

    $('#gblObjMessageBox').modal();
}

//Recreate a HTML node without previous eventlisteners 
function recreateNode(el, withChildren) {
    if (withChildren) {
        el.parentNode.replaceChild(el.cloneNode(true), el);
    }
    else {
        var newEl = el.cloneNode(false);
        while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
        el.parentNode.replaceChild(newEl, el);
    }
}

//Set message details and open confirmation message box
function gblSetAndOpenConfirmationBox(varParams) {
    document.getElementById("gblObjConfirmationBoxTitle").innerHTML = varParams[0];
    document.getElementById("gblObjConfirmationBoxMessage").innerHTML = varParams[1];

    //We must remove previous events associated to the object
    recreateNode(document.getElementById("gblObjConfirmationBoxButton"));
    document.getElementById("gblObjConfirmationBoxButton").addEventListener("click", varParams[2]);

    //Check if there's a function for No/Cancel buttons
    recreateNode(document.getElementById("gblObjConfirmationBoxButtonNO"));
    if(varParams[3] != null) {
        document.getElementById("gblObjConfirmationBoxButtonNO").addEventListener("click", varParams[3]);
    }
    $('#gblObjConfirmationBox').modal();
}

//CleanUp Forms based on classNames
//Applicable to clsFields
function wfGlobalCleanUpForm(varForm) {

    var formObj = document.getElementById(varForm);
    var lstFields = formObj.getElementsByClassName("clsFields");
    var result = true;

    for (var i = 0; i < lstFields.length; i++) {
        if (lstFields[i].nodeName == "INPUT") {
            if (lstFields[i].className.indexOf("clsCurrency") > 0) {
                lstFields[i].value = "0,00";
            } else {
                lstFields[i].value = '';
            }
        }
        if (lstFields[i].nodeName == "P") {
            lstFields[i].innerHTML = '';
        }
    }
    formObj = null;
    return result;
}

//Attach validation rules to keypress events based on classNames
//Applicable to: 
//clsAlpha => (a to z / A to Z)
//clsEmail =>  (a to z / A to Z / 0 to 9 / @ . - _)
//clsAlphaNumeric => (a to z / A to Z / 0 to 9)
//clsText => clsAlphaNumeric + <space>
//clsAlphaNumericSymbol => (a to z / A to Z / 0 to 9 / ! @ # $ - . _)
//clsFloat
//clsNumeric => (0 to 9)
//clsCurrency => (0 to 9)
function gblAttachValidationRulesForKeyPress() {

    var lstFieldsAlpha = document.getElementsByClassName("clsAlpha");
    var lstFieldsAlphaNumeric = document.getElementsByClassName("clsAlphaNumeric");
    var lstFieldsText = document.getElementsByClassName("clsText");
    var lstFieldsNumeric = document.getElementsByClassName("clsNumeric");
    var lstFieldsAlphaNumericSymbol = document.getElementsByClassName("clsAlphaNumericSymbol");
    var lstFieldsEmail = document.getElementsByClassName("clsEmail");
    var lstFieldsCurrency = document.getElementsByClassName("clsCurrency");
   
    for (var i = 0; i < lstFieldsAlpha.length; i++) {

        //console.log("clsAlpha: " + lstFieldsAlpha[i].id);
        if (lstFieldsAlpha[i].nodeName == "INPUT") {
            //Attach event
            document.getElementById(lstFieldsAlpha[i].id).addEventListener("keypress", function () { gblIsAlphaKey(event); });
        }
    } 
    i = null;

    for (var i = 0; i < lstFieldsAlphaNumeric.length; i++) {

        //console.log("clsAlphaNumeric: " + lstFieldsAlphaNumeric[i].id);
        if (lstFieldsAlphaNumeric[i].nodeName == "INPUT") {
            //Attach event
            document.getElementById(lstFieldsAlphaNumeric[i].id).addEventListener("keypress", function () { gblIsAlphaNumericKey(event); });
        }
    }
    i = null;

    for (var i = 0; i < lstFieldsText.length; i++) {

        //console.log("clsText: " + lstFieldsText[i].id);
        if (lstFieldsText[i].nodeName == "INPUT") {
            //Attach event
            document.getElementById(lstFieldsText[i].id).addEventListener("keypress", function () { gblIsTextKey(event); });
        }
    }
    i = null;

    for (var i = 0; i < lstFieldsNumeric.length; i++) {

        //console.log("clsNumeric: " + lstFieldsNumeric[i].id);
        if (lstFieldsNumeric[i].nodeName == "INPUT") {
            //Attach event
            document.getElementById(lstFieldsNumeric[i].id).addEventListener("keypress", function () { gblIsNumericKey(event); });
        }
    }
    i = null;

    for (var i = 0; i < lstFieldsCurrency.length; i++) {

        //console.log("clsCurrency: " + lstFieldsCurrency[i].id);
        if (lstFieldsCurrency[i].nodeName == "INPUT") {
            //Attach event
            document.getElementById(lstFieldsCurrency[i].id).addEventListener("keypress", function () { 
                var varChar = gblIsCurrencyKey(event);
                if (this.value == "" || this.value == null) {
                    this.value = "0,00";
                }
                var auxValue = String(this.value).replace(",", "") + varChar;
                var auxValue2 = "";
                var count = 0;
                for (var x = (auxValue.length -1); x >=0; x--) {
                    if(count == 2) {
                        auxValue2 = "." + auxValue2;
                    }
                    auxValue2 = auxValue.charAt(x) + auxValue2;
                    count++;
                }
                if (auxValue2.length == 2) {
                    auxValue2 = "0." + auxValue2;
                }
                this.value = String(parseFloat(auxValue2).toFixed(2)).replace(".",",");
                count = null;
                auxValue2 = null;
                auxValue2 = null;
            });
            document.getElementById(lstFieldsCurrency[i].id).addEventListener("focusout", function () {
                if (this.value !== "") {
                    this.value = String(parseFloat(this.value.replace(",",".")).toFixed(2)).replace(".", ",");  
                }
            });
        }
    }
    i = null;

    for (var i = 0; i < lstFieldsAlphaNumericSymbol.length; i++) {

        //console.log("clsAlphaNumericSymbol: " + lstFieldsAlphaNumericSymbol[i].id);
        if (lstFieldsAlphaNumericSymbol[i].nodeName == "INPUT") {
            //Attach event
            document.getElementById(lstFieldsAlphaNumericSymbol[i].id).addEventListener("keypress", function () { gblIsAlphaNumericSymbolKey(event); });
        }
    }
    i = null;

    for (var i = 0; i < lstFieldsEmail.length; i++) {

        //console.log("clsEmail: " + lstFieldsEmail[i].id);
        if (lstFieldsEmail[i].nodeName == "INPUT") {
            //Attach event
            document.getElementById(lstFieldsEmail[i].id).addEventListener("keypress", function () { gblIsEmailKey(event); });
        }
    }
    i = null;

    lstFieldsAlpha = null;
    lstFieldsAlphaNumeric = null;
    lstFieldsNumeric = null;
    lstFieldsAlphaNumericSymbol = null;
    lstFieldsEmail = null;
}

//Attach copy paste drag drop behavior on fields
//Applicable to clsFields
function gblAttachCopyPasteBehaviorOnFormFields() {

    var lstFields = document.getElementsByClassName("clsFields");
    for (var i = 0; i < lstFields.length; i++) {
        if (lstFields[i].nodeName == "INPUT") {
            document.getElementById(lstFields[i].id).addEventListener("copy", function (e) { e.preventDefault(); });
            document.getElementById(lstFields[i].id).addEventListener("drag", function (e) { e.preventDefault(); });
            document.getElementById(lstFields[i].id).addEventListener("drop", function (e) { e.preventDefault(); });
            document.getElementById(lstFields[i].id).addEventListener("paste", function (e) { e.preventDefault(); });
        }
    }
    i = null;
    lstFields = null;
}
//Set global UI parameters/objects according to sign in condition
//Returns an array with user basic data
function gblSignInManagement() {

    var userId = glbGetCookie("userID");
    var userEmail = glbGetCookie("userEmail");
    var authToken = glbGetCookie("authToken");

    if (userId != null && authToken != null && userEmail != null && userId != '' && authToken != '' && userEmail != '') {
        //User is logged in
        glbShowHideDiv('gblObjSignUpButton', 0);
        glbShowHideDiv('gblObjSignInButton', 0);
        glbShowHideDiv('gblObjSignOutButton', 1);
        return [userId, userEmail, authToken, '', '', ''];

    } else {
        //User is not logged in
        glbShowHideDiv('gblObjSignUpButton', 1);
        glbShowHideDiv('gblObjSignInButton', 1);
        glbShowHideDiv('gblObjSignOutButton', 0);
        return ['', '', '', '', '', ''];
    }
    
}
//Copy content from html element to clipboard
function glbCopyContentToClipboard(element) {
    try {
        var copyText = document.getElementById(element);
        /* Copy the text inside the text field */
        if (copyText.nodeName == 'INPUT') {
            navigator.clipboard.writeText(copyText.value);
            /* Alert the copied text */
            //console.log("Copied the text: " + copyText.value);
        } else {
            navigator.clipboard.writeText(copyText.innerHTML);
            /* Alert the copied text */
            //console.log("Copied the text: " + copyText.innerHTML);
        }
        if (copyText != null && copyText != undefined) {
            copyText.title = "This content has been copied to Clipboard!";
            $('#' + element).tooltip('show');
            gblDestroyTooltip('#' + element, 2000);
        }
        copyText = null;
    } catch(error) {
        console.log(error);
    }
}
//Unblock screen (pages that required a signed in user)
function gblBlockUnblockScreen(varObj, varOperation) {
    if (varOperation == 1) {
        //Unblock
        document.getElementById(varObj).className = 'screenUnBlocked';
    } else if (varOperation == 0) {
        //Block
        document.getElementById(varObj).className = 'screenBlocked';
    }
}
//Map Form values into JSON for FB update
function wfGlobalMapForm2Json(varFormName) {

    var objForm = document.getElementById(varFormName);
    var lstFields = objForm.getElementsByClassName("clsFields");
    var result = "";
    var sep = "";
    var jsonLine = "";

    for (var i = 0; i < lstFields.length; i++) {
        if (dataMapping[varFormName][lstFields[i].id] != "" && dataMapping[varFormName][lstFields[i].id] != null) {

            if (String(lstFields[i].className).indexOf("clsJSONConvNumber") > 0) {
                var valueSep = '';
                var AdjustedValue = String(lstFields[i].value).replace(",", ".");
            } else {
                var valueSep = '"';
                var AdjustedValue = lstFields[i].value;
            }

            var jsonLine = jsonLine + sep + '"' + dataMapping[varFormName][lstFields[i].id] + '":' + valueSep + AdjustedValue + valueSep;
            sep = ",";
        }
    }
    result = "{" + jsonLine + "}";
    i = null;
    AdjustedValue = null;
    valueSep = null;
    jsonLine = null;
    sep = null;
    lstFields = null;
    objForm = null;

    return JSON.parse(result);
}

//Map Form values into JSON for FB update
function wfGlobalMapJson2Form(varFormName, varChave, varJSON) {
    var objForm = document.getElementById(varFormName);
    var lstFields = objForm.getElementsByClassName("clsFields");

    for (var i = 0; i < lstFields.length; i++) {
        if (dataMapping[varFormName][lstFields[i].id] != "" && dataMapping[varFormName][lstFields[i].id] != null) {
            
            if (varJSON[dataMapping[varFormName][lstFields[i].id]] != null) {
                
                if (String(lstFields[i].className).indexOf("clsJSONConvNumber") > 0) {
                    var AdjustedValue = String(varJSON[dataMapping[varFormName][lstFields[i].id]].toFixed(2)).replace(".", ",");
                } else {
                    var AdjustedValue = varJSON[dataMapping[varFormName][lstFields[i].id]];
                }
                lstFields[i].value = AdjustedValue
            }
        } else if (lstFields[i].id == "recordID") {
            lstFields[i].value = varChave;
        }
    }
    
    i = null;
    AdjustedValue = null;
    lstFields = null;
    objForm = null;
}