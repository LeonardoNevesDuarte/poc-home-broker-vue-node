//Page objects for simulation
var timeToOpen = 10000;
var timeToPreMarket = timeToOpen/2;
var timeToClose = 600000;

//Page functions
function funConfirmSignIn() {

    //if (document.frmLogin.txtEmail.value == "" || document.frmLogin.txtPassword.value == "") {
    //    document.getElementById("lblMensagens").innerHTML =  "All field are mandatory to Sign In. Please try again.";
    //} else {
        document.getElementById("lblMensagens").innerHTML = "Signing In...";
        funDoSignIn(document.frmLogin.txtEmail.value, document.frmLogin.txtPassword.value);
    //}

}

function funConfirmSignOut() {
    mountedApp.doUpdateSignInUserData("", "");
    mountedApp.doUpdateSignInFlag(false);

}


// Initialize WebSocket connection and event handlers
function initWS() {
    ws = new WebSocket("ws://localhost:8080/", 'echo-protocol');

    // Listen for the connection open event then call the sendMessage function          
    ws.onopen = function (e) {
        //appendActivity("Connected to server");
        console.log("Connected to server");
        mountedApp.doUpdateConnStatus(true);
        mountedApp.doUpdateMarketClock(timeToOpen, "init");
    }

    // Listen for the close connection event
    ws.onclose = function (e) {
        //appendActivity("Disconnected from server");
        console.log("Disconnected from server");
        mountedApp.doUpdateConnStatus(false);
    }

    // Listen for connection errors
    ws.onerror = function (e) {
        console.log("Error ");
    }

    // Listen for new messages arriving at the client
    ws.onmessage = function (e) {
        //appendActivity("Data received");
        //console.log("Data received");
        //console.log(e.data);

        var result = e.data.split("|");
        mountedApp.doUpdateCurrentQuote(result[0], parseFloat(result[1]).toFixed(2));
        result = null;
    }
    return ws;
}

function connectWS() {
    console.log("Opening connection...");
    objWs = initWS();
}

function startWS() {
    console.log("Starting reception...");
    objWs.send("Start");
}

function stopWS() {
    //appendActivity("Stoping reception...");
    console.log("Stoping reception...");
    objWs.send("Stop");
}

function closeWS() {
    //appendActivity("Closing connection...");
    console.log("Closing connection...");
    objWs.close();
}
