# You Ever Note

![yen-logo](/rontend/src/components/Navigation/images/yen-logo.png)

## About The Project

[You Ever Note](https://you-ever-note.herokuapp.com/) is a clone of [Evernote](https://evernote.com/). You can keep your important notes in this web app!

## Technologies

Frontend

- Node, HTML, REACT REDUX, CSS3,

Backend

- Node, Express, PostgreSQL database, Sequelize, Faker

Deployed with [Heroku](https://www.heroku.com/)

---

## Getting Started

1. Clone this repo.

   ```
   git clone git@github.com:j00nk1/react-solo-project.git
   ```

2. Install dependencies from the root directory.
   ```
   npm install
   ```
3. Create a Postgresql user with CREATEDB and PASSWORD.

   ```
   CREATE USER <name> WITH CREATEDB PASSWORD <’password’>
   ```

4. Create a `.env` file in the backend directory based on the `.env.example` that will be found in the backend directory.

5. Enter the username, password, database name, and your generated JWT_SECRET code.

6. Add the proxy to package.json file in frontend directory, you can replace to your choice of localhost port.

   ```
   “Proxy”: “http://localhost:5000”
   ```

7. Create Database, Migrate and Seed database using sequlize.
   ```
   npx dotenv sequelize db:create
   npx dotenv sequelize db:migrate
   npx dotenv sequelize db:seed:all
   ```
8. Run `npm start` in the backend and frontend directory in a separate terminal.

9. You can use Demo-User to navigate through the site or you can create your own user.
