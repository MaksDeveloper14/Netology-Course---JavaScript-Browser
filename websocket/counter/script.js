const counter = document.querySelector('.counter');
const outputErrors = document.querySelector('output.errors');
const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

connection.addEventListener('message', (event) => {
  let message = JSON.parse(event.data);
  counter.textContent = message.connections;
  outputErrors.value = message.errors;
});

connection.addEventListener('error', (error) => {
  console.log('Произошла ошибка: ${error.data}');
});

window.addEventListener('beforeunload', () => {
  connection.close(1000);
});
