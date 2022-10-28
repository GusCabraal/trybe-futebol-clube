import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  private _leaderboardService: LeaderboardService;

  constructor(leaderboardService: LeaderboardService) {
    this._leaderboardService = leaderboardService;
  }

  public findAll = async (_req: Request, res: Response) => {
    const leaderboard = await this._leaderboardService.findAll();
    return res.status(StatusCodes.OK).json(leaderboard);
  };
}
