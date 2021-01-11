const play_btn = document.querySelector(".play");
const naw_to_play_btn = document.querySelector(".haw_play");
const end_btn = document.querySelector(".end");
const play_again_btn = document.querySelector(".confirm");
const options_btn = document.querySelector(".options");

const game_body = document.querySelector(".body");
const wave = document.querySelector(".wave");

const score = document.querySelector(".score_display_input");
const calc_panel = document.querySelector(".calc_grid");
const calc_screen = document.querySelector(".calc_display_input");
const calc_btns = document.querySelectorAll(".btn");

const overlay_end = document.querySelector(".overlay-end");
const message_end = document.querySelector(".message_end h2");
const overlay_start = document.querySelector(".overlay-start");
const message_start = document.querySelector(".message-start");

const configuration = document.querySelector(".configuration");
const arrow_up = document.querySelector(".arrows_up");
const arrow_down = document.querySelector(".arrows_down");
const operators_check = document.querySelectorAll(".operator_check");
const set_number = document.querySelector(".arrows_set-number");

const haw_play_container = document.querySelector(".how-to-play_container");
const arrow_left = document.querySelector(".arrows_left");
const arrow_right = document.querySelector(".arrows_right");
const description = document.querySelector(".description");
const video_1 = document.querySelector(".video1");
const video_2 = document.querySelector(".video2");
const video_3 = document.querySelector(".video3");

const end_sound = new Audio("./audio/end.mp3");
const fail_sound = new Audio("./audio/fail.mp3");
const win_sound = new Audio("./audio/win.mp3");
const bump_sound = new Audio("./audio/bump.mp3");

const rain_sound = new Audio("./audio/rain.mp3");
rain_sound.onended = () => rain_sound.play();


const start_number = 1;
let end_number = 4;
const time_for_one_drop = 10; // in sec
const interval_for_drop = 7; // in sec
const interval_opacity = 1; // in sec
const number_bonus = 10;
const complexity_index = 0.9; // from 0 to 1
const operators = ["+", "–", "÷", "x"];

let currentVideo = 1;

let isGamePlayed = false;
let lastDropLean = 0;
let currentDrops = [];
let inxDrop = 0;
let countWinDrop = 0;
let counWrongEnter = 0;
let currentOperators = [];
let myevent = new Event("click", { bubbles: true });
let game = 0;
let numberOfFeils = 0;
let coint = 10;
let startTime;
let endTime;

let currentTIMEForOneDrop;
let currentDROPFollenInterval;

let operator;
let firstNumder;
let secondNumber;
let result;

function startGame() {
  wave.style.height = `10%`;
  isGamePlayed = true;
  lastDropLean = 0;
  coint = 10;
  countWinDrop = 0;
  counWrongEnter = 0;
  inxDrop = 0;
  currentTIMEForOneDrop = time_for_one_drop;
  currentDROPFollenInterval = interval_for_drop;
  score.textContent = "";
  startTime = new Date();
  createDrop();
  game = setInterval(createDrop, currentDROPFollenInterval * 1000);
  rain_sound.play();
}

function feiled() {     // исправить наименование функции
  if (!isGamePlayed) return;
  if (++numberOfFeils >= 3) {
    isGamePlayed = false;
    setTimeout(endGame, interval_opacity * 1000);
  }
  const drops = document.querySelectorAll(".drop");
  drops.forEach((drop) => dropQuickDown(drop));

  wave.style.height = `${12 + 20 * numberOfFeils}%`;

  clearInterval(game);
  game = setInterval(createDrop, currentDROPFollenInterval * 1000);

  fail_sound.currentTime = 0;
  fail_sound.play();
  score.textContent =
    +score.textContent - coint < 0 ? "" : +score.textContent - coint;
}

function endGame(e) {
  if (!inxDrop) return;
  clearInterval(game);
  const goal = document.querySelectorAll(".drop");
  goal.forEach((drop) => drop.remove());
  numberOfFeils = 0;
  rain_sound.pause();
  endTime = new Date();
  isGamePlayed = false;
  if (e !== "End without message") {
    showMessage();
    fail_sound.play();
  }
}

function createDrop() {
  if (!isGamePlayed) return;
  inxDrop++;
  const drop = document.createElement("div");
  const drop_container = document.createElement("div");
  const span_container = document.createElement("div");
  const span_1 = document.createElement("span");
  const span_2 = document.createElement("span");
  const span_3 = document.createElement("span");
  const fild = document.querySelector(".game_container_fild");

  const bottom = fild.offsetHeight + 25;
  let leans = Math.floor((fild.offsetWidth - 60) / 80);

  const left_Postion = randomLean(leans) * 80 - 60;

  drop.classList.add("drop");
  drop_container.classList.add("drop__container");
  drop.style.left = `${left_Postion}px`;
  drop.addEventListener("transitionend", feiled);

  span_1.classList.add("drop__span");
  span_2.classList.add("drop__span", "drop__span_big");
  span_3.classList.add("drop__span");

  if (inxDrop % number_bonus === 0) {
    console.log(inxDrop);
    drop.classList.add("bonus");
    drop.dataset.bonus = 1;
  }
  
  [
    span_1.textContent,
    span_3.textContent,
    drop.dataset.goal,
    span_2.textContent,
  ] = setNumbers(); 

  document.body.prepend(drop);
  drop.appendChild(drop_container);
  drop_container.appendChild(span_2);
  drop_container.appendChild(span_container);
  span_container.appendChild(span_1);
  span_container.appendChild(span_3);

  setTimeout(() => {
    drop.style.transform = `translateY(${bottom - 40}px)`;
    drop.style.transition = `${currentTIMEForOneDrop}s transform ease-in`;
  }, 100);

  currentDrops[inxDrop] = drop;
}

function dropTransitionEnd(e) {
  e.target.removeEventListener("transitionend", dropTransitionEnd);
  feiled(e);
}


function setNumbers() {
  operator = currentOperators[randomAll(0, currentOperators.length - 1)];
  if (operator == "+") {
    firstNumber = randomAll(start_number, end_number);
    secondNumber = randomAll(start_number, end_number);
    result = firstNumber + secondNumber;
  }
  if (operator == "–") {
    firstNumber = randomAll(start_number, end_number);
    secondNumber = randomAll(start_number, end_number);
    let max = Math.max(firstNumber, secondNumber);
    let min = Math.min(firstNumber, secondNumber);
    [firstNumber, secondNumber] = [max, min];
    result = firstNumber - secondNumber;
  }
  if (operator == "x") {
    firstNumber = randomAll(start_number, end_number > 10 ? 10 : end_number);
    secondNumber = randomAll(start_number, end_number > 10 ? 10 : end_number);
    result = firstNumber * secondNumber;
  }
  if (operator == "÷") {
    result = randomAll(start_number, end_number > 10 ? 10 : end_number);
    secondNumber = randomAll(start_number, end_number > 10 ? 10 : end_number);
    firstNumber = result * secondNumber;
  }
  return [firstNumber, secondNumber, result, operator];
}

function setOperatops() {
  let i = 0;
  operators_check.forEach((operator) => {
    if (operator.classList.contains("operator_check_active")) {
      currentOperators.push(operators[i]);
    }
    ++i;
  });
}

function randomAll(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomLean(leans) {
  const idx = randomAll(1, leans);
  if (idx === lastDropLean) {
    return randomLean(leans);
  }
  lastDropLean = idx;
  return idx;
}

function enterGoal() {
  if (!isGamePlayed) return;
  const drops = document.querySelectorAll(".drop");
  for (let i = drops.length - 1; i >= 0; --i) {
    if (
      drops[i].dataset.bonus &&
      drops[i].dataset.goal == calc_screen.textContent
    ) {
      setBonus(drops);
      return;
    }
    if (drops[i].dataset.goal == calc_screen.textContent) {
      score.textContent = +score.textContent + coint++;
      dropQuickDown(drops[i]);
      win_sound.currentTime = 0;
      win_sound.play();
      calc_screen.textContent = "";
      ++countWinDrop;
      return;
    }
  }
  calc_screen.textContent = "";
  score.textContent =
    +score.textContent - coint < 0 ? "" : +score.textContent - coint;
    bump_sound.currentTime = 0;
    bump_sound.play();
  ++counWrongEnter;
}

function setBonus(drops) {
  drops.forEach((drop) => dropQuickDown(drop));
  score.textContent = +score.textContent + 3 * coint++;
  currentTIMEForOneDrop *= complexity_index;
  currentDROPFollenInterval *= complexity_index;
  clearInterval(game);
  game = setInterval(createDrop, currentDROPFollenInterval * 1000);
  win_sound.currentTime = 0;
  win_sound.play();
  calc_screen.textContent = "";
  ++countWinDrop;
}

function dropQuickDown(drop) {
  drop.removeEventListener("transitionend", feiled);

  drop.style.transition = "";
  drop.dataset.goal = "";
  drop.style.top = drop.getBoundingClientRect().top + "px";
  drop.style.transform = "";
  setTimeout(() => {
    drop.style.top = drop.getBoundingClientRect().top + 900 + "px";
    drop.style.transition = `${interval_opacity}s all ease-in`;
    drop.style.opacity = 0;
  }, 10);

  setTimeout(drop.remove.bind(drop), interval_opacity * 1000);
}

function keydown(e) {
  calc_btns.forEach((btn) => {
    if (btn.dataset.code === e.code) {
      btn.dispatchEvent(myevent);
    }
  });
}

function efficiency() {
  if (!countWinDrop) return "0%";
  return (
    Math.round((countWinDrop / (countWinDrop + counWrongEnter)) * 100) + "%"
  );
}

function showMessage() {
  let results = [
    score.textContent,
    countWinDrop,
    counWrongEnter,
    efficiency(),
    getGameTime(),
  ];
  let resultsComment = [
    "Score: ",
    "Win Drops: ",
    "Wrong Enters: ",
    "Efficiency: ",
    "Game time: ",
  ];
  let resultMessage = "<b>Game over!</b> <hr>";

  for (let i = 0; i < results.length; ++i) {
    resultMessage +=
      resultsComment[i] + (results[i] ? results[i] : "0") + "<br>";
  }

  message_end.innerHTML = resultMessage;
  overlay_end.removeEventListener("transitionend", setDisplayNone);
  overlay_end.classList.remove("display-none");
  setTimeout(() => {
    overlay_end.classList.remove("opacity-null");
  }, 10);
}

function getGameTime() {
  return formatDuration((endTime - startTime) / 1000);
}

function setDisplayNone(e) {
  e.target.classList.add("display-none");
}

function formatDuration(seconds) {
  var time = { year: 31536000, day: 86400, hour: 3600, minute: 60, second: 1 },
    res = [];

  if (seconds === 0) return "now";

  for (var key in time) {
    if (seconds >= time[key]) {
      var val = Math.floor(seconds / time[key]);
      res.push((val += val > 1 ? " " + key + "s" : " " + key));
      seconds = seconds % time[key];
    }
  }

  return res.length > 1
    ? res.join(", ").replace(/,([^,]*)$/, " and" + "$1")
    : res[0];
}

/*
OPTIONS_DURING_GAME_btn.addEventListener("click", () => {
  endGame("End without message");
  OVERLAY_start.removeEventListener("transitionend", setDisplayNone);
  OVERLAY_start.classList.remove("display-none");
  setTimeout(() => {
    OVERLAY_start.classList.remove("opacity-null");
  }, 10);
  configuration.classList.remove("display-none");
  HOW_TO_PLAY_container.classList.add("display-none");
  MESSAGE_start.style.width = "";
}); */

play_btn.addEventListener("click", () => {
  overlay_start.classList.add("opacity-null");
  overlay_start.addEventListener("transitionend", setDisplayNone);
  video_1.pause();
  video_2.pause();
  video_1.currentTime = 0;
  video_2.currentTime = 0;
  setOperatops();
  end_number = +set_number.textContent;
  startGame();
});

play_again_btn.addEventListener("click", () => {
  overlay_end.classList.add("opacity-null");
  overlay_end.addEventListener("transitionend", setDisplayNone);
  startGame();
});

end_btn.addEventListener("click", endGame);

options_btn.addEventListener("click", () => {
  configuration.classList.remove("display-none");
  haw_play_container.classList.add("display-none");
  message_start.style.width = "";
});

naw_to_play_btn.addEventListener("click", () => {  
  configuration.classList.add("display-none");
  message_start.style.width = "85%";
  haw_play_container.classList.remove("display-none");  
  video_1.play();
  video_1.onended = () => video_1.play();
}); 

operators_check.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (!operator.classList.contains("operator_check_active")) {
      operator.classList.add("operator_check_active");
      return;
    }
    operators_check.forEach((oper) => {
      if (operator !== oper && oper.classList.contains("operator_check_active"))
        operator.classList.remove("operator_check_active");
    });
  });
});

calc_panel.addEventListener("click", (e) => {
  if (!e.target.dataset.key) return;
  if (e.target.dataset.key >= 0 && e.target.dataset.key <= 9) {
    if (calc_screen.textContent.length < 3)
    calc_screen.textContent += e.target.dataset.key;
  }
  if (e.target.dataset.key == "Del") {
    calc_screen.textContent = calc_screen.textContent.slice(0, -1);
  }
  if (e.target.dataset.key == "Clear") {
    calc_screen.textContent = "";
  }
  if (e.target.dataset.key == "Enter") {
    enterGoal();
  }
  e.target.style.backgroundColor = "red";
  setTimeout(removeStyle.bind(e.target), 300, e.target);

  function removeStyle(el) {
    el.style.backgroundColor = "";
  }
});

arrow_up.addEventListener("click", () => {
  if (++set_number.textContent > 20) set_number.textContent = 20;
});

arrow_down.addEventListener("click", () => {
  if (--set_number.textContent < 3) set_number.textContent = 2;
});

arrow_left.addEventListener("click", () => {
  if (currentVideo === 3) {
    arrow_right.classList.toggle("arrows_right_passive");
    video_2.classList.toggle("display-none");
    video_3.classList.toggle("display-none");
    video_2.play();
    video_2.onended = () => video_2.play();
    description.textContent =
      "When the third drop of water touches the sea, the game is over.";
    currentVideo = 2;
    return;
  }
  if (currentVideo === 2) {
    arrow_left.classList.toggle("arrows_left_passive");
    video_2.pause();
    video_2.currentTime = 0;
    video_1.classList.toggle("display-none");
    video_2.classList.toggle("display-none");
    video_1.play();
    video_1.onended = () => video_2.play();
    description.textContent =
      "You must enter the value of the expression before the drop falls into the sea.";
    currentVideo = 1;
    return;
  }
});

arrow_right.addEventListener("click", () => {
  if (currentVideo === 1) {
    arrow_left.classList.toggle("arrows_left_passive");
    video_1.pause();
    video_1.currentTime = 0;
    video_1.classList.toggle("display-none");
    video_2.classList.toggle("display-none");
    video_2.play();
    video_2.onended = () => video_2.play();
    description.textContent =
      "When the third drop of water touches the sea, the game is over.";
    currentVideo = 2;
    return;
  }
  if (currentVideo === 2) {
    arrow_right.classList.toggle("arrows_right_passive");
    video_2.pause();
    video_2.currentTime = 0;
    video_2.classList.toggle("display-none");
    video_3.classList.toggle("display-none");
    description.textContent = "You can use the keyboard to play the game.";
    currentVideo = 3;
    return;
  }
});
document.addEventListener("keydown", keydown);





































/*
function rand (min, max) {
  returnn Math.floor(Math.random() * (max - min +1)) + min;
};

//canvas.width = window.interWidth;
//canvas.height = window.innerHeight;


audioRain.play();

setTimeout(function () {
  audioRain.pause();
}, 2000);

let gameEngine;
let x = 10;
    y = 10;

function drawRect() {
  ctx.fillStyle = 'black';
  ctx.clearRect(0, 0, 900, 900)
  ctx.fillRect(x, y, 70, 70);  
}

let nextGameStep = (function() {
  return requestAnimationFrame ||
  webkitRequestAnimationFrame  ||
  oRequestAnimationFrame       ||
  mozRequestAnimationFrame     ||
  msRequestAnimationFrame      ||
  function (callback) {
    setTimeout(callback, 1000 / 60);
  };
})();

let gameEngineStart = function (callback) {
  gameEngine = callback;
  gameEngineStep();
};

let gameEngineStep = function () {
  gameEngine();
  nextGameStep(gameEngineStep)
};

let setGameEngine = function(callback) {
  gameEngine = callback
};

let gameLoopDown = function() {
  drawRect();
  y+=2;
  if (y >= 800) {
    setGameEngine(gameLoopUp);
  }
};

let gameLoopUp = function() {
  drawRect();
  y-=4;
  if (y <= 50) {
    setGameEngine(gameLoopDown);
  }
};

gameEngineStart(gameLoopDown);

const ground = new Image();
ground.src = "/img/dog.jpg";

const drop = new Image();
drop.src = "/img/drop.png";

let score = 0;

canvas.width = window.interWidth;
canvas.height = window.innerHeight;

let drops = {
  x: Math.floor(((Math.random() * 10) + 1) * 100),
  y: 0,
};

function drawGame() {
  ctx.drawImage(ground, 0, 0);
  ctx.drawImage(drop, drops.x, y);
}

let game = setInterval(drawGame, 100);


*/