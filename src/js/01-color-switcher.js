const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop'),
  buttonIsActive: false,
  background: document.body,
  timerId: null,
};
refs.startBtn.disabled = false;
refs.stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

refs.startBtn.addEventListener('click', () => {
  if (refs.buttonIsActive) {
    return;
  }

  refs.buttonIsActive = true;
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;

  refs.timerId = setInterval(() => {
    refs.background.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

refs.stopBtn.addEventListener('click', () => {
  if (!refs.buttonIsActive) {
    return;
  }
  clearInterval(refs.timerId);
  refs.buttonIsActive = false;
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
});
