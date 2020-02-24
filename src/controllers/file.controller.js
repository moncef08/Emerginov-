const dirTree = require("directory-tree");
var fs = require('fs');
var fs1 = require('fs-extra');
var rimraf = require("rimraf");

import Users from '../models/Users';
const simpleGitPromise = require('simple-git')();


export async function getFile(req, res){

  const {id}=req.body

  const user= await Users.findOne({
    where:{
      id
    }
  });
  if (user.currentProject!=null) {
    //      if (!fs.existsSync(`${user.currentProject.name}/src`)){

    if (fs.existsSync(user.currentProject.name)){
      console.log(user.currentProject.name);
          fs1.copy(user.currentProject.name,`fictiveProjects/${user.currentProject.name}/`)
    }else{
      fs.mkdirSync(user.currentProject.name)
      var url=`https://github.com/${user.gitUsername}/${user.currentProject.name}.git`
      simpleGitPromise.clone(url, user.currentProject.name).then(
        (addSuccess) => {
             console.log("clonage réussi",addSuccess);

      })
      if (!fs.existsSync(`${user.currentProject.name}/src`)) {
        setTimeout(function(){
          fs.mkdirSync(`${user.currentProject.name}/src`)
          var file=fs.open(`${user.currentProject.name}/src/index.php`,'w', (err) => {
                if (err) throw err;
              });

      },200)

      }
      fs1.copy(user.currentProject.name,`fictiveProjects/${user.currentProject.name}/`)

    }

    var tree = dirTree(user.currentProject.name);
    tree = JSON.parse(JSON.stringify(tree).replace(/"name":/g, "\"text\":"));
        try{
         res.json(tree);
        }catch(e){
         console.log(e)
        }

  }

}


export async function create_DirectoryOrFile(req,res){
  const {path,type}= req.body;
  if (type=="folder") {
    var directory=fs.mkdir("fictiveProjects/"+path, { recursive: true }, (err) => {
      if (err) throw err;
    });
    var fictiveDirectory=fs.mkdir(path, { recursive: true }, (err) => {
      if (err) throw err;
    });

  }else {
    var file=fs.open(path,'w', (err) => {
      if (err) throw err;
    });
    var fictiveFile=fs.open("fictiveProjects/"+path,'w', (err) => {
      if (err) throw err;
    });
  }
  //var data=fs.readFileSync('./public/home.html','utf-8');
  res.json({
    message:'done'
  });

}

export async function update_DirectoryOrFile(req,res){
    const {old_path,new_path}= req.body;
    console.log("renaming");
    var directoryOrFile=fs.rename(old_path, new_path, (err) => {
        if (err) throw err;
        console.log('Rename complete!');
       });
    var fictiveDirectoryOrFile=fs.rename("fictiveProjects/"+old_path, "fictiveProjects/"+new_path, (err) => {
           if (err) throw err;
           console.log('Rename complete!');
          });

  //var data=fs.readFileSync('./public/home.html','utf-8');
  res.json({
    message:'done'
  });

}

export async function delete_DirectoryOrFile(req,res){
  const {type,path}= req.body;
  if (type=="folder") {
    console.log(path);
    rimraf(path, function () { console.log("delete done"); });
    // fs.rmdir(path, { recursive: true },(err) => {
    //   if (err) throw err;
    //   console.log("folder successfully deleted");
    // });
    rimraf("fictiveProjects/"+path, function () { console.log("delete done"); });

    // fs.rmdir("fictiveProjects/"+path, { recursive: true },(err) => {
    //   if (err) throw err;
    //   console.log("folder successfully deleted");
    // });
  }else{
    fs.unlink(path, (err) => {
      if (err) throw err;
      console.log("file successfully deleted");

  });
  fs.unlink("fictiveProjects/"+path, (err) => {
    if (err) throw err;
    console.log("file successfully deleted");

});
  }
  //var data=fs.readFileSync('./public/home.html','utf-8');
  res.json({
    message:'done'
  });

}
