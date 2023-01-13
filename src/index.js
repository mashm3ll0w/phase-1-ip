document.addEventListener("DOMContentLoaded", () => {
  fetchOperators()
})

const localDBURL = "http://localhost:3000/operators"

function fetchOperators(){
  fetch(`${localDBURL}`)
  .then(res => res.json())
  .then(data => {
    displayOperator.call(data[0])
  })
}

function displayOperator(){
  document.querySelector(".branch-image").alt = this.branch
  document.querySelector(".branch-image").src = `./assets/${this.branch.toLowerCase()}.png`
  document.getElementById("operator-name").textContent = `${this.surname}, ${this.name}`
  document.getElementById("operator-rank").textContent = this.rank
  document.getElementById("operator-team").textContent = this.team
}