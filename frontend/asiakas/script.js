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

        restaurantCounter++
    })
}

getRestaurants()

function openInfo(event){
    let buttonId = event.target.id
    document.getElementById("restaurant-information").innerHTML = restaurants[buttonId].info

    getProducts(restaurants[buttonId].id)
}  

async function getProducts(id){
    productions = []
    document.getElementById("restaurant-products").innerHTML = null
    await fetch(`http://localhost:3001/api/products/from/${id}`)
        .then(response => response.json())
        .then(data => data.forEach(element => {
            productions.push(element)
        }))

    productions.forEach(element => {
        //Product div
        let newProductionDiv = document.createElement("div")
        newProductionDiv.className = "newProductionDiv"
        document.getElementById("restaurant-products").appendChild(newProductionDiv)

        // Product name
        let newProductionName = document.createElement("h1")
        newProductionName.innerHTML = element.name
        newProductionDiv.appendChild(newProductionName)

        // Product price 
        let newProductionPrice = document.createElement("p")
        newProductionPrice.innerHTML = element.price
        newProductionDiv.appendChild(newProductionPrice)

        // Production ingredients
        let newProductionIngredient = document.createElement("p")
        newProductionIngredient.innerHTML = element.ingredients
        newProductionDiv.appendChild(newProductionIngredient)


        // Order Button
        let newProductionButton = document.createElement("button")
        newProductionButton.innerHTML = "Add"
        newProductionButton.className = "newRestaurantButton"
        newProductionButton.addEventListener("click", openOrderForum)
        newProductionDiv.appendChild(newProductionButton)

    })
    console.log(productions)
}

function openOrderForum(event){
    let orderList = document.getElementById("ordersDiv")
    let orderId = event.target.id

    // Div for order
    let newOrderDiv = document.createElement("div")
    newOrderDiv.classList = "newOrderDiv"
    orderList.appendChild(newOrderDiv)

    // Product restaurant name
    
}
