//HTTP statuses
/*
 * 200 OK
 * 403 Forbidden
 * 500 Internal Server Error
 * 400 Bad Request
 */

var JSONStandard = [];

JSONStandard[0] = '{ "statCode":"200", "statMsg":"OK", "result": __RESULT__ }';
JSONStandard[1] = '{ "statCode":"500", "statMsg":"Internal Server Error", "infoMsg": __RESULT__ }';
JSONStandard[2] = '{ "statCode":"403", "statMsg":"Forbidden" }';
JSONStandard[3] = '{ "statCode":"400", "statMsg":"Bad request"}';
JSONStandard[4] = '{ "statCode":"400", "statMsg":"Bad request", "infoMsg":__RESULT__ }';
JSONStandard[5] = '{ "statCode":"403", "statMsg":"Forbidden", "infoMsg":__RESULT__ }';
JSONStandard[6] = '{ "statCode":"403", "statMsg":"Forbidden", "infoMsg":__RESULT__ }';

module.exports = {
    stdMessages: JSONStandard
}