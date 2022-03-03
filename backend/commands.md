**Initialize package.json**

```
npm init -y
```

**Install dependencies**

```
npm i bcryptjs cookie-parser cors csurf dotenv express-async-handler express-validator helmet morgan per-env pg@">=8.4.1" sequelize@5 sequelize-cli@5 express jsonwebtoken
```

**Install following as dev-dependencies**

```
npm install -D dotenv-cli nodemon
```

**Initialize Sequelize to the db folder**

```
npx sequelize init
```

**Create User**

```
psql -c "CREATE USER <username> PASSWORD '<password>' CREATEDB"
```

**Create database**

```
npx dotenv sequelize db:create
```
