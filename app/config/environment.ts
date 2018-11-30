require('dotenv').config()
module.exports = {
   development: {
     DATABASE_URL:  process.env.DATABASE_URL,
     secret:  process.env.SECRET,
     port: 3000
   },
   test: {
     DATABASE_URL: 'Test DB Connection String',
     secret: 'Testing Secret',
     port: 3000
   },
   production: {
     DATABASE_URL: process.env.DATABASE_URL,
     secret: process.env.SECRET,
     port: process.env.PORT || 3000
   }
 }
