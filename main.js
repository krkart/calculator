var btns = document.querySelectorAll('td');
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
                      .map(valueStr => (etype == 'mousedown')? 
                                      Math.max(+valueStr + 40, 0):
                                      Math.max(+valueStr - 40, 0)
                      );
                                    
  return `rgb(${shade.join()})`;
}
