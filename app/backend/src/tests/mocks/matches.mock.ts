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

const finishedMatches = [
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

const inProgressMatches = [
	{
		id: 41,
		homeTeam: 16,
		homeTeamGoals: 2,
		awayTeam: 9,
		awayTeamGoals: 0,
		inProgress: true,
		teamHome: {
			teamName: "São Paulo"
		},
		teamAway: {
			teamName: "Internacional"
		}
	},
	{
		id: 42,
		homeTeam: 6,
		homeTeamGoals: 1,
		awayTeam: 1,
		awayTeamGoals: 0,
		inProgress: true,
		teamHome: {
			teamName: "Ferroviária"
		},
		teamAway: {
			teamName: "Avaí/Kindermann"
		}
	},
	{
		id: 43,
		homeTeam: 11,
		homeTeamGoals: 0,
		awayTeam: 10,
		awayTeamGoals: 0,
		inProgress: true,
		teamHome: {
			teamName: "Napoli-SC"
		},
		teamAway: {
			teamName: "Minas Brasília"
		}
	}
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
  id:1,
  homeTeam: 1, 
  awayTeam: 12,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true,
};

export {
  matches,
  match,
  newMatch,
  inProgressMatches,
  finishedMatches,
};
