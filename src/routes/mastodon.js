import { Router } from 'express';

const router = Router();
import {putMessage,newMessage} from '../controllers/mastodon.controller';


router.post('/send' , putMessage);

router.get  ( '/get', newMessage);

export default router;
