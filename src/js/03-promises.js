import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onButtonClick);

function createPromise({ position, delay }) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onButtonClick(event) {
  event.preventDefault();

  const amount = +event.currentTarget.elements.amount.value;
  const del = +event.currentTarget.elements.delay.value;
  const step = +event.currentTarget.elements.step.value;

  for (let i = 0; i < amount; i++) {
    const position = i;
    const delay = del + step * i;

    createPromise({ position, delay })
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
          fontSize: '20px',
          width: '300px',
          position: 'center-center',
          backOverlay: true,
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
          fontSize: '20px',
          width: '300px',
          position: 'center-center',
          backOverlay: true,
        });
      });
  }
  event.currentTarget.reset();
}
