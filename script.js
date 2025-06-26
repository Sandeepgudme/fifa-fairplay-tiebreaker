let teams = [];

function calculateFairPlay(yellow, indirectRed, directRed) {
  const yellowPlusRed = Math.min(yellow, directRed);
  return yellow * -1 + indirectRed * -3 + directRed * -4 + yellowPlusRed * -5;
}

document.getElementById("addTeam").addEventListener("click", () => {
  const inputs = document.querySelectorAll(".team-group input");
  const name = inputs[0].value.trim();
  const yellow = parseInt(inputs[1].value);
  const indirectRed = parseInt(inputs[2].value);
  const directRed = parseInt(inputs[3].value);

  if (!name || isNaN(yellow) || isNaN(indirectRed) || isNaN(directRed)) {
    alert("Please fill all fields correctly.");
    return;
  }

  const fairPlay = calculateFairPlay(yellow, indirectRed, directRed);
  teams.push({ name, fairPlay });

  inputs.forEach((input) => (input.value = ""));

  if (teams.length === 4) {
    displayResults();
  } else if (teams.length === 3) {
    document.getElementById("addTeam").textContent =
      "Add the last team and Click me to see who qualifies for the Round of 16";
  } else {
    alert(`Team \"${name}\" added. (${teams.length}/4)`);
  }
});

function displayResults() {
  document.getElementById("teamForm").style.display = "none";

  const sorted = [...teams].sort((a, b) => b.fairPlay - a.fairPlay); // higher is better

  const resultDiv = document.getElementById("results");
  resultDiv.innerHTML = "<h3>Qualified Teams:</h3>";
  resultDiv.innerHTML += `<p class='team-result qualified'>1st: <strong>${sorted[0].name}</strong></p>`;
  resultDiv.innerHTML += `<p class='team-result qualified'>2nd: <strong>${sorted[1].name}</strong></p>`;

  resultDiv.innerHTML += "<h3>Full Rankings:</h3>";
  sorted.forEach((team, index) => {
    let className = "team-result";
    if (index < 2) {
      className += " qualified";
    } else {
      className += " eliminated";
    }
    resultDiv.innerHTML += `<div class='${className}'>${index + 1}. ${
      team.name
    } (Fair Play: ${team.fairPlay})</div>`;
  });

  teams = [];
}
