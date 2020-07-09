// JSONP
    function setData(data) {
      document.querySelector('[data-wallpaper]').src = data.wallpaper;
      document.querySelector('[data-username]').innerHTML = data.username;
      document.querySelector('[data-description]').innerHTML = data.description;
      document.querySelector('[data-pic]').src = data.pic;
      document.querySelector('[data-tweets]').innerHTML = data.tweets;
      document.querySelector('[data-followers]').innerHTML = data.followers;
      document.querySelector('[data-following]').innerHTML = data.following;
    }
  
    // Получение данных JSONP
    function loadData(url) {
      const script = document.createElement('script');
      script.src = url;
      document.body.appendChild(script);
    }

    loadData("https://neto-api.herokuapp.com/twitter/jsonp?callback=setData");


    // Статус: сделал