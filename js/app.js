/*Create a list that holds all of your cards*/

/*Display the cards on the page -shuffle the list of cards using the provided "shuffle" method below
 -loop through each card and create its HTML -add each card's HTML to the page*/

/*Created with the help of Mike Wales https://www.youtube.com/watch?reload=9&reload=9&v=_rUH-sEs68Y&app=desktop*/

var cardList = ['fa-diamond', 'fa-diamond', 
								'fa-paper-plane-o', 'fa-paper-plane-o',
								'fa-anchor', 'fa-anchor', 
								'fa-bolt', 'fa-bolt',
								'fa-cube', 'fa-cube', 
								'fa-leaf', 'fa-leaf',
								'fa-bicycle', 'fa-bicycle', 
								'fa-bomb', 'fa-bomb',
								];

//Returns HTML for each card
function generateCard(card) {
	return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

function initGame() {
		var deck = document.querySelector('.deck');
		var cardHTML = cardList.map(function(card) {
			return generateCard(card)
		});

		deck.innerHTML = cardHTML.join('');
}

shuffle(cardList);
initGame();


var allCards = document.querySelectorAll(".card");
var openCards = [];
var matchedCards = [];

allCards.forEach(function(card) {
	card.addEventListener('click', function(e) {
		moveCounter();

		if (moveCount === 1) {
			startTimer();
		}

		if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
				openCards.push(card);
				card.classList.add('open', 'show');

							if (openCards.length == 2) {
						// If cards match
						if (openCards[0].dataset.card === openCards[1].dataset.card) {
							openCards.forEach(function(card) {
								card.classList.add('match');
								matchedCards.push(card);
							})
						}

						//Does not match then flip cards over
						setTimeout(function() {
							openCards.forEach(function(card) {
								card.classList.remove('open', 'show');
							});

							openCards = [];
						}, 1000);
				}

				if (matchedCards.length === 16) {
					toggleModal();
					stopTimer();
				}
		};
	});
});

//Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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

// Timer function 
let second = 0;
let minute = 0;
let timer;
let timeClock = document.querySelector(".timer");

function startTimer() {
	sec = 0;
	min = 0;
	timeClock.innerHTML = "0" + min + ":" + "0" + sec;
	timer = setInterval(insertTime, 1000);
}

//reset to 0
 function resetTimer() {
   time = 0;
   displayClock();
 }

//clears running time
function stopTimer() {
	clearInterval(timeCount); 
}

function insertTime() {
	sec++;

	if (sec < 10) {
		sec = `0${sec}`;
	}

	if (sec >= 60) {
		min++;
		sec = "00";
	}

	//Displays time 
	timeClock.innerHTML = "0" + min + ":" + sec;
}

//Move counter
var moveCount = 0; 
var counter = document.querySelectorAll('span.moves'); 
let stars = document.querySelector('.stars');
let one = document.querySelector('.one');
let two = document.querySelector('.two');

function moveCounter() {
	moveCount++;
	counter[0].innerHTML = moveCount; 
	starRating(moveCount);
  
};

//Remove stars function
var starsList = document.querySelectorAll('ul.stars'); 

function starRating(moveCount) {
	if (moveCount === 12) {
		starsList[0].removeChild(starsList[0].children[0]);
	} else if (moveCount === 16) {
		starsList[0].removeChild(starsList[0].children[0]);
	}
}

var moveHTML = document.querySelector('.modal_moves');
var starsHTML = document.querySelector('.modal_stars');
var timeHTML = document.querySelector('.modal_time');
var timerValue = document.querySelectorAll('.timer');

//Toggle function
function toggleModal() {
	const modal = document.querySelector('.modal_background');
	moveHTML.innerText = "Moves = " + moveCount;
	starsHTML.innerText = "Stars = " + starsList[0].childElementCount;
	timeHTML.innerText = "Time = " + timerValue[0].innerText;
	modal.classList.toggle('hide');
}

//Modal Buttons function
var cancelButton = document.querySelector('.modal_close');
var replayButton = document.querySelector('.modal_replay');
cancelButton.addEventListener('click', toggleModal);
replayButton.addEventListener('click', function() {
	toggleModal();
	resetGame();
});

//Reset stars
function resetStars() {
	if (starsList[0].childElementCount === 2) {
		starsList[0].insertAdjacentHTML('beforeend', '<li><i class="fa fa-star"></i></li>');
	} else if (starsList[0].childElementCount === 1){
			starsList[0].insertAdjacentHTML('beforeend', '<li><i class="fa fa-star"></i></li>');
			starsList[0].insertAdjacentHTML('beforeend', '<li><i class="fa fa-star"></i></li>');
	}
}

//Reset game
var resetButton = document.querySelectorAll(".restart");

resetButton[0].addEventListener('click', resetGame);

function resetGame() {
	moveCount = 0;
	counter[0].innerHTML = moveCount;
	matchedCards = [];
	openCards = [];
	resetStars();
	stopTimer();
	sec = 0;
	min = 0;
	timeClock.innerHTML = "0" + min + ":" + "0" + sec;
	allCards.forEach(function(card) {
		if(card.classList.contains('match')) {
			card.classList.remove('match');
		}
	});
	var newCardList = Array.from(allCards);
	console.log(newCardList);
	shuffle(newCardList);
	var deck = document.querySelector('.deck');
	for (card of newCardList) {
		deck.appendChild(card);
	}
}

