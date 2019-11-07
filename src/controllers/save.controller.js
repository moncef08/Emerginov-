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
    const {new_path,old_path,BreakpointsVisible,BreakpointsInvisible}= req.body;
    var VisibleMap=new Map();
    var InvisibleMap=new Map();
    VisibleMap.set(old_path, BreakpointsVisible);
    InvisibleMap.set(old_path, BreakpointsInvisible);
    var VisibleBreakpointsToLoad=[];
    var InvisibleBreakpointsToLoad=[];
    console.log(new_path);
    console.log(VisibleMap);
    console.log(InvisibleMap);

    try{

     var contents = fs.readFileSync(new_path, 'utf8');


     for (path in VisibleMap.keys()) {
       if (path==new_path) {
         VisibleBreakpointsToLoad=VisibleMap.get(path);
       }
     }
     for (path in InvisibleMap.keys()) {
       if (path==new_path) {
        InvisibleBreakpointsToLoad=InvisibleMap.get(path);
       }
     }


      res.json({
        "code":contents,

        "VisibleBreakpoints":VisibleBreakpointsToLoad,
        "InvisibleBreakpoints":InvisibleBreakpointsToLoad

      });

      }catch(e){

        console.log(e)

       }

    }
