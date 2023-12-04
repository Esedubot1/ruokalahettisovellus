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
    await fetch(`http://localhost:${PORT}/api/orders/from/thisrestaurant`, {headers: {"Authorization": "Bearer " + token}})
        .then(response => response.json())
        .then(data => data.forEach(element => {
            orders.push(element)
        }))
    console.log(orders)

    createDivs()
}

async function createDivs(){
    // Funktio getRestaurantOrders hakee tilaukset datastoragesta ja laittaa ne orders arrayhin. 
    // Pitäisi tehdä niin, että kenttään restaurant-orders HTML:ässä tulisi näkyviin kaikki tilaukset. Esimerkkiä voi katsoa User sivulta
    // Jokaisella tilauksella pitäisi olla Tilauksen numero, esim: Order 1, Order 2 etc, tilauksella pitäisi näkyä se ravintola mistä se on tilattu, tilauksen sisältö ja button millä tilauksen voi merkata valmiiksi

    // Suosittelen käyttämään for looppia tätä varten.
    // Koodi millä saa ravintolan nimen backendistä on seuraava

    // let res = await fetch(`http://localhost:${PORT}/api/restaurants/${orders[i].restaurant}`)
    // let restaurant = await res.json()
    // console.log(restaurant.name)

    // Tarvittaessa voi katsoa mallia asiakas folderista, riviltä 227 alaspäin. Siellä oleva koodi on hyvin samanlainen mitä tässä pitää käyttää
}

async function markAsDone(event){
    let orderId = event.target.id

}

function emptyProductList()
// Funktio tyhjennetään HTML-lomakkeen PRODUCTION-alueen
{
  let prx=document.getElementById("ProductList");
  while(prx.firstChild) {
    prx.removeChild(prx.firstChild);
  }
}

function refreshOrderList(prx) {
// ladataan tilaukset ORDERS-listaan, jotta Valmis indikaattori paikalleen
// tyhjennetään vanha OrdersList;
  var i,L,r1,r2,x,OrderItem;

  getRestaurantOrders()
 
  L = prx.options.length - 1;
  for(i = L; i >= 0; i--) {
      prx.remove(i);
  }
  

//Viedään tilaukset uudestaanHTML-lomakkeen ORDERS-ikkunaan 
  L=orders.length;
  for (i=0; i<L; i++)
  {  OrderItem=document.createElement("option");
     r1=orders[i].restaurant;
     r2=orders[i].recipient;
     x="Ord "+ i.toString() + " ..."+ valmis[i]+" ...Tilaaja:" + r2 + " ...Ravintola:" + r1; 
     OrderItem.value = i.toString();
     OrderItem.text=x;
     OrderList.appendChild(OrderItem)
  }
  emptyProductList();
}


function changeProductList()
// Funktio näyttää Orders-ikkunassa valitun tilauksen tuotteet Products-ikkunassa 
{  var j,i,ProductItem,xpi,L; 
// Valitun tilauksen indeksi
   j=OrderList.selectedIndex;
// tyhjennetään Products-ikkuna
 
   emptyProductList(); 
  
// Haetaan tilauksen nro j tuotteet vastaavasta products-taulukosta
// Rakennetaan tilauksista li-rivit ol-listaan
   L=orders[j].products.length;
   for (let i=0; i<L; i++) {
     ProductItem=document.createElement("li");
     xpi=orders[j].products[i].product;
     ProductItem.text=xpi;
     ProductList.appendChild(ProductItem);
     ProductItem.innerHTML=xpi;
     prlist.appendChild(ProductList);} 
}

function changeOrderStatusReady()
{
// Muutetaan tilaus statukselle VALMIS
   var i,OrderItem,r1,r2,x,L,prx;
   L=orders.length;
   i=OrderList.selectedIndex;
   valmis[i]="*READY*"; 

// tyhjennetään vanha OrdersList
  prx=document.getElementById("OrderList"); 
  refreshOrderList(prx);
  
 
}  

function getRestaurantOrders(){

// orders-taulukon jäsennys
  var i,L,prx, OrderItem, r1,r2,x;
   
  /* obj=JSON.parse(orders); */

 

// Kaikki tilaukset statukselle "Tilattu";
  valmis=[];
  L=orders.length;
  for (i=0; i<L; i++) valmis[i]="-tilattu-";  

// Tilaukset HTML-lomakkeen ORDERS-ikkunaan
  prx=document.getElementById("OrderList"); 
  refreshOrderList(prx);


//Muutostilanteessa aktivoidaan Products-ikkunan muutos
  OrderList.addEventListener('change', changeProductList);
   
// Tyhjennetään Product lista 
  
  emptyProductList();	

// Tuoteriviksi aluksi ohje
  let ProductItem=document.createElement("li");
  let xpi="--- Valitse tilaus, niin saat tuoterivit tähän ---";
  ProductList.appendChild(ProductItem);
  ProductItem.innerHTML=xpi;
 
}
 
//HTML-lomakkeen ja muuttujien alkuasetuksia
  let obj=""; let valmis=[];
  let prgn=document.getElementById("restaurant-orders");
  let OrderList=document.createElement("select");
  OrderList.id ="OrderList";
// Kuinka monta tilausta näkyy ikkunassa kerralla
  OrderList.size=3;
  let OrderItem=document.createElement("option");
  OrderItem.text="EMPTY - PAINA REFRESH";  
  OrderList.appendChild(OrderItem);
  prgn.appendChild(OrderList);
  prlist=document.getElementById("restaurant-order-productions");
  const newButton = document.createElement('button');
  newButton.textContent = 'Tilaus VALMIS';
  prlist.appendChild(newButton);
  newButton.addEventListener('click',changeOrderStatusReady); 
  let ProductList=document.createElement("ol");
  ProductList.id ="ProductList";
  prlist.appendChild(ProductList); 