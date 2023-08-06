// Імпортуємо бібліотеки та стилі:
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

// Отримуємо посилання на DOM-елементи;
const dataPickerEl = document.querySelector('#datetime-picker');
const buttonEl = document.querySelector('[data-start]');
const deysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

// Ініціалізуємо зміні для збереження поточної дати, вибраної дати, різниці часу та ідентифікатора таймера:
let currentDate = new Date();
let selectedDate = null;
let deltaTime = null;
let intervalId = null;

// Встановлюємо атрибут 'disabled'для кнопки "Start" при запуску сторіки;
buttonEl.setAttribute('disabled', 'true');

// Додаємо обробник події на кнопку "Start"
buttonEl.addEventListener('click', onStartTimer);

// Налаштовуємо параметри для віджету вибору дти:
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // Під час вибору дати закриттям віджету обробляємо вибрану дату:
    selectedDate = selectedDates[0];
    deltaTime = selectedDate - currentDate;

    // Перевіряємо, чи вибрана дата в майбутньому, якщо ні - виводимо повідомлення про помилку;
    if (selectedDate <= currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      deltaTime = null; // Обнуляємо різницю часу, щоб уникнути запуску таймера з некоректною датою:
      return;
    }

    // Видаляємо атрибут 'disabled' з кнопки "Start", якщо вибрано коректну дату:
    buttonEl.removeAttribute('disabled');
  },
};

// Ініціалізуємо віджет вибору дати та часу з використанням опцій:
const fp = flatpickr(dataPickerEl, options);

// Функція, яка викликається при натисканні на кнопку "Start":
function onStartTimer(event) {
  updateComponentsTimer(convertMs(deltaTime)); // Оновлюємо компоненти таймера з використанням різниці часу
  startTimer(); // Запускаємо таймер
  buttonEl.setAttribute('disabled', 'true'); // Встановлюємо атрибут 'disabled' для кнопки "Start" (робимо її неактивною)
  dataPickerEl.setAttribute('disabled', 'true'); // Встановлюємо атрибут 'disabled' для віджету вибору дати та часу (робимо його неактивним)
}

// Функція для форматування чисел з використанням двох символів:
function pad(value) {
  return String(value).padStart(2, '0');
}

// Функція для конвертації різниці часу у формат дні:години:хвилини:секунди
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// Функція для запуску таймера;
function startTimer() {
  intervalId = setInterval(() => {
    stopTimer();

    deltaTime -= 1000;
    updateComponentsTimer(convertMs(deltaTime));
  }, 1000);
}

// Функція для зупинки таймера:
function stopTimer() {
  if (
    (deysEl.textContent === '00') &
    (hoursEl.textContent === '00') &
    (minutesEl.textContent === '00') &
    (secondsEl.textContent === '01')
  ) {
    clearInterval(intervalId); // Зупиняємо інтервал, якщо таймер виконав свою роботу (досягнута нульова відлік)
  }
}

// Функція для оновлення компонентів таймера (дні, години, хвилини, секунди):
function updateComponentsTimer({ days, hours, minutes, seconds }) {
  deysEl.textContent = days.toString();
  hoursEl.textContent = hours.toString();
  minutesEl.textContent = minutes.toString();
  secondsEl.textContent = seconds.toString();
}
