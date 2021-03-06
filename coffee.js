"uses strict";
// alert( "coffee.js подключён" );
let state = "waiting";

let cupImg = document.querySelector( ".coffee-cup img" );
let progressBar = document.querySelector( ".progress-bar" );
cupImg.onclick = takeCoffee;
let balanceInput = document.querySelector("input[placeholder='Баланс']");
  

function buyCoffee( name, price, element ) {
  if ( state != "waiting" ) {
    return;
  }
  if ( +balanceInput.value < price ) {
    changeDisplayText( "Недостаточно средств" );
    balanceInput.style.border = "2px solid red";
  } else {
    balanceInput.value -= price; // Используем напрямую, без переменной
    balanceInput.style.border = "";
    state = "cooking";
    cookCoffee( name, element );
  }
}

function cookCoffee( name, buttonElement ) {
  changeDisplayText( "Ваш " + name + " готовится" );
  let buttonImg = buttonElement.querySelector( "img" );
  let cupSrc = buttonImg.getAttribute( 'src' );
  cupImg.setAttribute( 'src', cupSrc );
  cupImg.classList.remove( 'd-none' );
  
  let i = 0;
  let interval = setInterval( function() {
    i++;
    progressBar.style.width = i+"%"; // строка!
    cupImg.style.opacity = i/100; // 0..1
    cupImg.style.width   = i+"%"; // 0..100%
    if ( i == 100 ) {
      clearInterval( interval );
      changeDisplayText( "Ваш " + name + " готов!" );
      cupImg.style.cursor = "pointer";
      state = "ready";
    }
  }, 50 );
}

function takeCoffee() {
  if ( state != "ready" ) {
    return;
  }
  state = "waiting";
  cupImg.style.opacity = 0;
  cupImg.style.cursor = ""; // к прежнему значению
  cupImg.classList.add( "d-none" );
  changeDisplayText( "Выберите кофе" );
  progressBar.style.width = 0;
}

function changeDisplayText( text ) {
  let displayText = document.querySelector( '.display-text' );
  displayText.innerHTML = text;
}
// ---------- Купюры ----------------------------------------
// Раздел DragAndDrop

let bills = document.querySelectorAll( '.bills img' ); // нашли все купюры

for ( let i = 0; i < bills.length; i++ ) {
  bills[i].onmousedown = takeMoney;
  /*
  bills[i].onmousedown = function( event ) {
    takeMoney( event ); используется функция обёртки
  }  
  */
  }

function takeMoney() {
  // alert( "Вы  нажали на купюру" );
  //console.log( event );
  event.preventDefault(); // отключает стандартные события браузера
  // console.log( this );
  //console.log( event.target );
  let bill = event.target; // возращает элемент на который мы нажали
  
  bill.style.position  = "absolute"; // Вытягивает позицию из DOМ-дерева, чтобы не ехала вёрстка
  bill.style.transform = "rotate( 90deg )";
  bill.style.margin = 0; // убираем все отступы

  let billCoords = bill.getBoundingClientRect();
  //console.log( billCoords );
  let billWidth  = billCoords.width;  // ширина купюры
  let billHeight = billCoords.height; // высота купюры 
  // console.log ( event.clientX, event.clientY, billWidth, billHeight );
  // client.* не включает полосы прокрутки отражаю положение курсора на экране
  bill.style.top  = event.clientY - billWidth /2 + "px";
  bill.style.left = event.clientX - billHeight/2 + "px";
  
  window.onmousemove = function( event ) {  // отслеживаем движением  мышии на всём экране
    console.log( "Пролетела мышь!" );
    // глобальные переменные!
    bill.style.top  = event.clientY - billWidth /2 + "px"; 
    bill.style.left = event.clientX - billHeight/2 + "px";
  };

  bill.onmouseup = function() {
    window.onmousemove = null; // отменяем  привязку к курсору
    //console.log( inAtm( bill ) );
    if ( inAtm( bill ) ) {
      //console.log( + bill.getAttribute( 'cost') ); //из нового атрибута
      let billCost = +bill.getAttribute( "cost" );
      balanceInput.value = +balanceInput.value + billCost;
      bill.remove(); //удаляет элемент
    }
  }; 
}

function inAtm( bill ) {
  let atm = document.querySelector( '.atm img' );
  let atmCoords  =  atm.getBoundingClientRect();
  let billCoords = bill.getBoundingClientRect();
  
  let billLeftTopCorner  = { "x" : billCoords.top,                    "y" : billCoords.left }; // объекты
  let billRightTopCorner = { "x" : billCoords.top + billCoords.width, "y" : billCoords.left };

  let atmLeftTopCorner    = { "x" : atmCoords.top,                   "y" : atmCoords.left                      };
  let atmRightTopCorner   = { "x" : atmCoords.top + atmCoords.width, "y" : atmCoords.left                      };
  let atmLeftBottomCorner = { "x" : atmCoords.top,                   "y" : atmCoords.left + atmCoords.height/3 };
  
  if ( billLeftTopCorner.x  > atmLeftTopCorner.x
    && billRightTopCorner.x < atmRightTopCorner.x
    && billLeftTopCorner.y  > atmLeftTopCorner.y
    && billLeftTopCorner.y  < atmLeftBottomCorner.y ) {
    return true;
  } else {
    return false;
  }   
  //return [atmCoords, billCoords ];
  //return [ billLeftTopCorner, billRightTopCorner ];
  //return [ atmLeftTopCorner, atmRightTopCorner, atmLeftBottomCorner];
}

// Сдача
let changeButton = document.querySelector( ".change-btn" );
/*changeButton.onclick = function() {
  takeChange();
}*/
changeButton.onclick = takeChange; // без ()! - только при нажатии вызывается функция
                                   // func() - вызывается и исполняется тело функции сразу      
function takeChange() {
  tossCoin( "10" );
}
/*
function takeChange() {
  //alert( "Получите сдачу" );
  let changeBox = document.querySelector( ".change-box" );
  changeBox.innerHTML +=`
    <img src="img/10rub.png" style="width: 50px; height: 50px;" >
  `;  // inner изменяет внутренние содержимое между тэгами в HTML 
}     // обратные кавычки позволяет переносить строки и вписывать в строки перменные через $

*/
function tossCoin( cost ) {
  let changeBox = document.querySelector( ".change-box" );
  changeBox.style.position = "relative";
  
  let changeBoxCoords = changeBox.getBoundingClientRect(); // координаты
  let randomWidth  = getRandomInt( 0, changeBoxCoords.width  - 50 );
  let randomHeight = getRandomInt( 0, changeBoxCoords.height - 50 );
  //console.log(  randomWidth, randomHeight );
  let coin = document.createElement( "img" ); // указали тэг создаваемого элемента но в вакууме
  coin.setAttribute( 'src', 'img/10rub.png' );
  coin.style.width  = "50px";
  coin.style.height = "50px";
  changeBox.append(coin); // прикрепляем элемент в конец НЕ РАБОТАЕТ APPEND
  //changeBox.prepend(coin); // в начала
  //changeBox.before(coin); // перед
  //changeBox.after(coin); // после
  //changeBox.replacement(coin); // заменяет элемент
  coin.style.position = "absolute";
  coin.style.left = randomWidth  + "px";
  coin.style.top  = randomHeight + "px";
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}




