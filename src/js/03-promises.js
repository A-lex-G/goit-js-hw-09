// import Notiflix from 'notiflix';

// const refs = {
//   delayValue: document.querySelector('.delay input'),
//   stepValue: document.querySelector('.step input'),
//   amountValue: document.querySelector('.amount input'),
//   submitButton: document.querySelector('button'),
// };

// refs.submitButton.addEventListener('submit', createPromise);

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   position = 0;
//   delay = Number(refs.delayValue.value);

//   // while (position <= Number(refs.amountValue.value)) {}

//   return new Promise((resolve, reject) => {
//     position += 1;

//     setTimeout(() => {
//       if (shouldResolve) {
//         // Fulfill
//         resolve({ position, delay });
//       } else {
//         // Reject
//         reject({ position, delay });
//       }
//     }, 2000);
//     // console.dir(promise);
//   });
// }

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

// createPromise()
//   .then(x => console.log(x))
//   .catch(y => console.log(y));

// function onsubmit() {
//   for (let i = 0; i < Number(refs.amountValue.value); i += 1) {}
// }

// const promiseObj = {
//   position: 0,
//   delay: Number(refs.delayInput.value),
// };

// createPromise({ position, delay })
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

// console.log(Number(refs.delayValue.value));
// ___________________________________

import Notiflix from 'notiflix';

const refs = {
  delayValue: document.querySelector('input[name="delay"]'),
  stepValue: document.querySelector('input[name="step"]'),
  amountValue: document.querySelector('input[name="amount"]'),
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(evt) {
  evt.preventDefault();
  const amount = Number(refs.amountValue.value);
  let delay = Number(refs.delayValue.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += Number(refs.stepValue.value);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
