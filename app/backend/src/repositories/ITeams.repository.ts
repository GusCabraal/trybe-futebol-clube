import ITeam from '../entities/ITeams';

export default interface ITeamsRepository {
  findAll(): Promise<ITeam[] | null>;
  findById(id:number): Promise<ITeam | null>;
  findTwoTeams(id1:number, id2: number): Promise<ITeam[] | []>
}
