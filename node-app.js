#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var http = require('http'), 
           config = require('./web-server-config.json'),
           fileHandler = require('./static/lib-js/filehandler'), 
           parse = require('url').parse,
           types = config.types,
           rootFolder = config.rootFolder,
           defaultIndex = config.defaultIndex;
//var express = require('express');
const objStdMessages = require('./be-lib-js/std_messages_api');
const objQuotes = require('./static/data/quotes.json');
const qtdTickersonHB = 12;

var server = http.createServer(function (request, response) {
    
    console.log((new Date()) + ' Received request for ' + request.url);
    var filename = parse(request.url).pathname, fullPath, extension;
    //checking for API access
    if (filename.substring(0,5) === '/api/') {

        var apiRef = filename.substring(filename.lastIndexOf('/')+1,filename.length);
        console.log((new Date()) + ' Received request for API ' + apiRef);

        switch(apiRef) {
            case "doLogin":
                
                //Valid login/password records
                //email - username
                //hb1 - hb1
                //hb2 - hb2
                if ((request.headers.email.toUpperCase() == "HB1" && request.headers.password.toUpperCase() == "HB1") ||
                    (request.headers.email.toUpperCase() == "HB2" && request.headers.password.toUpperCase() == "HB2")) {

                    if (Object.keys(objQuotes).length > qtdTickersonHB) {
                        var listOfStocks = [];
                        var myStocks = [];
                        var count = 0;

                        for (const [key, value] of Object.entries(objQuotes)) {
                            listOfStocks.push(`${key}`);
                        }

                        while (count < qtdTickersonHB) {
                            var indice = Math.floor(Math.random() * Object.keys(objQuotes).length - 1) + 1;
                            if(!doProcuraElemento_lib(myStocks, listOfStocks[indice])) {
                                myStocks.push(listOfStocks[indice]);
                                count++;
                            } 
                        }
                    }
                    
                    var json_output = "{";
                    var sep = "";
                    for ($i = 0; $i < myStocks.length; $i++) {
                        json_output = json_output + sep + '"' + myStocks[$i] + '":' + JSON.stringify(objQuotes[myStocks[$i]]);
                        sep = ",";
                    }
                    json_output = json_output + "}";
                    data = objStdMessages.stdMessages[0].replace('__RESULT__', json_output);
                } else {
                    data = objStdMessages.stdMessages[6].replace('__RESULT__', '"E-mail/Username or Password invalid."');
                }
                response.writeHead(200, {
                    'Content-Type': types[extension] || 'application/json',
                    'Content-Length': data.length
                });
                response.end(data);
                break;
        }
        
    } else {

        //check root request
        if (filename === '/') {
            filename = defaultIndex;
        }

        //checking for identified HTML
        if (filename.substr(filename.lastIndexOf('.') + 1) == 'html') {
            fullPath = rootFolder + '/html/' + filename;
        } else {
            fullPath = rootFolder + filename;
        }
        
        extension = filename.substr(filename.lastIndexOf('.') + 1);

        fileHandler(__dirname + fullPath, function (data) {
            response.writeHead(200, {
                'Content-Type': types[extension] || 'text/plain',
                'Content-Length': data.length
            });
            response.end(data);
        }, function (err) {
            console.log(err);
            response.writeHead(404);
            response.end();
        });
    }

});

function doUpdateListOfQuotes() {
    var qtyTickers = 16;

    if (Object.keys(objQuotes).length > qtyTickers) {
        var listOfStocks = [];
        var listOfStocksBeingUpdated = [];
        var count = 0;

        for (const [key, value] of Object.entries(objQuotes)) {
            listOfStocks.push(`${key}`);
        }

        while (count < qtyTickers) {
            var indice = Math.floor(Math.random() * Object.keys(objQuotes).length - 1) + 1;
            if (!doProcuraElemento_lib(listOfStocksBeingUpdated, listOfStocks[indice])) {
                listOfStocksBeingUpdated.push(listOfStocks[indice]);
                count++;
            }
        }
        count = null;
        listOfStocks = null;
        qtyTickers = null;
    }

    return listOfStocksBeingUpdated;
}

function doUpdateQuote(varStock) {
    
    //min: -0,10% max: +0,10%
    var randVariation = Math.floor(Math.random() * 3) + 1;
    var currValue = objQuotes[varStock].current;

    if (randVariation == 1) {
        var variation = (currValue * -0.10)/100;
    } else if (randVariation == 2) {
        var variation = 0;
    }else if (randVariation == 3) {
        var variation = (currValue * 0.10)/100;
    }
    randVariation = null;
    objQuotes[varStock].current = currValue + variation;
    return parseFloat(currValue + variation).toFixed(2);
    
}

function doProcuraElemento_lib(varAry, varElemento) {
    var result = false;
    if (varAry.length > 0) {
        for (var i = 0; i < varAry.length; i++) {
            if (varAry[i] == varElemento) {
                result = true;
                break;
            }
        }
    }
    return result;
}

server.listen(8080, function () {
    console.log((new Date()) + ' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

//const walk = require('./static/data/central-park.json');
//var gblPos = 0;
var blnKeepActive = true;
var isRunning = false;

wsServer.on('request', function (request) {
    
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }
    
    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
        
    connection.on('message', function(message) {
        var dynQuotes = [];
        if (message.type === 'utf8' && message.utf8Data === 'Start') {
            blnKeepActive = true;
            objResponse = setInterval(function() {
                if (!blnKeepActive) {
                    clearInterval(objResponse);
                } else {

                    if (! isRunning) {
                        isRunning = true;
                        dynQuotes = doUpdateListOfQuotes();
                        while (dynQuotes.length > 0) {
                            var ticker = dynQuotes.shift();
                            result = ticker + "|" + doUpdateQuote(ticker);
                            console.log((new Date()) + ' Sending back to client ' + ticker);
                            connection.sendUTF(result);
                            result = null;
                            ticker = null;
                        }
                        isRunning = false;
                    } else {
                        console.log("Can't run the process since it's still running");
                    }
            
                }
            },
            1000);
        } else if(message.type === 'utf8' && message.utf8Data === 'Stop') {
            blnKeepActive = false;
        }
    });

    /*
    connection.on('message', function (message) {

        console.log(message);

        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    */
    
    connection.on('close', function (reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        blnKeepActive = false;
    });
});
