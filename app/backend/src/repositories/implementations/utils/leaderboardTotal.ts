const leaderboardTotal = `SELECT *,
totalVictories * 3 +  totalDraws as totalPoints,
goalsFavor - goalsOwn as goalsBalance,
ROUND((totalVictories * 3 +  totalDraws) / (totalGames * 3) * 100, 2) AS efficiency
FROM (SELECT 
name,
SUM(totalGames) AS totalGames,
SUM(totalVictories) AS totalVictories,
SUM(totalDraws) AS totalDraws,
SUM(totalLosses) AS totalLosses,
SUM(goalsFavor) AS goalsFavor,
SUM(goalsOwn) AS goalsOwn
FROM (SELECT
T.team_name AS name,
COUNT(*) as totalGames,
SUM(home_team_goals < away_team_goals) as totalVictories,
SUM(home_team_goals = away_team_goals) as totalDraws,
SUM(home_team_goals > away_team_goals) as totalLosses,
SUM(away_team_goals) as goalsFavor,
SUM(home_team_goals) as goalsOwn   
FROM TRYBE_FUTEBOL_CLUBE.matches as M
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams as T
ON T.id = M.away_team  
where in_progress = 0
GROUP BY (away_team)
UNION
SELECT
T.team_name AS name,
COUNT(*) as totalGames,
SUM(home_team_goals > away_team_goals) as totalVictories,
SUM(home_team_goals = away_team_goals) as totalDraws,
SUM(home_team_goals < away_team_goals) as totalLosses,
SUM(home_team_goals) as goalsFavor,
SUM(away_team_goals) as goalsOwn   
FROM TRYBE_FUTEBOL_CLUBE.matches as M
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams as T
ON T.id = M.home_team  
where in_progress = 0
GROUP BY (home_team)
) AS QUERY
group by name) as query2
order by totalPoints DESC,
totalVictories DESC,
goalsBalance DESC,
goalsFavor DESC,
goalsOwn;`;

export default leaderboardTotal;
