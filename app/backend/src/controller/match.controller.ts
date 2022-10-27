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

  public create = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const newMatch = await this._matchService.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals,
    });
    return res.status(StatusCodes.CREATED).json(newMatch);
  };

  public finishMatchById = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this._matchService.finishMatchById(Number(id));
    return res.status(StatusCodes.OK).json({ message: 'Finished' });
  };
}
