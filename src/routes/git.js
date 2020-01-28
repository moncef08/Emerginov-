import { Router } from 'express';

const router = Router();
import {create_Git_Repository,delete_Git_Repository} from '../controllers/git.controller';

//http://localhost:3000/repos/create"

router.post   ( '/create' , create_Git_Repository);
router.post  ( '/delete', delete_Git_Repository);

export default router;
