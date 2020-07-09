// Как работает код:

// Кликлине 2 раза быстро, чтобы очистить холст
// Зажмите ЛКМ и ведите курсор, чтобы рисовать    

const canvas = document.getElementById("draw");
    const ctx = canvas.getContext("2d");
    const opts = {
      color: "hsl(hue,100%,50%)",
      radius: 100,
    };
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let tick = 0;
    let currentHue = 0;
    let painting = false;
    let vector = false;

    canvas.onmousedown = function() {
      painting = true;
      console.log("Down");
    };
    canvas.onmouseup = function() {
      painting = false;
      console.log("Up");
      ctx.beginPath();
    };
    canvas.addEventListener("mousemove", function(e) {
      let posX = e.pageX;
      let posY = e.pageY;

      if(painting) {
        ++tick;
        if(!(tick%1)){
          if(e.shiftKey) {
            if((currentHue !== 0)){
              currentHue--;
            } else {
              currentHue = 359;
            }
            console.log("change");
          } else {
            if((currentHue !== 359)){
              currentHue++;
            } else {
              currentHue = 0;
            }
            console.log("change");
            }
        }

        currentColor = opts.color.replace("hue", currentHue);
        // какую роль здесь играют? 
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        ctx.lineWidth = opts.radius * 2;
        ctx.strokeStyle = currentColor;
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

        ctx.fillStyle = currentColor;
        ctx.beginPath();
        ctx.arc(posX, posY, opts.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(event.clientX, event.clientY);
      }

        // изменения толщины линии
        if(opts.radius === 100) {
          vector = true;
        }
        if(opts.radius === 5) {
          vector = false;
        }

        if(opts.radius >= 5 && opts.radius <= 100) {
          if(vector) {
            opts.radius -= 0.5;
          } else {
            opts.radius += 0.5;
          }
        }
        
      // перестаем рисовать, если координаты мыши вышли за пределы холста
      canvas.addEventListener('mouseout', () => {
        painting = false;
      });
    });

    // обработчик на изменение окна браузера
    window.addEventListener("resize", function(){
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    function clearCanvas() {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      opts.radius = 100;
      console.log('clear');
    }
    canvas.addEventListener('dblclick', clearCanvas);