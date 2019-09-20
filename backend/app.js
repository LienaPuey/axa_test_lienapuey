//IMPORTS
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var cors = require('cors');
var process = require('process');
var jwt = require('jsonwebtoken');
var expressjwt = require('express-jwt');

//DATA CALL
var request = require('request');

//SERVER
var app = express();

//MIDLEWARE
app.use(cors());
app.use(bodyParser.json());

//CALLS 
var api1 = "http://www.mocky.io/v2/5808862710000087232b75ac"; //url clients
var api2 = "http://www.mocky.io/v2/580891a4100000e8242b75c5"; //url policies

//USER USAGE
//Get data filtered by username
app.get('/api/userName/:userName', verifyToken, (req, response) => {
    jwt.verify(req.token, 'secretkey', function (err, authData) {
        if (err) {
            response.sendStatus(403);
        } else {
            let nameUser = req.params.userName;
            request.get(api1, (err, res, body) => {
                let data = JSON.parse(body);
                let dataParsed = data.clients;
                let userData = dataParsed.find(element => { return element.name === nameUser });
                if (typeof userData != "object") {
                    response.send("This username doesn't match any client.");
                } else {
                    response.send(userData);
                }
            });

        }
    });
});

//Get data by user ID
app.get('/api/userId/:userId', verifyToken, (req, response) => {
    jwt.verify(req.token, 'secretkey', function (err, authData) {
        if (err) {
            response.sendStatus(403);
        } else {
            let clientId = req.params.userId;
            request.get(api1, (err, res, body) => {
                let data = JSON.parse(body);
                let dataParsed = data.clients;
                let userData = dataParsed.find(element => { return element.id === clientId });
                if (typeof userData != "object") {
                    response.send("The ID doesn't belong to any user.");
                } else {
                    response.send(userData);
                }
            });

        }
    });
});

//Gets list of clients
app.get('/api/clients/:email', verifyToken, (req, response) => {
    jwt.verify(req.token, 'secretkey', function (err, authData) {
        if (err) {
            response.sendStatus(403);
        } else {
            request.get(api1, (err, res, body) => {
                let data = JSON.parse(body);
                let dataParsed = data.clients;
                let resultClients = dataParsed.find(element => { return element.email === req.params.email });
                response.send(resultClients);
            });
        }
    });
});

//Gets list of policies with verification
app.get('/api/policies', verifyToken, (req, response) => {
    request.get(api2, (err, res, body) => { response.send(body) });
});

//ADMIN USAGE 
//Gets list of policies linked to a user name

app.get('/api/admin/policies/:name', verifyToken, (req, response) => {
    jwt.verify(req.token, 'secretkey', function (err, decoded) {
        if (err) {
            response.send('Forbidden');
        } else {
            //Gets client's data
            request.get(api1, (err, res, body) => {
                var data = JSON.parse(body);
                var dataParsed = data.clients;
                var clientData = dataParsed.find(element => { return element.name === req.params.name });
                //Err if the username doesn't exist
                if (typeof clientData != "object") {
                    response.send("This username doesn't match any client.");
                } else {
                    //Gets client's ID by client's name
                    var idClient = clientData.id;
                    request.get(api2, (err, res, body) => {
                        var data = JSON.parse(body);
                        var dataParsed = data.policies;
                        //Get list of policies by client's ID
                        var policiesList = dataParsed.filter(element => element.clientId === idClient);
                        //Err = if the user doesn't have any policies
                        if (policiesList.length == 0) {
                            response.send("This user doesn't have any policies.");
                        } else {

                            response.send(policiesList);
                        }
                    });

                }
            });
        }
    });
});

//Get the user linked to a policy number
app.get('/api/admin/users/:policy', verifyToken, (req, response) => {
    jwt.verify(req.token, 'secretkey', function (err, decoded) {
        if (err) {
            response.send('Forbidden');
        } else {
            // Gets policy's data by policy ID
            var policyId = req.params.policy;
            request.get(api2, (err, res, body) => {
                var data = JSON.parse(body);
                var dataParsed = data.policies;
                var resultPolicies = dataParsed.find(element => { return element.id === policyId });
                //ERR the policy number doesn't exist
                if (typeof resultPolicies != "object") {
                    response.send("This policy number doesn't exist.");
                } else {
                    //Gets User Data by policy ID
                    var userData = resultPolicies.clientId;
                    request.get(api1, (err, res, body) => {
                        var data = JSON.parse(body);
                        var dataParsed = data.clients;
                        var resultClients = dataParsed.find(element => { return element.id === userData });
                        response.send(resultClients);
                    });
                }
            });
        }
    });
});


//Login
app.post('/login', (req, response) => {
    request.get(api1, (err, res, body) => {
        var data = JSON.parse(body);
        var arrData = data.clients.filter(element => element.email === req.body.email);
        //Check if user exists
        if (arrData.length == 0) {

            response.send("User not found");

        } else if (arrData[0].role == 'user') {

            var token = jwt.sign({ email: req.body.email }, 'secretkey');
            response.send({ user: token });

        } else {

            var token = jwt.sign({ email: req.body.email }, 'secretkey');
            response.send({ admin: token });
        }
    });
});

//FUNCTIONS

// Verify Token
function verifyToken(req, res, next) {
    // Get authorization header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        //Separates the token from the Bearer and takes position 1 which is the actual token
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        // Calls the next middleware
        next();
    } else {
        // Forbidden status
        res.sendStatus(403);
    }
}
console.log("Escuchando puerto");

app.listen(3000);