const content = document.querySelectorAll('#content')[0];

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://neto-api.herokuapp.com/book/', true);
xhr.send();

function downloadBooks() {
  let data = JSON.parse(xhr.responseText);
  for(let i = 0; i < data.length; i++) {
    if(data[i].title !== 'Земляне!') {
      let li = document.createElement('li');
      let img = document.createElement('img');
      img.setAttribute('src', data[i].cover.small);
      li.setAttribute('data-title', data[i].title);
      li.setAttribute('data-author', data[i].author.name);
      li.setAttribute('data-info', data[i].info);
      li.setAttribute('data-price', data[i].price);
      content.appendChild(li);
      li.appendChild(img);
    }
  }
}

xhr.addEventListener('load', downloadBooks);