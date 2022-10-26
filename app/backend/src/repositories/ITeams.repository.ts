import ITeam from '../entities/ITeams';

export default interface ITeamsRepository {
  findAll(): Promise<ITeam[] | null>;
}
