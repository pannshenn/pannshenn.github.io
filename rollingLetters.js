// 1. letterSet: a set of letters to be rolled
// 2. counter: the <div> box that letterSet will be placed
var letterSet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var myLetterSet = [12, 8, 13, 6, 24, 8, 15, 0, 13]; // mingyipan
var counter = document.getElementsByClassName('letter-ticker')[0];

letterSet.forEach( letter => {
    let letterNode = document.createElement('div');
    letterNode.innerHTML = letter;
    letterNode.classList.add('letter');
    counter.appendChild(letterNode);
})

var rolling = false; // monitor the state of rolling: true-rolling in process | false-not in rolling process
var firstIndex = 0;
var lastIndex = 12;
async function rollingLetters() {
    rolling = true;
    let letters = document.getElementsByClassName("letter");
    if (firstIndex < lastIndex) {
        for (let i = firstIndex; i < lastIndex; i++){
            await sleep(200);
            rollingOneLetter(letters[i]);
        }
    } else {
        for (let i = firstIndex; i > lastIndex; i--){
            await sleep(200);
            rollingOneLetter(letters[i]);
        }
    }
    
    rollingLastLetter(letters[lastIndex]);
    rolling = false;
    firstIndex = lastIndex;
    lastIndex = myLetterSet[Math.floor(Math.random()*9)];
}

// rollingOneLetter(letter): pass in any <div class="letter"> to the function
function rollingOneLetter(letter) {
    letter.style.transform = "translate(0, 64vh)";
    letter.style.transitionDuration = "0.5s";
}

// rollingLastLetter(letter): pass in any <div class="letter"> to the function
// last letter will be centered at the container box when done.
function rollingLastLetter(letter) {
    letter.style.transform = "translate(0, 30vh)";
    letter.style.transitionDuration = "0.5s";
}

function resetPosition() {
    let letters = document.getElementsByClassName("letter");
    for (let i = 0; i< letters.length; i++){
        letters[i].style.transform = "translate(0, -64vh)";
        letters[i].style.transitionDuration = "0s";
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener('load', rollingLetters);

document.getElementsByClassName("container-roll")[0].addEventListener('mouseover', function() {
    if (!rolling) {
        resetPosition();
        rollingLetters();
    }
    
});