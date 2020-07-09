const main = document.querySelector('.items-list');

function onClick() {
  if(!event.target.classList.contains('add-to-cart')) {
    return;
  } else {
    event.preventDefault();
    addToCart(event.target);
  }
} 

main.addEventListener('click', onClick);