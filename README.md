[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=16568327)

# CSC 667/867 Fall 2024 Term Project

## Team Members

- Prince Lucky F. Santos
- William Jiang
- Shaheel Singh
- Zinc Young

# First Time Set up Instructions

1. Type in `npm install` in terminal to get the latest packages (Do this frequently when we add packages)
2. Set up Postgres and make sure you also get pgadmin 4 which should come with it. Pgadmin 4 is a gui for the database. Pay attention to what you type for your password and database name.
3. In the `.env` file adjust the DATABASE_URL to match the account name, password, and database name you had set when setting up postgres. DONT COMMIT THIS TO GITHUB
4. Type in `npm run db:migrate` this will connect to your database and start creating the tables for our game in there. You will also see an extra "test" table that was used for testing the database connection. (You can check this by going in pgadmin4 and going into the "Tables" section and looking at the tables you have)
5. To remove a table you can type `npm run db:rollback` to remove one table (need to find a way to remove them all at once)
6. Now type in `npm run start:dev` this should run the server and you should be able to the pages we have
