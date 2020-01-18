import Sequelize from 'sequelize';

//connexion to database
export const sequelize=new Sequelize(
  'Moncef18',
  'Moncef18',
  'azerty',
  {
    host: 'localhost',
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
