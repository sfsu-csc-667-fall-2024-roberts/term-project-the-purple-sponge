# The Purple Sponge’s Milestone 2 (CSC 667)

### [Github Repository](https://github.com/sfsu-csc-667-fall-2024-roberts/term-project-the-purple-sponge.git)  

### [Github Project Board](https://github.com/orgs/sfsu-csc-667-fall-2024-roberts/projects/10)  

### What we have accomplished for the milestone this week:

- Initialized the directories for the front-end and back-end code, a file responsible for the start up and execution of the server, and a .gitignore file to avoid committing certain files.
- Setup a basic back-end server using Express.js, allowing for using javascript for HTTP requests, hosting static files and dynamically generating HTTP responses to clients.
- Implemented a Router middleware to allow for the creation of routes in modules/separate files, as means of implementing various functions of the website with ease of maintainability and understandability.
- Added scripts to run the server on startup of the website/application and reload it when changes are made, as well as error handling for HTTP stuff.
- Added a middleware directory to write additional middleware that can be used within the express application.
- Added a static file directory to store files that don’t use javascript logic in a route
- Installed a Template Engine and created a Views directory to contain blueprints of HTML code that can be reused within the application
- Installed Morgan to get more information on shell commands, Cookie-parser to support cookies in the application, and Husky to automate code formatting at every commit.
