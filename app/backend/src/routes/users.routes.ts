import { Router } from 'express';
import UsersRepository from '../repositories/implementations/SequelizeUsers.repository';
import UserService from '../services/user.service';
// import authenticate from '../middlewares/authenticate';
import UserController from '../controller/user.controller';

const usersRouter = Router();
const usersRepository = new UsersRepository();
const userService = new UserService(usersRepository);
const userController = new UserController(userService);

usersRouter.post('/login', userController.makeLogin);

export default usersRouter;
