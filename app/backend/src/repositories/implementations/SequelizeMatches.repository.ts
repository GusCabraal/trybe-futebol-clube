import MatchModel from '../../database/models/Match';
import TeamModel from '../../database/models/Team';
import IMatches, { ICreateMatchDTO, IUpdateMatchDTO } from '../../entities/IMatches';
import IMatchesRepository from '../interfaces/IMatches.repository';

export default class SequelizeMatchesRepository implements IMatchesRepository {
  private _model = MatchModel;

  public findAll = async (): Promise<IMatches[]> => {
    const matches = await this._model.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      attributes: { exclude: ['home_team', 'away_team'] },
    });

    return matches;
  };

  public findByProgress = async (status:boolean): Promise<IMatches[]> => {
    const matches = await this._model.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      attributes: { exclude: ['home_team', 'away_team'] },
      where: { inProgress: status },
    });
    return matches;
  };

  public create = async (match:ICreateMatchDTO): Promise<IMatches | null> => {
    const matches = await this._model.create(match);
    return matches;
  };

  public finishMatchById = async (id:number): Promise<void> => {
    await this._model.update({ inProgress: false }, {
      where: {
        id,
      },
    });
  };

  public updateMatchById = async ({ id, homeTeamGoals, awayTeamGoals }: IUpdateMatchDTO) => {
    await this._model.update({ homeTeamGoals, awayTeamGoals }, {
      where: {
        id,
      },
    });
  };
}
