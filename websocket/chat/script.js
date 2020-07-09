const chat = document.querySelector('.chat');
const form = chat.querySelector('.message-box'); // форма
const messages = chat.querySelector('.messages'); // сообщения: 4 вида
const chatStatus = chat.querySelector('.chat-status'); // в сети или не в сети


function time(date) {
  return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + ' ' + date.getHours() + ':'  + date.getMinutes();
}

function timeNick(date) {
  return date.getHours() + ':'  + date.getMinutes();
}


function onOpen() {
  // пользователь появился в сети
  // обновить статус чата
  chatStatus.innerHTML = chatStatus.getAttribute('data-online');
  // активировать кнопку «Отправить сообщение»
  form.querySelector('.message-submit').removeAttribute('disabled');
  // вывести уведомление с текстом «Пользователь появился в сети»
  messages.querySelector('.messages-templates').querySelector('.message-status').querySelector('.message-text').innerHTML = chatStatus.getAttribute('data-online');
}

function onMessage(event) {
  // вывод сообщения
  if(event.data === '...') {
    messages.querySelector('.loading ').innerHTML = 'Собеседник сейчас печатает сообщение..';
  } else {
    messages.querySelector('.loading ').innerHTML = event.data;
    //Добавить в список сообщений
    messages.querySelector('.messages-content').innerHTML = messages.querySelector('.messages-content').innerHTML  + event.data  + "<br>" + timeNick(new Date()) + "<br>";
    // Добавляем сообщение и время в элементы 
    messages.querySelector('.messages-templates').children[1].querySelector('.message-text').innerHTML = event.data;
    messages.querySelector('.messages-templates').children[1].querySelector('.timestamp').innerHTML = time(new Date());
    messages.querySelector('.message-personal').querySelector('.message-text').innerHTML = event.data;
    messages.querySelector('.message-personal').querySelector('.timestamp').innerHTML = time(new Date());
  }
}



function onClose() {
  // пользователь ушел со страницы
  // обновить статус чата
  chatStatus.innerHTML = chatStatus.getAttribute('data-offline');
  // активировать кнопку «Отправить сообщение»
  form.querySelector('.message-submit').setAttribute('disabled', 'disabled');
  // вывести уведомление с текстом «Пользователь появился в сети»
  messages.querySelector('.messages-templates').querySelector('.message-status').querySelector('.message-text').innerHTML = chatStatus.getAttribute('data-offline');
  console.log('Соединение успешно закрыто');
}

// При открытии страницы устанавливаем соединение и вешаем обработчики на события соединения
function onDOMContentLoaded() {
  var connection = new WebSocket('wss://neto-api.herokuapp.com/chat');
  connection.addEventListener('open', onOpen);
  connection.addEventListener('message', onMessage);
  // обработчик кнопки отправки формы
  // почему enter тоже работает?
  form.querySelector('.message-submit').addEventListener('click', () => {
    // Отправляем сообщение пользователя из input по enter, и по нажатию кнопки отправить
    event.preventDefault();
    connection.send(form.querySelector('.message-input').value);
    // Отображаем в списке сообщений
    messages.querySelector('.messages-content').innerHTML = messages.querySelector('.messages-content').innerHTML + form.querySelector('.message-input').value + "<br>" + timeNick(new Date()) + "<br>";
    // сбрасываем значение input text
    form.querySelector('.message-input').value = '';
  });
  // Закрываем соединение при уходе со страницы
  document.addEventListener('unload', function() {
    connection.addEventListener('close', onClose);
    connection.close(1000);
  });
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

// Статус: сделал