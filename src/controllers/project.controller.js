
import Project from '../models/Project';
import Users from '../models/Users';


export async function createProject(req, res){
  const { name,priority,description,deliverydate}= req.body;
  try{
    let newProject= await Project.create({
      name,
      priority,
      description,
      deliverydate
    },{
      fields:['name','priority','description','deliverydate']
    });
    if(newProject){
      return res.json({
        message:'Project created successfully',
        data:newProject
      });
    }
  }catch(error){
    console.log(error);
    res.status(500).json({
      message: 'something went wrong',
      data:{}
    });
  }



  //console.log(req,body);
}

export async function getProjects(req,res){
 try{
  const projects= await Project.findAll();
  res.json({
    data:projects
  });
 }catch(e){
  console.log(e)
 }
}

export async function getProjectById(req,res){
  const { id }=req.params;
  const project= await Project.findOne({
    where:{
      id
    }
  });
  if (project!=null) {
      res.json(project);
  }else {
    return res.json({
      message:' this project does not exist '
    });
  }


}

export async function getProjectByUserId(req,res){
  const { UserId } = req.params;
  const user= await Users.findOne({
    attributes: ['id', 'name', 'profession', 'projectId'],
    where:{
      id:UserId
    }
  });
  if (user==null) {
    return res.json({
      message:'User does not exist'
    });
  }
  else{
    const projects = await Project.findAll({
      attributes: ['name', 'description'],
      where:{
        id:user.projectId
      }
    });
    if (projects.length>0) {
      return res.json(projects);
    }else {
      return res.json({
        message:' that user is not working on any project '
      });
    }
  }
}

export async function deleteProject(req,res){
  const { id }=req.params;
  const deleteRowCount = await Project.destroy({
    where:{
      id
    }
  });
  res.json({
    message:'Project deleted successfully',
    count: deleteRowCount
  });

}

export async function updateProject(req,res){
  const { id } = req.params;
  const{ name, priority, description , deliverydate} = req.body;

  const projects = await Project.findAll({
    attributes: ['id', 'name', 'priority', 'description', 'deliverydate'],
    where:{
      id
    }
  });
  if (projects.length>0) {
    projects.forEach(async project => {
      await project.update({
        name,
        priority,
        description,
        deliverydate
      });
    })

  }
  return res.json({
    message:'Project Updated successfully',
    data:projects
  })
}
