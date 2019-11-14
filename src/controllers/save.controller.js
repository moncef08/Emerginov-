  var fs = require('fs');


  export async function get_And_Save_Code(req, res){
  const {code,path}= req.body;

  console.log(code);
  console.log(path);

  try{
    fs.writeFile(path, code, function(err) {
    if(err) {
     return console.log(err);
    }
    console.log("The file was saved!");
    });

    res.json({
      "code":code
    });

    }catch(e){

      console.log(e)

     }

  }
  export async function show_Code(req, res){
    const {new_path}= req.body;
    try{
     var contents = fs.readFileSync(new_path, 'utf8');
      res.json({
        "code":contents,
      });
      }catch(e){
        console.log(e)
       }
    }
