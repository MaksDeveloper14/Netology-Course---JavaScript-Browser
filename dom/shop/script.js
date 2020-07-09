function getPriceFormatted(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function getPriceFormatted(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const buttons = document.getElementsByClassName('add');
const product = document.getElementById('cart-count');
const finalPrice = document.getElementById('cart-total-price');

var count = 1;

function selectedProduct(event) {
  let price = event.target.dataset.price;
  product.innerHTML = count;
  finalPrice.innerHTML = Number(finalPrice.innerHTML) + Number(price);
  count += 1;
}

for(let button of buttons) {
  button.addEventListener('click', selectedProduct);
}


