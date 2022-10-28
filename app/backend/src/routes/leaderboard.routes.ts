import { Router } from 'express';
// import authenticate from '../middlewares/authenticate';
import SequelizeLeaderboardRepository
  from '../repositories/implementations/SequelizeLeaderboard.repository';
import LeaderboardService from '../services/leaderboard.service';
import LeaderboardController from '../controller/leaderboard.controller';

const router = Router();
const sequelizeLeaderboardRepository = new SequelizeLeaderboardRepository();
const leaderboardService = new LeaderboardService(sequelizeLeaderboardRepository);
const leaderboardController = new LeaderboardController(leaderboardService);

router.get('/home', leaderboardController.findAll);

export default router;
