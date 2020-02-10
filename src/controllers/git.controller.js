//require("dotenv").config();
const octokit= require('@octokit/rest');
var $ = require("jquery");
import copyFiles_And_CreateVirtualHost from './php.controller.js'
import Users from '../models/Users';
import Project from '../models/Project';
var Git = require("nodegit");
var fs = require('fs-extra');
var rimraf = require("rimraf");

// Simple-git without promise
const simpleGit = require('simple-git')("testforPush1/");
// Shelljs package for running shell tasks optional
const shellJs = require('shelljs');
// Simple Git with Promise for handling success and failure
const simpleGitPromise = require('simple-git/promise')("testforPush1/");
export async function create_Git_Repository(req,res){
  rimraf("fictiveProjects/projects/", function () { console.log("done"); });

  var {myID,name}= req.body;
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
  console.log(data.data.html_url);
  console.log("repo successfully created");
  //

  var directory1=fs.mkdir(name, { recursive: true }, (err) => {
        if (err) throw err;
      });
  var localPath = name;
  var opts = {
      fetchOpts: {
        callbacks: {
          certificateCheck: () => 0
      }
    }
  };
  var cloneRepository = Git.Clone(data.data.html_url, localPath, opts);

  }).catch(e =>{
    res.json({
      "error":"your token does not exist"
    })

  console.log(e);
  //  alert("ERROR check your informations");
  })

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
      currentProject:{
        "id":idProject,
        "name":newProject.name
      },
      projectid:newProjectid
    })
  }





}
export async function pullRepo(req,res){
  const { id }=req.body;
  const user= await Users.findOne({
    where:{
      id
    }
  });

  const clientWithAuth = new octokit({
  auth:user.gitToken
  })

 if (user.currentProject!=null) {
   const project= await Project.findOne({
     where:{
       id:user.currentProject.id

   }
   });
   if (project!=null) {


    // console.log();
   }
 }
console.log(user.currentProject.name);
 // change current directory to repo directory in local
// shellJs.cd("testforpush");
 // Repo name
 const repo = user.currentProject.name;  //Repo name
 // User name and password of your GitHub
 const userName = 'moncef08';
 console.log("tes");

 const password = 'Sfar18:**';
 // Set up GitHub url like this so no manual entry of user pass needed
 const gitHubUrl = `https://${userName}:${password}@github.com/${userName}/${repo}`;
 // add local git config like username and email
 simpleGit.addConfig('user.email','mrejebsf@enssat.fr');
 simpleGit.addConfig('user.name','moncef08');
 // Add remore repo url as origin to repo
 //simpleGitPromise.addRemote('origin',gitHubUrl);
 // Add all files for commit
   simpleGitPromise.add('.')
     .then(
        (addSuccess) => {
          console.log("tes");
           console.log(addSuccess);
        }, (failedAdd) => {
           console.log('adding files failed');
     });
 // Commit files as Initial Commit
  simpleGitPromise.commit('  by simplegit')
    .then(
       (successCommit) => {
         console.log("get");
         console.log(successCommit);
      }, (failed) => {
         console.log('failed commmit');
  });
 // Finally push to online repository
  simpleGitPromise.push('origin','master')
     .then((success) => {
        console.log('repo successfully pushed');
     },(failed)=> {
        console.log('repo push failed');
  });
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
