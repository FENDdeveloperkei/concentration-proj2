/*Create a list that holds all of your cards*/

/*Display the cards on the page -shuffle the list of cards using the provided "shuffle" method below
 -loop through each card and create its HTML -add each card's HTML to the page*/

/*Created with the help of Mike Wales https://www.youtube.com/watch?reload=9&reload=9&v=_rUH-sEs68Y&app=desktop*/

    const deckElement = document.querySelector('.deck');

    const shuffledDeck = shuffle(Array.from(document.querySelectorAll('.card')));

    for (card of shuffledDeck) {
        deckElement.appendChild(card);
    }

// Shuffle function from http://stackoverflow.com/a/2450976
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
 
    deckElement.addEventListener('click', gameLogic);
    //Array to hold open cards
    let openCards = [];
    
    function gameLogic(event) {
        const targetCard = event.target;
        
        if (!targetCard.classList.contains('card')) {
            return;
        }
        //first click starts timer
        if (firstClick === false) {
            firstClick = true;
            startTimer();
        }
        
        if (verifyCardSate(targetCard)) {
            
            openCards.push(targetCard);
            
            counter++;

            
            openCard(targetCard);

            
            setMoves(moves);
            setScores(counter);

            
            if (openCards.length === 2) {
                if (openCards[0].children[0].classList.value === openCards[1].children[0].classList.value) {
                    
                    matchCard(openCards[0]);
                    matchCard(openCards[1]);
                    //Counts matched pairs
                    matches++;
                    //When all cards matched, stop timer & show results    
                    if (matches === 8) {
                        stopTimer();
                        displayResults();
                        return;
                    }
                    
                    openCards = [];
                }
                
                setTimeout(function () {
                    openCards.forEach(function (targetCard) {
                        closeCard(targetCard);
                    });
                    openCards = [];
                }, 1000);
            }
        }
    }

    
    let firstClick = false;
    let matches = 0;
    let counter = 0;
    let minutes = 0, seconds = 0;
    let timer;

     
    let rating = document.querySelector('.stars');
    let moves = document.querySelector('.moves');

    //Assigns click event listener to Reset Game icon
    document.querySelector('.restart').addEventListener('click', resetGame);

    /*start, format and stop timer are inspired from webinar - https://www.youtube.com/watch?v=h_vUG-vi2LY*/

    //Function to start timer
    function startTimer() {
        timer = setInterval(function () {
            seconds++;
            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }
            if (minutes === 60) {
                hour++;
                minutes = 0;
            }
            document.querySelector('.timer').innerText = formatTimerDisplay();
        }, 1000);
        
    }
    //Function to stop timer
    function stopTimer() {
        clearInterval(timer);
        document.querySelector('.timer').innerText = formatTimerDisplay();
    }
    
    function formatTimerDisplay() {
        let sec = seconds > 9 ? String(seconds) : '0' + String(seconds);
        let min = minutes > 9 ? String(minutes) : '0' + String(minutes);
        return min  + ':' + sec;
    }

    
    function verifyCardSate(targetCard) {
        return !targetCard.classList.contains('open') && !targetCard.classList.contains('show') &&
            !targetCard.classList.contains('match');
    }

    //Moves made by user
    function setMoves() {
        moves.innerHTML = counter;
    }

    
    function matchCard(card) {
        card.classList.toggle('match');
    }
    //close cards
    function closeCard(card) {
        card.classList.remove('open', 'show');
    }
    //Function to open and show cards
    function openCard(card) {
        card.classList.add('open', 'show');
    }
    //Resets Game
    function resetGame() {
        moves.innerHTML = "";
        window.location.reload();
    }

    function setScores(counter){
        if (counter > 16 && counter <= 24 && rating.children.length ===3) {
            let replcaeStar = rating.children[2]; 
            rating.removeChild(replcaeStar);
        }
        else if (counter > 24 && counter <= 32 && rating.children.length ===2) {
            let replcaeStar1 = rating.children[1];
            rating.removeChild(replcaeStar1);
        }
    }

    
    function flipModal() {
        const modalElement = document.querySelector('.modal_background');
        modalElement.classList.toggle('hide');
    }

    
    function displayResults() {
        flipModal();
        addGameStats();
        document.querySelector('.modal_replay_button').addEventListener('click', resetGame);
        document.querySelector('.modal_cancel_button').addEventListener('click', flipModal);
    }

    p
    function addGameStats() {
        const timeSpan = document.querySelector('.modal_time');
        const stopWatch = document.querySelector('.timer').innerHTML;
        timeSpan.innerHTML = `Time taken= ${stopWatch}`;
        const moveTracker = document.querySelector('.modal_moves');
        moveTracker.innerHTML = `Moves made= ${moves.innerHTML}`;
        const ratingTracker = document.querySelector('.modal_stars');
        ratingTracker.innerHTML = `Your rating= ${rating.children.length}`;
    }
