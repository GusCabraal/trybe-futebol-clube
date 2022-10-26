import IMatches from '../entities/IMatches';

export default interface IMatchesRepository {
  findAll(): Promise<IMatches[] | null>;
}
