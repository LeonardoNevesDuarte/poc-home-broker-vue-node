//#####################################################################
//###################  Common Operations Functions  ###################
//#####################################################################

//Page function to perform Sign In
function funDoSignIn(email, password) {

    //if (gblCheckFormForCompletion('gblObjSignInForm')) {
        //const objNotice = new Notice();
        //objNotice.showLoading({ title: 'Signing in...' });

        gblAuthenticateUserService(email, password, function (result) {
            var obj = "";
            try {
                obj = JSON.parse(result);
                if (obj.statCode == 200 && obj.statMsg == "OK") {
                    document.getElementById("lblMensagens").innerHTML = "";
                    mountedApp.doUpdateSignInUserData(email.toUpperCase(), "Home Broker "+ email.substring(2,3));
                    mountedApp.doUpdateSignInFlag(true);
                    mountedApp.doInitializeListofStocks(obj.result);
                    connectWS();
                    setInterval(function() {
                        mountedApp.doUpdateMarketClock(1, "");
                    },1000);
                    setTimeout(function() {
                        mountedApp.doUpdateMarketStatus("Opened");
                        startWS();
                    }, timeToOpen);
                    setTimeout(function () {
                        mountedApp.doUpdateMarketStatus("Pre-Market");
                    }, timeToPreMarket);
                } else if (obj.statCode == 403) {
                    document.getElementById("lblMensagens").innerHTML = '<span class="text-danger"><i class="bi bi-exclamation-triangle">&nbsp;&nbsp;An error has occurred: &ldquo;' + obj.statMsg + ' - ' + obj.infoMsg + '&rdquo;</span>';
                } else if ((obj.statCode == 400 || obj.statCode == 500) && obj.infoMsg != null && obj.infoMsg != "") {
                    document.getElementById("lblMensagens").innerHTML = '<span class="text-danger"><i class="bi bi-exclamation-triangle">&nbsp;&nbsp;An error has occurred: &ldquo;' + obj.statMsg + ' - ' + obj.infoMsg + '&rdquo;</span>';
                } else {
                    document.getElementById("lblMensagens").innerHTML = '<span class="text-danger"><i class="bi bi-exclamation-triangle">&nbsp;&nbsp;An error has occurred: &ldquo;' + obj.statMsg + '&rdquo;</span>';
                }
            } catch (e) {
                document.getElementById("lblMensagens").innerHTML = e;
            }
            obj = null;
            //objNotice.hideLoading();
        });
    //}
}

//Page function to perform Sign Out
function funDoSignOut() {

    const objNotice = new Notice();
    objNotice.showLoading({ title: 'Signing out...' });

    gblSignOutService(glbGetCookie("userID"), function (result) {

        var obj = "";
        try {
            obj = JSON.parse(result);
            //console.log(obj.statCode);
        } catch (e) {
            console.log("error: " + e);
        }
        $('#gblObjSignOutBox').modal('hide');

        gblSetCookie("userID", '', -1);
        gblSetCookie("userEmail", '', -1);
        gblSetCookie("authToken", '', -1);
        funSignInManagement(gblSignInManagement());

        // hide the loading spinner
        objNotice.hideLoading();
    });
}
