require('dotenv').config()

module.exports ={
  "development": {
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PW,
    "database": process.env.POSTGRES_DB,
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PW,
    "database": process.env.POSTGRES_DB,
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PW,
    "database": process.env.POSTGRES_DB,
    "host": "localhost",
    "dialect": "postgres"
  }
}
