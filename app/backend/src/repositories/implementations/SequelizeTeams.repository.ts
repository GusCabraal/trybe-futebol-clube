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
}
