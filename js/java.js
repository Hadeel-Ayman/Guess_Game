var inputsCont = document.querySelector(".inputs");
var discTitle = document.querySelector(".disc");
var gess = document.querySelector(".gess-count");
var button = document.querySelector("button");
var typing = document.querySelector(".typing");
var winner = document.querySelector(".winner");
var succ = new Audio("audio/audio2.mp3");
var fail = new Audio("audio/audio1.mp3");

document.addEventListener("keydown", () => typing.focus());
typing.addEventListener("input", startGame);
button.addEventListener('click',getRandomWord);
var data = [
  {
    word: "python",
    disc: "programming Language",
  },
  {
    word: "bootstrap",
    disc: "what the FrameWork for css",
  },
  {
    word: "angular",
    disc: " JavaScript MVW FrameWork",
  },
  {
    word: "JavaScript",
    disc: "programming Language",
  },
  {
    word: "nodejs",
    disc: "JavaScript runtime environment",
  },
  {
    word: "react",
    disc: "JavaScript library",
  },
  {
    word: "vue",
    disc: "JavaScript FrameWork",
  },
];

let maxGess = 12;
let countToWin = [];
let word;
function getRandomWord() {
    reset();
  let randomObject = data[Math.floor(Math.random() * data.length)];
  let disc = randomObject.disc;
  word = randomObject.word;
  //add description
  discTitle.innerHTML = disc;
  //add guess count
  gess.innerText = maxGess;
  // create inputs
  let inputs = "";
  for (var i = 0; i < word.length; i++) {
    inputs += `<input type="text" disabled>`;
  }
  inputsCont.innerHTML = inputs;
}
getRandomWord();

function startGame(e) {
  let char = e.target.value;
  if (!char.match(/[a-z]/i)) return;
  if (word.includes(char)) {
    for (var i = 0; i < word.length; i++) {
      if (word[i] === char && !inputsCont.querySelectorAll("input")[i].value) {
        inputsCont.querySelectorAll("input")[i].value = char;
        countToWin.push(char);
      }
    }
  } else {
    maxGess--;
  }
  gess.innerText = maxGess;
  typing.value = "";

  // winner
  if(countToWin.length === word.length){
    winner.classList.remove('hidden');
    succ.play();
    countToWin=[];
 }
 // lose 
    setTimeout(() =>{
        if(maxGess <= 0){
            fail.play();
            alert("يا خسران صعب تكسب ");
             for(let i = 0; i < word.length; i++){
                inputsCont.querySelectorAll('input')[i].value = word[i];
            }
        }
    })
}

function reset(){
    maxGess = 12;
    winner.classList.add("hidden");
    countToWin = [];
    succ.pause();
}
