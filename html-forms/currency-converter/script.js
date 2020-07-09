const loader = document.querySelector('#loader');
const content = document.querySelector('#content');
const result = document.querySelector('#result');
const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
const source = document.querySelector('#source');

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://neto-api.herokuapp.com/currency', true);
xhr.addEventListener('loadstart', showLoader);
xhr.send();
xhr.addEventListener('loadend', hideLoader);

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
  content.classList.remove('hidden');
}

xhr.addEventListener('load', onLoad);

function onLoad() {
  var data = xhr.responseText; 
  data = JSON.parse(data);
  // Вставляем данные с сервера в HTML код в теги option
    for(let i = 0; i < data.length; i++) {
      const optionFrom = document.createElement('option');
      const optionTo = document.createElement('option');
      optionFrom.innerHTML = data[i].code;
      optionTo.innerHTML = data[i].code;
      from.appendChild(optionFrom);
      to.appendChild(optionTo);
    }
  fromSelect.addEventListener('change', convert);
  toSelect.addEventListener('change', convert);
  source.addEventListener('change', convert);
  xhr.addEventListener('loadend', convert);
  function convert(sum, from, to) {
    sum = source.value;
    from = fromSelect.value;
    to = toSelect.value;
    for(let i = 0; i < data.length; i++) {
      if(from === data[i].code) {
        var fromValue = data[i].value;
      }
      if(to === data[i].code) {
        var toValue = data[i].value;
      }
    }
    let res = fromValue / toValue * sum;
    result.innerHTML = res;
  }
}