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

//secrets
// var secretsRaw = fs.readFileSync('secrets.json');
// var secrets = JSON.parse(secretsRaw);
// var miClave = secrets.jwt_clave;

//midleware
app.use(cors());
app.use(bodyParser.json());
// app.use(expressjwt({
//     secret: miClave
// }).unless({
//     path: ["/login", "/register"]
// })); //checks if token is in the path except login and register


//CALLS 
var api1 = "http://www.mocky.io/v2/5808862710000087232b75ac"; //url clients
var api2 = "http://www.mocky.io/v2/580891a4100000e8242b75c5"; //url policies

app.get('/api/clients/:email', verifyToken, (req, response) => {
    jwt.verify(req.token, 'secretkey', function (err, authData) {
        if (err) {
            response.sendStatus(403);
        } else {
            request.get(api1, (err, res, body) => {
                var data = JSON.parse(body);
                var dataParsed = data.clients;
                var resultClients = dataParsed.find(element =>{ return element.email === req.params.email });
                console.log(resultClients);
                response.send(resultClients)
            })

    
        }
    })

}); //Gets list of clients


app.get('/api/policies', verifyToken, (req, response) => {
    request.get(api2, (err, res, body) => { response.send(body) })
}); //Gets list of policies



app.post('/login', (req, response) => {//login
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

// FORMAT OF TOKEN:
// Authorization: Bearer <token>
// Verify Token
function verifyToken(req, res, next) {
    // Get authorization header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden status
        res.sendStatus(403);
    }

}




console.log("Escuchando puerto");

app.listen(3000);