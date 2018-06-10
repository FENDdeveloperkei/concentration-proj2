/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 /*Created with the help of Mike Wales https://www.youtube.com/watch?reload=9&reload=9&v=_rUH-sEs68Y&app=desktop*/

 const cards = ['fa-diamond', 'fa-diamond',
              'fa-paper-plane-o', 'fa-paper-plane-o',
              'fa-anchor', 'fa-anchor',
              'fa-bolt', 'fa-bolt',
              'fa-cube', 'fa-cube',
              'fa-leaf', 'fa-leaf',
              'fa-bicycle', 'fa-bicycle',
              'fa-bomb', 'fa-bomb'];
 
 //Returns HTML for each card
 function generateCard(card) {
   return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
 }
 /*loop each card and create its HTML & add each card's HTML to page*/

 // Shuffle function from http://stackoverflow.com/a/2450976
 function shuffle(array) {
   let currentIndex = array.length,
     temporaryValue,
     randomIndex;

   while (currentIndex !== 0) {
     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex -= 1;
     temporaryValue = array[currentIndex];
     array[currentIndex] = array[randomIndex];
     array[randomIndex] = temporaryValue;
   }

   return array;
 }
 /*If a card is clicked it will display the card symbol & if the cards do not match, remove the cards from the list & hide the card symbol*/

 //Passing in each card and turning it into an HTML string
 function initGame() {
   startTimer();
   let deck = document.querySelector('.deck');
   let cardHTML = shuffle(cards).map(function(card) {
     return generateCard(card);
   });

   deck.innerHTML = cardHTML.join('');

   let allCards = document.querySelectorAll('.card');
   let openCards = [];

 allCards.forEach(function(card) {
   card.addEventListener('click', function(e) {

     if (
       !card.classList.contains('open') &&
       !card.classList.contains('show') &&
       !card.classList.contains('match')
     ) {
       openCards.push(card);
       card.classList.add('open', 'show');

       if (openCards.length == 2) {
         moveCount();
         //When cards match leave facing up
         if (openCards[0].dataset.card == openCards[1].dataset.card) {
           openCards[0].classList.add('match');
           openCards[0].classList.add('open');
           openCards[0].classList.add('show');

           openCards[1].classList.add('match');
           openCards[1].classList.add('open');
           openCards[1].classList.add('show');

           openCards = [];

           winGame();
         } else {
           //When cards do not match flip back over
           setTimeout(function() {
             openCards.forEach(function(card) {
               card.classList.remove('open', 'show');
             });
             openCards = [];
           }, 1000);
         }
       }
     }
   });
 });
 //Timer resets
 let timer = document.querySelector('.timer');
 var timing;
 let second = 0;

 function startTimer() {
     timing = window.setInterval(function () {
           timer.innerHTML = second + " secs";
             second++;
         }, 1000);
 }

 function resetTimer() {
   clearInterval(timing);
 }

 document.querySelector('.restart').addEventListener('click', resetTimer);

 //Move counter
 let moves = 0;
 let moveCounter = document.querySelector('.moves');
 let stars = document.querySelector('.stars');
 let one = document.querySelector('.one');
 let two = document.querySelector('.two');

 function moveCount() {
   moves++;
   moveCounter.innerHTML = moves;
 //Remove stars based on move count
   if (moves > 12 && moves < 15) {
     one.style.visibility = 'hidden';
   }
   else if (moves > 17) {
     two.style.visibility = 'hidden';
   }
 }
 /*Model created with the help of https://www.w3schools.com/howto/howto_css_modals.asp
 */
 //When all cards match, change so that model is shown
 let matchedCards = document.getElementsByClassName('match');
 let model = document.querySelector('.model');
 let finalTime = document.querySelector('.finalTime');
 let finalRating = document.querySelector('.finalRating');
 let finalMoves = document.querySelector('.finalMoves');

 function winGame() {
   if (matchedCards.length === 16) {
     model.style.display = "block";
     finalRating.innerHTML = stars.innerHTML;
     finalMoves.innerHTML = moveCounter.innerHTML;
     finalTime.innerHTML = timer.innerHTML;
   }
 }
 //<span> element that closes the model
 let span = document.getElementsByClassName("close")[0];
 //User clicks on <span> (x) to close the model
 span.onclick = function() {
     model.style.display = "none";
 };
 //User clicks anywhere outside of model will close
 window.onclick = function(event) {
     if (event.target == model) {
         model.style.display = "none";
     }
 };
 //Play again button will clear model/reset timer
 document.querySelector('.button').addEventListener('click', playAgain);
 document.querySelector('.button').addEventListener('click', resetTimer);
 document.querySelector('.restart').addEventListener('click', playAgain);

 function playAgain() {
   model.style.display = "none";
   moveCounter.innerHTML = 0;
   one.style.visibility = 'visible';
   two.style.visibility = 'visible';
 }

 }

 initGame();
