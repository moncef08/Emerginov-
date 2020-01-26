import express, {json} from 'express';
import morgan from 'morgan';
import bodyParser from "body-parser";
import session from "./controllers/user.controller.js"
const app=express();
const TWO_HOURS=1000*60*60*2;
const  {
  port=3000,
  SESS_NAME='sid',
  SESS_SECRET='ssh!quiet,it\'asecret!',
  NODE_ENV='development',
  SESS_LIFETIME=TWO_HOURS

}=process.env

const IN_PROD=NODE_ENV=='production'
console.log(session);
//Importing routes
import gitRoutes from './routes/git'
import projectRoutes from './routes/projects';
import usersRoutes from './routes/users';
import homeRoutes from './routes/home';
import phpRoutes from './routes/php';
import saveRoutes from './routes/save';
import slackRoutes from './routes/slack';
import smsRoutes from './routes/sms';
import mailRoutes from './routes/mail';
import mastodonRoutes from './routes/mastodon';
import zipRoutes from './routes/zip';
//middlewares
import  { storage1 } from './controllers/user.controller'
app.use(morgan('dev'));
app.use(json({limit:'50mb'}));
// support parsing of application/json type post data
app.use(bodyParser.json({limit: '50mb', extended: true}));

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({limit:'50mb', extended: true }));




app.use(express.static(__dirname + '/public'));

//routes
app.use('/api/projects',projectRoutes);
app.use('/api/users',usersRoutes);
app.use('/api/users/login',usersRoutes);
app.use('/home',homeRoutes);
app.use('/php',phpRoutes);
app.use('/save',saveRoutes);
app.use('/repos',gitRoutes);
app.use('/slack',slackRoutes);
app.use('/sms',smsRoutes);
app.use('/mail',mailRoutes);
app.use('/mastodon',mastodonRoutes);
app.use('/zip',zipRoutes);






export default app;
