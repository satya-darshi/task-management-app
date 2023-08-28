# Task App

## Overview

This is a simple to-do list app. Create a user account and start writing down what you have to get done.

Part of the backend was created following Andrew Mead's Node.js course.

See the project in action [here](https://josy-task-app.herokuapp.com/).

## Features

- Create a user account
- Sending automated email using the [SendGrid API](https://sendgrid.com/docs/API_Reference/index.html)
- Create, edit and delete tasks
- Filter your tasks by completion
- Sort tasks by date
- Decide how many tasks you want to see
- Update your account information

## Run the project

- Clone this project
- cd into the project directory
- Run `npm install` in your command line
- Create a `dev.env` file inside a config folder in the root of the project with the URL to your MongoDB, your port, your SendGrid credentials and your secret
- Run `npm start` in your command line
- Visit http://localhost:3000 in your browser

## Tech stack
- Node.js
- Express
- MongoDB
- EJS
- jQuery
- JWT for authentication
