const keyboardDiv = document.querySelector(".keyboard");
const guessText = document.querySelector(".guesses-text b");
const hangmanImg = document.querySelector('.hangman-box img');
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");
// const objLi = [
//     {
//         w: "ok", l: 12,
//     }
// ]
// const {w, l} = objLi.map((a) => {
//     console.log(a["w"]);
// });
let currentWord, correctLetter, wordGuessCount, maxGuess = 6;

const resetGame = () => {
    correctLetter = [];
    wordGuessCount = 0;
    guessText.innerText = `${wordGuessCount} / ${maxGuess}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    hangmanImg.src = `./images/hangman-${wordGuessCount}.svg`;
    wordDisplay.innerHTML = currentWord.split('').map(() => `<li class="letter"></li>`).join('');
    gameModal.classList.remove("show");
}

const wordDisplay =  document.querySelector(".word-display");
const getRandomWord = () => {
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)]
    console.log(word,":", hint);
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame()
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? "You found the word" : "The correct word was";
        gameModal.querySelector("img").src = `./images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show")
    }, 300)
}


const intiGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        // console.log([...currentWord], "Present");
        [...currentWord].forEach((letter, ind) => {
                if(letter === clickedLetter){
                correctLetter.push(letter);
                wordDisplay.querySelectorAll('li')[ind].innerText = letter;
                wordDisplay.querySelectorAll('li')[ind].classList.add("guessed");
            }
        })
    }
    else{
        wordGuessCount++;
        hangmanImg.src = `./images/hangman-${wordGuessCount}.svg`
        // console.log(clickedLetter, "Not");
    }
    button.disabled = true;
    guessText.innerText = `${wordGuessCount} / ${maxGuess}`;
    if(wordGuessCount === maxGuess) return gameOver(false)
    if(correctLetter.length === currentWord.length) return gameOver(true)
}

// create keyboard buttons
for(let i = 97; i <= 122; i++){
    let button = document.createElement("button");
    button.innerHTML = String.fromCharCode(i) 
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => intiGame(e.target, String.fromCharCode(i)))
}

getRandomWord()
playAgainBtn.addEventListener("click", getRandomWord)