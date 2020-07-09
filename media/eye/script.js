'use strict'

const wrapper = document.querySelector('.wrapper');
const eye = document.querySelector('.big-book__eye');
const pupil = document.querySelector('.big-book__pupil');
let windowWidth = document.documentElement.clientWidth;
let windowHeight = document.documentElement.clientHeight;
let updateState = {};

function update(e){
  if (e.type == 'mousemove') {
    updateState.mouseX = e.clientX;
    updateState.mouseY = e.clientY;
  }
  const eyeState = eye.getBoundingClientRect();
  updateState.eyeX = eyeState.left + eyeState.width / 2;
  updateState.eyeY = eyeState.top + eyeState.height / 2;
  updateState.distMouse = Math.abs(updateState.mouseX - updateState.eyeX) + Math.abs(updateState.mouseY - updateState.eyeY);
  updateState.distMax = Math.abs(windowWidth / 2) + Math.abs(windowHeight / 2);
  animation();
}

function animation() {
  const offsetX = ((updateState.mouseX - updateState.eyeX) / windowWidth) * 30 * 2;
  const offsetY = ((updateState.mouseY - updateState.eyeY) / windowHeight) * 30;
  pupil.style.setProperty('--pupil-x', offsetX.toFixed(0) + 'px');
  pupil.style.setProperty('--pupil-y', offsetY.toFixed(0) + 'px');
  pupil.style.setProperty('--pupil-size',(3 - (updateState.distMouse / updateState.distMax) * 2));
}

wrapper.addEventListener("mousemove", update);



// Статус: сделал
