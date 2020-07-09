'use strict';

// Задача 1

// вставляем комментарии
function createComments(comment) {
  // создаем все нужные элементы
  const commentWrap = document.createElement('div');
  commentWrap.classList.add('comment-wrap');
  const photo = document.createElement('div');
  photo.classList.add('photo');
  photo.setAttribute('title', `${comment.author.name}`);
  const avatar = document.createElement('div');
  avatar.classList.add('avatar');
  avatar.setAttribute('style', `background-image: url(${comment.author.pic}`);
  const commentBlock = document.createElement('div');
  commentBlock.classList.add('comment-block');
  const commentText = document.createElement('p');
  commentText.classList.add('comment-text');
  commentText.innerText = `${comment.text.split('\n').join('<br>')}`;
  const bottomComment = document.createElement('div');
  bottomComment.classList.add('bottom-comment');
  const commentDate = document.createElement('div');
  commentDate.innerText = `${new Date(comment.date).toLocaleString('ru-Ru')}`;
  const commentActions = document.createElement('ul');
  commentActions.classList.add('comment-actions');
  const complain = document.createElement('li');
  complain.classList.add('complain');
  complain.innerText = 'Пожаловаться';
  const reply = document.createElement('li');
  reply.classList.add('reply');
  reply.innerText = 'Ответить';

  // создаем структуру
  photo.appendChild(avatar);
  commentBlock.appendChild(commentText);
  commentBlock.appendChild(bottomComment);
  bottomComment.appendChild(commentDate);
  bottomComment.appendChild(commentActions);
  commentActions.appendChild(complain);
  commentActions.appendChild(reply);
  commentWrap.appendChild(photo);
  commentWrap.appendChild(commentBlock);
  // возвращаем commentWrap
  return commentWrap;
}

function showComments(list) {
  const comments = document.querySelector('.comments');  // Контейнейр комментарии
  const commentNodes = list.map(createComments);
  commentNodes.forEach((commentNode) => {
    comments.appendChild(commentNode);
  });
}

// запрос
fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);

// Статус: сделал