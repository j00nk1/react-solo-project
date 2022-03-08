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

**Generate User Table Migration**

```
npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string
```

**Generate User Seed**

```
npx sequelize seed:generate --name demo-user
```

**Generate Notebook Migration**

```
npx sequelize model:generate --name Notebook --attributes userId:integer,title:string,isMain:boolean
```

**Generate Notebook Seed**

```
npx sequelize seed:generate --name notebook
```

**Generate Note Migration**

```
npx sequelize model:generate --name Note --attributes userId:integer,notebookId:integer,title:string,content:text
```

**Generate Note Seed**

```
npx sequelize seed:generate --name note
```

**DB COMMANDS**

```
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
npx dotenv sequelize db:seed:undo:all
npx dotenv sequelize db:migrate:undo
npx dotenv sequelize db:drop
```
