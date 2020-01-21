import Sequelize from 'sequelize';

//connexion to database
export const sequelize=new Sequelize(
  'lpjibasl',
  'lpjibasl',
  '6o5Zh4iXTCgAdrpg9SGsRoYlM70c0X3o',
  {
    host: 'manny.db.elephantsql.com',
    dialect:'postgres',
    pool:{
      max:5,
      min:0,
      require:30000,
      idle:10000
    },
    logging:false
  }
)
