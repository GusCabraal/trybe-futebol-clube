import IMatch, { ICreateMatchDTO } from '../entities/IMatches';
import IMatchesRepository from '../repositories/IMatches.repository';

export default class MatchService {
  private _matchesRepository: IMatchesRepository;

  constructor(matchesRepository: IMatchesRepository) {
    this._matchesRepository = matchesRepository;
  }

  public findAll = async (inProgress:string): Promise<IMatch[] | null> => {
    let matches;
    if (inProgress) {
      const status = inProgress === 'true' ? 1 : 0;
      matches = await this._matchesRepository.findByProgress(status);
    } else {
      matches = await this._matchesRepository.findAll();
    }
    return matches;
  };

  public create = async (match:ICreateMatchDTO): Promise<IMatch | null> => {
    const newMatch = await this._matchesRepository.create(match);
    return newMatch;
  };
}
