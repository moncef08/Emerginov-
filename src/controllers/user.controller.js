import Users from '../models/Users';
import Project from '../models/Project';

const { Op } = require("sequelize");

export async function createUser(req, res){
  const { name,login,profession}= req.body;

  try{
    let newUser= await Users.create({
      name,
      login,
      profession,
    },{
      fields:['name','login','profession']
    });
    if(newUser){
      return res.json({
        message:'User created successfully',
        data:newUser
      });
    }
  }catch(error){
    console.log(error);
    res.status(500).json({
      message: 'something went wrong',
      data:{}
    });
  }
}

export async function getUsers(req,res){
   try{
    const users= await Users.findAll();
    res.json({
      data:users
    });
   }catch(e){
    console.log(e)
   }
  }

export async function getUsersByProject(req,res){
    const {projectId}= req.params;
    const ProjectUsers = await Users.findAll({
      attributes: ['name', 'profession', 'projectid'],
      where:{
        projectId
      }
    });
    if (ProjectUsers.length>0) {
      return res.json(ProjectUsers);
    }else {
      res.json({
        message:'that project does not exist'
      });
    }

}
export async function newFollower(req,res){
    const { id }=req.body;
    console.log(id);
    const user= await Users.findOne({
      where:{
        id
      }
    });
    if (user!=null) {
      return res.json(user);

    }else {
      return res.json({
        message:'User does not exist '
      });
    }

  }
  export async function getUserById(req,res){
    const { id }=req.body;
    console.log(id);
    const user= await Users.findOne({
      where:{
        id
      }
    });
    if (user!=null) {
      return res.json(user);

    }else {
      return res.json({
        message:'User does not exist '
      });
    }

  }

export async function getUserByName(req,res){
        const { name }=req.body;
        const user= await Users.findAll({
          where:{
            login : {
              [Op.like]:`%${name}%`
            }
          }
        });
        if (user!=null) {
          return res.json(user);

        }else {
          return res.json({
            message:'User does not exist '
          });
        }

      }
export async function getUserByLogin(req,res){
        const {login}= req.body;
        const user= await Users.findOne({
          where:{
            login
          }
        });
        if (user!=null) {
            return res.json(user);

        }else {
          return res.json({
            message:'User does not exist '
          });
        }

      }

export async function deleteUser(req,res){
    const { id }=req.params;
    const deleteRowCount = await Users.destroy({
      where:{
        id
      }
    });
    res.json({
      message:'User deleted successfully',
      count: deleteRowCount
    });

  }

export async function deleteUserFromProject(req,res){}

export async function updateUser(req,res){
    const { id } = req.params;
    const{ name,login, profession, projectid } = req.body;

    const users = await Users.findAll({
      attributes: ['id', 'name','login', 'profession', 'projectid'],
      where:{
        id
      }
    });
    if (users.length>0) {
      users.forEach(async user => {
        await user.update({
          name,
          login,
          profession,
          projectId
        });
      })

    }
    return res.json({
      message:'User Updated successfully',
      data:users
    })
  }
