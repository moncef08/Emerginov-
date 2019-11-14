require("dotenv").config();
const octokit = require('@octokit/rest');


export async function create_Git_Repository(req,res){
  const {name,token}= req.body;
  const clientWithAuth = new octokit({
  //auth:"c7a365f1185f37ea43d3f58217dd6a6074889bea"
  auth:token
  })
  clientWithAuth.repos.createForAuthenticatedUser({
  name:name
  }).then(data =>{
  console.log("repo successfully created");
  }).catch(e =>{
  console.log(e);
  alert("ERROR check your informations");
  })

  return res.redirect('/');

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
