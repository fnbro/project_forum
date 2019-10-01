const openLigaDB = 'https://www.openligadb.de/api/getmatchdata/bl1/2019';

function updateResult () {
  axios
  .get(openLigaDB)
  .then(responseFromAPI => {
    const matchData = responseFromAPI.data;
    let myMatch = matchData.filter(match => match.Team1.TeamName == "FC Bayern" && match.Team2.TeamName == "Hertha BSC")
    console.log(myMatch)
  })
}


