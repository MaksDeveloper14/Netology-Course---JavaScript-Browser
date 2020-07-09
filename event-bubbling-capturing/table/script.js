function sortTable(prop, dir) {
  data.sort((a, b) => {
      return a[prop] > b[prop] ? dir : -dir;
    })
    .forEach((item, i) => {
      item.el.style.order = i + 1;
      item.el.classList.remove('odd');
      item.el.classList.remove('even');
      item.el.classList.add(i % 2 ? 'odd' : 'even');
    });
}

function handleTableClick(event) {
if(event.target.getAttribute('data-dir') != 1) {
    event.target.setAttribute('data-dir', 1);
    event.currentTarget.setAttribute('data-sort-by', event.target.getAttribute('data-prop-name'));
  } else {
    event.target.setAttribute('data-dir', -1);
    event.currentTarget.setAttribute('data-sort-by', event.target.getAttribute('data-prop-name'));
  }
  sortTable(event.currentTarget.getAttribute('data-sort-by'), event.target.getAttribute('data-dir'));
}

/********************************
 * Не менять код ниже           *
 ********************************/

const table = document.querySelector('table');
table.addEventListener('click', handleTableClick);