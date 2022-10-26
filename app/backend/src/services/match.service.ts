import IMatch from '../entities/IMatches';
import IMatchesRepository from '../repositories/IMatches.repository';

export default class MatchService {
  private _matchesRepository: IMatchesRepository;

  constructor(matchesRepository: IMatchesRepository) {
    this._matchesRepository = matchesRepository;
  }

  public findAll = async (): Promise<IMatch[] | null> => {
    const teams = await this._matchesRepository.findAll();
    return teams;
  };
}
