import ILeaderboard from '../entities/ILeaderboard';
import ILeaderboardRepository from '../repositories/ILeaderboard.repository';

export default class LeaderboardService {
  private _leaderboardRepository: ILeaderboardRepository;

  constructor(
    leaderboardRepository: ILeaderboardRepository,
  ) {
    this._leaderboardRepository = leaderboardRepository;
  }

  public findAll = async (): Promise<ILeaderboard[]> => {
    const leaderboard = this._leaderboardRepository.leaderboardHome();
    return leaderboard;
  };
}
