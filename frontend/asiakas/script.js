/* Tokenin haku */
const loggedUserJSON = window.localStorage.getItem('loggedUser')
const user = JSON.parse(loggedUserJSON)
const token = user.token

let restaurants = []
let productions = []
let orders = []

let totalPrice = 0

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
    console.log(event.target)
    document.getElementById("restaurant-information").innerHTML = restaurants[buttonId].info

    getProducts(restaurants[buttonId].id)
}  

async function getProducts(id){
    productions = []
    let productCounter = 0
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
        newProductionPrice.innerHTML = (`Product price: ${element.price}`)
        newProductionDiv.appendChild(newProductionPrice)

        // Production ingredients
        let newProductionIngredient = document.createElement("p")
        newProductionIngredient.innerHTML = element.ingredients
        newProductionDiv.appendChild(newProductionIngredient)


        // Order Button
        let newProductionButton = document.createElement("button")
        newProductionButton.innerHTML = "Add"
        newProductionButton.className = "newRestaurantButton"
        newProductionButton.id = productCounter
        newProductionButton.addEventListener("click", addOrder)
        newProductionDiv.appendChild(newProductionButton)

        productCounter++
    })
    console.log(productions)
}

function addOrder(event){
    let orderId = event.target.id
    let htmlPrice = document.getElementById("total-price")
    orders.push(productions[orderId])

    totalPrice = totalPrice + productions[orderId].price
    htmlPrice.innerHTML = totalPrice
    console.log(totalPrice)

    console.log(orders)

    orderUpdate()
}

function orderUpdate(){
    let orderCounter = 0
    let ordersDiv = document.getElementById("ordersDiv")
    ordersDiv.innerHTML = null
    orders.forEach(element => {
        // Order Div
        let newOrderDiv = document.createElement("div")
        newOrderDiv.className = "newOrderDiv"
        ordersDiv.appendChild(newOrderDiv)

        // Order Name
        let newOrderName = document.createElement("h1")
        newOrderName.className = "newOrderName"
        newOrderName.innerHTML = element.name
        newOrderDiv.appendChild(newOrderName)

        // Price
        let newOrderPrice = document.createElement("p")
        newOrderPrice.innerHTML = element.price
        newOrderDiv.appendChild(newOrderPrice)

        // Ingredients
        let newOrderIngredients = document.createElement("p")
        newOrderIngredients.innerHTML = element.ingredients
        newOrderDiv.appendChild(newOrderIngredients)

        // Remove order Button
        let newOrderRemoveButton = document.createElement("button")
        newOrderRemoveButton.innerHTML = "Remove"
        newOrderRemoveButton.className = "newOrderRemoveButton"
        newOrderRemoveButton.id = orderCounter
        newOrderRemoveButton.addEventListener("click", deleteOrder)
        newOrderDiv.appendChild(newOrderRemoveButton)

        orderCounter++
    })
}

function deleteOrder(event){
    let orderId = event.target.id
    let orderPrice = orders[orderId].price
    let htmlPrice = document.getElementById("total-price")

    totalPrice = totalPrice - orderPrice
    htmlPrice.innerHTML = totalPrice
    console.log(totalPrice)

    orders.splice(orderId, 1)

    orderUpdate()
}

function submitOrder(){
    // Check in subit folder is empty
    let name = document.getElementById("orderForumItemName").value
    let phoneNumber = document.getElementById("orderForumItemNumber").value
    let adress = document.getElementById("orderForumItemAdress").value

    if (name == "" || phoneNumber == null || adress == ""){
        console.log("Fill out the form")
    }
}