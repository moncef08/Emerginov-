import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Users=sequelize.define('users',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey:true
  },
  name:{
    type: Sequelize.TEXT
  },
  login:{
    type: Sequelize.TEXT
  },
  profession:{
    type: Sequelize.TEXT
  },
  projectid:{
    type: Sequelize.INTEGER
  }
},{
  timestamps:false
});
export default Users;
