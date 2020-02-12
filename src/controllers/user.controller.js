import Users from '../models/Users';
import Project from '../models/Project';
var passwordHash = require('password-hash');
var storage = require('node-sessionstorage')
var storage1="";
var rimraf = require("rimraf");
var fs = require('fs-extra');
var path = require("path")
var Git = require("nodegit");

storage.setItem('userID', "")

const { Op } = require("sequelize");


  
export async function createUser(req, res){
  var { name,login,Email,gitToken,gitUsername,job,location,school,hashedPassword,mastodon}= req.body;
  console.log(req.body);
  console.log(hashedPassword);
  hashedPassword = passwordHash.generate(hashedPassword);
  var id= Math.floor(Math.random() * Math.floor(1000000000000));
  console.log(id);
  console.log(req.body);
  var projectid=null;
  var company=null;
  var nbfollowers=0;
  var listoffollow=null;
  var picture=null;
  try{
    let newUser= await Users.create({
      id,
      name,
      login,
      Email,
      gitToken,
      school,
      projectid,
      location,
      job,
      company,
      gitUsername,
      nbfollowers,
      listoffollow,
      picture,
      hashedPassword,
      mastodon
    },{
      fields:['id','name','login','Email','gitToken','school','projectid','location','job','company','gitUsername','nbfollowers','listoffollow','picture','hashedPassword','mastodon']
    });
    if(newUser){
      res.redirect("/login.html")
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

   export async function changeCurrent(req,res){
     const { id,newCurrentid,newCurrentname }=req.body;
     rimraf(`fictiveProjects/${newCurrentname}/`, function () { console.log("done"); });

      const user= await Users.findOne({
        where:{
          id
        }
      });
      if (user!=null) {
        user.update({

            currentProject:{
              id:newCurrentid,
              name:newCurrentname
            }

        })
       var url=`https://github.com/${user.gitUsername}/${newCurrentname}.git`




        var localPath =`${newCurrentname}`;
        var opts = {
            fetchOpts: {
              callbacks: {
                certificateCheck: () => 0
            }
          }
        };
        var cloneRepository = Git.Clone(url, localPath, opts);
      //  setTimeout(function(){fs.copy("fictiveProjects/projects/","projects")},2000)

        return res.json(user);

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
      attributes: ['name', 'projectid'],
      where:{
        projectid:{
         [Op.contains]:projectId


      }
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
export async function checkFollower(req,res){
  const { id,myid }=req.body;
  let check=false
  const user= await Users.findOne({
    where:{
      id
    }
  });
  if (user.listoffollow!=null) {
    console.log(user.listoffollow[0]);

    let myinfo={"id":myid}
    console.log(myinfo);
    console.log(user.listoffollow[0].json==myid);
    for (var i = 0; i < user.listoffollow.length; i++) {
      if (user.listoffollow[i].id==myid) {
        check=true
        console.log(check);
      }
    }
    if (check==true) {
        res.json({
          "check":true
        })
    }
  }else {
    res.json({
      "check":false

    })
  }


}
export async function unFollow(req,res){
    const { id,myid }=req.body;
    console.log(id);
    const user= await Users.findOne({
      where:{
        id
      }
    })
    var listoffollow=user.listoffollow
    if (listoffollow!=null) {
      if (listoffollow.length==1) {
        user.update({

            nbfollowers: user.nbfollowers-1,
            listoffollow:null

        })
      }else{
        listoffollow.splice( listoffollow.indexOf({"id":myid}), 1 );
        user.update({

            nbfollowers: user.nbfollowers-1,
            listoffollow:listoffollow

        })
      }

    }




    if (user!=null) {
      return res.json(user);

    }else {
      return res.json({
        message:'User does not exist '
      });
    }

  }
export async function newFollower(req,res){
    var { id,myid}=req.body;
    myid=parseInt(myid)
    console.log(req.body);
    console.log(id);
    const user= await Users.findOne({
      where:{
        id
      }
    })
    var listoffollow=user.listoffollow
    if (listoffollow!=null) {
      listoffollow.append({
        "id":myid
      })
      console.log(listoffollow);
      user.update({

          nbfollowers: user.nbfollowers+1,
          listoffollow:listoffollow

      })

    }else {
      user.update({

          nbfollowers: user.nbfollowers+1,
          listoffollow:[{"id":myid}]

      })
    }


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
  export async function acceptRequest(req,res){
    const { id,senderLogin,name }=req.body;
    console.log(id);
    const sender= await Users.findOne({
      where:{
        login:senderLogin
      }
    });
    const user= await Users.findOne({
      where:{
        id
      }
    });
    if (user.requests!=null) {
      var newRequests=[]
      for (var i = 0; i < user.requests.length; i++) {
        if(user.requests[i].senderID!=sender.id || user.requests[i].projectName!=name){
          newRequests.push(user.requests[i])
        }else {
          newRequests.push({
            "projectName":name,
            "senderID":sender.id,
            "status":"approved"
          })
        }

      }
      user.update({
        requests:newRequests
      })

    }



    var newProjectid=sender.projectid
    console.log(name);

    console.log("les anciens projets sont "+newProjectid);
    const project= await Project.findOne({
      where:{
        name:name
      }
    });
    console.log("yes "+project.name);
    console.log(project.id);
    if (newProjectid!=null) {
      newProjectid.push(project.id)
    }else {
      console.log(newProjectid);
      var newProjectid=[project.id]
    }
    sender.update({
      projectid:newProjectid
    })

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
            storage1=user.id

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
    const{ name,login, gitToken, projectid } = req.body;

    const users = await Users.findAll({
      attributes: ['id', 'name','login', 'gitToken', 'projectid'],
      where:{
        id
      }
    });

    if (users.length>0) {
      users.forEach(async user => {
        await user.update({
          name,
          login,
          gitToken,
          projectid
        });
      })

    }
    return res.json({
      message:'User Updated successfully',
      data:users
    })
  }
  export default storage1;
