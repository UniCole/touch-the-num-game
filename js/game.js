'use strict';

const VICTORY_AUDIO = new Audio('sound/victory.mp3');

var gNums;
var gNextNum;
var gBoardCells = 16;
var gIntervalId;

var gElMinutesLabel = document.getElementById("minutes");
var gElSecondsLabel = document.getElementById("seconds");
var gTotalSeconds

function initGame() {

    gTotalSeconds = 0;
    clearInterval(gIntervalId);
    gElMinutesLabel.innerHTML = '00'
    gElSecondsLabel.innerHTML = '00'

    gNextNum = 1;

    gNums = shuffle(createBoard());
    renderBoard();
}


function createBoard() {
    var board = [];
    for (var i = 0; i < gBoardCells; i++) {
        board.push(i + 1);
    }
    return board;
}



function renderBoard() {

    var strHTML = '';
    var length = Math.sqrt(gBoardCells)
    for (var i = 0; i < length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < length; j++) {
            var currCell = gNums.pop();
            strHTML += `<td onclick="cellClicked(${currCell}, this)">${currCell}</td>`;
        }
        strHTML += '</tr>';
    }

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}



function cellClicked(clickedNum, elCell) {

    if (clickedNum === gNextNum) {
        if (gNextNum === 1) gIntervalId = setInterval(setTime, 1000);
        elCell.classList.add('correct');
        playSound();
        gNextNum++;
    }
    if (gNextNum === gBoardCells + 1) {
        VICTORY_AUDIO.play();
        clearInterval(gIntervalId);
    }
}

function changeLevel(num) {
    gBoardCells = num;
    initGame();
}

function setTime() {
    gTotalSeconds++
    gElMinutesLabel.innerHTML = pad(parseInt(gTotalSeconds / 60));
    gElSecondsLabel.innerHTML = pad(gTotalSeconds % 60);
}

function pad(val) {
    var valString = val + "";
    return valString.length === 1 ? "0" + valString : valString
}

function playSound() {
    var audio = new Audio('sound/v.mp3');
    audio.play();
}


