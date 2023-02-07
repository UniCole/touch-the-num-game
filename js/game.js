'use strict';

let gNums;
let gNextNum;
let gBoardCells = 16;
let intervalId;

let elMinutesLabel = document.getElementById("minutes");
let elSecondsLabel = document.getElementById("seconds");
let totalSeconds;

let audio = new Audio('assets/sound/v.mp3');
let victorySound = new Audio('assets/sound/victory.mp3');
let audioMuted = false;


function initGame() {

    totalSeconds = 0;
    clearInterval(intervalId);
    elMinutesLabel.innerHTML = '00'
    elSecondsLabel.innerHTML = '00'

    gNextNum = 1;

    gNums = shuffle(createBoard());
    renderBoard();
}


function createBoard() {
    let board = [];
    for (let i = 0; i < gBoardCells; i++) {
        board.push(i + 1);
    }
    return board;
}



function renderBoard() {

    let strHTML = '';
    let length = Math.sqrt(gBoardCells)
    for (let i = 0; i < length; i++) {
        strHTML += '<tr>';
        for (let j = 0; j < length; j++) {
            let currCell = gNums.pop();
            strHTML += `<td onclick="cellClicked(${currCell}, this)">${currCell}</td>`;
        }
        strHTML += '</tr>';
    }

    let elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function cellClicked(clickedNum, elCell) {
    if (clickedNum === gNextNum) {
        if (gNextNum === 1) intervalId = setInterval(setTime, 1000);
        elCell.classList.add('correct');
        playSound();
        gNextNum++;
    }
    if (gNextNum === gBoardCells + 1) {
        if (!audioMuted) playVictorySound();
        clearInterval(intervalId);
      }
}


function changeLevel(num) {
    gBoardCells = num;
    initGame();
}

function setTime() {
    totalSeconds++
    elMinutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    elSecondsLabel.innerHTML = pad(totalSeconds % 60);
}

function pad(val) {
    let valString = val + "";
    return valString.length === 1 ? "0" + valString : valString
}

// Play sound
function playSound() {
    if (!audioMuted) {
        audio.currentTime = 0;
        audio.play();
    }
}

// Play victory sound
function playVictorySound() {
    if (!audioMuted) {
        victorySound.currentTime = 0;
        victorySound.play();
    }
}

// Mute/unmute audio
function muteAudio() {
    audioMuted = !audioMuted;
    let btn = document.getElementById("soundBtn");
    audio.muted = audioMuted;
    victorySound.muted = audioMuted;
    if (audioMuted) {
        btn.innerHTML = '<img class="mute" src="../assets/images/no-sound.png">';
    } else {
        btn.innerHTML = '<img class="mute" src="../assets/images/volume.png">';
    }
}

