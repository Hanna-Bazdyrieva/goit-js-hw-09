const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start'),
  stopBtn: document.querySelector('button[data-stop'),
  output: document.querySelector('.color-output'),
};
let intervalId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  refs.output.textContent = '';

  intervalId = setInterval(() => {
    const currentColor = getRandomHexColor();
    refs.body.style.backgroundColor = currentColor;
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    refs.startBtn.dataset.color = currentColor;
  }, 1000);
}

function onStopBtnClick() {
  clearInterval(intervalId);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
  refs.output.textContent = `HEX Color Code : ${String(
    refs.startBtn.dataset.color
  ).toUpperCase()}`;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
