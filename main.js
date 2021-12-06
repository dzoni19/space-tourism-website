'use strict';

const btn = document.querySelector('.menu-btn');

btn.addEventListener('click', () => {
  document.querySelector('.main-nav').classList.toggle('show');
  btn.classList.toggle('active');
});

// tab buttons
