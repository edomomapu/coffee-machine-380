"use strict"

// window.document.documentElement.body - полный вид document.body в console.log( document.body );
// Поиск элементов
// ------Устаравешие методы -------------------- 
/*let coffeeMachine = document.getElementById("coffee"); // Поиск по ID
console.log( coffeeMachine );
let images = document.getElementsByTagName("img"); // Поиск по тэгу
console.log( images );
let coffeeItems = document.getElementsByClassName( "coffee-item" ); // Поиск по классу
console.log ( coffeeItems );
let firstImage = coffeeItems[0].getElementsByTagName( "img" );
console.log( firstImage[0] );*/
// --------------------------------------------
// ------------- Современные методы -----------
/*let coffeeMachine = document.querySelector("#coffee"); // Поиск по id - стоит #
console.log( coffeeMachine );
let image = document.querySelector( "img" ); //Поиск по тэгу
console.log( image );
let coffeeItems = document.querySelectorAll( ".coffee-item"); // Поиск всех элементов класса 
console.log( coffeeItems );
let itemImages = document.querySelectorAll( ".coffee-item img" )
console.log( itemImages );
let cupImages = document.querySelectorAll( ".coffee-item img, .coffee-cup img" );
console.log( cupImages );
*/
// --------------------------------------------
// ---------- Работа с элементами -------------
//  Изменение CSS свойств
/*let coffeeMachine = document.querySelector( ".coffee-machine" );
coffeeMachine.style.border = "10px solid darkblue";
coffeeMachine.style.borderRadius = "25px";
coffeeMachine.style.position = "absolute";
coffeeMachine.style.top = "15px";
coffeeMachine.style.left = "150px";
let CoffeeMachineTop = coffeeMachine.style.top
console.log( parseInt( CoffeeMachineTop ) );*/
// Изменение аттрибутов
//let balance = document.querySelector( "input[type='text']" );
/*let balanceType = balance.getAttribute( "type" );
console.log( balanceType );
balance.setAttribute( "type", "date" );

console.log( balance.hasAttribute( "placeholder") );
balance.removeAttribute( "aria-label" );*/
/*balance.value = 500; // == balance.setAttribute( 'value', 500 )
console.log( balance.value );*/
// Изменение классов
/*let changeButton = document.querySelector( ".btn" );
console.log( changeButton.classList );
changeButton.classList.remove( "btn-primary" );
changeButton.classList.add(    "btn-success" );*/
//changeButton.classList.toggle("ml-5") // Вкл/Выкл

// Изменение содержимого элементов
/*let displayText = document.querySelector( ".display-text" );
console.log( displayText.innerHTML );
console.log( displayText.innerText );
//displayText.innerHTML = "<b>Готовим кофе</b>";
displayText.innerText = "<b>Готовим кофе</b>";*/

// События и слушатели событий

// Мышь click mouseover mouseup mousedown mousemove
// для input - focus change

// 1. С помощью аттрибута (они в HTML)

// this возвращает  объект к которому обращено свойство или обращён метод
//<div class="coffee-item" onclick="buyCoffee('Американо',50,this)">
// Тоже  самое что
/*  console.log( this ); // все начинается с window
  let elem = document.querySelectorAll( ".coffee-item" );
      elem[1].onclick = function() {
        buyCoffee( 'Американо', 50, this );
      };
*/
// -------------------- Планирование ---------
// тайм-аут
/*
setTimeout( function() {
  alert( "Тайм-аут отработал" );
}, 5000 ); // задерживаем исполнение функции на 5 секунды
*/
//setTimeout( paintBody(), 5000 ); // вызывается функция и сразу выполняется


/*
let timeout = setTimeout( paintBody, 5000, 'aqua' ); // вызывается код функции

let changeButton = document.querySelector( ".btn" );
changeButton.onclick = function() {
  clearTimeout( timeout ); // отмена тайм-аута
};
 
setTimeout( function() {
  paintBody();
}, 5000 );
это функция-обёртка - объявление, а не вызов функции

function paintBody( color ) {
  document.body.style.background = color;
}
*/


let interval = setInterval( trashConsole, 1000 );

let changeButton = document.querySelector( ".btn" );
changeButton.onclick = function() {
  clearInterval ( interval ); // отмена тайм-аута
};

function trashConsole() {
  console.log( Math.random() );
}














