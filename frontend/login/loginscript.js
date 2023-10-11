baseurl = "http://localhost:3001/api/login"

/* let userUser = "userUser"
let userPassword = "userPassword"

let restaurantUser = "restaurantUser"
let restaurantPassword = "restaurantPassword"

let driverUser = "driverUser"
let driverPassword = "driverPassword" */

let mode = "restaurant"

const errorText = document.getElementById("error-text")

async function submit(){
    let inputUser = document.getElementById("login-username").value
    let inputPassword = document.getElementById("login-password").value

    console.log(inputUser)
    console.log(inputPassword)

    try {
        let user = await fetch(`http://localhost:3001/api/login/${mode}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username: inputUser, password: inputPassword})
        })

        window.localStorage.setItem("xd", JSON.stringify(user))
    } catch(error) {
        console.log(error.message)
        errorText.style.display = "block"
        setTimeout(() => {
            errorText.style.display = "none"
        }, 2000)
    }
    
    /* if (inputUser == userUser && inputPassword == userPassword) {
        location.href = "asiakas.html"
    } else if (inputUser == restaurantUser && inputPassword == restaurantPassword) {
        location.href = "ravintola.html"
    } else if (inputUser == driverUser && inputPassword == driverPassword) {
        location.href = "kuski.html"
    } else {
        errorText.style.display = "block"
        setTimeout(() => {
            errorText.style.display = "none"
        }, 2000)
    } */
}