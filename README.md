# <p align = "center"> Punching In </p>

<p align="center">
   <img src="https://cdn.dribbble.com/userupload/3217386/file/original-4a4c818239cd180185a0c998b545abe2.jpg?compress=1&resize=400x300&vertical=top"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Bárbara_Rech-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/barbararech/punching-in-back?color=4dae71&style=flat-square" />
</p>


##  :clipboard: Description

An app for you to manage yours applications to job offfers!

## :computer: Technologies
  - Node.js
  - Typescript
  - JWT
  - PostgreSQL
  - Prisma
  - Jest
  - Supertest  

## 🏁 Running the application

Make sure you have the latest stable version of [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) running locally.

First, clone this repository:

```
git clone https://github.com/barbararech/punching-in-back
```

Inside the folder, run the following command to install the dependencies.

```
npm install
```

Run the following command to install the dev dependencies.

```
npm install dotenv-cli jest prisma supertest ts-jest ts-node typescrypt nodemon eslint @faker-js/faker @types/bcrypt @types/cors @types/dotenv @types/express @types/jest @types/joi @types/node @types/supertest -D
```

Create database

```
npx prisma migrate dev
```

Then, run

```
npm start
```

to open the project on localhost in your browser.


### For the integration test

Inside the back-end folder, run the following command to start the tests.

```
npm run test:integration
```

### For the unit test

Inside the back-end folder, run the following command to start the tests.

```
npm run test:unit
```


:stop_sign: Don't forget to set the **environment variables**!




