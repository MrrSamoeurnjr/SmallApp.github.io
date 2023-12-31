const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const closeCart = document.querySelector('#cart-close');
cartIcon.addEventListener('click' ,() => {
    cart.classList.add('active')
})
closeCart.addEventListener('click' ,() => {
    cart.classList.remove('active')
})
// Start when the docuement is ready
if( document.readyState = "loading") {
    document.addEventListener('DOMContentLoaded' , start);
}
else {
    start();
}
function start(){
    addEvents()
}
function update(){
    addEvents()
    updateTotal();
    
}
function addEvents(){
    // Remove item from cart
    let cartRemove_btns = document.querySelectorAll('.cart-remove'); 
    console.log(cartRemove_btns)
    cartRemove_btns.forEach((btn)=>{
        btn.addEventListener('click' , handle_removeCartItem)
    });
    /// Change item quantity
    let cartQuanity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuanity_inputs.forEach(input => {
        input.addEventListener('change' , handle_changeItemQuantity);
    }) 
    // Add item to cart
    let addCart_btns = document.querySelectorAll('.add-cart');
    addCart_btns.forEach(btn => {
        btn.addEventListener('click' , handle_addCartItem)
    })
    // Buy Orders
    const buy_btn = document.querySelector('.btn-buy');
    buy_btn.addEventListener('click' , handle_order);
}
function handle_order(){
    if(itemAdded.length <= 0){
        alert('There is No order to Place Yet! \n Please make an roder first')
        return;
    }
    const cartContent = cart.querySelector('.cart-content');
    cartContent.innerHTML = "";
    alert('Your Order is Placed Successfully!')
    itemAdded = []
    update();
}
// HANDLE EVENTS FUNCTIONS
let itemAdded = []
function handle_addCartItem() {
    let product = this.parentElement;
    let title = product.querySelector('.product-title').innerHTML;
    let price = product.querySelector('.product-price').innerHTML;
    let imgSrc = product.querySelector('.product-imag').src;
    console.log(title,price,imgSrc)
    let newToAdd = {
        title,
        price,
        imgSrc
    }
    // handle item is already exist
    if(itemAdded.find((el) => el.title == newToAdd.title)){
        alert("This Item Is Already Exist!")
        return;
    }
    else {
        itemAdded.push(newToAdd);
    }
    // Add product to cart
    let cartBoxElement = CartBoxComponent(title,price,imgSrc);
    let newNode = document.createElement('div');
    newNode.innerHTML = cartBoxElement; 
    const cartContent = cart.querySelector('.cart-content');
    cartContent.appendChild(newNode);
    update();
}
function handle_removeCartItem(){  
    this.parentElement.remove();
    itemAdded = itemAdded.filter(
        (el) => 
        el.title !=
        this.parentElement.querySelector('.cart-product-title').innerHTML
    );
    update()
}
function handle_changeItemQuantity(){
    if(isNaN(this.value) || this.value < 1){
        this.value = 1;
    }
    this.value = Math.floor(this.value);
    update();
}
// UPDADE & RERENDER FUNCTIONS
function updateTotal() {
    let cartBox = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector('.total-price'); 
    let total = 0 ;
    cartBox.forEach((cartBox) => {
        let priceElement = cartBox.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("$" , ""));
        let quantity = cartBox.querySelector('.cart-quantity').value;
        total += price * quantity;
    });
    total = total.toFixed(2);
    totalElement.innerHTML = "$" + total;
}
function  CartBoxComponent(title,price,imgSrc) {
    return `
    <div class="cart-box">
    <img src=${imgSrc} alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <i class='bx bxs-trash-alt cart-remove'></i>
</div>`;
}
