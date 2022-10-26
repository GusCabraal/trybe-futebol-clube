import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import MatchService from '../services/match.service';

export default class MatchController {
  private _matchService: MatchService;

  constructor(matchService: MatchService) {
    this._matchService = matchService;
  }

  public findAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const matches = await this._matchService.findAll(inProgress as string);
    return res.status(StatusCodes.OK).json(matches);
  };
}
