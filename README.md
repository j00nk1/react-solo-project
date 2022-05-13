# You Ever Note

![yen-logo](/frontend/src/components/Navigation/images/yen-logo.png)

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

## Features

### Notes

Users can create, read, edit, and delete the notes.

- Either by clicking on the `+` button or note icon on the sidebar, the user can see another sidebar that contains their note list.
- By clicking on the `+` button, it will render a new note on the main body, and the user can start selecting the notebook and typing the title & content.
  - It won't let the user submit the note if they don't fill out the title or content.
  - By clicking on the `Submit` button after properly filling out, it will save the newly created note and add it at the top of the note list
  - If the user inputted either title and/or content and clicked on the `Discard` button, a confirmation will pop up and discard the user’s input if they confirmed.
- By clicking on one of the notes from the note list, the user can see the note’s information and start editing the contents if they like.

  - By clicking on the `Update` button after changing contents, it will update the note’s information and render the note at the top of the note list.
  - By clicking on the `Cancel edit` button, a confirmation will pop up and it will discard the changes and render the original note’s contents if confirmed.
  - By clicking on the `Delete` button, a confirmation will pop up and it will delete the note if confirmed.

    ![note](/frontend/src/components/Navigation/images/you_ever_note.gif)

### Notebooks

Users can create, read, and delete notebooks. Notebooks are how notes are organized and are commonly used to separate notes by category, location, or purpose.

- By clicking on the notebook icon, the user can see another sidebar that contains their notebook list.
- By clicking on the `Add Notebook` button at the top of the notebook list, it will render a modal and the user can create a new notebook.
  - It won't let the user create a notebook if they don't fill out the notebook title.
  - By clicking on the `Create Notebook` button after properly filling out, it will save the newly created notebook and add it at the bottom of the notebook list.
- By clicking on one of the notebooks on the notebook list, the user can see the note list linked with the notebook and click on the each note to see the note’s information.
- By clicking on the trash can icon, a confirmation will pop up and it will delete the notebook as well as the notes linked with the deleting notebook if confirmed.

![notebook](/frontend/src/components/Navigation/images/notebook.gif)
