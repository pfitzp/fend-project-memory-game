/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

 var deck = document.querySelector('.deck');
 var reset = document.querySelector('.restart');
 var cards = Array.from(document.querySelectorAll('.card'));
 var flippedCards = [];
 var matchedCards = 0;


//function restartGame () {
    //card.classList.remove('show', 'open', 'match');
//}

 deck.addEventListener('click', function () {
   const targetCard = event.target;
   if(targetCard.classList.contains('card') && flippedCards.length < 2 && !flippedCards.includes(targetCard)){
     flipCard(targetCard);
     numFlippedCards(targetCard);
     if(flippedCards.length === 2){
       aMatch(targetCard);
     }
   }
 })

 function flipCard(targetCard){
   targetCard.classList.add('show','open');
 }

 function numFlippedCards(targetCard){
   flippedCards.push(targetCard);
 }

 function aMatch() {
   if (
     flippedCards[0].firstElementChild.className ===
     flippedCards[1].firstElementChild.className
   ){
     flippedCards[0].classList.add('match');
     flippedCards[1].classList.add('match');
     flippedCards = [];
     matchedCards = matchedCards +2;
   } else {
     setTimeout(function(){
       flippedCards[0].classList.remove('show', 'open');
       flippedCards[1].classList.remove('show', 'open');
       flippedCards = [];
     }, 300);
   }
 }
