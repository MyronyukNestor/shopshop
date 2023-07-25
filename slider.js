const button1 = document.querySelector('.button1');
const button2 = document.querySelector('.button2');
const slider = document.querySelectorAll('.slider');
let index = 0;

button1.addEventListener('click', () => {
  slider[index].classList.remove('active');
  index = (index - 1 + slider.length) % slider.length;
  slider[index].classList.add('active');
});

button2.addEventListener('click', () => {
  slider[index].classList.remove('active');
  index = (index + 1) % slider.length;
  slider[index].classList.add('active');
});
