/*
 * Create a list that holds all of your cards
 */
 //global variables
const deck = document.querySelector('.deck');
const reset = document.querySelector('.restart');
const timer = document.querySelector('.clock');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const cards = shuffle(Array.from(document.querySelectorAll('.card')));

for (card of cards) {
  deck.appendChild(card);
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//event listener for clicks on cards
deck.addEventListener('click', playGame);

//event listener to restart game
reset.addEventListener('click', resetGame);

//variables
let flippedCards = [];
let matches = 0;
let countMoves = 0;
let score = document.querySelector('.stars');
let moves = document.querySelector('.moves');
let startTimer = true;
let time = 0;
let seconds = 0;
let minutes = 0;
let clock;

//function to start game verify clicks as valid
function playGame(e) {
   const targetCard = event.target;
   if(targetCard.classList.contains('card') && flippedCards.length < 2 && !flippedCards.includes(targetCard)  && !flippedCards.includes('match')){
     flipCard(targetCard);
     numFlippedCards(targetCard);
         if (startTimer){
            startClock();
            startTimer = false;
     }
    }
    if(flippedCards.length === 2){
      countMoves = countMoves +1;
      aMatch(targetCard);
      numStars();
      recordMoves(countMoves);
   }
   if(matches === 8){
     stopClock();
     openModal();
     modalStats();
   }
 }
//


// flip to show card
 function flipCard(targetCard){
   targetCard.classList.add('show','open');
 }

// count number of cards flipped
 function numFlippedCards(targetCard){
   flippedCards.push(targetCard);
 }

// determine if flipped card match, if not flip back
 function aMatch() {
   if (
     flippedCards[0].firstElementChild.className ===
     flippedCards[1].firstElementChild.className
   ){
     flippedCards[0].classList.add('match');
     flippedCards[1].classList.add('match');
     flippedCards = [];
     matches = matches +1;
   } else {
     setTimeout(function(){
       flippedCards[0].classList.remove('show', 'open');
       flippedCards[1].classList.remove('show', 'open');
       flippedCards = [];
     }, 500);
   }
 }

//remove stars based on number of moves made
 function numStars (){
   if (countMoves >= 15 && countMoves < 25 && score.children.length === 3){
     let removeStar1 = score.children[2];
     score.removeChild(removeStar1);
   }
     if (countMoves >= 25 && countMoves <35 && score.children.length === 2) {
       let removeStar2 = score.children[1];
       score.removeChild(removeStar2);
   }
      else if (countMoves >=35 && score.children.length === 1){
        let removeStar3 = score.children[0];
        score.removeChild(removeStar3);
    }
}

//count number of moves made
 function recordMoves (){
   moves.innerHTML = countMoves;
 }

//reload page to start new game
function resetGame (){
  window.location.reload();
}

//start clock
function startClock(){
  clock = setInterval(function(){
    seconds++;
    if (seconds === 60){
      minutes++;
      seconds = 0;
    }
    displayTimer();
  }, 1000);
}

//timer display format
function displayTimer() {
  if (seconds < 10){
    timer.innerHTML = `${minutes}:0${seconds}`;
  } else {
    timer.innerHTML = `${minutes}:${seconds}`;
  }
}

//stop clock
function stopClock() {
  clearInterval(clock);
}


//modal functionality

//modal variables
const modal = document.querySelector('.modalBackground');
const closeButton = document.querySelector('.closeBtn');
const restartButton = document.querySelector('button');

//function to open Modal
function openModal (){
  modal.classList.remove('hide');
}

//function to close Modal with button
function closeModal () {
  modal.classList.add('hide');
}

//Modal event listeners
closeButton.addEventListener('click', closeModal);

restartButton.addEventListener('click', resetGame);

//write stats to modal
function modalStats () {
  const modalTime = document.querySelector('.modal-time');
  const clockTime = document.querySelector('.clock').innerHTML;
  modalTime.innerHTML = `Time = ${clockTime}`;
  const modalMoves = document.querySelector('.modal-moves');
  modalMoves.innerHTML = `Moves = ${countMoves}`;
  const modalStars = document.querySelector('.modal-stars');
  modalStars.innerHTML = `Stars = ${score.children.length}`;
}
