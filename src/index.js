document.addEventListener("DOMContentLoaded", () => {
  fetchOperators()
  document.getElementById("delete-btn").addEventListener("click", deleteOperator)
  document.getElementById("rankButton").addEventListener("click", updateRank)
  document.getElementById("teamButton").addEventListener("click", updateTeam)
  
  const form = document.getElementById("operator-form")
  form.addEventListener("submit", createOperator)

  document.querySelector('.modal-footer button[type="button"]').addEventListener("click", clearForm)
})

const localDBUrl = "http://localhost:3000/operators"
const onlineDBUrl = "https://my-json-server.typicode.com/mashm3ll0w/phase-1-ip/operators"
function fetchOperators(){
  fetch(`${onlineDBUrl}`)
  .then(res => res.json())
  .then(data => {
    displayOperator.call(data[0])
    listOperators(data)
    renderTeamLists.call(data)
  })
}

function fetchOperator(id){
  fetch(`${onlineDBUrl}/${id}`)
  .then(res => res.json())
  .then(operator => {
    displayOperator.call(operator)
  })
}

function displayOperator(){
  document.querySelector(".branch-image").alt = this.branch
  document.querySelector(".branch-image").src = `./assets/${this.branch.toLowerCase()}.png`
  document.getElementById("operator-name").textContent = `${this.surname}, ${this.name}`
  document.getElementById("operator-rank").textContent = this.rank
  document.getElementById("operator-team").textContent = this.team
  document.getElementById("delete-btn").dataset.id = this.id
  document.getElementById("rankButton").dataset.id = this.id
  document.getElementById("teamButton").dataset.id = this.id
}

function listOperators(operators){
  document.getElementById("operators-list").replaceChildren()
  const operatorsContainer = document.getElementById("operators-list")
  operators.forEach(operator => {
    const li = document.createElement("li")
    li.dataset.id = operator.id
    li.textContent = `${operator.surname} ${operator.name}`
    li.addEventListener("click", () => fetchOperator(operator.id))
    operatorsContainer.appendChild(li)
  })
}

function deleteOperator(e){
  let confirmDelete = confirm("Are you sure?")

  if(confirmDelete){
    fetch(`${onlineDBUrl}/${e.target.dataset.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => data)
  }
}

function updateRank(e){
  fetch(`${onlineDBUrl}/${e.target.dataset.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      rank: document.getElementById("rankInput").value
    })
  })
  .then(res => res.json())
  .then(operator => displayOperator.call(operator))
  
  document.getElementById("rankInput").value = ""
}

function updateTeam(e){
  fetch(`${onlineDBUrl}/${e.target.dataset.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      team: document.getElementById("teamInput").value
    })
  })
  .then(res => res.json())
  .then(operator => displayOperator.call(operator))
  
  document.getElementById("teamInput").value = ""
}

function createOperator(e){
  e.preventDefault()
  fetch(onlineDBUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: document.getElementById("firstName").value,
      surname: document.getElementById("surname").value,
      rank: document.getElementById("newRank").value,
      team: document.getElementById("newTeam").value,
      branch: document.querySelector('input[name="branchOption"]:checked').value
    })
  })
  clearForm()
}

function clearForm(){
  document.getElementById("operator-form").reset()
}


function renderTeamLists(){
  let teamsContainer = document.querySelector(".teams-container")
  teamsContainer.replaceChildren()
  
  const teamNames = new Set(this.map(operator => operator.team))
  for (let team of teamNames){
    const headerDiv = document.createElement("div")
    headerDiv.classList.add("team")
    headerDiv.innerHTML = `
    <h1>Team ${team}</h1>
		<hr />
    `
    const ul = document.createElement("ul")
    ul.classList.add("team-list")
    headerDiv.appendChild(ul)
    teamsContainer.appendChild(headerDiv)
    this.filter(operator => {
      if(operator.team === team){
        const li = document.createElement("li")
        li.innerHTML = `<em>${operator.rank}</em> ${operator.name} ${operator.surname}`
        ul.appendChild(li)
      }
    })
  }
}