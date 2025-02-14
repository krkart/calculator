var btns = document.querySelectorAll('td');
btns.forEach(btn => btn.addEventListener('mousedown', (e) => {
  e.target.style.backgroundColor = bgShade(e.target, e.type);
  console.log(e.target.style.backgroundColor)
}));

btns.forEach(btn => btn.addEventListener('mouseup', (e) => {
  e.target.style.backgroundColor = bgShade(e.target, e.type);
  console.log(e.target.style.backgroundColor)
}));

function bgShade(elem, event) {
  const shade = window.getComputedStyle(elem)
                      .backgroundColor
                      .match(/\d+/g)
                      .map(valueStr => { 
                        if (event == 'mousedown') {
                          return Math.max(+valueStr + 40, 0)
                        } else {
                          return Math.max(+valueStr - 40, 0)
                        } 
                      });
                                    
  return `rgb(${shade.join()})`;
}
                                  