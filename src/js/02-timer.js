import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  timer: document.querySelector('.timer'),
  daysTimer: document.querySelector('.value[data-days]'),
  hoursTimer: document.querySelector('.value[data-hours]'),
  minutesTimer: document.querySelector('.value[data-minutes]'),
  secondsTimer: document.querySelector('.value[data-seconds]'),
};
refs.startBtn.disabled = true;
document.querySelector('#datetime-picker');

flatpickr('#datetime-picker', {
  isActive: false,
  intervalId: null,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (this.isActive) {
      return;
    } else if (selectedDates[0].getTime() < Date.now()) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      event.preventDefault();
    }

    refs.startBtn.disabled = false;
    const targetTime = selectedDates[0].getTime();
    this.isActive = true;

    refs.startBtn.addEventListener('click', () => {
      this.intervalId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = targetTime - currentTime;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        // console.log(deltaTime);
        if (deltaTime <= 0) {
          clearInterval(this.intervalId);
          this.isActive = false;
          Notiflix.Report.success('Johny Johny? Yes, papa!');
        } else {
          updateTimer({ days, hours, minutes, seconds });
        }
      }, 1000);
    });
  },
});

function updateTimer({ days, hours, minutes, seconds }) {
  refs.daysTimer.textContent = days;
  refs.hoursTimer.textContent = hours;
  refs.minutesTimer.textContent = minutes;
  refs.secondsTimer.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
