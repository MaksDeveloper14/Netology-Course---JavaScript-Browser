'use strict';

      var img = document.getElementById('slider');
      var srcImages = [
        'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-jump.png',
        'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-on-foot.png',
        'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-playground.png',
        'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-top-view.png',
        'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax.png'
      ];
      
      
      var count = 0;
      img.src = srcImages[0];

      setInterval(function(){
        count += 1;
        if(count === srcImages.length){
          count = 0;
        }
        img.src = srcImages[count];
      }, 5000);