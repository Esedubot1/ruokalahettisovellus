let userUser = "userUser"
let userPassword = "userPassword"

let restaurantUser = "restaurantUser"
let restaurantPassword = "restaurantPassword"

let driverUser = "driverUser"
let driverPassword = "driverPassword"

const errorText = document.getElementById("error-text")

function submit(){
    let inputUser = document.getElementById("login-username").value
    let inputPassword = document.getElementById("login-password").value
    
    if (inputUser == userUser && inputPassword == userPassword) {
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
    }
}