const itemBtn = document.querySelectorAll('.product-btn');
const insertBtn = document.querySelectorAll('.increase-btn');
const deleteBtn = document.querySelectorAll('.decrease-btn');
const QuanBtn = document.querySelectorAll('.quantity-content')
const cartContainer = document.querySelector('.cart-content')
const cartImageHolder = document.querySelector('.cart-placeholder-content');
const carbonImg = document.querySelector('.cart-cta')
const imageCard = document.querySelectorAll('.product-img');

let cart = []



function sendProductToCart(name, price, category) {

  for (let i = 0; i < cart.length; i+= 1) {
    if (cart[i].name === name) {
      cart[i].qty += 1
      return
    }
  }
  
  const product = {
    name: name,
    price: price,
    category: category,
    qty: 1
  }
  cart.push(product)
  console.log(cart)

  
}




function addProduct() {
  let item = ''

  for (let i = 0; i < cart.length; i+= 1) {
    item += `
      <article class="cart-product-card">
          <button aria-label="remove-btn" class="remove-btn"><i class="bi bi-x-circle"></i></button>
        <div class="cart-title">
          <h4>${cart[i].name}</h4>

        <div class="cart-quantity">
          <span>${cart[i].qty}x</span>
          <p>@$ ${cart[i].price}</p>
          <p class="cart-price">$${(cart[i].price * cart[i].qty).toFixed(2)}</p>
        </div>
      </div>
    </article>
    `
  }

  
  cartContainer.innerHTML = item
  cartImageHolder.style.display = 'none'
  

  updateCart()
}



function updateCart() {
  let totalPrice = 0

  for (let i = 0; i < cart.length; i+= 1) {
    totalPrice += cart[i].price * cart[i].qty
  }

  cartContainer.innerHTML += `
    <div class="cart-total-content">
      <h4>Order Total</h4>
      <h2>$${totalPrice.toFixed(2)}</h2>
    </div>
  `
 
  
  carbonImg.style.display = 'flex'
  console.log('this function works')
  
}



// this function removes a product from the cart



// this item button event listener listens for when the product buttton is clicked
for (let i = 0; i < itemBtn.length; i += 1) {
  itemBtn[i].addEventListener('click', function(){
    const productOutput = document.querySelectorAll('.quantity-output')[i];
    const showQuantity = Number(productOutput.innerText) + 1

    if (showQuantity > 10 ) {
      showQuantity = 0;
    }
    
    productOutput.innerText = showQuantity

    QuanBtn[i].style.display = 'block'
    imageCard[i].style.border = '3px solid #C73B0F'
    document.getElementById('cart-output').innerText = showQuantity

    const name = itemBtn[i].dataset.name
    const price = itemBtn[i].dataset.price
    const category = itemBtn[i].dataset.category
    sendProductToCart(name, price, category)
    addProduct()
  })
}




// this item button event listener listens for when the increase buttton is clicked
for (let i = 0; i < insertBtn.length; i+= 1) {
  insertBtn[i].addEventListener('click', function(){
    const productOutput = document.querySelectorAll('.quantity-output')[i]
    const showQuantity = Number(productOutput.innerText) + 1

    if (showQuantity > 10) {
      showQuantity = 0;
    }

    productOutput.innerText = showQuantity
    document.getElementById('cart-output').innerText = showQuantity

    const name = itemBtn[i].dataset.name
    const price = itemBtn[i].dataset.price
    sendProductToCart(name, price)
    addProduct()
  })
}



for (let i = 0; i < deleteBtn.length; i+= 1) {
  deleteBtn[i].addEventListener('click', function(){

    removeProductFromCart(i)
  })
}
