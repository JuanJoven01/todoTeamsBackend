require('dotenv').config()

module.exports ={
  "development": {
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PW,
    "database": process.env.POSTGRES_DB,
    "host": process.env.POSTGRES_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PW,
    "database": process.env.POSTGRES_DB,
    "host": process.env.POSTGRES_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PW,
    "database": process.env.POSTGRES_DB,
    "host": process.env.POSTGRES_HOST,
    "dialect": "mysql"
  }
}
