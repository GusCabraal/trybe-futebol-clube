import { Router } from 'express';
import SequelizeTeamsRepository from '../repositories/implementations/SequelizeTeams.repository';
import TeamService from '../services/team.service';
import TeamController from '../controller/team.controller';

const usersRouter = Router();
const sequelizeTeamsRepository = new SequelizeTeamsRepository();
const teamService = new TeamService(sequelizeTeamsRepository);
const teamController = new TeamController(teamService);

usersRouter.get('/', teamController.findAll);
usersRouter.get('/:id', teamController.findById);

export default usersRouter;
