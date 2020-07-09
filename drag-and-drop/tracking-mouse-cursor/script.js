function moveEyes(x, y) {
  const leftEye = document.querySelector('.cat_eye_left');
  const rightEye= document.querySelector('.cat_eye_right');
  
  const areaLeftEye = document.querySelector('.cat_position_for_left_eye');
  const areaRightEye = document.querySelector('.cat_position_for_right_eye');
  
  const areaLeftEyeBox = areaLeftEye.getBoundingClientRect();
  const areaRightEyeBox = areaRightEye.getBoundingClientRect();
  
  
  if (x > areaLeftEyeBox.right) {
      leftEye.style.left = 50 + '%';
    } else if (x < areaLeftEyeBox.left) {
      leftEye.style.left = 0 + 'px';
    } else {
      leftEye.style.left = 25 + '%';
    }

    if (y < areaLeftEyeBox.top) {
      leftEye.style.top = 0 + 'px';
    } else if (y > areaLeftEyeBox.bottom) {
      leftEye.style.top = 50 + '%';
    } else {
      leftEye.style.top = 25 + '%';
    }
  
    if (x > areaRightEyeBox.right) {
      rightEye.style.left = 50 + '%';
    } else if (x < areaRightEyeBox.left) {
      rightEye.style.left = 0 + 'px';
    } else {
      rightEye.style.left = 25 + '%';
    }

    if (y < areaLeftEyeBox.top) {
      rightEye.style.top = 0 + 'px';
    } else if (y > areaRightEyeBox.bottom) {
      rightEye.style.top = 50 + '%';
    } else {
      rightEye.style.top = 25 + '%';
    }
  
} 

document.addEventListener('mousemove', event => {
  moveEyes(event.pageX, event.pageY);
});


// Статус: сделал 