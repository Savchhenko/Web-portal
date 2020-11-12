let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');

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
  logIn(email, password, handler) {
    const user = this.getUser(email);
    if(user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с такими данными не найден');
    }
  },
  logOut() {
    console.log('Выход');
  },
  signUp(email, password, handler) {  // handler - функция "действие" - это есть третий аргумент toggleAuthDom()
    if(!this.getUser(email)) {
      const user = {email, password, displayName: email};
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
});

loginSignup.addEventListener('click', event => {
  event.preventDefault();
  setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
});

toggleAuthDom();







