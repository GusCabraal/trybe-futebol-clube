import ILeaderboard from '../../entities/ILeaderboard';

export default interface ILeaderboardRepository {
  leaderboardHome(): Promise<ILeaderboard[]>;
  leaderboardAway(): Promise<ILeaderboard[]>;
  leaderboardTotal(): Promise<ILeaderboard[]>;
}
