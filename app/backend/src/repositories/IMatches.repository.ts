import IMatches from '../entities/IMatches';

export default interface IMatchesRepository {
  findAll(): Promise<IMatches[] | null>;
  findByProgress(status:number): Promise<IMatches[] | null>;
}
