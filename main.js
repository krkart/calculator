let fn = 0;   // first number
let ln = 0;   // last number
let result = 0;
let operator = null;
let operatorClicked = false;
let btns = document.querySelectorAll('td');
let display = document.querySelector('.display');
let equal = document.querySelector('.equal');
let clear = document.querySelector('.clear').addEventListener('click', () => {
  fn = ln = 0;
  operator = null;
  operatorClicked = false;
  display.textContent = '0';
});

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
    if (fn != 0 && display.textContent !== "") {
      ln = Number(display.textContent);
      console.log(`before calc: ${fn}, ${ln}, ${operator}`);
      let calc = window[operator];
      result = calc(fn, ln);
      display.append(result);
      console.log('fn after calc: ' + fn);
    } else if (display.textContent !== "") {
      fn = Number(display.textContent);
      console.log(`before calc: ${fn}, ${ln}, ${operator}`);
    }
    display.textContent = "";
  }
}

equal.addEventListener('click', () => {
  if (operator && operatorClicked) {
    ln = Number(display.textContent);
    display.textContent = '';
    let calc = window[operator];
    result = calc(fn, ln);
    display.append(result);
    console.log(`after calc: ${result}, ${ln}, ${operator}`);
    operator = null;
    operatorClicked = false;
    fn = 0;
    ln = 0;
  } else {
    display.textContent = 'ERROR';
    console.log(`after calc: ${fn}, ${ln}, ${operator}`);
  }
});

