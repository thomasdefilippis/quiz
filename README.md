## Quiz app

#Overview

In this application, the user selects the answer to multiple questions in a quiz format. When the user answers a question, the program grabs the next question and options and displays where the previous data was rendered. Finally, after the user has answered each question, the quiz app calculates their average score, displays it, and shows the correct answers to each question.


#Technological Description

Built as a full-stack application, this program is built in the PERN Stack with postregreSQL for the database, Express for the the api routes, NodeJS for the server and db connection, and ReactJS for the front-end. When using React it is much more common to utilize the MERN stack which uses mongoose to connect to a managed database service at mongoDB Atlas. However, postgreSQl is a relational database that can be directly deployed to the remote server instead of relying on a third party service. On the serverside, this app uses Express to listen for api calls at three different route each of which returns a json object with the relevant data to display on the user interface. 
