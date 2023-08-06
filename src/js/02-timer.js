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

