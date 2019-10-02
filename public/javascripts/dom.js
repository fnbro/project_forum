
// Get data from current sportsbooks in arrays
function getDataFromMatches(data) {
  if (data === "team1") return document.getElementsByClassName('team1ToCompare')
  else if (data === "team2") return document.getElementsByClassName('team2ToCompare')
  else if (data === "results") return document.getElementsByClassName('resultsToCompare')
}

function insertUpdatedResult(result, index) {
  if (result === "win") {
    document.getElementsByClassName('realResult')[index].innerHTML = "WIN";
    document.getElementsByClassName('realResult')[index].style.color = "green"
  }
  else if (result === "lose") {
    document.getElementsByClassName('realResult')[index].innerHTML = "LOSE"
    document.getElementsByClassName('realResult')[index].style.color = "red"
  }
}