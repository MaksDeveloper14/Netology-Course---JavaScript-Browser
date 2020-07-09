function showBubbles(target) {
  if (!target || !(target instanceof WebSocket)) {
    return;
  }

  let points = [];

  target.addEventListener('message', event => {
    const data = JSON.parse(event.data);
    if (data instanceof Array) {
      points = data;
    }
  });

  const canvas = document.querySelector('canvas');
  const c = canvas.getContext('2d');

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  window.addEventListener('resize', function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    draw();
  });

  function draw() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (const point of points) {
      c.beginPath();
      c.fillStyle = point.color;
      c.arc(point.x, point.y, point.radius, 0, Math.PI * 2, false);
      c.fill();
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    draw();
  }

  animate();
}

let connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

connection.addEventListener('open', (event) => {
  showBubbles(event.currentTarget);
  console.log(event.target);
  console.log(event.currentTarget);
});

document.addEventListener('click', (event) => {
  let coordinates = { x: event.clientX, y: event.clientY};
  connection.send(JSON.stringify(coordinates));
  console.log('click');
});

connection.addEventListener('error', error => {
  console.log('Произошла ошибка: ${error.data}');
});

window.addEventListener('dblclick', () => {
  if(connection.readyState === 3) {
    connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');
    console.log('Соединение открыто');
    console.log(connection);
  } else if (connection.readyState === 1) {
    connection.close(1000, console.log('Соединение закрыто'));
    console.log(connection);
  }
});