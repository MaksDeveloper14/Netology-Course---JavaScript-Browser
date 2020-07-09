// 1. Данные интерфейса
const acSelect = document.getElementById('acSelect'); // Поле выбора типа самолета
const btnSeatMap = document.getElementById('btnSeatMap'); // Кнопка отображения схемы
const btnSetFull = document.getElementById('btnSetFull'); // Обозначить все места в самолёте как занятые. Заблокирована, если схема не отображена.
const btnSetEmpty =  document.getElementById('btnSetEmpty'); // Обозначить все места в самолёте как свободные. Заблокирована, если схема не отображена.
const seatMapTitle = document.getElementById('seatMapTitle'); // Отображения выбранного самолёта и количества пассажиров в нём
const seatMapDiv = document.getElementById('seatMapDiv'); // Вывод схемы мест в самолете
const totalPax = document.getElementById('totalPax'); // отображение общего количества занятых мест
const totalAdult = document.getElementById('totalAdult'); // отображение мест с полной стоимостью
const totalHalf = document.getElementById('totalHalf'); // отображение мест детских

const seatsRow6 = `<div class="row seating-row text-center">
  <div class="col-xs-1 row-number">
    <h2 class="">1</h2> 
  </div>
  <div class="col-xs-5">
    <div class="col-xs-4 seat">
      <span class="seat-label">A</span>
    </div>
    <div class="col-xs-4 seat">
      <span class="seat-label">B</span>
    </div>
    <div class="col-xs-4 seat">
      <span class="seat-label">C</span>
    </div>
  </div>
  <div class="col-xs-5">
    <div class="col-xs-4 seat">
      <span class="seat-label">D</span>
    </div>
    <div class="col-xs-4 seat">
      <span class="seat-label">E</span>
    </div>
    <div class="col-xs-4 seat">
      <span class="seat-label">F</span>
    </div>
  </div>
</div>`;

const seatsRow4 = `<div class="row seating-row text-center">
  <div class="col-xs-1 row-number">
    <h2 class="">1</h2>
  </div>
  <div class="col-xs-5">
    <div class="col-xs-4 seat">
      <span class="seat-label">A</span>
    </div>
    <div class="col-xs-4 seat">
      <span class="seat-label">B</span>
    </div>
  </div>
  <div class="col-xs-5">
    <div class="col-xs-4 seat">
      <span class="seat-label">D</span>
    </div>
    <div class="col-xs-4 seat">
      <span class="seat-label">E</span>
    </div>
  </div>
</div>`;

const seatsRow0 = `<div class="row seating-row text-center">
  <div class="col-xs-1 row-number">
    <h2 class="">1</h2>
  </div>
  <div class="col-xs-5">
    <div class="col-xs-4 no-seat"></div>
  </div>
  <div class="col-xs-5">
    <div class="col-xs-4 no-seat"></div>
  </div>
</div>`;

let airId = acSelect.value;
let airText = getAirText();
let form = document.querySelector('.form-inline');

// FETCH-запрос
function request(url, id, func) {
  fetch(url + id)
    .then(res => res.json())
    .then(func);
}

// Получить данные самолета другого выбранного
function getAirСhanged() {
  airId = acSelect.value;
  airText = getAirText();
  // получаем данные самолета
  request('https://neto-api.herokuapp.com/plane/', airId, logDataAir);
  // Отображение выбранного самолета и кол-ва пассажиров в нем в документе
  btnSeatMap.removeAttribute('disabled', 'disabled');
}

// получить текстовое значение select
function getAirText() {
   for(let option of acSelect) {
      if(airId === option.getAttribute('value')) {
        return option.text;
      } 
   }
}

 // блокируем кнопки btnSetFull / btnSetEmpty пока схема не показана
function btnBlocking() {
  btnSetFull.setAttribute('disabled', 'disabled');
  btnSetEmpty.setAttribute('disabled', 'disabled');
}

// ОТОБРАЗИТЬ СХЕМУ
function showScheme() {
  airId = acSelect.value;
  airText = getAirText();
  // 1. запрос fetch
  request('https://neto-api.herokuapp.com/plane/', airId, insertSchemeHTML)

  // 2. вставка схемы в html после получения данных
  function insertSchemeHTML(data) {
    totalPax.textContent = 0;
    totalAdult.textContent = 0;
    totalHalf.textContent = 0;
    seatMapDiv.innerText = '';
    let counter = 1;
    for(let amount of data.scheme) {
      if(amount === 6) {
        seatMapDiv.insertAdjacentHTML('beforeend', seatsRow6);
      } else if(amount === 4) {
        seatMapDiv.insertAdjacentHTML('beforeend', seatsRow4);
      } else if(amount === 0) {
        seatMapDiv.insertAdjacentHTML('beforeend', seatsRow0);
      }
    }
    let rows = seatMapDiv.querySelectorAll('.row .seating-row');
    for(let row of rows) {
      let h2 = row.querySelector('h2');
      h2.textContent = counter;
      counter = counter + 1;
    }

    btnSetFull.removeAttribute('disabled', 'disabled');
    btnSetEmpty.removeAttribute('disabled', 'disabled');

    // Отображение выбранного самолета и кол-ва пассажиров в нем в документе
      seatMapTitle.innerText = `${data.title} (${data.passengers} пассажиров)`;

    // Занять места в самолете
    let seats = seatMapDiv.querySelectorAll('div.seat');
        for(let seat of seats) {
      seat.addEventListener('click', function(e) {
          // взрослые
          if(e.altKey === false && !seat.classList.contains('half')) {
            if(seat.classList.contains('adult')) {
              seat.classList.remove('adult');
              totalAdult.textContent =  Number(totalAdult.textContent) - 1;
              totalPax.textContent = Number(totalPax.textContent) - 1;
            } else {
              seat.classList.add('adult');
              totalAdult.textContent =  Number(totalAdult.textContent) + 1;
              totalPax.textContent = Number(totalPax.textContent) + 1;
            }
          }
          // детские
          else if(e.altKey === true && !seat.classList.contains('adult')) {
            if(seat.classList.contains('half')) {
              seat.classList.remove('half');
              totalHalf.textContent =  Number(totalHalf.textContent) - 1;
              totalPax.textContent = Number(totalPax.textContent) - 1;
            } else {
              seat.classList.add('half');
              totalHalf.textContent =  Number(totalHalf.textContent) + 1;
              totalPax.textContent = Number(totalPax.textContent) + 1;
            }
          }
      });
    }
    btnSetFull.addEventListener('click', fillSeats);
    btnSetEmpty.addEventListener('click', freeSeats);
  }
}

// Рендеринг схемы по данным схемы
function renderSheme(data) {
  console.log(data);
  return seatsRow;
}


document.addEventListener('DOMContentLoaded', btnBlocking);
acSelect.addEventListener('change', getAirСhanged);
form.addEventListener('submit', (e) => {e.preventDefault()});
btnSeatMap.addEventListener('click', showScheme);



function fillSeats() {
  let seats = seatMapDiv.querySelectorAll('div.seat');
  totalPax.textContent = 0;
  totalAdult.textContent = 0;
  totalHalf.textContent = 0;
  for(let seat of seats) {
    totalPax.textContent = Number(totalPax.textContent) + 1;
    totalAdult.textContent = Number(totalAdult.textContent) + 1;
    seat.classList.remove('half');
    seat.classList.add('adult');
  }
}

function freeSeats() {
  let seats = seatMapDiv.querySelectorAll('div.seat');
  totalPax.textContent = 0;
  totalAdult.textContent = 0;
  totalHalf.textContent = 0;
  for(let seat of seats) {
    seat.classList.remove('adult');
    seat.classList.remove('half');
  }
}