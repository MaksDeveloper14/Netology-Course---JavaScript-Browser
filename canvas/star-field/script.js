 // Задание 1

        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');

        // Задаем свои размеры canvas
        canvas.style.width = '900px';
        canvas.style.height = '400px';
        canvas.style.backgroundColor = "black";

        let amountStar;

        // рандомное целое число не включая max
        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min)) + min;
        }

        function createStar(amount) {
          const colors = ['#ffffff', '#ffe9c4', '#d4fbff'];
          for(let i = 0; i < amount; i++) {
            // Данные
            const posX = getRandomInt(10, 280);
            const posY = getRandomInt(10, 140);
            const sizeStar = getRandomInt(0, 11+1) / 10;
            const indexColor = getRandomInt(0, colors.length);
            const bright = getRandomInt(8, 10+1) / 10;
            // код
            ctx.beginPath();  
            ctx.globalAlpha = bright;
            ctx.fillStyle = colors[indexColor];
            ctx.arc(posX, posY, Math.random(), 0, Math.PI * 2, false); 
            ctx.closePath(); 
            ctx.stroke();
            ctx.fill();
          }
        }

        function onClick() {
          // Генерируем случайное число звезд на холсте
          amountStar = getRandomInt(200, 400);
          // очищаем canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          // создаем звездное небо
          createStar(amountStar);
        }

        function onDOMContentLoaded() {
          amountStar = getRandomInt(200, 400);
          createStar(amountStar);
        }

        canvas.addEventListener('click', onClick);
        document.addEventListener("DOMContentLoaded", onDOMContentLoaded);

        // Статус: сделал
        // как сделать расположение звезд, чтобы не пересекалось