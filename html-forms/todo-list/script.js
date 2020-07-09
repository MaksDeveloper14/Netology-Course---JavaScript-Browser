const toDoList = document.getElementsByClassName('list-block')[0];
        const liCollection = toDoList.getElementsByTagName('li');
        const output = toDoList.getElementsByTagName('output')[0];
        var items = toDoList.getElementsByTagName('ul')[0].getElementsByTagName('li');
        var count = 1;

        function manipulationChecked() {
          if(this.previousElementSibling.hasAttribute('checked')) {
            this.previousElementSibling.removeAttribute('checked');
          } else {
            this.previousElementSibling.setAttribute('checked', 'checked');
          }
          if(this.previousElementSibling.hasAttribute('checked')) {
            count += 1;
          } else {
            count -= 1;
          }
        }

        function showInfo() {
          output.value = `${count} из ${items.length}`;
          if(count === items.length) {
            toDoList.classList.add('complete');
          }
        }

        for(let item of items) {
          item.getElementsByTagName('label')[0].addEventListener('click', manipulationChecked);
          item.getElementsByTagName('label')[0].addEventListener('click', showInfo);
        }

        output.value = `${count} из ${items.length}`;




