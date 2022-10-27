const matches = [
    {
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 5,
      awayTeam: 8,
      awayTeamGoals: 5,
      inProgress: false,
      teamHome: {
        teamName: "São Paulo"
      },
      teamAway: {
        teamName: "Grêmio"
      }
    },
    {
      id: 2,
      homeTeam: 9,
      homeTeamGoals: 1,
      awayTeam: 14,
      awayTeamGoals: 1,
      inProgress: false,
      teamHome: {
        teamName: "Internacional"
      },
      teamAway: {
        teamName: "Santos"
      }
    },
    {
      id: 3,
      homeTeam: 4,
      homeTeamGoals: 3,
      awayTeam: 11,
      awayTeamGoals: 0,
      inProgress: false,
      teamHome: {
        teamName: "Corinthians"
      },
      teamAway: {
        teamName: "Napoli-SC"
      }
    },
];

const match = {
  id: 2,
  homeTeam: 9,
  homeTeamGoals: 1,
  awayTeam: 14,
  awayTeamGoals: 1,
  inProgress: false,
};

const newMatch = {
  homeTeam: 1, 
  awayTeam: 12,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true,
};

export { matches , match, newMatch};
