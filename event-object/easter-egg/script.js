// ~~~~~~~~ Как работает код ~~~~~~~~~~ 

// Введите слово нетология - появиться слово
// Зажмите CTRL+ALT+T - покажется боковое меню

'use strict';    

const nav = document.getElementsByTagName('nav')[0];
const secret = document.getElementsByClassName('secret')[0];

    const secretCode = 'Нетология';
    var secretCodeEvent = ['KeyY', 'KeyT', 'KeyN', 'KeyJ', 'KeyK', 'KeyJ', 'KeyU', 'KeyB', 'KeyZ'];
    var number = 1;
    
    function navigationBar() {
      if(event.altKey && event.ctrlKey && event.code === 'KeyT') {
        nav.classList.toggle('visible');
      }

      // Проверка секретного кода на совпадение
      if(event.code === secretCodeEvent[0]) {
        secretCodeEvent.shift(secretCodeEvent[0]);
        number += 1;
        if(secretCodeEvent.length === 0) {
          console.log('Секретный код введен верно!');
          secret.classList.add('visible');
          secretCodeEvent = ['KeyY', 'KeyT', 'KeyN', 'KeyJ', 'KeyK', 'KeyJ', 'KeyU', 'KeyB', 'KeyZ'];
        }
      } else {
        secretCodeEvent = ['KeyY', 'KeyT', 'KeyN', 'KeyJ', 'KeyK', 'KeyJ', 'KeyU', 'KeyB', 'KeyZ'];
      }
    }

    document.addEventListener('keydown', navigationBar);

