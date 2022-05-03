
const secretPhrases = [
  "never",
  "subway",
  "lucky",
  "funny",
  "galaxy",
  "awkward",
  "absurd",
  "quiz",
  "joyful",
  "zipper",
  "unworthy",
  "hyphen",
  "ivy",
  "oxygen",
  "mystify",
  "gossip",
  "fishhook",
];
let randomItem = "";
let clicked = [];
let result = "";
let mistakes = 0;
console.log(randomItem);

function selectRandomItem() {
    randomItem = secretPhrases[Math.floor(Math.random() * secretPhrases.length)];
    let letterBtn = document.querySelector("#letters");
    letterBtn.addEventListener("click", buttonHandler);
    window.addEventListener("keydown", keyHandler);
}

function setUnderScores() {
    let splitedWord = randomItem.split("");
    let mappedWord = splitedWord.map((letter) => clicked.indexOf(letter) >= 0 ? letter : "_")
    result = mappedWord.join("");
    document.querySelector("#clue p").innerHTML = result;
}

function checkIfWon() {
    if (randomItem === result) {
        document.querySelector("#gameover p").style.display = "block";
        document.querySelector("#image img").src = "./assets/winner.png";
        setTimeout(() => location.reload(), 3000)
    }
}

function checkIfLost() {
    document.querySelector("#image img").src = `./assets/hangman${mistakes}.png`;
    if (mistakes === 6) {
        document.querySelector("#gameover p").style.display = "block";
        document.querySelector("#clue p").innerText = `the secret word is : ${randomItem}`;
    }
     if (mistakes > 6) {
       location.reload();
     }
}

function letterHandler(letter) {
    letter = letter.toLowerCase();
    clicked.indexOf(letter) === -1 ? clicked.push(letter) : null;
    document.getElementById(letter.toUpperCase()).className = "used";
    if (randomItem.indexOf(letter) >= 0) {
        setUnderScores();
        checkIfWon();
        
    } else if (randomItem.indexOf(letter) === -1) {
        mistakes++;
        checkIfLost();
    }
}


function buttonHandler(event) {
   let letter = event.target.id;
   letterHandler(letter)
}

function keyHandler(event) {
    let key = event.key;
    letterHandler(key)
}

selectRandomItem();
setUnderScores();