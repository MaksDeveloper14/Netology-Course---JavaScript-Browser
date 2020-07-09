// Список песен:
// 1. LA Chill Tour, 
// https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Chill%20Tour.mp3

// 2. This is it band, 
// https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/This%20is%20it%20band.mp3

// 3. LA Fusion Jam,
// https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Fusion%20Jam.mp3


		let mediaplayer = document.getElementsByClassName('mediaplayer')[0];
		let audio = document.getElementsByTagName('audio')[0];
		let span = document.getElementsByTagName('span')[0];
        const playstate = document.getElementsByClassName('playstate')[0];
        const stop = document.getElementsByClassName('stop')[0];
		const next = document.getElementsByClassName('next')[0];
		const back = document.getElementsByClassName('back')[0];

		var count = 0;
		var srcAudio = [
			 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Chill%20Tour.mp3',
			 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/This%20is%20it%20band.mp3',
			 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Fusion%20Jam.mp3'
		   ];

		var namesAudio = {
		  0:  'LA Chill Tour',
		  1: 'This is it band',
		  2: 'LA Fusion Jam'
		}


		 // 1
         playstate.onclick = function() {
            mediaplayer.classList.toggle('play');
            if(mediaplayer.classList.contains('play')) {
              audio.play();
            } else {
              audio.pause(); 
            }
         }

		 // 2
		 stop.onclick = function() {
			audio.pause(); 
			audio.currentTime = 0
			mediaplayer.classList.remove('play');
		 }

		 // 3
		 next.onclick = function() {
			if(count < srcAudio.length - 1) {
			count += 1;
		   } else {
			 count = 0;
		   }
		   audio.setAttribute('src', srcAudio[count]);
           if(mediaplayer.classList.contains('play')) {
            audio.play();
           }
		   span.title = namesAudio[count];
		 }

         // 4
		 back.onclick = function() {
		   count -= 1;
		   if(count < 0) {
			count = srcAudio.length - 1;
		   }
		   audio.setAttribute('src', srcAudio[count]);
           if(mediaplayer.classList.contains('play')) {
            audio.play();
           }
		   span.title = namesAudio[count];
		 }
		 