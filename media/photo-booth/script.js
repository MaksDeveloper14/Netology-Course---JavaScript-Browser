// Данные 

const app = document.querySelector('.app');
const takePhoto = document.querySelector('#take-photo');
const list = document.querySelector('.list');
const video = document.createElement('video');
const audio = document.createElement('audio');
audio.src = 'https://raw.githubusercontent.com/netology-code/hj-homeworks/master/media/photo-booth/audio/click.mp3';


// 1. Проверка доступность mediaDevices

if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	requestUserMedia();
} else {
	console.log('Нету данного API');
}


// 2. Запрос на разрешение получения камеры

function requestUserMedia() {
	navigator.getUserMedia({video:true}, function(stream) {
		console.log('Разрешил');
		// 3. Выводим изображение с камеры на экран
		video.srcObject = stream;
		app.appendChild(video);
		video.play();
    // отображаем кнопку сфотографировать
    document.querySelector('.controls').classList.add('visible');
  }, function() {
		   console.log(new Error('Пользователь отклонил ваш запрос к веб-камере'));
	   });
}


// 4. При клике сделать фото помещаем текущий кадр на холст

takePhoto.addEventListener('click', function() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  audio.currentTime = 0;
  audio.play();

  ctx.drawImage(video, 0, 0);
  const url = canvas.toDataURL();
  
  // Добавить снимок в list
  const snap = document.createElement('figure');
  snap.innerHTML = `
    <img src="${url}">
    <figcaption>
      <a href="${url}" download="snapshot${list.children.length + 1}.png">
        <i class="material-icons">file_download</i>
      </a>
      <a><i class="material-icons">file_upload</i></a>
      <a><i class="material-icons">delete</i></a>
    </figcaption>`;
  list.appendChild(snap);

  // действия на icons
  for(let figure of list.querySelectorAll('figure')) {
  	let icons = figure.querySelectorAll('.material-icons');
  	for(let i of icons) {	
  		if(i.textContent === 'file_download') {
  			i.addEventListener('click', function() {
  				// скачивается автоматом        
  			});
  		}
  		if(i.textContent === 'file_upload') {
  			i.addEventListener('click', function() {
         	// Отправка изображения с холста на сервер
          let snapshot = i.parentNode.parentNode.parentNode;
		      xhr = new XMLHttpRequest(),
		      form = new FormData();
    	    form.append('picture', snapshot);
    	    xhr.open('POST', 'https://neto-api.herokuapp.com/photo-booth');
    	    xhr.send(form); 
  			});
  		}
  		if(i.textContent === 'delete') {
  			i.addEventListener('click', function() {
          // удалить из list
  				let snapshot = i.parentNode.parentNode.parentNode;
  				snapshot.remove();
  			});
  		}
  	}
  }
});


// Статус: сделал
// Ошибка 418 для чего здесь реализована? 

