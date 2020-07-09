        const canvas = document.querySelector('#wall');
        const ctx = canvas.getContext('2d');

        // Функция времени 1:
        function nextPointOne(x, y, time) {
          return {
            x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
            y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
          };
        }

        // Функция времени 2: 
        function nextPointTwo(x, y, time) {
          return {
            x: x + Math.sin((x + (time / 10)) / 100) * 5,
            y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
          }
        }

        // Пример использования:
        const {x,y} = nextPointOne(100, 100, Date.now());

        // Массив созданных объектов
        let data = [];

        // Данные объектов
        let circle = {
          get size() {return getRandomInt(1, 6) / 10},
          strokeStyle: 'white',
          get lineWidth() {return 5 * this.size},
          get radius() {return 12 * this.size}
        }
        let cross = {
          get size() {return getRandomInt(1, 6) / 10},
          strokeStyle: 'white',
          get lineWidth() {return 5 * this.size},
          get line() {return 20 * this.size},
          angleRotation: getRandomInt(0, 360),
          speedRotate: getRandomInt(-2, 2) / 10
        }

       // Порлучение целого рандомного числа
       function getRandomInt(min, max) {
         return Math.floor(Math.random() * (max - min)) + min;
      }

      // получить рандомно одну из двух данных функций
      function selectRandomFunction(min = 1, max = 3) {
        if(Math.floor(Math.random() * (max - min)) + min === 1) { 
          let func =  'function nextPointOne(x, y, time) { return { x: x + Math.sin((50 + x + (time / 10)) / 100) * 3, y: y + Math.sin((45 + x + (time / 10)) / 100) * 4}';
          return func;
        } else {
          let func = 'function nextPointTwo(x, y, time) { return { x: x + Math.sin((x + (time / 10)) / 100) * 5, y: y + Math.sin((10 + x + (time / 10)) / 100) * 2 0}';
          return func;
        }
      } 

      // задаём размеры canvas на все окно браузера
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Почему если закоментировать, отрисовка не будет работать
      // как мой этот код сбивает размеры canvas прописанные в style? 
      // canvas.width = 800;
      // canvas.height = 500;
      canvas.style.backgroundColor = 'rgb(3, 102, 214)';


      function draw(amount) {
         for(let i = 0; i < amount; i++) {
          //  получаем координаты для рисования - рандомное, в пределах холста
           let x1 = getRandomInt(10, canvas.width - 20);  // из за чего приходится так минусовать код
           let y1 = getRandomInt(10, canvas.height - 20);
           let x2 = getRandomInt(10, canvas.width - 20);  // из за чего приходится так минусовать код
           let y2 = getRandomInt(10, canvas.height - 20); // так как заходит за холст
           let w = 15; // размеры крестика
           let h = 15; // размеры крестика
           let r = circle.radius;
          //  рисуем circle
           ctx.beginPath();
           ctx.arc(x1, y1, r, 0, Math.PI * 2);
           ctx.strokeStyle = circle.strokeStyle;
           ctx.lineWidth = circle.lineWidth;
           ctx.stroke();
          //  добавляем обьекту circle свойства и методы
          //  circle.x = x1;
          //  circle.y = y1;
          //  circle.animation = nextPointOne;
          //  data.push(circle);
          //  рисуем cross
           ctx.strokeStyle = 'white';
           ctx.moveTo(x2 + w / 2,y2);
           ctx.lineTo(x2 + w / 2, y2 + h);
           ctx.lineTo(x2 + w / 2, y2 + h);
           ctx.lineTo(x2 + w / 2, y2 + h);
           ctx.moveTo(x2 + w /2 ,y2 + h / 2);
           ctx.lineTo(x2, y2 + h / 2);
           ctx.lineTo(x2 + w, y2 + h /2);
           ctx.stroke();
           ctx.closePath();
          //  добавляем обьекту cross свойства и методы
           cross.x = x2;
           cross.y = y2;
           cross.animation = nextPointOne;
           data.push(cross);
        }
      }

      draw(getRandomInt(25, 100));  