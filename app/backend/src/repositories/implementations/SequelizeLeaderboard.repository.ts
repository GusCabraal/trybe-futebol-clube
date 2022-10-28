import modelSequelize from '../../database/models';
import ILeaderboard from '../../entities/ILeaderboard';
import awayTeamsLeaderBoard from './utils/awayTeamsLeaderboard';
import homeTeamsLeaderBoard from './utils/homeTeamsLeaderboard';

export default class ILeaderboardRepository implements ILeaderboardRepository {
  private _model = modelSequelize;

  public leaderboardHome = async (): Promise<ILeaderboard[]> => {
    const [leaderboardHome] = await this._model.query(homeTeamsLeaderBoard);
    return leaderboardHome as ILeaderboard[];
  };

  public leaderboardAway = async (): Promise<ILeaderboard[]> => {
    const [leaderboardHome] = await this._model.query(awayTeamsLeaderBoard);
    return leaderboardHome as ILeaderboard[];
  };
}
