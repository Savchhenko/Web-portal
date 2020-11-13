let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');

const loginElem = document.querySelector('.login'),
  loginForm = document.querySelector('.login-form'),
  emailInput = document.querySelector('.login-email'),
  passwordInput = document.querySelector('.login-password'),
  loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user'),
  userNameElem = document.querySelector('.user-name');

const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;  //проверка на ввод почты при регистрации

const exitElem = document.querySelector('.exit'),
  editElem = document.querySelector('.edit'),
  editContainer = document.querySelector('.edit-container'),
  editUsername = document.querySelector('.edit-username'),
  editPhotoURL = document.querySelector('.edit-photo'),
  userAvatarElem = document.querySelector('.user-avatar');

const postsWrapper = document.querySelector('.posts');


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

// callback функция
// проверяет есть ли зарегистрированный пользователь, и если есть, то выводит его никнейм и фото, иначе выводит блок с авторизацией
const toggleAuthDom = () => {
  const user = setUsers.user;
  if(user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName; //записывается никнейм пользователя 
    userAvatarElem.src = user.photo ? user.photo : userAvatarElem.src;
  /*userAvatarElem.src = user.photo || userAvatarElem.src;  - второй вариант*/
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
      const user = {email, password, displayName: email.substring(0, email.indexOf('@'))};
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
  },
  editUser(userName, userPhoto, handler) {
    if(userName) {
      this.user.displayName = userName;
    }
    if(userPhoto) {
      this.user.photo = userPhoto;
    } 
    handler();
  }
};

const setPosts = {
  allPosts: [
    {
      title: "Заголовок поста",
      text: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!",
      tags: ['#свежее', '#новое', '#горячее', '#мое', '#случайность'],
      author: 'svchhh18@gmail.com',
      date: '11.11.2020, 20:54:00',
      like: 21,
      comments: 6,
    },
    {
      title: "Заголовок поста 2",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, atque! Laborum officiis molestiae accusamus placeat nulla optio corporis, explicabo voluptatum itaque, veniam deleniti eum dolores, cum hic adipisci facilis sapiente. Debitis quo accusamus, cupiditate nisi aliquid, impedit necessitatibus assumenda rerum iusto saepe harum totam nulla sint soluta deleniti possimus. Beatae, culpa. Cumque corporis aliquid quaerat quasi numquam quae ullam rem!",
      tags: ['#свежее', '#новое', '#горячее', '#мое'],
      author: 'prettyCat1@gmail.com',
      date: '13.11.2020, 11:34:10',
      like: 9,
      comments: 1,
    }
  ],
};

const showAllPosts = () => {

  let postsHTML = '';

  setPosts.allPosts.forEach(post => {

    // Пример деструктуризации:
    const { title, text, tags, like, comments, author, date } = post;

    postsHTML += `
        <section class="post">
        <div class="post-body">
          <h2 class="post-title">${title}</h2>
          <p class="post-text">${text}</p>
          <div class="tags">
            <a href="#" class="tag"> ${tags} </a>
          </div>
        </div>
        <div class="post-footer">
          <div class="post-buttons">
            <button class="post-button likes">
              <svg width="19" height="20" class="icon icon-like">
                <use xlink:href="img/icons.svg#like"></use>
              </svg>
              <span class="likes-counter">${like}</span>
            </button>
            <button class="post-button comments">
              <svg width="21" height="21" class="icon icon-comment">
                <use xlink:href="img/icons.svg#comment"></use>
              </svg>
              <span class="comments-counter">${comments}</span>
            </button>
            <button class="post-button save">
              <svg width="19" height="19" class="icon icon-save">
                <use xlink:href="img/icons.svg#save"></use>
              </svg>
            </button>
            <button class="post-button share">
              <svg width="17" height="19" class="icon icon-share">
                <use xlink:href="img/icons.svg#share"></use>
              </svg>
            </button>
          </div>
          <div class="post-author">
            <div class="author-about">
              <a href="#" class="author-username">${author.substring(0, author.indexOf('@'))}</a>
              <span class="post-time">${date}</span>
            </div>
            <a href="#" class="author-link"><img src="img/Grizzly.png" alt="avatar" class="author-avatar"></a>
          </div>
        </div>
      </section>
    `
  });

  postsWrapper.innerHTML = postsHTML;

}

const init = () => {
  // разворачивание меню по клику на маленьких экранах
  menuToggle.addEventListener('click', function (event) {
  event.preventDefault(); 
  menu.classList.toggle('visible');
  });

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
  });
  
  editElem.addEventListener('click', event => {
    event.preventDefault();
    editContainer.classList.toggle('visible');
    editUsername.value = setUsers.user.displayName;
  });
  
  editContainer.addEventListener('submit', event => {
    event.preventDefault();
    setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom);
    editContainer.classList.remove('visible');
  });

  showAllPosts();
  toggleAuthDom();
}

document.addEventListener('DOMContentLoaded', init);









