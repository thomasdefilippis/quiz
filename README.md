# Quiz app

## Overview

In this application, the user selects the answer to multiple questions in a quiz format. When the user answers a question, the program grabs the next question and options and displays where the previous data was rendered. Finally, after the user has answered each question, the quiz app calculates their average score, displays it, and shows the correct answers to each question.


## Technological Description

Built as a full-stack application, this program is built in the PERN Stack with postregreSQL for the database, Express for the the api routes, NodeJS for the server and db connection, and ReactJS for the front-end. When using React it is much more common to utilize the MERN stack which uses mongoose to connect to a managed database service at mongoDB Atlas. However, postgreSQl is a relational database that can be directly deployed to the remote server instead of relying on a third party service. On the serverside, this app uses Express to listen for api calls at three different routes each of which returns a json object with the relevant data to display on the user interface. On the front-end, the user interface was built using ReactJs and Material Ui which allows for component production in the development stage, and produces static files through webpack and a build folder. The frontend handles api calls with asynchronous axios functions, and it manipulates the json object to display in the components. All of these technologies are hosted on a Digital Ocean droplet where nginx reverse proxies the React build folder while running the express server in the background. 


## Possible Improvements

Presently, the jest testing suite has six test cases which check the api calls and the rendering of each component. However, it tests the api calls directly with jest instead of using mocks. So, the api calls could be mocked and tested without calling them directly. Further, on the digital ocean server, the certification for a secure url (https) was completed, but somehow it got disconnected. As this is a small project without user credentials, it is not a significant matter, but otherwise it would be important to safeguard against attacks. Lastly, it would have been better to configure the Nginx engine to redirect api routes to the express server instead of making it accessible through the main domain, so that the json object would not have been so easily public. 

## Local Installation Instructions for Windows
1. Clone the repository from 
