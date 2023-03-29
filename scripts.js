let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
  body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
  body.classList.remove('active');
});

let products = [
  {
    id: 1,
    name: 'Therma-FITS ADV A.P.S',
    image: 'men1.jpg',
    price: 599.99,
  },
  {
    id: 2,
    name: 'Impact Protein Whey',
    image: 'impactwhey.jpg',
    price: 189.99,
  },
  {
    id: 3,
    name: 'Training Oversized T-shirt',
    image: 'women1.jpg',
    price: 129.99,
  },
  {
    id: 4,
    name: 'Hexxagon Durabbel 25lbs',
    image: 'dumbell4.png',
    price: 150.00,
  },
  {
    id: 5,
    name: 'Micronized Creatine Powder',
    image: 'creatine.jpg',
    price: 172.99,
  },
  {
    id: 6,
    name: 'Medium everyday hollday dufflebag',
    image: 'dufflebag.jpg',
    price: 149.99,
  },
];

let listCards = [];

function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement('div');
    newDiv.classList.add('item');
    newDiv.innerHTML = `
         <img src="img/homepage/featured/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">RM${value.price.toFixed(2)}</div>
            <button onclick="addToCart(${key})">Add To Cart</button>`;
    list.appendChild(newDiv);
  });
}

initApp();

function addToCart(key) {
  if (listCards[key] == null) {
    listCards[key] = products[key];
      listCards[key].quantity = 1;
  }
  reloadCard();
}


function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
      totalPrice = totalPrice + (value.price * value.quantity);
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
            <div><img src="img/homepage/featured/${value.image}"/></div>
            <div>${value.name}</div>
            <div>${value.price.toLocaleString()}</div>
            <div>
                <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                <div class="count">${value.quantity}</div>
                <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
            </div>`;
        
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = `RM${totalPrice.toLocaleString()}`;

    quantity.innerText = count;
}

function changeQuantity(key, quantity){
  if(quantity == 0){
    delete listCards[key];
  }else{
    listCards[key].quantity = quantity;
  }
  let totalPrice = 0;
  let count = 0;
  listCards.forEach((value, key)=>{
    totalPrice += value.price;
    count += value.quantity;
  });
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
  reloadCard();
}


function addToCart(key) {
  if (listCards[key] == null) {
    let product = products[key];
    product.quantity = 1;

    // Create the animation element
    let animation = document.createElement('div');
    animation.classList.add('add-to-cart-animation');
    animation.style.backgroundImage = `url(img/homepage/featured/${product.image})`;
    document.body.appendChild(animation);

    // Wait for the animation to finish
    setTimeout(() => {
      document.body.removeChild(animation);
      listCards[key] = product;
      reloadCard();
    }, 1000);
  }
}
