import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  private _leaderboardService: LeaderboardService;

  constructor(leaderboardService: LeaderboardService) {
    this._leaderboardService = leaderboardService;
  }

  public leaderboardHome = async (_req: Request, res: Response) => {
    const leaderboard = await this._leaderboardService.leaderboardHome();
    return res.status(StatusCodes.OK).json(leaderboard);
  };

  public leaderboardAway = async (_req: Request, res: Response) => {
    const leaderboard = await this._leaderboardService.leaderboardAway();
    return res.status(StatusCodes.OK).json(leaderboard);
  };

  public leaderboardTotal = async (_req: Request, res: Response) => {
    const leaderboard = await this._leaderboardService.leaderboardTotal();
    return res.status(StatusCodes.OK).json(leaderboard);
  };
}
