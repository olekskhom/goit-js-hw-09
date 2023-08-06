console.log('test')

// Створення змінної для інтервалу:
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

// Створення змінної для збереження ідентифікатора інтервалу:
let intervalId = null;

// Генерування випадкового кольору:
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

// Створення функцій для роботи з зміною кольору фону:
function startChangingColor() {
    intervalId = setInterval(() => {
        const randomColor = getRandomHexColor();
        document.body.style.backgroundColor = randomColor;
    }, 1000);

    startBtn.disabled = true;
}

function stopChangingColor() {
// Очистити інтервал:
    clearInterval(intervalId);

     // Розблокувати кнопку "Start" після зупинки зміни фону:
    startBtn.disabled = false;
}