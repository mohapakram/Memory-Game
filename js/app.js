
// declaring deck
const deck = document.querySelector('.deck');

//stars
const stars = document.querySelectorAll(".stars li");

const movesText = document.querySelector(".moves");

// opend cards
let opendCards = [];

// moves
let moves = 0;

// check if clock started
let clockOff = true;

// holds time
let time = 0;

let clockId;

let matches = 0;

let totalMatches = 8;

// declaring cards
let card = document.querySelectorAll('.card');
let x = document.getElementsByClassName('card');


// initate the game
function startGame(){
   let cards = shuffle([...card]);
   console.log(cards[0]);
   console.log([...card][0]);
   deck.innerHtml = "";
   for (let i=0; i<cards.length; i++){
     deck.innerHtml = "";
     [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
     cards[i].classList.remove("show", "open", "match", "disabled");
   }

   // adding event listeners for cards

     deck.addEventListener("click", (event)=>{
       console.log("matches are "+matches);
       let card = event.target;
       console.log(opendCards);
          if ( isClickValid(card) ) {
              if (clockOff) {
                startClock();
                clockOff = false;
              }
            clickedCard(card);
            checkForMatch();
            checkScore();
            if (matches === totalMatches){
              console.log("end >>>>>>>> !!");
              toggleModal();
            }
          }

     });

}

function startClock(){
  clockId = setInterval(()=>{
    time++;
    displayTime();
   } , 1000);
}

function displayTime(){
    const clock = document.querySelector(".clock");
    clock.innerText = showTime();
}

function showTime(){
    let min = Math.floor(time /60);
    let sec = time %60;
    if (sec < 10){
      return `${min}:0${sec}`;
    }else {
      return `${min}:${sec}`;
    }
}

function stopClock(){
  clearInterval(clockId);
}



function isClickValid(card){
  return(
      card.classList.contains("card")
      &&
      !card.classList.contains("match")
      &&
      opendCards.length < 2
      &&
      !opendCards.includes(event.target)
  );
}

function toggleModal(){
  const modal = document.querySelector(".the-modal");
  modal.classList.toggle("hide");
  const timeScore = document.querySelector(".timeScore");
  const starsScore = document.querySelector(".starsScore");
  const movesScore = document.querySelector(".movesScore");
  let stars_score = getStars();
  let time_score = showTime();
  timeScore.innerText = `time : ${time_score}`;
  movesScore.innerText = `moves : ${moves}`;
  starsScore.innerText = `stars : ${stars_score}`
}


function getStars(){
  let stars_score = 0;
  for (star of stars){
    if(star.style.display !== "none"){
      stars_score++;
    }
  }
  return stars_score;
}

function resetGame(){
  matches = 0;
  opendCards = [];
  resetTime();
  restMoves();
  resetStars();
  startGame();
}

function resetTime(){
   stopClock();
   clockOff = true;
   time = 0;
   displayTime()
}

function restMoves(){
  moves = 0;
  movesText.innerText = moves;
}

function resetStars(){
  for (star of stars){
    star.style.display = "inline";
  }
}
function checkForMatch(){
  if (opendCards.length === 2){
    console.log("two cards!");
    if (opendCards[0].firstElementChild.className === opendCards[1].firstElementChild.className){
      console.log("matched");
      opendCards[0].classList.toggle("match");
      opendCards[1].classList.toggle("match");
      matches++;
      opendCards = [];
    }else {
       setTimeout(()=>{
         console.log("not matched!");
         toggleCard(opendCards[0]);
         toggleCard(opendCards[1]);
         opendCards = [];
       },1000);
    }
    addMove();
  }
}



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    console.log("i'm workinng >>>>>> !");
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
 *    + if all cards have  matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function addMove(){
  console.log("adding a move >> !");
  moves++;
  console.log(moves);
  console.log(movesText.innerText);
  movesText.innerText = moves;
}

function checkScore(){
  if(moves === 16 || moves === 24){
    removeStar();
  }
}

function removeStar(){
   for (star of stars){
     if( star.style.display !== "none" ){
       star.style.display = "none";
       break;
     }
   }

}

function clickedCard(card){
   toggleCard(card); // toggle the card to open or close
   addToOpendCards(card); // add the card to the opencards to compare
}

function toggleCard(card){
  card.classList.toggle("show");
  card.classList.toggle("open");
}

function addToOpendCards(card){
    opendCards.push(card);
}
function replay(){
  resetGame();
  toggleModal();
}

const replayBtn = document.querySelector(".replay");
replayBtn.addEventListener("click",replay);

const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click",toggleModal);

const restartBtn =  document.querySelector(".restart");
restartBtn.addEventListener("click",resetGame);

// stat the game when the body finishes loading ..
document.body.onload = startGame();
