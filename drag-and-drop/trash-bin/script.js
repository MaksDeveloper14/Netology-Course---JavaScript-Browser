			const hale = document.querySelectorAll('.logo');
			const basket = document.getElementById('trash_bin');
			basketBox = basket.getBoundingClientRect();
 			let styleCss = getComputedStyle(document.querySelector('.logo'));
 			let move = false;
			// реализация переноса без drag drop
		
			for(let elem of hale) {
				elem.onmousedown = function() {
					console.log('Включили перемещение, можно перемещать');
					// elem.classList.add('moving');
					document.onmousemove = function(e) {
						e.preventDefault();
						move = true;
						elem.style.left = e.clientX - parseInt(styleCss.width) / 2 + 'px';
						elem.style.top = e.clientY - parseInt(styleCss.height) / 2 + 'px';
					}
				}

				elem.onmouseup = function(e) {	
					console.log('Перемещение отключено');
					document.onmousemove = null;
						if(move) {
							// оставляем на координатах мыши
							elem.style.left = e.clientX - parseInt(styleCss.width) / 2 + 'px';
							elem.style.top = e.clientY - parseInt(styleCss.height) / 2 + 'px';
						}
        	move = false;
        	elem.classList.remove('moving');
        	// удалить элемент при помещении в корзину
        	if(elem.getBoundingClientRect().top > basketBox.top && elem.getBoundingClientRect().bottom < basketBox.bottom + parseInt(getComputedStyle(basket).width) && elem.getBoundingClientRect().left > basketBox.left && elem.getBoundingClientRect().right < basketBox.right) {
						elem.setAttribute('style', 'display: none');
					}
				}
			}


			// Статус: сделал 
			// Почему ломается код при помещении последнего в корзину?