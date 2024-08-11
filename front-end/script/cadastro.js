const URL_API = location.hostname === "localhost" || location.hostname === "127.0.0.1" ? 
"http://localhost:3000" : "https://render..."


function cadastro(){
const emailInput = document.querySelector("#singupemail")
const passwordInput = document.querySelector("#singuppassword")
const nameInput = document.querySelector("#singupname")

  const user = {
    email: emailInput.value,
    password: passwordInput.value,
    name: nameInput.value
  }

  fetch(`${URL_API}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      alert("Usuário cadastrado com sucesso!")
    })
    .catch(error => {
      console.log(error)
      alert("Erro ao cadastrar usuário!")
    })
}