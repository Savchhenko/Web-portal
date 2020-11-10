let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
})

// 1. Скроем sidebar авторизированного пользователя и аватарку пользователя (.sidebar-nav {display:none})
// 2. Добавили на странице модуль с авторизацией <div class="login"></div>