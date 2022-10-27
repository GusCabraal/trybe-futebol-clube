export default interface IMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface ICreateMatchDTO {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
}
export interface IUpdateMatchDTO {
  id: string;
  homeTeamGoals: number;
  awayTeamGoals: number;
}
