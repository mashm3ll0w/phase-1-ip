document.addEventListener("DOMContentLoaded", () => {
  fetchOperators()
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

function displayOperator(){
  document.querySelector(".branch-image").alt = this.branch
  document.querySelector(".branch-image").src = `./assets/${this.branch.toLowerCase()}.png`
  document.getElementById("operator-name").textContent = `${this.surname}, ${this.name}`
  document.getElementById("operator-rank").textContent = this.rank
  document.getElementById("operator-team").textContent = this.team
}

function listOperators(operators){
  document.getElementById("operators-list").replaceChildren()
  const operatorsContainer = document.getElementById("operators-list")
  operators.map(operator => {
    const li = document.createElement("li")
    li.dataset.id = operator.id
    li.textContent = `${operator.surname} ${operator.name}`
    operatorsContainer.appendChild(li)
  })
}