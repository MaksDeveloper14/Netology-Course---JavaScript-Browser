let dataUrl = {
  infoRecipes: 'https://neto-api.herokuapp.com/food/42',
  ratingRecipes: 'https://neto-api.herokuapp.com/food/42/rating',
  consumers: 'https://neto-api.herokuapp.com/food/42/consumers'
}

function addScript(url) {
  // подготовка url
  if(url === dataUrl.infoRecipes) {
    url = url + '?callback=insertRecipes';
    arguments[0] = url;
  } else if(url === dataUrl.ratingRecipes) {
    url = url + '?callback=insertRating';
    arguments[0] = url;
  } else if(url === dataUrl.consumers) {
    url = url + '?callback=insertConsumers';
    arguments[0] = url;
  }
  const script = document.createElement('script');  
  script.src = url;
  document.body.appendChild(script);
}

function insertRecipes(data) {
  document.querySelector('[data-pic]').style.backgroundImage = `url(${data.pic})`;
  document.querySelector('[data-title]').innerHTML = data.title;
  document.querySelector('[data-ingredients]').innerHTML = data.ingredients.join(', ');
}

function insertRating(data) {
  document.querySelector('[data-rating]').innerText = data.rating.toFixed(2);
  document.querySelector('[data-star]').style.width = data.rating * 10 + '%';
  document.querySelector('[data-votes]').innerText = `(${data.votes} оценок)`;
}

function insertConsumers(data) {
  const consumers = document.querySelector("[data-consumers]");
  data.consumers.forEach(consumer => {
    const img = document.createElement("img");
    img.src = consumer.pic;
    img.title = consumer.name;
  document.querySelector("[data-consumers]").appendChild(img);
  });
  const total = document.createElement("span");
  total.innerText = `(+${data.total})`;
  consumers.appendChild(total);
}

function openDocument() {
  addScript(dataUrl.infoRecipes);
  addScript(dataUrl.ratingRecipes);
  addScript(dataUrl.consumers);
}
    
document.addEventListener('DOMContentLoaded', openDocument); 