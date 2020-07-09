         const toDoList = document.querySelector('.todo-list');
          const done = toDoList.querySelector('.done');
          const undone = toDoList.querySelector('.undone');
          const labelCollection =  toDoList.getElementsByTagName('label');

          function onClick() {
            if(this.hasAttribute('checked')) {
              this.removeAttribute('checked');
              undone.appendChild(this.parentNode);
            } else {
              this.setAttribute('checked', 'checked');
              done.appendChild(this.parentNode);
            }
          }
      
          for(let label of labelCollection) {
            label.children[0].addEventListener('click', onClick);
          }
