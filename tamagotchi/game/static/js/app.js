/*------------------------Constants------------------------*/

const { render } = require('ejs');

/*------------------------Variables------------------------*/

let state = {
    boredom:0,
    hunger:0,
    sleepiness:0,
};

let timer;
let gameOver;

/*------------------------Cached Element References------------------------*/
const boredomStatEl = document.getElementById('boredom-stat');
const hungerStatEl = document.getElementById('hunger-stat');
const sleepinessStatEl = document.getElementById('sleepiness-stat');

const playBtn = document.getElementById('play-btn');
const feedBtn = document.getElementById('feed-btn');
const sleepBtn = document.getElementById('sleep-btn');

const gameMessageEl = document.getElementById('message');
const resetBtnEl = document.getElementById('restart');


/*------------------------Functions------------------------*/

function init(){
    console.log('Game is starting');
    gameOver = false;
    gameMessageEl.classList.add('hidden');
    resetBtnEl.classList.add('hidden');

    state = {
        boredom:0,
        hunger:0,
        sleepiness:0,
    };

    function runGame() {
        updateStates();
        checkGameOver();
        render();
    }

    function updateStates() {
        function randomIncrement() {
            return Math.floor(Math.random() * 4);
        }
        state.boredom += randomIncrement();
        state.hunger += randomIncrement();
        state.sleepiness += randomIncrement();
    }

    function checkGameOver() {
        if (state.boredom >= 10 || state.hunger >= 10 || state.sleepiness >= 10) {
            gameOver = true;
        }
    }

    function render() {
        boredomStatEl.textContent = state.boredom;
        hungerStatEl.textContent = state.hunger;
        sleepinessStatEl.textContent = state.sleepiness;
    }

    if (gameOver) {
        clearInterval(timer);
        gameMessageEl.classList.remove('hidden');
        resetBtnEl.classList.remove('hidden');
    }
}

/*------------------------Event Listeners------------------------*/

function playBtnClick() {
    state.boredom = 0;
    render();
}

function feedBtnClick() {
    state.hunger = 0;
    render();
}

playBtnEl.addEventListener('click', playBtnClick);
feedBtnEl.addEventListener('click', feedBtnClick);
sleepBtnEl.addEventListener('click', sleepBtnClick);

resetBtnEl.addEventListener('click', init);

init();