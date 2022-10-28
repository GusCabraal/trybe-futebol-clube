import modelSequelize from '../../database/models';
import ILeaderboard from '../../entities/ILeaderboard';
import homeTeamsLeaderBoard from './utils/HomeTeamsLeaderboard';

export default class ILeaderboardRepository implements ILeaderboardRepository {
  private _model = modelSequelize;

  public leaderboardHome = async (): Promise<ILeaderboard[]> => {
    const [leaderboardHome] = await this._model.query(homeTeamsLeaderBoard);
    return leaderboardHome as ILeaderboard[];
  };
}
