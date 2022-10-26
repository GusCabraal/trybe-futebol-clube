import { Router } from 'express';
import SequelizeMatchesRepository
  from '../repositories/implementations/SequelizeMatches.repository';
import MatchService from '../services/match.service';
import MatchController from '../controller/match.controller';

const router = Router();
const sequelizeMatchesRepository = new SequelizeMatchesRepository();
const matchService = new MatchService(sequelizeMatchesRepository);
const matchController = new MatchController(matchService);

router.get('/', matchController.findAll);

export default router;
