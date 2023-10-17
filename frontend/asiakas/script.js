let restaurants = []
let productions = []

async function getRestaurants() {
    await fetch("http://localhost:3001/api/restaurants")
        .then(response => response.json())
        .then(data => data.forEach(element => {
            restaurants.push(element)
        }))

    console.log(restaurants)
    createDivs()
}

function createDivs() {
    // document.getElementById("user-restaurants").innerHTML = ""
    let restaurantCounter = 0
    restaurants.forEach(element => {

        // New Div for restaurant
        let restaurantContainer = document.getElementById("user-restaurants")
        let newRestaurant = document.createElement("div")
        newRestaurant.className = "newRestaurant"
        restaurantContainer.appendChild(newRestaurant)

        // Restaurant name
        let newRestaurantName = document.createElement("h1")
        newRestaurantName.className = "newRestaurantName"
        newRestaurantName.innerHTML = element.name
        newRestaurant.appendChild(newRestaurantName)

        // Restaurant adress
        let newRestaurantAddress = document.createElement("p")
        newRestaurantAddress.className = "newRestaurantAddress"
        newRestaurantAddress.innerHTML = element.address
        newRestaurant.appendChild(newRestaurantAddress)

        // Restaurant info button
        let newRestaurantButton = document.createElement("button")
        newRestaurantButton.className = "newRestaurantButton"
        newRestaurantButton.innerHTML = "Information"
        newRestaurantButton.id = restaurantCounter
        newRestaurantButton.addEventListener("click", openInfo)
        newRestaurant.appendChild(newRestaurantButton)


        // Restaurant info
        // let newRestaurantInfo = document.createElement("p")
        // newRestaurantInfo.className = "newRestaurantInfo"
        // newRestaurantInfo.innerHTML = element.info
        // newRestaurant.appendChild(newRestaurantInfo)
        restaurantCounter++
    })
}

getRestaurants()

function openInfo(event){
    productions = []
    let buttonId = event.target.id
    document.getElementById("restaurant-information").innerHTML = restaurants[buttonId].info

    getProducts(buttonId)
}  

async function getProducts(id){
    await fetch(`http://localhost:3001/api/restaurants/from/${id}`)
        .then(response => response.json())
        .then(data => data.forEach(element => {
            productions.push(element)
        }))
    console.log(productions)
}

