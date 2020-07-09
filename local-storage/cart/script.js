// ELEMENTS
const colorSwatch = document.querySelector('#colorSwatch');
const sizeSwatch = document.querySelector('#sizeSwatch');
const quickCart = document.querySelector('#quick-cart');
const addToCart = document.querySelector('#AddToCart');

// SNIPPETS
const snippetColor = '<div data-value="red" class="swatch-element color red available"><div class="tooltip">Красный</div><input quickbeam="color" id="swatch-1-red" type="radio" name="color" value="red" checked><label for="swatch-1-red" style="border-color: red;"><span style="background-color: red;"></span><img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886"></label></div>';
const snippetSize = '<div data-value="s" class="swatch-element plain s soldout"><input id="swatch-0-s" type="radio" name="size" value="s" disabled><label for="swatch-0-s"><img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886"></label></div>';
const snippetProduct = '<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-2721888517" style="opacity: 1;"><div class="quick-cart-product-wrap"><img src="https://neto-api.herokuapp.com/hj/3.3/cart/product_1024x1024.png" title="Tony Hunfinger T-Shirt New York"><span class="s1" style="background-color: #000; opacity: .5">$800.00</span><span class="s2"></span></div><span class="count hide fadeUp" id="quick-cart-product-count-2721888517">1</span><span class="quick-cart-product-remove remove" data-id="2721888517"></span></div>';
const snippetCart = '<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico open"><span><strong class="quick-cart-text">Оформить заказ<br></strong><span id="quick-cart-price">$800.00</span></span></a>';

// Обработчик корзины
function onClick() {
  event.preventDefault();
  const form = document.querySelector('#AddToCartForm');
  const formData = new FormData(form);
  formData.append('productId', form.getAttribute('data-product-id'));
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://neto-api.herokuapp.com/cart');
  xhr.send(formData);
  function onLoad() {
    console.log(JSON.parse(xhr.response));
  }
 xhr.addEventListener('load', onLoad);
}

function onDOMContentLoaded() {
// GET COLORS
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://neto-api.herokuapp.com/cart/colors');
xhr.send();
xhr.onreadystatechange = function() {
  if (xhr.readyState != 4) {
    return;
  }
  let colors = JSON.parse(xhr.responseText);
  let indexColor = 1;
  for(let color of colors) {  
    'DOMContentLoaded', colorSwatch.insertAdjacentHTML('beforeend', snippetColor);
    // устанавливаем цвет div data-value
    colorSwatch.children[indexColor].setAttribute('data-value', color.code);
    // устанавливаем цвет div class
    let arrayClassList = colorSwatch.children[indexColor].className.split(' ');
    arrayClassList[2] = color.type;
    // проверка доступности товара в цвете
    if(color.isAvailable) {
      arrayClassList[3] = 'available';
      colorSwatch.children[indexColor].getElementsByTagName('input')[0].removeAttribute('disabled ');
    } else {
      arrayClassList[3] = 'soldout';
      colorSwatch.children[indexColor].getElementsByTagName('input')[0].setAttribute('disabled','disabled');
    }
    let result = arrayClassList.join(' ');
    colorSwatch.children[indexColor].className = result;
    // устанавливаем цвет input value 
    colorSwatch.children[indexColor].getElementsByTagName('input')[0].setAttribute('value', color.code);
    // устанавливаем цвет input id
    let idInput = colorSwatch.children[indexColor].getElementsByTagName('input')[0].getAttribute('id');
    let arrayIdInput = idInput.split('-');
    arrayIdInput[2] = color.type;
    let resultIdInput = arrayIdInput.join('-');
    // устанавливаем цвет label for
    let forLabel = colorSwatch.children[indexColor].getElementsByTagName('label')[0].getAttribute('for');
    let arrayforLabel = forLabel.split('-');
    arrayforLabel[2] = color.type;
    let resultforLabel = arrayforLabel.join('-');
    // Код цвета
    let styleSpan = colorSwatch.children[indexColor].getElementsByTagName('label')[0].getElementsByTagName('span')[0].getAttribute('style');
    let arraystyleSpan = styleSpan.split(':');
    arraystyleSpan[1] = color.code;
    let resultstyleSpan = arraystyleSpan.join(':');
    // Описание цвета
    colorSwatch.children[indexColor].firstChild.innerHTML = color.title;
    indexColor += 1;
  }
}
// GET SIZES
const xhr2 = new XMLHttpRequest();
xhr2.open('GET', 'https://neto-api.herokuapp.com/cart/sizes');
xhr2.send();
xhr2.onreadystatechange = function() {
  if (xhr2.readyState != 4) {
    return;
  }
  let sizes = JSON.parse(xhr2.responseText);
  let indexSize = 1;
  for(let size of sizes) {   
    sizeSwatch.insertAdjacentHTML('beforeend', snippetSize);
    sizeSwatch.children[indexSize].setAttribute('data-value', size.type);
    let arrayClassList = sizeSwatch.children[indexSize].className.split(' ');
    // проверка доступности размера
    if(size.isAvailable) {
      arrayClassList[3] = 'available';
      sizeSwatch.children[indexSize].getElementsByTagName('input')[0].removeAttribute('disabled ');
    } else {
      arrayClassList[3] = 'soldout';
      sizeSwatch.children[indexSize].getElementsByTagName('input')[0].setAttribute('disabled','disabled');
    }
    arrayClassList[2] = size.type;
    let result = arrayClassList.join(' ');
    sizeSwatch.children[indexSize].className = result;
    sizeSwatch.children[indexSize].getElementsByTagName('label')[0].innerHTML = sizeSwatch.children[indexSize].getElementsByTagName('label')[0].innerHTML + size.type.toUpperCase();
    // Описание размера
    sizeSwatch.children[indexSize].firstChild.innerHTML = size.title;
    indexSize += 1;
  }
}
// GET CART
const xhr3 = new XMLHttpRequest();
xhr3.open('GET', 'https://neto-api.herokuapp.com/cart');
xhr3.send();
xhr3.onreadystatechange = function() {
  if (xhr3.readyState != 4) {
    return;
  }
  let cart = JSON.parse(xhr3.responseText);
  quickCart.insertAdjacentHTML('beforeend', snippetProduct);
  quickCart.insertAdjacentHTML('beforeend', snippetCart);
}
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
addToCart.addEventListener('click', onClick);

// Статус: не работают некоторые нюансы