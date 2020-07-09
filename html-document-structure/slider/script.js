          // Задача 1

          const slider = document.querySelector('.slider');
          const slides = slider.querySelector('.slides');
          const liCollection = slides.getElementsByTagName('li');
          const navigation = slider.querySelector('.slider-nav');
          const linksNavigation = navigation.getElementsByTagName('a');

          var prev = linksNavigation[0];
          var next = linksNavigation[1];
          var first = linksNavigation[2];
          var last = linksNavigation[3];

          function onClick() {
          var cls = 'slide-current';
          // Удаляем у предыдущего li класс с картинкой и присваиваем другому в зависимости от клика по какой кнопке
            function getLiremoveClass(cls) {
              for(let li of liCollection) {
                if(li.classList.contains(cls)) {
                  li.classList.remove(cls);
                  return li;
                }
              }
            }
            if(this === prev) {
              let li = getLiremoveClass(cls);
              li.previousElementSibling.classList.add(cls);
            } else if(this === next) {
              let li = getLiremoveClass(cls);
              li.nextElementSibling.classList.add(cls);
            } else if(this === first) {
              let li = getLiremoveClass(cls);
              liCollection[0].classList.add(cls);
            } else if(this === last) {
              let li = getLiremoveClass(cls);
              liCollection[liCollection.length - 1].classList.add(cls); 
            }
            // Условие блокировки кнопок
            if(slides.firstElementChild.classList.contains('slide-current')) {
            prev.classList.add('disabled');
            prev.removeEventListener('click', onClick);
            first.classList.add('disabled');
            first.removeEventListener('click', onClick);
           } else {
             prev.classList.remove('disabled');
             prev.addEventListener('click', onClick);
             first.classList.remove('disabled');
             first.addEventListener('click', onClick);
          }
          if(slides.lastElementChild.classList.contains('slide-current')) {
            next.classList.add('disabled');
            next.removeEventListener('click', onClick);
            last.classList.add('disabled');
            last.removeEventListener('click', onClick);
          } else {
            next.classList.remove('disabled');
            next.addEventListener('click', onClick);
            last.classList.remove('disabled');
            last.addEventListener('click', onClick);
          }
          }

        
          for(let navigation of linksNavigation) {
            navigation.addEventListener('click', onClick);
          }


          // Показываем первую картинку при загрузке страницы и блокируем кнопку назад
          function onDOMContentLoaded() {
            slides.firstElementChild.classList.add('slide-current');
            prev.classList.add('disabled');
            prev.removeEventListener('click', onClick);
            first.classList.add('disabled');
            first.removeEventListener('click', onClick);
          } 

          document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

        