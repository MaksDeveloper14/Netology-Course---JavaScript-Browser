const request = new XMLHttpRequest();
request.open('GET', 'https://neto-api.herokuapp.com/weather');
request.send();

function response() {
  if (request.status === 200) {
  const response = JSON.parse(request.responseText);
  setData(response);
  }
}

request.addEventListener('readystatechange', response);
