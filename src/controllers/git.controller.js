//require("dotenv").config();
const octokit = require('@octokit/rest');
var $ = require("jquery");
import copyFiles_And_CreateVirtualHost from './php.controller.js'
import Users from '../models/Users';
import Project from '../models/Project';
var Git = require("nodegit");
var fs = require('fs-extra');


export async function create_Git_Repository(req,res){
  const {myID,name}= req.body;
  console.log(req.body);
  const user= await Users.findOne({
    where:{
      id:myID
    }
  });

  const clientWithAuth = new octokit({
  //auth:"c7a365f1185f37ea43d3f58217dd6a6074889bea"
  auth:user.gitToken
  })
  clientWithAuth.repos.createForAuthenticatedUser({
  name:name
  }).then(data =>{

  console.log("repo successfully created");

  }).catch(e =>{
    res.json({
      "error":"your token does not exist"
    })

  console.log(e);
  //  alert("ERROR check your informations");
  })




    console.log("yes");
    var url = `https://github.com/${user.gitUsername}/${name}`;
    var clonePath="project/project.ci/"
    var opts = {
        fetchOpts: {
          callbacks: {
            certificateCheck: () => 0
        }
      }
    };
    Git.Clone(url, clonePath, opts);

  if (user.projectid!=null) {
    for (var i = 0; i < user.projectid.length; i++) {
      const project= await Project.findOne({
        where:{
          id:user.projectid[i]
        }
      });
      if (project!=null && name==project.name) {
        return res.json({
          "message":"this project already exist"
        })
      }
    }
  }
  console.log(req.body);
  var idProject= Math.floor(Math.random() * Math.floor(100000));
  console.log(idProject);
  let id=idProject;
  let priority=null;
  let deliverydate=null;
  let newProject= await Project.create({
    id,
    name,
    priority,
    deliverydate
  },{
    fields:['id','name','priority','deliverydate']
  });

  var projID=user.projectid
  console.log(projID);
  if (user.projectid!=null) {
    projID.push(idProject)
    console.log(projID);
    user.update({
      projectid:projID,
      currentProject:{
        "id":idProject,
        "name":newProject.name
      }

    })
  }else {
    var newProjectid=[idProject]
    console.log(newProjectid);
    user.update({

      projectid:newProjectid
    })
  }





}
export async function delete_Git_Repository(req,res){
  const {gitUsername,name,token}= req.body;
  console.log(req.body);
  const clientWithAuth = new octokit({
  auth:token
  })
  clientWithAuth.repos.delete({
    owner: gitUsername,
    repo:name
  }).then(data =>{
    console.log("repo successfully deleted");
  }).catch(e =>{
    console.log(e);
  })

}

/*clientWithAuth.repos.delete({
  owner: "moncef08",
  repo:"testing123"
}).then(data =>{
  console.log("repo successfully deleted");
}).catch(e =>{
  console.log(e);
})*/
