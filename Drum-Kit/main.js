function playSound(e) {
  const key = document.querySelector(`.key[data-key="${e.code}"]`),
    audio = document.querySelector(`audio[data-key="${e.code}"]`);
  if (!audio) return;
  playAudioAddClass(audio, key);
}
function playAudioAddClass(audio, key) {
  audio.currentTime = 0;
  audio.play();
  key.classList.add("playing");
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}
function playMouse(e) {
  const audio = document.querySelector(
    `audio[data-key="${e.currentTarget.dataset.key}"]`
  );
  playAudioAddClass(audio, this);
}

const keys = document.querySelectorAll(".key");
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
keys.forEach((key) => key.addEventListener("click", playMouse));
window.addEventListener("keydown", playSound);
