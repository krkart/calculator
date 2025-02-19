let firstNum = 0;
let secondNum = 0;
let operator = null;
let operatorClicked = false;
let btns = document.querySelectorAll('td');
let display = document.querySelector('.display');
let equal = document.querySelector('.equal');

btns.forEach(btn => btn.addEventListener('mousedown', (e) => {
  e.target.style.backgroundColor = bgShade(e.target, e.type);
}));

btns.forEach(btn => btn.addEventListener('mouseup', (e) => {
  e.target.style.backgroundColor = bgShade(e.target, e.type);
}));

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

window.add = (a, b) => a + b;
window.subtract = (a, b) => a - b;
window.multiply = (a, b) => a * b;
window.divide = (a, b) => a / b;

btns.forEach(btn => btn.addEventListener('click', displayContent));

function displayContent(e) {
  if (display.textContent == '0' || e.target.classList.contains('negate')) {
    display.textContent = '';
  }

  if (e.target.classList.contains('num')) {
    display.append(e.target.textContent);
  }

  if (e.target.classList.contains('operator')
    && !(e.target.classList.contains('equal'))) {
    operatorClicked = true;
    operator = e.target.id;
    equal.id = operator;
    console.log(equal.id);
    if (firstNum != 0 && display.textContent !== "") {
      secondNum = Number(display.textContent);
      console.log(`before calc: ${firstNum}, ${secondNum}, ${operator}`);
      let calc = window[operator];
      firstNum = calc(firstNum, secondNum);
      display.append(firstNum);
      console.log('fn after calc: ' + firstNum);
    } else if (display.textContent !== "") {
      firstNum = Number(display.textContent);
      console.log(`before calc: ${firstNum}, ${secondNum}, ${operator}`);
    }
    display.textContent = "";
  }

  if (e.target.classList.contains('clear')) {
    firstNum = secondNum = 0;
    operator = null;
    operatorClicked = false;
    display.textContent = '0';
  }
}

equal.addEventListener('click', () => {
  if (operator && operatorClicked) {
    secondNum = Number(display.textContent);
    display.textContent = '';
    console.log(operator);
    let calc = window[operator];
    firstNum = calc(firstNum, secondNum);
    display.append(firstNum);
    console.log(`after calc: ${firstNum}, ${secondNum}, ${operator}`);
    operator = null;
    operatorClicked = false;
    firstNum = 0;
    secondNum = 0;
  } else {
    display.textContent = 'ERROR';
    console.log(`after calc: ${firstNum}, ${secondNum}, ${operator}`);  }
});

