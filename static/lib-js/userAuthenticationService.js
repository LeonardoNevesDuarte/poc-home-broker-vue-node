//#######################################################
//########  Authentication Service - Sign In  ###########
//#######################################################
function gblAuthenticateUserService(varEmail, varPassword, callbackFunction) {
    try {
        var httpHandle = gblCreateHTTPObj();
        var params = [
            { param_name: "email", param_value: varEmail, param_type: "header" },
            { param_name: "password", param_value: varPassword, param_type: "header" }
        ];
        gblDoHTTPRequest(httpHandle, 'httpHandle', params, "/api/doLogin", "", callbackFunction);       
    } catch (e) {
        console.log(e);
    }
}
//########################################################
//########  Authentication Service - Sign Out  ###########
//########################################################
function gblSignOutService(varUserID, callbackFunction) {
    try {
        var httpHandle = gblCreateHTTPObj();
        var params = [
            { param_name: "userid", param_value: varUserID },
        ];
        gblDoHTTPRequest(httpHandle, 'httpHandle', params, "/public/doLogoff", "", callbackFunction);       
    } catch (e) {
        console.log(e);
    }
}