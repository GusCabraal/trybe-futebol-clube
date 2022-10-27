import { NotFoundError, UnprocessableError } from '../errors';
import IMatch, { ICreateMatchDTO, IUpdateMatchDTO } from '../entities/IMatches';
import IMatchesRepository from '../repositories/IMatches.repository';
import ITeamsRepository from '../repositories/ITeams.repository';

export default class MatchService {
  private _matchesRepository: IMatchesRepository;
  private _teamsRepository: ITeamsRepository;

  constructor(
    matchesRepository: IMatchesRepository,
    teamsRepository: ITeamsRepository,
  ) {
    this._matchesRepository = matchesRepository;
    this._teamsRepository = teamsRepository;
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
    if (match.homeTeam === match.awayTeam) {
      throw new UnprocessableError('It is not possible to create a match with two equal teams');
    }

    const twoTeamsOfMatch = await this._teamsRepository.findTwoTeams(
      match.homeTeam,
      match.awayTeam,
    );

    if (twoTeamsOfMatch.length !== 2) throw new NotFoundError('There is no team with such id!');

    const newMatch = await this._matchesRepository.create(match);

    return newMatch;
  };

  public updateMatchById = async (match:IUpdateMatchDTO) => {
    await this._matchesRepository.updateMatchById(match);
  };

  public finishMatchById = async (id:number): Promise<void> => {
    await this._matchesRepository.finishMatchById(id);
  };
}
