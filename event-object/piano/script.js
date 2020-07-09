// Как работает код: 

// Включите звук
// Кликайте по клавишам
// Зажмите shift и кликайте по клавишам
// Зажмите alt и кликайте по клавишам

'use strict'

// Задание 1

    const middle = [
       'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/first.mp3',
       'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/second.mp3',
       'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/third.mp3',
       'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/fourth.mp3',
       'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/fifth.mp3'
    ];

    const lower = [
      'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/first.mp3',
      'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/second.mp3',
      'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/third.mp3',
      'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/fourth.mp3',
      'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/fifth.mp3'
    ]

    const higher = [
      'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/first.mp3',
      'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/second.mp3',
      'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/third.mp3',
      'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/fourth.mp3',
      'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/fifth.mp3'
    ]

    const ul = document.getElementsByClassName('set')[0]; 
    const liCollection = ul.getElementsByTagName('li');
    const audioCollection = ul.getElementsByTagName('audio');

    // При нажатии клавиш меняем класс у ul
    var name = 'middle';
    
    function down() { 
        if(event.key === 'Shift') {
          console.log('Зажата клавиша Shift');
          ul.classList.toggle(name);
          name = 'lower';
          ul.classList.toggle(name);
          console.log(`Класс ${name}`);
        } else if(event.key === 'Alt') {
          console.log('Зажата клавиша Alt');
          ul.classList.toggle(name);
          name = 'higher';
          ul.classList.toggle(name);
          console.log(`Класс ${name}`);
         } 
    }

    function up() {
      if(event.key === 'Shift') {
        console.log('Клавиша Shift была отпущена');
        ul.classList.toggle(name);
        name = 'middle';
        ul.classList.toggle(name);
        console.log(`Класс ${name}`);
      } else if(event.key === 'Alt') {
        console.log('Клавиша Alt была отпущена');
        ul.classList.toggle(name);
        name = 'middle';
        ul.classList.toggle(name);
        console.log(`Класс ${name}`);
      }
    }
    
    document.addEventListener('keydown', down);
    document.addEventListener('keyup', up);


    // Навешиваем обработчики на каждую кнопку
    function playAudio() {
      if(ul.classList.contains('middle')) {
        let count = 0;
        for(let li of liCollection) {
          li.getElementsByTagName('audio')[0].src = middle[count];
          count += 1;
        }
      } else if(ul.classList.contains('lower')) {
        let count = 0;
        for(let li of liCollection) {
          li.getElementsByTagName('audio')[0].src = lower[count];
          count += 1;
        }
      } else if(ul.classList.contains('higher')) {
        let count = 0;
        for(let li of liCollection) {
          li.getElementsByTagName('audio')[0].src = higher[count];
          count += 1;
        }
      }
      this.getElementsByTagName('audio')[0].play();
    }

    for(let li of liCollection) {
      li.addEventListener('click', playAudio);
    }    

    // Статус: сделал (alt на документе можно 1 раз нажать только, почему? )