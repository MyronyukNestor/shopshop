const button1 = document.querySelector('.button1');
const button2 = document.querySelector('.button2');
const slider = document.querySelectorAll('.slider');
let currentIndex = 0;

button1.addEventListener('click', () => {
  slider[currentIndex].classList.remove('active');
  currentIndex = (currentIndex - 1 + slider.length) % slider.length;
  slider[currentIndex].classList.add('active');
});

button2.addEventListener('click', () => {
  slider[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % slider.length;
  slider[currentIndex].classList.add('active');
});
