baseurl = "http://localhost:3001/api/login"

let mode = "restaurant"

const errorText = document.getElementById("error-text")

async function submit(){
    let inputUser = document.getElementById("login-username").value
    let inputPassword = document.getElementById("login-password").value

    console.log(inputUser)
    console.log(inputPassword)

    const res = await fetch(`http://localhost:3001/api/login/${mode}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username: inputUser, password: inputPassword})
    })

    if (res.status === 200) {
      switch (mode) {
        case 'user':
          window.localStorage.setItem('loggedUser', JSON.stringify(res))
          window.location.href = 'asiakas.html'
          break
        case 'restaurant':
          window.localStorage.setItem('loggedRestaurant', JSON.stringify(res))
          window.location.href = 'ravintola.html'
          break
        case 'deliverer':
          window.localStorage.setItem('loggedDeliverer', JSON.stringify(res))
          window.location.href = 'kuski.html'
          break
      }
    } else {
      errorText.style.display = "block"
      setTimeout(() => {
        errorText.style.display = "none"
      }, 2000)
    }
}

document.querySelector('#userButton').onclick = (() => mode = 'user')
document.querySelector('#restaurantButton').onclick = (() => mode = 'restaurant')
document.querySelector('#delivererButton').onclick = (() => mode = 'deliverer')