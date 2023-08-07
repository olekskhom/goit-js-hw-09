console.log('test')

// Імпортуємо бібліотеку Notiflix:
import Notiflix from 'notiflix';

// Отримуємо посилання на DOM-елементи форми та її полів:
const formEl = document.querySelector('.form');
const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');

// Додаємо обробник події 'submit' на форму:
formEl.addEventListener('submit', onHandleForm);

// Функція обробки події 'submit' на формі:
function onHandleForm(event) {
  event.preventDefault(); // Відмінюємо діяти форми по замовчуванню (уникнення перезавантаження сторінки)

  // Отримуємо значення з полів форми:
  let delay = Number(delayEl.value);
  let step = Number(stepEl.value);
  let amount = Number(amountEl.value);
  let position = 0;

  // Перевіряємо, чи введені коректні значення в полі "Amount", "Delay" і "Step":
  if (amount <= 0 || delay < 0 || step < 0) {
    // Якщо некоректні - виводимо повідомлення про помилку:
    Notiflix.Notify.failure(`Please input correct values (>=0)`);
  }

  // Запускаємо цикл для створення заданої кількості промісів:
  for (let i = 1; i <= amount; i += 1) {
    position = i;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        // Якщо проміс виконаний - виводимо повідомлення про успіх:
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        // Якщо проміс відхилено - виводимо повідомлення про невдачу:
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay += step; // Збільшуємо затримку для наступного промісу на величину "Step".
  }

  formEl.reset(); // Скидаємо значення полів форми до початкових.
}

// Функція для створення промісу з заданою затримкою:
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3; // Випадково визначаємо, чи проміс буде виконаний чи відхилений.

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); // Виконання промісу.
      } else {
        reject({ position, delay }); // Відхилення промісу.
      }
    }, delay);
  });
}

