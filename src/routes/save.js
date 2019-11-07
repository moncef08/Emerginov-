import { Router } from 'express';

const router = Router();
import {get_And_Save_Code,show_Code} from '../controllers/save.controller';


router.post( '/', get_And_Save_Code);
router.post( '/show', show_Code);

export default router;
