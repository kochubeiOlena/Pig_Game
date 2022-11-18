'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); // # - for id; . - for classes
const score1El = document.getElementById('score--1');// if we use getElementBy(smth) we dont need to use # or . only current name 
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let current0El = document.querySelector('#current--0')
let current1El = document.querySelector('#current--1'); 


// let finalScore = 0;
// document.querySelector('.btn--score').textContent = `☝ Final Score ${finalScore}`;

// let player1 = window.prompt(`PLAYER 1...`);
// let player2 = window.prompt(`PLAYER 2...`); 
// const name0El = document.querySelector('#name--0');
// const name1El = document.querySelector('#name--1');


const swichPLayer = function(){
    document.querySelector(`#current--${activePLayer}`).textContent = 0;
    currentScore = 0;
    activePLayer = activePLayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

let scores, currentScore, activePLayer, playing, finalScore;
//Starting conditions
const init = function(){
	console.log('init');
	scores = [0,0];
	currentScore = 0;
	activePLayer = 0;
	playing = true;

	score0El.textContent = 0;
	score1El.textContent = 0;
	current0El.textContent = 0;
	current1El.textContent = 0;

	diceEl.classList.add('hidden');
	player0El.classList.remove('player--winner');
	player1El.classList.remove('player--winner');
	player0El.classList.add('player--active');
	player1El.classList.remove('player--active');
	finalScore = parseInt(window.prompt(`Final score number...👇`));
	console.log(finalScore, 53);
	if(!Number.isNaN(finalScore)) {
		document.querySelector('.btn--score').textContent = `☝ Final Score ${finalScore}`;
	}else{
		const wrongNumber = window.alert(`PLease write NUMBER`);
		finalScore = window.prompt(`Final score number...👇`);
	};
	document.querySelector('.btn--score').textContent = `☝ Final Score ${finalScore}`;
	let player1 = window.prompt(`PLAYER 1...`);
	let player2 = window.prompt(`PLAYER 2...`);
	const name0El = document.querySelector('#name--0');
	const name1El = document.querySelector('#name--1');
	name0El.textContent = player1;
	name1El.textContent = player2;
};
init();




//Rolibg dice functionality
btnRoll.addEventListener('click', function(){
    if(playing){
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random()* 6)+1;

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1: if true,
    if(dice !== 1){
    currentScore = currentScore + dice;//currentScore += dice
    document.querySelector(`#current--${activePLayer}`).textContent = currentScore;
    }else{
    //swich to next player
     swichPLayer();
    // currentScore =  dice=== 1 ? 0 : currentScore;
    }
}
})


btnHold.addEventListener('click', function(){
    if(playing){
    //1. Add  corrent crore to active player's store
    scores[activePLayer] += currentScore;
    document.getElementById(`score--${activePLayer}`).textContent = scores[activePLayer];
    // swichPLayer();
    // scores[1] = scores[1] + currentScore;
    // scores[0] = scores[0] + currentScore;
    //2. Check if player's score is >= 100
    // if(scores[activePLayer] >= 100){
    //     document.getElementById(`name--${activePLayer}`).textContent = 'WINNER';
    //}
    if(scores[activePLayer] >= finalScore){
        playing = false;
        document.querySelector(`.player--${activePLayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePLayer}`).classList.remove('player--active');
        diceEl.classList.add('hidden');
    }else {
        swichPLayer();
    }
    //Finish game 
    }
    //Switrch to the next player 
});

btnNew.addEventListener('click', init);