import * as Sequelize from 'sequelize'
import {environment} from './'

export const sequelize = new Sequelize(environment.DATABASE_URL)
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
