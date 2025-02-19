(function () {
  let fn = 0;   // first number
  let ln = 0;   // last number
  let currentOperator = null;
  let isOperatorClicked = false;
  const btns = document.querySelectorAll('td');
  // let clickOperator = document.querySelector('.operator');
  const display = document.querySelector('.display');
  const equal = document.querySelector('.equal');

  window.add = (a, b) => a + b;
  window.subtract = (a, b) => a - b;
  window.multiply = (a, b) => a * b;
  window.divide = (a, b) => a / b;
  window.percentage = (a, b) => a % b;
  window.negate = (a, _b) => a * -1;

  btns.forEach(btn => btn.addEventListener('click', displayContent));

  function displayContent(e) {
    if (display.textContent == '0') {
      display.textContent = '';
    }

    if (e.target.classList.contains('num')) {
      display.append(e.target.textContent);
    }

    if (e.target.classList.contains('operator')
      && !(e.target.classList.contains('equal'))) {
      isOperatorClicked = true;
      const clickedOperator = e.target.id;
      equal.id = currentOperator;
      if (currentOperator && isOperatorClicked && display.textContent !== '') {
        ln = Number(display.textContent);
        console.log(`calc: ${fn} ${currentOperator} by ${ln}`);
        let calc = window[currentOperator];
        fn = calc(fn, ln);
        display.textContent = fn;
        console.log('result: ' + fn);
        currentOperator = clickedOperator;
        isOperatorClicked = true;
      } else if (display.textContent !== '') {
        fn = Number(display.textContent);
        currentOperator = clickedOperator;
      }
      display.textContent = '';
    }

    if (e.target.classList.contains('negate')) {
      if (fn !== 0) {
        ln = Number(display.textContent);
        ln = negate(ln, fn);
        display.textContent = ln;
      } else {
        fn = Number(display.textContent);
        fn = negate(fn, ln);
        display.textContent = fn;
      }
      console.log('result: ' + fn);
    }
  }

  equal.addEventListener('click', () => {
    if (currentOperator && isOperatorClicked) {
      ln = Number(display.textContent);
      display.textContent = '';
      let calc = window[currentOperator];
      fn = calc(fn, ln);
      display.append(fn);
      console.log(`equals: ${fn} ${currentOperator} by ${ln}`);
      currentOperator = null;
      isOperatorClicked = false;
      fn = 0;
      ln = 0;
    } else {
      display.textContent = 'ERROR';
      console.log(`equals?: ${fn}, ${ln}, ${currentOperator}`);
    }
  });

  document.querySelector('.clear').addEventListener('click', () => {
    fn = ln = 0;
    currentOperator = null;
    clickedOperator = null;
    isOperatorClicked = false;
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
})();
