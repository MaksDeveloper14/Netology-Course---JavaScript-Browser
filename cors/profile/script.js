  function setData(data) {
      document.querySelector('[data-name]').innerHTML = data.name;
      document.querySelector('[data-description]').innerHTML = data.description;
      document.querySelector('[data-pic]').src = data.pic;
      document.querySelector('[data-position]').innerHTML = data.position;
      document.querySelector('[data-technologies]').innerHTML = data.technologies;
      document.querySelector('[data-following]').innerHTML = data.following;
    }
      
    function loadDataUser(url) {
      // подготавливаем url
      let splitUrl = url.split('');
      splitUrl.push('?callback=showDataUser');
      url = splitUrl.join('');
      // загружаем скрипт
      const script = document.createElement('script');
      script.src = url;
      document.body.appendChild(script);
    }

    function getTehnology(dataUser, url) {
      // подготавливаем url
      let reg = /:id/gi;
      url = url.replace(reg, dataUser.id);
      let splitUrl = url.split('');
      splitUrl.push('?callback=showTehnologyUser');
      url = splitUrl.join('');
      // загружаем скрипт
      const script = document.createElement('script');
      script.src = url;
      document.body.appendChild(script);
    }

    // Показать информацию
   function showDataUser(data) {
    // console.log(data);
    getTehnology(data, 'https://neto-api.herokuapp.com/profile/:id/technologies');
     // вставляем в html
     document.querySelector('[data-name]').innerHTML = data.name;
     document.querySelector('[data-description]').innerHTML = data.description;
     document.querySelector('[data-pic]').src = data.pic;
     document.querySelector('[data-position]').innerHTML = data.position;
     document.querySelector('[data-technologies]').innerHTML = data.technologies;
   }

   function showTehnologyUser(data) {
     let badgescard = document.querySelector('.badgescard');
     badgescard.innerHTML = '';
     // вставка используемых технологий
     for(let django of data) {
      const span = document.createElement('span');
      span.classList.add('devicons');
      span.classList.add(`devicons-${django}`);
      badgescard.appendChild(span);
     }
     document.querySelector('.content').style = 'initial'; 
   }

    function openDocument() {
      loadDataUser('https://neto-api.herokuapp.com/profile/me');
    }

    document.addEventListener('DOMContentLoaded', openDocument); 


    // Статус: сделал 