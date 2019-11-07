const dirTree = require("directory-tree");
var fs = require('fs');


export async function getFile(req, res){
 var tree = dirTree("projects");
 tree = JSON.parse(JSON.stringify(tree).replace(/"name":/g, "\"text\":"));
     try{
      res.json(tree);
     }catch(e){
      console.log(e)
     }

}

export async function create_DirectoryOrFile(req,res){
  const {path,type}= req.body;
  if (type=="folder") {
    var directory=fs.mkdir(path, { recursive: true }, (err) => {
      if (err) throw err;
    });

  }else {
    var file=fs.open(path,'w', (err) => {
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

  //var data=fs.readFileSync('./public/home.html','utf-8');
  res.json({
    message:'done'
  });

}

export async function delete_DirectoryOrFile(req,res){
  const {type,path}= req.body;
  if (type=="folder") {
    fs.rmdir(path, (err) => {
    if (err) throw err;
  });
  }else{
    fs.unlink(path, (err) => {
    if (err) throw err;
  });
  }
  console.log(path+'successfully deleted');
  //var data=fs.readFileSync('./public/home.html','utf-8');
  res.json({
    message:'done'
  });

}
