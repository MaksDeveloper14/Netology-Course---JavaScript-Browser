          const div = document.querySelector('#tabs');
          const section = div.querySelector('.tabs-content');
          const articles = section.getElementsByTagName('article');
          const ul = tabs.querySelector('.tabs-nav');
          const liCollection = ul.getElementsByTagName('li');
          
          // Добавление табов в html страницу
          for(let article of articles) {
            const demoTab = ul.children[0].cloneNode(true);
            let title = article.getAttribute('data-tab-title');
            let icon = article.getAttribute('data-tab-icon');
            demoTab.children[0].innerHTML = title;
            demoTab.children[0].classList.add(article.getAttribute('data-tab-icon'));            
            ul.appendChild(demoTab);
          }

           // Удаление demo 
          ul.removeChild(ul.children[0]);

          // Действие при загрузке документа
          function onDOMContentLoaded() {
            ul.children[0].classList.add('ui-tabs-active'); 
            // Делаем всем статьям скрытые - класс hidden
            // Если title у статьи равен this.innerHTML то удаляем у нее класс hidden
            for(let article of articles) {
              if(ul.children[0].children[0].innerHTML !== article.getAttribute('data-tab-title')) {
               article.classList.add('hidden');
              } else {
                article.classList.remove('hidden');
              }
            }
          }

          document.addEventListener('DOMContentLoaded', onDOMContentLoaded);


          function onClick() {
            
            for(let li of liCollection) {
              if(this === li) {
                this.classList.add('ui-tabs-active');
              } else {
                li.classList.remove('ui-tabs-active');
              }
            }
            // Делаем все статьи скрытыми при клике
            // Удаляем класс hidden у  статьи которой title равен this.innerHTML
            for(let article of articles) {
              if(this.children[0].innerHTML !== article.getAttribute('data-tab-title')) {
                article.classList.add('hidden');
              } else {
                article.classList.remove('hidden');
              }
            }
          }

          for(let li of liCollection) {
            li.addEventListener('click', onClick);
          }