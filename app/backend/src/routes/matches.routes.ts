import { Router } from 'express';
import authenticate from '../middlewares/authenticate';
import SequelizeMatchesRepository
  from '../repositories/implementations/SequelizeMatches.repository';
import MatchService from '../services/match.service';
import MatchController from '../controller/match.controller';
import SequelizeTeamsRepository from '../repositories/implementations/SequelizeTeams.repository';

const router = Router();
const sequelizeMatchesRepository = new SequelizeMatchesRepository();
const sequelizeTeamsRepository = new SequelizeTeamsRepository();
const matchService = new MatchService(
  sequelizeMatchesRepository,
  sequelizeTeamsRepository,
);
const matchController = new MatchController(matchService);

router.get('/', matchController.findAll);
router.post('/', authenticate, matchController.create);
router.patch('/:id/finish', authenticate, matchController.finishMatchById);

export default router;
