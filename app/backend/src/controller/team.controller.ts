import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import TeamService from '../services/team.service';

export default class TeamController {
  private _teamService: TeamService;

  constructor(teamService: TeamService) {
    this._teamService = teamService;
  }

  public findAll = async (_req: Request, res: Response) => {
    const teams = await this._teamService.findAll();
    return res.status(StatusCodes.OK).json(teams);
  };
}
