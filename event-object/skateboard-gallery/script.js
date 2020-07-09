'use strict';

const gallery = document.getElementsByClassName('gallery-nav');
    const linksGallery = gallery[0].getElementsByTagName('a');
    const imgView = document.getElementById('view'); 

    function select() {
      event.preventDefault();
      if(this.classList.contains('gallery-current')) {
        return;
      }
      for(let link of linksGallery) {
        if(link.classList.contains('gallery-current')) {
          link.classList.remove('gallery-current');
        }
      }
      this.classList.add('gallery-current');
      imgView.setAttribute('src', this.href);

    }

    for(let link of linksGallery) {
      link.addEventListener('click', select,false);
    }

    // Статус: сделал (где необходимо менять название товара, h2 ?)