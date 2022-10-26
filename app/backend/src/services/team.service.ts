import ITeam from '../entities/ITeams';
import ITeamsRepository from '../repositories/ITeams.repository';

export default class TeamService {
  private _teamsRepository: ITeamsRepository;

  constructor(teamsRepository: ITeamsRepository) {
    this._teamsRepository = teamsRepository;
  }

  public findAll = async (): Promise<ITeam[] | null> => {
    const teams = await this._teamsRepository.findAll();
    return teams;
  };

  public findById = async (id:number): Promise<ITeam | null> => {
    const team = await this._teamsRepository.findById(id);
    return team;
  };
}
