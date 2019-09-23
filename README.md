# AXA Test Liena Puey

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.
The project also uses Node.js and Express.js

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Installation

In order to run this project you need to install these libraries whith your CLI:
```
npm install
npm start
```

## API Reference

[This API contains the clients' data](http://www.mocky.io/v2/5808862710000087232b75ac)

[This API contains the policies' data](http://www.mocky.io/v2/580891a4100000e8242b75c5)

## Usage

First step you need to take is downloading this repository or cloning it. 

After that, go to your CLI and follow the install instructions below.

Next step is developing the server as below.

Congratulations, now the app is running.


Next steps:

In order to **sign up** in the app you need to take one **email** from the clients' API. 

If you sign up with a user email you will be redirected to a user interface and you will be able to access the user's information in two different ways. **You will need to use the client's API to access this information.**

If you sign up with an admin email you will be redirected to an admin interface and you will be able to access the admin's and user's information and their policies. **You will need to use both clients' and policies' APIs to access this information.**


## Requirements not met

With a user's email you can access to admin's interface if you change the path in the url from user to admin. Although your token is a user's role token. This is due to the AuthGuard service that doesn't work as expected.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
