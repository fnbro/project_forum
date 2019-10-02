const openLigaDB = 'https://www.openligadb.de/api/getmatchdata/bl1/2019';

function updateResult() {
  axios
    .get(openLigaDB)
    .then(responseFromAPI => {
      const matchData = responseFromAPI.data;

      // Get data from the website
      let team1 = getDataFromMatches("team1");
      let team2 = getDataFromMatches("team2");
      let results = getDataFromMatches("results");
      let myMatches = [];
      let realResult = "";


      // Get all matches from the API and compare
      for (let i = 0; i < team1.length; i++) {
        let firstTeam = team1[i].innerHTML;
        let secondTeam = team2[i].innerHTML;
        let theResult = results[i].innerHTML;
        let myMatch = matchData.filter(match => match.Team1.TeamName == firstTeam && match.Team2.TeamName == secondTeam);
        myMatches.push(myMatch)
        if (myMatch[0].MatchIsFinished == true) {
          if (myMatch[0].MatchResults[0].PointsTeam1 > myMatch[0].MatchResults[0].PointsTeam2) realResult = "1"
          else if (myMatch[0].MatchResults[0].PointsTeam1 = myMatch[0].MatchResults[0].PointsTeam2) realResult = "X"
          else if (myMatch[0].MatchResults[0].PointsTeam1 < myMatch[0].MatchResults[0].PointsTeam2) realResult = "2"

          if (realResult == theResult) insertUpdatedResult("win", i)
          else if (realResult != theResult) insertUpdatedResult("lose", i)
        }
      }
    })
}
