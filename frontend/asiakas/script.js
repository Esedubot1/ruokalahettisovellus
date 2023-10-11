let restaurants = []


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

        // Restaurant info
        let newRestaurantInfo = document.createElement("p")
        newRestaurantInfo.className = "newRestaurantInfo"
        newRestaurantInfo.innerHTML = element.info
        newRestaurant.appendChild(newRestaurantInfo)
    })
}

getRestaurants()


