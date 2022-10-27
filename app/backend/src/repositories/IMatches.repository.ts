import IMatches, { ICreateMatchDTO } from '../entities/IMatches';

export default interface IMatchesRepository {
  findAll(): Promise<IMatches[] | null>;
  findByProgress(status:number): Promise<IMatches[] | null>;
  create(status:ICreateMatchDTO): Promise<IMatches | null>;
  finishMatchById(id:number): Promise<void>;
}
