import express from 'express';
import {DisplayHomePage, ProcessHomePage} from '../controllers';
const router = express.Router();



/* GET home page. */
router.get('/', DisplayHomePage);
router.get('/home', DisplayHomePage); 


/* Process home Page. */
router.post('/', ProcessHomePage);
router.post('/home', ProcessHomePage);


export default router;