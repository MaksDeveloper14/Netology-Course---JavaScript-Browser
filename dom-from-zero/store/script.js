'use strict';
/******************************
 * Ваша реализация функции
 *****************************/
// найденное решение



// создаем элемент
// если в node свойства class не равно null , тогда присваиваем этот класс элементу

// проходим циклом по node.childs 
// создаем элемент-потомок
// если у элемента потомка props не равно null  тогда присваиваем элементу потомку свойство class

function createElement(node) {
  let element = document.createElement(node.name);
  if (node.props.class !== null) {
    element.className = node.props.class;
  }
  for (let child of node.childs) {
    let element_child = document.createElement(child.name);
    if (child.props !== null) {
      element_child.className = child.props.class;
    }
    if (typeof child.childs[0] === 'string') {
      element_child.textContent = child.childs[0];
    } else {
      for (let child2 of child.childs) {
        let element_child2 = document.createElement(child2.name);
        if (child2.props !== null){
          element_child2.className = child2.props.class;
        }
        if (!child2.childs[1]) {
          element_child2.textContent = child2.childs[0];
        } else{
          element_child2.textContent = child2.childs[0] + child2.childs[1];
        }
        element_child.appendChild(element_child2);
      }
    }
    element.appendChild(element_child);
  }
  return element;
}


/******************************
 * Не вносить изменния ниже
 ******************************/

const e = (name, props, ...childs) => ({name, props, childs});

const item = {
  brand: 'Tiger of Sweden',
  title: 'Leonard coat',
  description: 'Minimalistic coat in cotton-blend',
  descriptionFull: 'Men\'s minimalistic overcoat in cotton-blend. Features a stand-up collar, concealed front closure and single back vent. Slim fit with clean, straight shape. Above-knee length.',
  price: 399,
  currency: '£'
};

const content = e(
  'div',
  { 'class': 'main-content' },
  e('h2', null, item.brand),
  e('h1', null, item.title),
  e('h3', null, item.description),
  e('div', { 'class': 'description' }, item.descriptionFull),
  e(
    'div',
    { 'class': 'highlight-window  mobile' },
    e('div', { 'class': 'highlight-overlay' })
  ),
  e('div', { 'class': 'divider' }),
  e(
    'div',
    { 'class': 'purchase-info' },
    e(
      'div',
      { 'class': 'price' },
      item.currency,
      item.price.toFixed(2)
    ),
    e('button', null, 'Добавить в корзину')
  )
);

const wrapper = document.getElementById('root');
wrapper.appendChild(createElement(content));