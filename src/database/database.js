import Sequelize from 'sequelize';

//connexion to database
export const sequelize=new Sequelize(
'Moncef18',
'Moncef18',
'azerty',


  // 'lpjibasl',
  // 'lpjibasl',
  // '6o5Zh4iXTCgAdrpg9SGsRoYlM70c0X3o',
  {
    host:'localhost',
    //host: 'manny.db.elephantsql.com',
    dialect:'postgres',
    pool:{
      max:1000,
      min:0,
      require:30000,
      idle:10000
    },
    logging:false
  }
)
