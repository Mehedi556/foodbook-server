# FoodBook Application

Project live link:
https://foodbookapp.vercel.com

It's a Node.js application built with Node.js, Express.js and TypeScript.


## Set up application

First of all you need to clone the repository. Here is the repository link:
https://github.com/Mehedi556/foodbook-server

In the command prompt you have to write this command. The full command is ( git clone https://github.com/Mehedi556/foodbook-server.git )

Then go to the downloaded repository by cd (repository name) or manually.

Secondly install all the dependencies by write in the terminal

    npm install 




To run the application in development mode, use the following command: 

    npm run start:dev




This will start the server using ts-node-dev, which will automatically restart the server when code changes are detected.

To run the application in production mode, you need to build the project first and then start the server: 

    npm run build 

for build.


    npm run start:prod 


for start the server.



Important Environment Variables are:

    DATABASE_URL=mongodb+srv://<name>:<password>@cluster0.emwks8.mongodb.net/foodbook?retryWrites=true&w=majority&appName=Cluster0

    PORT=5000

    NODE_ENV=development

    BCRYPT_SALT_ROUNDS=10

    JWT_ACCESS_SECRET=028430d1e6e51d3eb2ae40e53963850548b8506012a938403ca113de85d594b4

    JWT_REFRESH_SECRET=320f3cabb16fc426d249acfa7f002c6b9fa2bc5090a0ea5694e8f58413f179d8e85ba3f488a6c252840ef1b94a181e808be467b290e08cfe00a85a52734767b5

    JWT_ACCESS_EXPIRES_IN=365d

    JWT_REFRESH_EXPIRES_IN=365d

    STORE_ID=aamarpaytest

    SIGNATURE_KEY=dbb74894e82415a2f7ff0ec3a97e4183

    PAYMENT_URL=https://sandbox.aamarpay.com/jsonpost.php


### For any questions about this project, just send me a message to salam.mehedi99@gmail.com. I will try my best to reply as early as possible. Thank you..
