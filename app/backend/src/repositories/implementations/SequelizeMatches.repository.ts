import MatchModel from '../../database/models/Match';
import TeamModel from '../../database/models/Team';
import IMatches from '../../entities/IMatches';
import IMatchesRepository from '../IMatches.repository';

export default class SequelizeMatchesRepository implements IMatchesRepository {
  private _model = MatchModel;

  public findAll = async (): Promise<IMatches[] | null> => {
    const matches = await this._model.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      attributes: { exclude: ['home_team', 'away_team'] },
    });

    if (matches.length === 0) return null;
    return matches;
  };
}
