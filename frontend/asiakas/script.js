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

        // Restaurant logo

        // Restaurant info
    })
}

getRestaurants()


