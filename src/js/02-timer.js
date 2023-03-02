import flatpickr from '../../node_modules/flatpickr';
import { Report } from 'notiflix/build/notiflix-report-aio';
require('flatpickr/dist/themes/dark.css');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    isDateValid(selectedDates[0]);
    sessionStorage.setItem('timeSet', JSON.stringify(selectedDates[0]));
  },
};
flatpickr('#datetime-picker', options);

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let intervalID = null;

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', showTimeLeft);

function isDateValid(timeSet) {
  if (timeSet <= Date.now()) {
    Report.warning('ATTENTION!', 'Please choose a date in the future', 'Okay', {
      messageFontSize: '20px',
      titleFontSize: '24px',
    });
  }
  refs.startBtn.disabled = false;
  refs.startBtn.classList.add('is-active');
}

function stopTimer(intervalID) {
  clearInterval(intervalID);
  refs.stopBtn.classList.add('is-hidden');
  refs.startBtn.classList.add('is-active');
  refs.startBtn.disabled = false;
}

function showTimeLeft() {
  refs.startBtn.classList.remove('is-active');
  refs.startBtn.disabled = true;

  refs.stopBtn.classList.remove('is-hidden');

  refs.stopBtn.addEventListener('click', () => stopTimer(intervalID));

  intervalID = setInterval(() => {
    const currentTime = Date.now();
    const timeSet = new Date(JSON.parse(sessionStorage.getItem('timeSet')));
    const deltaTime = timeSet.getTime() - currentTime;

    if (deltaTime <= 0) {
      stopTimer(intervalID);
      return;
    }

    const { days, hours, minutes, seconds } = addLeadingZero(
      convertMs(deltaTime)
    );

    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(object) {
  for (let key in object) {
    object[key] = String(object[key]).padStart(2, 0);
  }
  return object;
}
