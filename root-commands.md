# HEROKU Deployment

https://github.com/appacademy/practice-for-week-15-react-redux-authenticate-me-long-practice/blob/main/part-3-deploy.md

## login

```
heroku login
```

## Set the app name after creating the app on heroku

```
heroku git:remote -a <name-of-Heroku-app>
```

## Initialize package.json in the root directory

```
npm init -y
```

## Push the project into heroku

```
git push heroku login-branch:main
```

or

```
git push heroku master
```

## Migrate & seed data in heroku

```
heroku run npm run sequelize db:migrate
```

```
heroku run npm run sequelize db:seed:all

```

**In case needing to reset database on heroku**

```
heroku pg:reset DATABASE
```
