let firstNum = 0
let secondNum = 0;
let operator = '';
let btns = document.querySelectorAll('td');
let display = document.querySelector('.display');

btns.forEach(btn => btn.addEventListener('mousedown', (e) => {
  e.target.style.backgroundColor = bgShade(e.target, e.type);
}));

btns.forEach(btn => btn.addEventListener('mouseup', (e) => {
  e.target.style.backgroundColor = bgShade(e.target, e.type);
}));

btns.forEach(btn => btn.addEventListener('click', displayContent));

function bgShade(el, etype) {
  const shade = window.getComputedStyle(el)
    .backgroundColor
    .match(/\d+/g)
    .map(valueStr => (etype == 'mousedown') ?
      Math.max(+valueStr + 40, 0) :
      Math.max(+valueStr - 40, 0)
    );

  return `rgb(${shade.join()})`;
}

function displayContent(e) {
  if (display.textContent == '0' || e.target.classList.contains('negate')) {
    display.textContent = '';
  }

  if (e.target.classList.contains('num')) {
    display.append(e.target.textContent);
  }

  if (e.target.classList.contains('operator')) {
    if (firstNum != 0) {
      secondNum = Number(display.textContent);
      console.log(firstNum, secondNum);
    } else {
      firstNum = Number(display.textContent);
      console.log(firstNum, secondNum);
    }
    operator = e.target.id;
    let calc = window[operator];
    firstNum = calc(firstNum, secondNum);
    // console.log(e.target.id, typeof (e.target.id));
    // let calc = window[operator];
    // console.log(typeof(calc))
    // calc(firstNum, secondNum);
  }

  if (e.target.classList.contains('clear')) {
    firstNum = secondNum = 0;
    operator = '';
    display.textContent = '0';
  }

  function add(a, b) {
    return a + b;
  }

  function subtract(a, b) {
    return a - b
  }

  function multiply(a, b) {
    return a * b
  }

  function divide(a, b) {
    return a / b
  }

  function equal(a, b) {
   display.textContent = firstNum;
   console.log(firstNum)
  }
}

