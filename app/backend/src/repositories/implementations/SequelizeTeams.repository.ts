import { Op } from 'sequelize';
import TeamModel from '../../database/models/Team';
import ITeam from '../../entities/ITeams';
import ITeamsRepository from '../ITeams.repository';

export default class SequelizeTeamsRepository implements ITeamsRepository {
  private _model = TeamModel;

  public findAll = async (): Promise<ITeam[] | null> => {
    const teams = await this._model.findAll();

    if (teams.length === 0) return null;
    return teams;
  };

  public findById = async (id:number): Promise<ITeam | null> => {
    const team = await this._model.findByPk(id);

    return team;
  };

  public findTwoTeams = async (id1:number, id2: number): Promise<ITeam[] | []> => {
    const teams = await this._model.findAll({
      where: {
        id: {
          [Op.or]: [id1, id2],
        },
      },
    });

    return teams;
  };
}
