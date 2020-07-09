'use strict';

let srcImages = [
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/breuer-building.jpg',
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/guggenheim-museum.jpg',
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/headquarters.jpg',
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/IAC.jpg',
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/new-museum.jpg'
];

let index = 0;

let img = document.getElementById('currentPhoto');
img.src = srcImages[0];

let prevPhoto = document.getElementById('prevPhoto');
let nextPhoto = document.getElementById('nextPhoto');

prevPhoto.onclick = function() {
  index -= 1;
  if(index < 0) {
    index = srcImages.length - 1;
    img.src = srcImages[index];
  } else {
    img.src = srcImages[index];
  }
}

nextPhoto.onclick = function() {
  index += 1;
  if(index === srcImages.length) {
    index = 0;
    img.src = srcImages[index];
  } else {
    img.src = srcImages[index];
  }
}