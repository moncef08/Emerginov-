import { Router } from 'express';

const router = Router();

import { createUser,getUsers,getUserById,deleteUser,updateUser,getUsersByProject,getUserByLogin,getUserByName,newFollower,unFollow} from '../controllers/user.controller';

// /api/users/
router.post('/',createUser);
router.get('/', getUsers);
// /api/users/:userID
router.post('/id',getUserById);
router.post('/login',getUserByLogin);
router.post('/follow',newFollower);
router.post('/unfollow',unFollow);

router.post('/name',getUserByName);

router.get('/projects/:projectId',getUsersByProject);
router.delete('/:id',deleteUser);
router.put('/:id',updateUser);

export default router
