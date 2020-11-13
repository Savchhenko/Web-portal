let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');

// разворачивание меню по клику на маленьких экранах
menuToggle.addEventListener('click', function (event) {
  event.preventDefault(); 
  menu.classList.toggle('visible');
});

const loginElem = document.querySelector('.login'),
  loginForm = document.querySelector('.login-form'),
  emailInput = document.querySelector('.login-email'),
  passwordInput = document.querySelector('.login-password'),
  loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user'),
  userNameElem = document.querySelector('.user-name');

const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;  //проверка на ввод почты при регистрации

const exitElem = document.querySelector('.exit');

  // массив хранит пользователей, где displayName это никнейм 
const listUsers = [
  {
    email: 'svchhh18@gmail.com',
    password: '12345',
    displayName: 'AlyaSun',
  },
  {
    email: 'bangzan@yandex.ru',
    password: '01012020',
    displayName: 'Serjio',
  },
  {
    email: 'prettyCat1@gmail.com',
    password: '9999',
    displayName: 'LunaBoss',
  }
];

// функция проверяет есть ли зарегистрированный пользователь, и если есть, то выводит его никнейм и фото, иначе выводит блок с авторизацией
const toggleAuthDom = () => {
  const user = setUsers.user;
  console.log('user: ', user);
  if(user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName; //записывается никнейм пользователя 
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
};

const setUsers = {
  user: null,
  //Авторизация
  logIn(email, password, handler) {  // handler - функция "действие" - это есть третий аргумент toggleAuthDom()
    // test - метод, который проверяет совпадение с регулярным выражением
    if(!regExpValidEmail.test(email)) return alert('email не валиден');  // return прерывает дальнейшее выполнение кода

    const user = this.getUser(email); // здесь this (контекст вызова) это объект setUsers, т.к метод logIn() вызывается у объекта setUsers (строка 90)
    if(user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с такими данными не найден');
    }
  },
  //Выход
  logOut(handler) {
    this.user = null;
    handler();
  },
  //Регистрация
  signUp(email, password, handler) {  
    if(!regExpValidEmail.test(email)) return alert('email не валиден');
    
    if(!email.trim() || !password.trim()) {
      alert('Введите данные');
      return;
    }

    if(!this.getUser(email)) {
      const nickName = email.split('@'); // разделили почту на никнейм и почтовый ящик
      const user = {email, password, displayName: `${nickName[0]}`};
      listUsers.push(user); 
      this.authorizedUser(user); // регистрация пользователя
      handler(); // замена блоков - toogleAuthDom
    } else {
      alert('Пользователь с таким email уже зарегистрирован');
    }
  },
  getUser(email) {
    return listUsers.find(item => item.email === email)
  },
  authorizedUser(user) {
    this.user = user;
  }
};

loginForm.addEventListener('submit', event => {
  event.preventDefault();
  setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
  loginForm.reset(); // очищение формы
});

loginSignup.addEventListener('click', event => {
  event.preventDefault();
  setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
  loginForm.reset();
});

exitElem.addEventListener('click', event => {
  event.preventDefault();
  setUsers.logOut(toggleAuthDom);
})

toggleAuthDom();







