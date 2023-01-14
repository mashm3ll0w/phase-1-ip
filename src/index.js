document.addEventListener("DOMContentLoaded", () => {
  fetchOperators()
  document.getElementById("delete-btn").addEventListener("click", deleteOperator)
  document.getElementById("rankButton").addEventListener("click", updateRank)
  document.getElementById("teamButton").addEventListener("click", updateTeam)
})

const localDBURL = "http://localhost:3000/operators"

function fetchOperators(){
  fetch(`${localDBURL}`)
  .then(res => res.json())
  .then(data => {
    displayOperator.call(data[0])
    listOperators(data)
  })
}

function fetchOperator(id){
  fetch(`${localDBURL}/${id}`)
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
    fetch(`${localDBURL}/${e.target.dataset.id}`, {
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
  fetch(`${localDBURL}/${e.target.dataset.id}`, {
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
  fetch(`${localDBURL}/${e.target.dataset.id}`, {
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