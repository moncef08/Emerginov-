import Sequelize from 'sequelize';
import { sequelize }  from '../database/database';
import Users from './Users';

const Project= sequelize.define('projects',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.TEXT
  },
  priority:{
    type: Sequelize.INTEGER
  },
  description:{
    type: Sequelize.TEXT
  },
  deliverydate:{
    type: Sequelize.DATE
  }
},{
  timestamps:false
});
Project.hasMany(Users,{foreignKey:'projectId',sourceKey:'id'});
Users.belongsTo(Project,{foreignKey:'projectId',sourceKey:'id'});

export default Project;
