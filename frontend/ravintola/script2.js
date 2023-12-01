/* Tokenin haku */
const loggedRestaurantJSON = window.localStorage.getItem('loggedRestaurant')
const restaurant = JSON.parse(loggedRestaurantJSON)
if (restaurant === null) {
    window.location.href = "index.html"
}
const token = restaurant.token

let orders = []

async function getRestaurantOrders() {
    orders = []
    await fetch(`http://localhost:3001/api/orders/from/thisrestaurant`, {headers: {"Authorization": "Bearer " + token}})
        .then(response => response.json())
        .then(data => data.forEach(element => {
            orders.push(element)
        }))
    console.log(orders)

    createDivs()
    getProducts()
}

async function createDivs(){
    // Funktio getRestaurantOrders hakee tilaukset datastoragesta ja laittaa ne orders arrayhin. 
    // Pitäisi tehdä niin, että kenttään restaurant-orders HTML:ässä tulisi näkyviin kaikki tilaukset. Esimerkkiä voi katsoa User sivulta
    // Jokaisella tilauksella pitäisi olla Tilauksen numero, esim: Order 1, Order 2 etc, tilauksella pitäisi näkyä se ravintola mistä se on tilattu, tilauksen sisältö ja button millä tilauksen voi merkata valmiiksi

    // Suosittelen käyttämään for looppia tätä varten.
    // Koodi millä saa ravintolan nimen backendistä on seuraava

    // let res = await fetch(`http://localhost:3001/api/restaurants/${orders[i].restaurant}`)
    // let restaurant = await res.json()
    // console.log(restaurant.name)

    // Tarvittaessa voi katsoa mallia asiakas folderista, riviltä 227 alaspäin. Siellä oleva koodi on hyvin samanlainen mitä tässä pitää käyttää

    let ordersDiv = document.getElementById("restaurant-orders")
    ordersDiv.innerHTML = null
    for (let i = 0; i < orders.length; i++){
        // Order div
        let newOrderDiv = document.createElement("div")
        newOrderDiv.className = "newOrderDiv"
        ordersDiv.appendChild(newOrderDiv)

        // Order Name
        let newOrderName = document.createElement("h1")
        newOrderName.className = "newOrderName"
        newOrderName.innerHTML = "Order " + (i + 1)
        newOrderDiv.appendChild(newOrderName)

        // Products
        let newOrderIngredients = document.createElement("ul")
        for(let x = 0; x < orders[i].products.length; x++) {
            let res = await fetch(`http://localhost:3001/api/products/${orders[i].products[x]}`)
            let product = await res.json()
            let productName = document.createElement("li")
            productName.innerHTML = product.name
            newOrderIngredients.appendChild(productName)
        }
        newOrderDiv.appendChild(newOrderIngredients)

        // Mark order as done button
        let orderDoneButton = document.createElement("button")
        orderDoneButton.innerHTML = "Mark done"
        orderDoneButton.className = "newOrderRemoveButton"
        orderDoneButton.id = i + 1
        orderDoneButton.addEventListener("click", markAsDone)
        newOrderDiv.appendChild(orderDoneButton)
    }
}

async function markAsDone(event){
    let orderId = event.target.id

}

async function getProducts() {
    products = []
    let productCounter = 0
    document.getElementById("restaurant-order-productions").innerHTML = null
    await fetch(`http://localhost:3001/api/products/from/${restaurant.id}`)
        .then(response => response.json())
        .then(data => data.forEach(element => {
            products.push(element)
        }))
    let res = await fetch(`http://localhost:3001/api/restaurants/${restaurant.id}`)
    let restaurantName = await res.json()
    /* document.getElementById("restaurant-name").innerHTML = ("From: " + restaurantName.name) */
    products.forEach(element => {
        //Product div
        let newProductionDiv = document.createElement("div")
        newProductionDiv.className = "newProductionDiv"
        document.getElementById("restaurant-order-productions").appendChild(newProductionDiv)

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
        /* let newProductionButton = document.createElement("button")
        newProductionButton.innerHTML = "Add"
        newProductionButton.className = "newRestaurantButton"
        newProductionButton.id = productCounter
        newProductionButton.addEventListener("click", addOrder)
        newProductionDiv.appendChild(newProductionButton) */

        productCounter++
    })
    console.log(products)
}