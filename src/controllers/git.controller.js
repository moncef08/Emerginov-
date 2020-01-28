//require("dotenv").config();
const octokit = require('@octokit/rest');
var $ = require("jquery");
import copyFiles_And_CreateVirtualHost from './php.controller.js'
import Users from '../models/Users';
import Project from '../models/Project';

export async function create_Git_Repository(req,res){
  const {myID,name}= req.body;
  const user= await Users.findOne({
    where:{
      id:myID
    }
  });
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
      projectid:projID
    })
  }else {
    var newProjectid=[idProject]
    console.log(newProjectid);
    user.update({

      projectid:newProjectid
    })
  }

  const clientWithAuth = new octokit({
  //auth:"c7a365f1185f37ea43d3f58217dd6a6074889bea"
  auth:user.gitToken
  })
  clientWithAuth.repos.createForAuthenticatedUser({
  name:name
  }).then(data =>{

  console.log("repo successfully created");
  }).catch(e =>{
  console.log(e);
  //  alert("ERROR check your informations");
  })



}
export async function delete_Git_Repository(req,res){
  const {username,name,token}= req.body;
  const clientWithAuth = new octokit({
  auth:token
  })
  clientWithAuth.repos.delete({
    owner: username,
    repo:name
  }).then(data =>{
    console.log("repo successfully deleted");
  }).catch(e =>{
    console.log(e);
  })
  return res.redirect('/home.html');

}

/*clientWithAuth.repos.delete({
  owner: "moncef08",
  repo:"testing123"
}).then(data =>{
  console.log("repo successfully deleted");
}).catch(e =>{
  console.log(e);
})*/
