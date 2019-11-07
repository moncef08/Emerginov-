import express, {json} from 'express';
import morgan from 'morgan';
import bodyParser from "body-parser";

const app=express();

//Importing routes
import projectRoutes from './routes/projects';
import usersRoutes from './routes/users';
import homeRoutes from './routes/home';
import phpRoutes from './routes/php';
import saveRoutes from './routes/save';
//middlewares
app.use(morgan('dev'));
app.use(json());
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//routes
app.use('/api/projects',projectRoutes);
app.use('/api/users',usersRoutes);
app.use('/api/users/login',usersRoutes);
app.use('/home',homeRoutes);
app.use('/php',phpRoutes);
app.use('/save',saveRoutes);

//app.use('/',function(req,res){res.redirect('/home')});


export default app;
