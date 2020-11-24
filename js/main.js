// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC559uQ-l-Th0sbpmObS0AwrM4ggk7292I",
  authDomain: "pikadu-f288d.firebaseapp.com",
  databaseURL: "https://pikadu-f288d.firebaseio.com",
  projectId: "pikadu-f288d",
  storageBucket: "pikadu-f288d.appspot.com",
  messagingSenderId: "968530325679",
  appId: "1:968530325679:web:435370fee34efaf67fe45a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log(firebase);

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

const postsWrapper = document.querySelector('.posts'),
  buttonNewPost = document.querySelector('.button-new-post'),
  addPostElem = document.querySelector('.add-post');

const subscriptionsElem = document.querySelector('.subscriptions');

  // массив хранит пользователей, где displayName это никнейм 
const listUsers = [
  {
    email: 'svchhh18@gmail.com',
    password: '12345',
    displayName: 'AlyaSun',
    photo: 'https://avatars0.githubusercontent.com/u/47991015?s=460&u=d2c935aa3f105c9294acd1a6021e63ee44fac091&v=4',
  },
  {
    email: 'bangzan@yandex.ru',
    password: '01012020',
    displayName: 'Serjio',
    photo: 'https://manrule.ru/images/article/orig/2019/11/muzhskie-shlyapy-raznovidnosti-i-sovety-po-vyboru.jpg',
  },
  {
    email: 'prettyCat1@gmail.com',
    password: '9999',
    displayName: 'LunaBoss',
    photo: 'https://zagge.ru/wp-content/uploads/2019/06/aHR0cDovL3d3dy5saXZlc2N.jpg',
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
    buttonNewPost.classList.add('visible');
    subscriptionsElem.style.display = 'flex';
    
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    buttonNewPost.classList.remove('visible');
    addPostElem.classList.remove('visible');
    postsWrapper.classList.add('visible');
    subscriptionsElem.style.display = 'none';
  }
};

const showAddPost = () => {
  addPostElem.classList.add('visible');
  postsWrapper.classList.remove('visible');
}

const setUsers = {
  user: null,
  // handler замкнется в этом слушателе
  initUser(handler) {
    // метод auth() возвращает объект; onAuthStateChanged - это слушатель
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.user = user;
      } else {
        this.user = null;
      }
      if(handler) {handler();}
    })
  },
  //Авторизация
  logIn(email, password, handler) {  // handler - функция "действие" - это есть третий аргумент toggleAuthDom()
    // test - метод, который проверяет совпадение с регулярным выражением
    if(!regExpValidEmail.test(email)) return alert('email не валиден');  // return прерывает дальнейшее выполнение кода

  firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
    const errCode = err.code;
        const errMessage = err.message;
        if(errCode === 'auth/wrong-password') {
          console.log(errMessage);
          alert('Неверный пароль');
        } else if(errCode === 'auth/user-not-found') {
          console.log(errMessage);
          alert('Пользователь не найден');
        } else {
          alert(errMessage);
        }

        console.log(err);
  });

    // const user = this.getUser(email); // здесь this (контекст вызова) это объект setUsers, т.к метод logIn() вызывается у объекта setUsers (строка 90)
    // if(user && user.password === password) {
    //   this.authorizedUser(user);
    //   handler();
    // } else {
    //   alert('Пользователь с такими данными не найден');
    // }
  },
  //Выход
  logOut(handler) {
    firebase.auth().signOut();

    // if(handler) {
    //   handler();
    // }
  },
  //Регистрация
  signUp(email, password, handler) {  
    if(!regExpValidEmail.test(email)) return alert('email не валиден');
    
    if(!email.trim() || !password.trim()) {
      alert('Введите данные');
      return;
    }

    // метод возвращает promise
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(data => {
        console.log(data);
      }) //сработает в случае успеха
      .catch(err => {
        const errCode = err.code;
        const errMessage = err.message;
        if(errCode === 'auth/weak-password') {
          console.log(errMessage);
          alert('Слабый пароль');
        } else if(errCode === 'auth/email-already-in-use') {
          console.log(errMessage);
          alert('Этот email уже используется');
        } else {
          alert(errMessage);
        }

        console.log(err);
      }); //сработает в случае ошибки

    // if(!this.getUser(email)) {
    //   const user = {email, password, displayName: email.substring(0, email.indexOf('@'))};
    //   listUsers.push(user); 
    //   this.authorizedUser(user); // регистрация пользователя
    //   if(handler) { 
    //     handler(); // замена блоков - toogleAuthDom
    //   } 
    // } else {
    //   alert('Пользователь с таким email уже зарегистрирован');
    // }
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
    if(handler) {
      handler();
    }
  }
};

const setPosts = {
  allPosts: [
    {
      title: "Заголовок поста",
      text: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!",
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
      author: {displayName: 'Alya', photo: 'https://avatars0.githubusercontent.com/u/47991015?s=460&u=d2c935aa3f105c9294acd1a6021e63ee44fac091&v=4'},
      date: '13.11.2020, 20:54:00',
      like: 21,
      comments: 6,
    },
    {
      title: "Заголовок поста 2",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, atque! Laborum officiis molestiae accusamus placeat nulla optio corporis, explicabo voluptatum itaque, veniam deleniti eum dolores, cum hic adipisci facilis sapiente. Debitis quo accusamus, cupiditate nisi aliquid, impedit necessitatibus assumenda rerum iusto saepe harum totam nulla sint soluta deleniti possimus. Beatae, culpa. Cumque corporis aliquid quaerat quasi numquam quae ullam rem!",
      tags: ['свежее', 'новое', 'горячее', 'мое'],
      author: {displayName: 'Serjio', photo: 'https://manrule.ru/images/article/orig/2019/11/muzhskie-shlyapy-raznovidnosti-i-sovety-po-vyboru.jpg'},
      date: '11.11.2020, 11:34:10',
      like: 30,
      comments: 2,
    },
    {
      title: "Заголовок поста 3",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, atque! Laborum officiis molestiae accusamus placeat nulla optio corporis, explicabo voluptatum itaque, veniam deleniti eum dolores, cum hic adipisci facilis sapiente. Debitis quo accusamus, cupiditate nisi aliquid, impedit necessitatibus assumenda rerum iusto saepe harum totam nulla sint soluta deleniti possimus. Beatae, culpa. Cumque corporis aliquid quaerat quasi numquam quae ullam rem!",
      tags: ['новое', 'горячее', 'мое'],
      author: {displayName: 'Marshak', photo: 'https://i02.fotocdn.net/s119/4a80fa2306c38236/user_xl/2713652014.jpg'},
      date: '8.11.2020, 10:05:19',
      like: 39,
      comments: 11,
    }
  ],
  addPost(title, text, tags, handler) {
    this.allPosts.unshift({
      title,
      text,
      tags: tags.split(',').map(item => item.trim()), // разбили строку на отдельные элементы и удалили пробелы
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photo,
      },
      date: new Date().toLocaleString(),
      like: 0,
      comments: 0,
    });
    // проверка на наличие call-back функции
    // защита на случай, если нужно выполнить действие, но не вызывать функцию
    if(handler) {
      handler();
    }
  }
};

const showAllPosts = () => {
  let postsHTML = '';
  setPosts.allPosts.forEach(({ title, text, tags, like, comments, author, date }) => {
    /* Пример деструктуризации:
      const { title, text, tags, like, comments, author, date } = post; */
    postsHTML += `
        <section class="post">
        <div class="post-body">
          <h2 class="post-title">${title}</h2>
          <p class="post-text">${text}</p>
          <div class="tags">
            ${tags.map(tag => `<a href="#${tag}" class="tag">#${tag}</a>`)}
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
              <a href="#" class="author-username">${author.displayName}</a>
              <span class="post-time">${date}</span>
            </div>
            <a href="#" class="author-link"><img src=${author.photo || "img/Grizzly.png"} alt="avatar" class="author-avatar"></a>
          </div>
        </div>
      </section>
    `;
  });
  postsWrapper.innerHTML = postsHTML;
  addPostElem.classList.remove('visible');
  postsWrapper.classList.add('visible');
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
    loginForm.reset(); // очистка формы
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

  buttonNewPost.addEventListener('click', event => {
    event.preventDefault();
    showAddPost();
  })

  addPostElem.addEventListener('submit', event => {
    event.preventDefault();
    //деструктуризация по имени (имя берется из значения атрибута name в форме):
    const { title, text, tags } = addPostElem.elements; // получили псевдо-массив
    console.log( title, text, tags );
    
    if(title.value.length < 6) {
      alert('Слишком короткий заголовок');
      return;
    }
    if(text.value.length < 50) {
      alert('Слишком короткий пост');
      return;
    }

    setPosts.addPost(title.value, text.value, tags.value, showAllPosts);
    
    addPostElem.classList.remove('visible');
    addPostElem.reset();
  })

  setUsers.initUser(toggleAuthDom);
  showAllPosts();
}

document.addEventListener('DOMContentLoaded', init);









