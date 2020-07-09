    'use strict';

      const li = document.getElementsByClassName('drum-kit__drum');
    const audio = document.getElementsByTagName('audio');

    for(let i = 0; i < li.length; i++) {
      
      li[i].onclick =  function() {
        audio[i].pause();
        audio[i].currentTime = 0;
        audio[i].play();
      };
    }