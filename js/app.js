const inputSearchContact = document.querySelector('.container .aside .header .section-input .input-box .input');
document.querySelector('html body div.container div.aside div.contacts').scrollTop = 0;

const formulario = document.querySelector('html body div.container div.aside div.section-input div.input-box input.input');
const total = document.querySelectorAll('html body div.container div.aside div.contacts div.contact');
formulario.addEventListener('input', filtrar);

const sendMessageInput = document.querySelector('html body div.container div.messages div.send-message div.section-input input#input.input');
sendMessageInput.addEventListener('keypress', sendMessage);
const btnSendMessage = document.querySelector('html body div.container div.messages div.send-message div.icons.r i#btn-send.far.fa-paper-plane');
btnSendMessage.addEventListener('click', () => {
  sendMessage({key: "Enter"});
});

document.querySelector('#btn-menu').addEventListener('click', () => {
  document.querySelector('html body div.container div.aside').classList.toggle('visibility-menu');
  document.querySelector('html body div.container div.messages').classList.toggle('user-select-none');
});

document.querySelectorAll('.container .aside .state > div').forEach((e) => {
  e.addEventListener('click', () => {
    document.querySelectorAll('.container .aside .state > div').forEach((e2) => {
      e2.classList.remove('active');
    });

    e.classList.add('active');
  });
});

const contacts = document.querySelectorAll('.contact');
contacts.forEach((e) => {e.addEventListener('click', () => {
  applyContactActive(e);
})});

function filtrar() {
  var busqueda = formulario.value.toLowerCase();

  if (busqueda == " " || busqueda == "") {
    total.forEach((e) => {
      e.style.display = "flex";
    });
    formulario.value = "";
  }
  else {
    total.forEach((e) => {
      e.style.display = "none";
      const tag = e.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.textContent.toLowerCase();

      if (tag.includes(busqueda) === true) {
        e.style.display = "flex";
      }
    });

    var ninguno = 0;

    total.forEach((e) => {
      if (e.style.display == "flex") {
        ninguno++;
      }
    });

    if (ninguno === 0) {
      document.querySelector('.not').classList.add('active');
    }
    else {
      document.querySelector('.not').classList.remove('active');
    }
  }
}

function sendMessage(e) {
  if(e.key === "Enter") {
    const message = document.querySelector('html body div.container div.messages div.send-message div.section-input input#input.input').value;
    const messagesDiv = document.querySelector('html body div.container div.messages div.content div.messages-content');
    sendMessageInput.value = "";

    const newMessage = document.createElement('div');
    newMessage.className = "message r ee";

    const newMessageContent = document.createElement('div');
    newMessageContent.classList = "message-content";

    const pAuthor = document.createElement('p');
    pAuthor.className = "author"; pAuthor.id = 'author';
    pAuthor.textContent = "Tú";

    const pMessage = document.createElement('p');
    pMessage.className = "text"; pMessage.id = 'text';
    pMessage.textContent = message;

    const pDay = document.createElement('p');
    pDay.className = "day"; pDay.id = 'day';
    pDay.textContent = "12:00";

    const divTicks = document.createElement('div');
    divTicks.className = "ticks";

    const tickOne = document.createElement('i');
    tickOne.className = "fas fa-check"; tickOne.id = "tick";

    const tickTwo = document.createElement('i');
    tickTwo.className = "fas fa-check"; tickTwo.id = "tick";

    divTicks.appendChild(tickOne);
    divTicks.appendChild(tickTwo)

    newMessageContent.appendChild(pAuthor);
    newMessageContent.appendChild(pMessage);
    newMessageContent.appendChild(pDay);
    newMessageContent.appendChild(divTicks);

    newMessage.appendChild(newMessageContent);
    messagesDiv.appendChild(newMessage);

    ultimateMessage(message,false);
    answer(message);
    firstDivActive();
  }

  actualizarScroll();
}

function actualizarScroll() {
  var contentDiv = document.querySelector('html body div.container div.messages div.content');
  contentDiv.scrollTop = contentDiv.scrollHeight;
}

function answer(t) {
  const possibleAnswers = [
    {
      q:["hola", "que tal", "holis", "holanda", "hello"],
      a:['Hola','Hola como te va','Buenas buenaaaas']
    },
    {
      q:["como estas", "como va", "todo bien", "que onda", "como andas"],
      a:["Bien, programando", "Mal. Quiero empanadas", "Bien mirando Netflix"]
    },
    {
      q:["quien te creo", "tu creador", "creador", "tiktok"],
      a:["Mi creador es Flinch, y su tiktok es: @flinchtuber23"]
    },
    {
      q:["jajaja", "jaja", "jajaja"],
      a:["De que te reís, queres piñampanadas?", "Contale el chiste a tu clase asi se rien todos", "De que te reis?", "Pensas que es gracioso, pelotudo?"]
    },
    {
      q:["caca"],
      a:["Rica"]
    },
    {
      q:["contame un chiste", "decime un chiste", "chiste", "dame un chiste", "cuentame un chiste"],
      a:["¿Qué le dice un pato al otro? \n Estamos empatados"]
    },
    {
      q:["mensaje secreto", "cual es el mensaje secreto"],
      a:["Que si te gustó el video, dale like, comparti enlace y mira mis otros 2 videos anteriores de programación!"]
    }
  ];

  var answer;

  possibleAnswers.forEach((e) => {
    const question = e.q;
    const answers = e.a;

    var haveQuestion = false;
    var questionC;

    question.forEach((q) => {
      if(q.toLowerCase() === t.toLowerCase()){
        haveQuestion = true;
        questionC = q;
      }
    });

    if(haveQuestion){
      answer = answers[randomNum(0,answers.length-1)];
    }
  });

  if(answer != undefined) {
    const messagesDiv = document.querySelector('html body div.container div.messages div.content div.messages-content');

    const newMessage = document.createElement('div');
    newMessage.className = "message l rr";

    const newMessageContent = document.createElement('div');
    newMessageContent.classList = "message-content";

    const pAuthor = document.createElement('p');
    pAuthor.className = "author"; pAuthor.id = 'author';
    pAuthor.textContent = document.querySelector('html body div.container div.aside div.contacts div.contact.active').firstElementChild.nextElementSibling.firstElementChild.firstElementChild.textContent;

    const pMessage = document.createElement('p');
    pMessage.className = "text"; pMessage.id = 'text';
    pMessage.textContent = `${answer}`;

    const pDay = document.createElement('p');
    pDay.className = "day"; pDay.id = 'day';
    pDay.textContent = "12:00";

    newMessageContent.appendChild(pAuthor);
    newMessageContent.appendChild(pMessage);
    newMessageContent.appendChild(pDay);

    newMessage.appendChild(newMessageContent);
    setTimeout(() => {
      ultimateMessage(answer,true);
      messagesDiv.appendChild(newMessage);
      actualizarScroll();
    },1000);
  }
}

function randomNum(a,b) {
  return Math.round(Math.random()*(b-a)+parseInt(a));
}

function firstDivActive() {
  const contacts = document.querySelectorAll('.contact');
  var contactsArchived = [...contacts];
  const contactActive = document.querySelector('.contact.active');
  const parent = document.querySelector('.contacts');

  contacts.forEach((e) => {
    parent.removeChild(e);
  });

  parent.appendChild(contactActive);
  contactsArchived.forEach((e) => {
    if(e.className != "contact active"){
      parent.appendChild(e);
    }
  });
}

function applyContactActive(e) {
  reset();
  const contacts = document.querySelectorAll('.contact');
  contacts.forEach((evt) => {evt.className = 'contact'});

  e.classList.add('active');

  const messages = document.querySelectorAll('html body div.container div.messages div.content div.messages-content div.message');

  messages.forEach((e) => {
    const parent = e.parentNode;
    parent.removeChild(e);
  });

  if(window.innerWidth <= 620){
    document.querySelector('html body div.container div.aside').classList.toggle('visibility-menu');
    document.querySelector('html body div.container div.messages').classList.toggle('user-select-none');
  }
  updateNickContact();
}

function ultimateMessage(m,isRobot) {
  const active = document.querySelector('.contact.active');
  active.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.textContent = m;
  if(isRobot){
    const nick = active.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.textContent + ":";
    const toChange = active.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.firstElementChild;
    toChange.textContent = nick;
  }
  else {
    const nick = 'Tú:';
    const toChange = active.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.firstElementChild;
    toChange.textContent = nick;
  }
}

function updateNickContact() {
  const active = document.querySelector('.contact.active');
  var nick = active.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.textContent + ":";
  nick = nick.slice(0,(nick.indexOf(':')));
  document.querySelector('html body div.container div.messages div.header div.profile div.text h3').textContent = nick;
}

function reset() {
  document.querySelectorAll('#message-ultimate').forEach((e) => {
    e.textContent = "";
  });

  document.querySelectorAll('#nick-contact').forEach((e) => {
    e.textContent = "";
  });
}

reset();