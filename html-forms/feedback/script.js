const form = document.querySelector('.contentform');
const labelCollection = form.querySelectorAll('.form-group');
const inputCollection = form.getElementsByTagName('input');
const buttonContact = form.querySelector('.button-contact');
const output = document.querySelector('#output');
const btnOutput = output.querySelector('.button-contact');

// У почтовый индекс меняем input type на number
for(let input of inputCollection) {
  if(input.getAttribute('name') === 'zip') {
    input.setAttribute('type', 'number');
  }
}

// Валидация формы
for(let input of inputCollection) {
  input.addEventListener('change', validForm);
}

function validForm() {
  let inputArray = Array.from(inputCollection);
  let valid = inputArray.length;
  var count = 0;
  for(let i = 0; i < inputArray.length; i++) {
    if(inputArray[i].value === '') {
      count = 0;
      buttonContact.setAttribute('disabled', 'disabled');
      return;
    } else {
      count += 1;
    }
  }
  if(count === inputArray.length) {
    buttonContact.removeAttribute('disabled');
  }
}


form.addEventListener('submit', onSubmit);

function onSubmit() {
  event.preventDefault();
}

buttonContact.addEventListener('click', onClick);
btnOutput.addEventListener('click', onClick);

function onClick() {
  form.classList.toggle('hidden');
  output.classList.toggle('hidden');
  for(let input of inputCollection) {
    if(input.getAttribute('name') === 'name') {
      output.querySelector('#name').innerHTML = input.value;
    }
    if(input.getAttribute('name') === 'lastname') {
      output.querySelector('#lastname').innerHTML = input.value;
    }
    if(input.getAttribute('name') === 'company') {
      output.querySelector('#company').innerHTML = input.value;
    }
    if(input.getAttribute('name') === 'role') {
      output.querySelector('#role').innerHTML = input.value;
    }
    if(input.getAttribute('name') === 'zip') {
      output.querySelector('#zip').innerHTML = input.value;
    }
    if(input.getAttribute('name') === 'city') {
      output.querySelector('#city').innerHTML = input.value;
    }
    if(input.getAttribute('name') === 'address') {
      output.querySelector('#address').innerHTML = input.value;
    }
  } 
}