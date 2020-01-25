import Users from '../models/Users';
import Project from '../models/Project';
var passwordHash = require('password-hash');
const storage = require('node-sessionstorage')
storage.setItem('userID', "")

const { Op } = require("sequelize");

export async function createUser(req, res){
  var { name,login,Email,profession,job,school,hashedPassword,mastodon}= req.body;
  console.log(req.body);
  console.log(hashedPassword);
  hashedPassword = passwordHash.generate(hashedPassword);
  var id= Math.floor(Math.random() * Math.floor(1000000000000));
  console.log(id);
  console.log(req.body);
  var projectid=2;
  var location=null;
  var company=null;
  var nbfollowers=0;
  var listoffollow=0;
  var picture=null;
  try{
    let newUser= await Users.create({
      id,
      name,
      login,
      Email,
      profession,
      school,
      projectid,
      location,
      job,
      company,
      nbfollowers,
      listoffollow,
      picture,
      hashedPassword,
      mastodon
    },{
      fields:['id','name','login','Email','profession','school','projectid','location','job','company','nbfollowers','listoffollow','picture','hashedPassword','mastodon']
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
//console.log(passwordHash.verify('password123', hashedPassword)); // true

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

  export async function updatePicture(req,res){
    const { id,picture }=req.body;
    const user= await Users.findOne({
      where:{
        id
      }
    });
    if (user!=null) {
      console.log(user);
      user.update({

          picture

      })
      return res.json(user);

    }else {
      console.log("hp");
      return res.json({
        message:'User does not exist '
      });
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
export async function unFollow(req,res){
    const { id }=req.body;
    console.log(id);
    const user= await Users.findOne({
      where:{
        id
      }
    })
    user.update({

        nbfollowers: user.nbfollowers-1

    })


    if (user!=null) {
      return res.json(user);

    }else {
      return res.json({
        message:'User does not exist '
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
    })
    user.update({

        nbfollowers: user.nbfollowers+1

    })


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
 export async function searchUserByLogin(req,res){
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
export async function getSession(req,res){
  var session=storage.getItem('userID')
  res.json({"session":session})

}
export async function logout(req,res){
  storage.setItem('userID', "")

}
export async function getUserByLoginAndPassword(req,res){
        const {login,password}= req.body;
        const user= await Users.findOne({
          where:{
            login
          }
        });
        if (user!=null ) {
          if ( passwordHash.verify(password, user.hashedPassword)) {
            storage.setItem('userID', user.id)

            return res.redirect(`http://localhost:3000/`);

          }else {
           res.redirect(`http://localhost:3000/login.html`)
          }



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
